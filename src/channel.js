
//Xiang
function channelJoinV1 (authUserId, channelId) {

}

//Xiang
function channelInviteV1 () {

}


// Given the authUserId, channelId and start
// return an array of messages for that channel
/**
 * @param {number} authUserId
 * @param {number} channelId
 * @param {number} start
 */ 
//Joules
function channelMessagesV1 (authUserId, channelId, start) {
    //Logic:
    //Search through the dataBase for the channelId
    //And fetch the messages for the channel
    //let messages = dataBase.channel.find(e => e.channelId == channelId).message
    
    return {
        messages: [
            {
                messageId: 1,
                uId: authUserId,
                text: "Hey everyone!",
                timeStamp: 1000000
            }
        ],
        start : start,
        end: 1000
    };
}

//Joules + Rachel
function channelDetailsV1 () {

}