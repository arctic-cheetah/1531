
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

  return {};
}

// Given the authUserId, channelId and start
// return an array of messages for that channel
/**
 * @param {number} authUserId
 * @param {number} channelId
 * @param {number} start
 * @returns {messages: [], start: number, end: number}
 */
// Joules
export function channelMessagesV1 (authUserId, channelId, start) {
  // Logic:
  // Search through the dataBase for the channelId
  // And fetch the messages for the channel
  // let messages = dataBase.channel.find(e => e.channelId == channelId).message

  return {
    messages: [
      {
        messageId: 1,
        uId: 1,
        message: 'Hello world',
        timeStamp: 1582426789
      }
    ],
    start: 0,
    end: 50
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
