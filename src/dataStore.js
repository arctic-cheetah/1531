// YOU SHOULD MODIFY THIS OBJECT BELOW
// let data = {};

let data = {
  users : 
  [
    {
      uId: 1, 
      //authUserId: 1 may need to be added in future because this is an authToken
      //But it is currently used as an userId
      nameFirst: 'Alison',
      nameLast: 'Patman',
      userName: 'AlisonPatman',
      email: 'boost@lol.com.au',
      status: 'Sleeping',
      password: "lolLOL2320",
      enrolledChannelsId : [1,2,3,4,5], //Keep track of the channels a user as enrolled in.
      isGlobalOwner: true
    },
    {
      uId: 2, 
      //authUserId: 1 may need to be added in future because this is an authToken
      //But it is currently used as an userId
      nameFirst: 'Alison',
      nameLast: 'Patman',
      userName: 'AlisonPatman',
      email: '1234@lol.com.au',
      status: 'Sleeping',
      password: "akfnGND23",
      enrolledChannelsId : [1], //Keep track of the channels a user as enrolled in.
      isGlobalOwner: false
    }
  ],
  channels : 
  [
    {
      channelId: 1,
      channelName: 'boost_chat',
      ownerMembers: [1],
      allMembers : [1], // Keep track of the users inside a channel
      isPublic: true, 
      messages: 
      [
        {
          messageId: 0,
          uId: 1,
          message: 'Hi everyone',
          attachment : "https://wwww.insertURLHERE.com/test.png", //If files or photos attached in a message
          timeSent: 1, //When was the message sent in milliSeconds since UNIX-TIME
        }
      ],
    }
    //..... More objects here
  ] 
}

// YOU SHOULDNT NEED TO MODIFY THE FUNCTIONS BELOW IN ITERATION 1

/*
Example usage
    let store = getData()
    console.log(store) # Prints { 'names': ['Hayden', 'Tam', 'Rani', 'Giuliana', 'Rando'] }

    names = store.names

    names.pop()
    names.push('Jake')

    console.log(store) # Prints { 'names': ['Hayden', 'Tam', 'Rani', 'Giuliana', 'Jake'] }
    setData(store)
*/

// Use get() to access the data
function getData() {
  return data;
}

// Use set(newData) to pass in the entire data object, with modifications made
// - Only needs to be used if you replace the data store entirely
// - Javascript uses pass-by-reference for objects... read more here: https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference
// Hint: this function might be useful to edit in iteration 2
function setData(newData) {
  data = newData;
}

export { getData, setData };
