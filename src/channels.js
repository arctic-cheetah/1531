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
      };
      //Track the user's enrolled channel
      e.enrolledChannelsId.push(channelId);
      
      //Add new channel 
      data.channels.push(newChannel);
    }
  });
  // console.log(channelId);

  return { channelId };
}

// Given the authUserId, 
// return all the channels the user has enrolled in
/**
 * @param {number} authUserId
 * @returns {channels: [{}]}
 */ 
//Joules
function channelsListV1 (authUserId) {
    //Go through the data base and fetch the user's channels
    //let channels = dataBase.channel.find(e => e.users.find(authUserId) == authUserId)
    return {
        channels: [
            {
                channelId: 1,
                name: "My Channel"
            }
        ]
    };
}

// Given the authUserId
// return an array of channels for that user
/**
 * @param {number} authUserId
 * @returns {channels: [{}]} 
 */ 
//Rachel
function channelsListAllV1 (authUserId) {
    //Logic:
    //Search through the dataBase for the authUserId
    //And fetch the channels for the respective authUser
    
    return {
        channels: [
            {
                channelId: 1,
                name: 'My Channel',
            }
        ],
    };
}
