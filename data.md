```javascript
let data = {
    user : 
    {
        uId: 1, 
        //authUserId: 1 may need to be added in future because this is an authToken
        //But it is currently used as an userId
        nameFirst: 'Alison',
        nameLast: 'Patman',
        userName: 'AlisonPatman'
        email: 'boost@lol.com.au',
        status: 'Sleeping',
        enrolledChannelsId : {1} //Keep track of the channels a user as enrolled in.
    },
    channel : 
    {
        channelId: 1,
        channelName: 'boost_chat'
        channelOwner: {},
        messages: 
        {
            messageId: 0,
            uId: 1,
            message: 'Hi everyone',
            attachment : "https://wwww.insertURLHERE.com/test.png" //If files or photos attached in a message
            timeSent: 1, //When was the message sent in milliSeconds since UNIX-TIME
        },
        usersIdEnrolled : {1} // Keep track of the users inside a channel
    } 
}
```

[Optional] 
#About data structure:
Data base is seperated into `user` and `channel`. 
It currently contains only one example user and channel.

##`User`:
`user` will contain multiple users in future. Each user will to have a unique 
`uId`, `userName` and `email` to prevent possible data conflicts. eg same first and last name.
Each user stores information on the channels they are enrolled in.

##`Channel`:
`channel` will contain multiple channels in future.
Each channel will contain `messages : []`, to store all the messages for tha channel and any possible attachments in a message.
Each channel will store information about the users inside it.

[Future_features]
-Need to think about how to implement `start` and `end` variables
-What is the variable `handleStr`? --> It's the channel name
