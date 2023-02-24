
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
                channelName: "boost",
                channelId: 1
            }
        ]
    };
}

//Rachel
function channelsListAllV1 () {
}