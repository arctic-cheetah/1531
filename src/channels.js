export {channelsCreateV1, channelsListV1, channelsListAllV1};
import {getData} from "./dataStore"
// Given the authUserId, name and isPublic
// return the channelId
/**
 * @param {number} authUserId
 * @param {string} name
 * @param {boolean} isPublic
 * @returns {channelId: number } 
 */ 
//Rachel
function channelsCreateV1 (authUserId, name, isPublic) {
    //Logic:
    //Creates a channel that contains information such as
    //authUserId, name of channel and whether it's public or not
    
    return {channelId: 1};
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
