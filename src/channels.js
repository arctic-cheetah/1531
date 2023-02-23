
//Rachel
function channelsCreateV1 () {

}

//Joules
function channelsListV1 () {

}

// Given the authUserId
// return an array of channels for that user
/**
 * @param {number} authUserId
 * @returns {channels: []} 
 */ 
//Rachel
function channelsListAllV1 () {
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
