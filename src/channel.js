
import { getData } from "./dataStore";


const ERROR = { error: 'error' };

// Xiang
// Use authUserId to join the channel.
/**
 * @param {number} authUserId
 * @param {number} channelId
 * @returns {}
 */
export function channelJoinV1 (authUserId, channelId) {
  const data = getData();

  
  //Does the user exist
  let foundUser = data.users.filter(e => e.uId === authUserId);
  if (foundUser.length === 0) {
    return ERROR;
  } 

  //Does the channel exist
  let foundChannel = data.channels.filter(e => e.channelId === channelId);
  if (foundChannel.length === 0) {
    return ERROR;
  }

  //Is the user already a member of the channel
  let isMember = foundUser[0].enrolledChannelsId.includes(channelId);
  if (isMember) {
    return ERROR;
  }

  //Don't add anyone if the channel is private, and the user is not a global owner
  if (foundChannel[0].isPublic === false && !foundUser[0].isGlobalOwner) {
    return ERROR;

  }

  //Add the user (global member) to the channel inside allMembers
  let userInfo = {
    uId : foundUser[0].uId,
    email : foundUser[0].email,
    nameFirst : foundUser[0].nameFirst,
    nameLast : foundUser[0].nameLast,
    handleStr : foundUser[0].userName
  };
  foundChannel[0].allMembers.push(userInfo);


  //Update the user's enrolled channels
  foundUser[0].enrolledChannelsId.push(channelId);

  //Check for global owners, and add to as needed ownerMembers to the channel
  if (foundUser[0].isGlobalOwner) {
    foundChannel[0].ownerMembers.push(userInfo);  
  }

  return {};
}

// Rachel
// Invite Uid into the channel using channelid
/**
 * @param {number} authUserId
 * @param {number} channelId
 * @param {number} uId
 * @returns {}
 */
export function channelInviteV1 (authUserId, channelId, uId) {
  const data = getData();

  //Is authUserId vaid??
  let foundUser = data.users.filter(e => e.uId === authUserId);
  if (foundUser.length === 0) {
    return ERROR;
  }

  //Does uId refer to a valid user??
  let founduId = data.users.filter(e => e.uId === uId);
  if (founduId.length === 0) {
    return ERROR;
  }

  //Is channelId valid??
  let foundChannel = data.channels.filter(e => e.channelId === channelId);
  if (foundChannel.length === 0) {
    return ERROR;
  }

  let curr_channel = foundChannel[0];
  //Is authUserId a member of the channel??

  let isMember = curr_channel.allMembers.includes(authUserId);
  if (!isMember) {
    return ERROR;
  }

  //Is uId a member of the channel??
  let uIdisMember = curr_channel.allMembers.includes(uId);
  if (uIdisMember) {
    return ERROR;
  }

  data.channels.forEach((e) => {
    if (e.channelId === channelId) {

      //Channel found, add user to channel
      e.allMembers.push(uId);
      
      //Track the user's enrolled channel
      data.users.forEach((e) => {
        if (e.uId === uId) {
          e.enrolledChannelsId.push(channelId);
        }
      });
    }
  });
  
  return {};
}


/**
 * @param {number} authUserId
 * @param {number} channelId
 * @param {number} start
 * @returns {messages: [], start: number, end: number}
 * 
 * Given the authUserId, channelId and start.
 * return an array of messages for that channel
 * from newest to oldest
 * 
 */
// Joules
export function channelMessagesV1 (authUserId, channelId, start) {
  // Logic:
  // Search through the dataBase for the channelId
  // And fetch the messages for the channel
  // let messages = dataBase.channel.find(e => e.channelId == channelId).message
  
  const data = getData();

  //Does the authUserId exist?
  let foundUser = data.users.filter(e => e.uId === authUserId);
  if (foundUser.length === 0) {
    return ERROR;
  }
  
  //Does the channelId exist?
  let foundChannel = data.channels.filter(e => e.channelId === channelId);
  if (foundChannel.length === 0) {
    return ERROR;
  }

  //Is the user a member of the channel?
  let isMember = foundUser[0].enrolledChannelsId.includes(channelId);
  if (!isMember) {
    return ERROR;
  }

  //Start is greater than the number of messages in the channel?
  if (start > foundChannel[0].messages.length) {
    return ERROR;
  }

  //CANNOT RELY ON messageId to sort times and return correct value!
  //Need to use timeStamp
  //Assume messages are sorted
  //Assume two messages can be sent at the same time
  let rawMessages = foundChannel[0].messages;

  //Select 50 messages (page)
  let end = start + 50;
  let messages = rawMessages.slice(start, end);

  //Check if 'end' = 'start + 50' exceeds the number of messages
  if (end > rawMessages.length) {
    end = -1
  }

  return {
    messages,
    start,
    end
  };
}

// Given the authUserId and channelId
// return information about the channel
// such as the owner of the channel and the users inside the channel
/**
 * @param {number} authUserId
 * @param {number} channelId
 * @returns {name: string, isPublic: boolean , ownerMembers: [user], allMembers: [user]}
 */
export function channelDetailsV1 (authUserId, channelId) {
  const data = getData();

  //Does the userId exist?
  let foundUser = data.users.filter(e => e.uId === authUserId);
  if (foundUser.length === 0) {
    return ERROR;
  }

  //Does the channelId exist
  let foundChannel = data.channels.filter(e => e.channelId === channelId);
  if (foundChannel.length === 0) {
    return ERROR;
  }
  let curr_channel = foundChannel[0];

  //Is the user a member of the channel??
  let isMember = curr_channel.allMembers.includes(authUserId);
  if (!isMember) {
    return ERROR;
  }

  //Obtain necessary information about the channel... POSSIBLE REFACTORISATION BELOW

  //1) Obtain all information about the members
  // Current data structure inside allMembers holds userId's
  let allMembers = [];
  let MemberRawData = data.users.filter(e => e.enrolledChannelsId.includes(channelId));
  //Filter desired data
  MemberRawData.forEach(e => 
    allMembers.push({
      uId : e.uId,  
      email: e.email, 
      nameFirst: e.nameFirst, 
      nameLast: e.nameLast,
      handleStr: e.userName
    })
  );
  
  //2) Obtain all info about the ownerMembers
  let ownerMembers = [];
  MemberRawData = data.users.filter(e => curr_channel.ownerMembers.includes(e.uId));
  MemberRawData.forEach(e => 
    ownerMembers.push({
      uId : e.uId,  
      email: e.email, 
      nameFirst: e.nameFirst, 
      nameLast: e.nameLast,
      handleStr: e.userName
    })
  );



  //Fetch details about the channel
  return {
    name : foundUser[0].nameFirst,
    isPublic : curr_channel.isPublic,
    ownerMembers,
    allMembers
  };

  // return {
  //   name: 'Hayden',
  //   ownerMembers: [
  //     {
  //       uId: 1,
  //       email: 'example@gmail.com',
  //       nameFirst: 'Hayden',
  //       nameLast: 'Jacobs',
  //       handleStr: 'haydenjacobs',
  //     }
  //   ],
  //   allMembers: [
  //     {
  //       uId: 1,
  //       email: 'example@gmail.com',
  //       nameFirst: 'Hayden',
  //       nameLast: 'Jacobs',
  //       handleStr: 'haydenjacobs',
  //     }
  //   ],
  // };


}
