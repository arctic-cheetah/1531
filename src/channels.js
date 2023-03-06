export {channelsCreateV1, channelsListV1, channelsListAllV1};
import {getData, setData} from "./dataStore"

const ERROR = {error : "error"};
// Given the authUserId, name and isPublic
// return the channelId
/**
 * @param {number} authUserId
 * @param {string} name
 * @param {boolean} isPublic
 * @returns {channelId: number } 
 */ 
function channelsCreateV1 (authUserId, name, isPublic) {
  //Logic:
  //Creates a channel that contains information such as
  //authUserId, name of channel and whether it's public or not

  const data = getData();
  //Is the channel name formatted correctly?
  if ( name.length > 20 || name.length < 1 ) {
      return ERROR;
  }

  //Does authUserId exist?
  let foundUser = data.users.filter(e => e.uId === authUserId);
  if (foundUser.length === 0) {
    return ERROR;
  }


  const ownerMembers = [];
  const allMembers = [];
  let channelId = Object.keys(data.channels).length;
  
  //Iterate through the data.users arragy
  data.users.forEach((e) => {
    if (e.uId === authUserId) {

      //Channel owner user found, add their userId
      ownerMembers.push(e.uId);
      allMembers.push(e.uId);
      let newChannel = {
        channelId,
        channelName: name,
        ownerMembers,
        allMembers,
        isPublic, 
        messages: []
      };
      //Track the user's enrolled channel
      e.enrolledChannelsId.push(channelId);
      
      //Add new channel 
      data.channels.push(newChannel);
    }
  });

  return { channelId };
}

// Given the authUserId, 
// return all the channels the user has enrolled in
/**
 * @param {number} authUserId
 * @returns {
 *  channels: [ {channelId: number, name: string} ] 
 * }
 */ 
function channelsListV1 (authUserId) {
  const data = getData();

  //Does authUserId exist?
  let foundUser = data.users.filter(e => e.uId === authUserId);
  if (foundUser.length === 0) {
    return ERROR;
  }

  //Fetch the list of channelId the user is enrolled in  
  let userChannels = foundUser[0].enrolledChannelsId;                                               //let channels = data.channels.find(e => e.users.find(authUserId) == authUserId);
  let res = [];

  //ASSUMPTION: 
  //Since channelId increases by 1, there is unique 1-1 relation. 
  //we can quickly accessing channel data via an array

  userChannels.forEach(e => {
    let c_data = data.channels[e];
    //Add condition to fetch private/public channels in future
    res.push({channelId: c_data.channelId, name: c_data.channelName});
  });
  return { channels : res };
  
}

// Given the authUserId
// return an array of all channels of both public and private
/**
 * @param {number} authUserId
 * @returns {channels: [ {channelId: number, name: string} ] }
 */ 
function channelsListAllV1 (authUserId) {
  const data = getData();
  //User does not exist
  let foundUser = data.users.filter(e => e.uId === authUserId);
  if (foundUser.length === 0) {
    return ERROR;
  }

  //Fetch the data from all the channels, including private ones
  let res = [];
  data.channels.forEach(e => {
    res.push({channelId : e.channelId, name : e.channelName});
  });

  return { channels : res };
}
