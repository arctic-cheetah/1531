
//Rachel
function channelsCreateV1 () {

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