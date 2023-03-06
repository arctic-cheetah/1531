import { authLoginV1, authRegisterV1 } from './auth';
import { channelsCreateV1, channelsListallV1, channelsListV1 } from './channels';
import { clearV1 } from './other';
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 } from './channel';
import { getData } from './dataStore';

// Remember to test for three types of cases!
// Main case
// Error case
// Edge case

const ERROR = { error: 'error' };

// Add your code that you need to run for before each test here
beforeEach(() => {
  clearV1();
});

// Testing for channelJoinV1
// Main case: If it works
// Edge case:
// Error case: Below


describe('channelJoinV1', () => {


  // Error cases:

  test('authUserId is invalid', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    const answer = channelJoinV1(5, channel.channelId);
    expect(answer).toMatchObject(ERROR);
  });

  test('channelId does not refer to a valid channel', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    const answer = channelJoinV1(user0.authUserId, 5);
    expect(answer).toMatchObject(ERROR);
  });

  test('the authorised user is already a member of the channel', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    const answer = channelJoinV1(user.authUserId, channel.channelId);
    expect(answer).toMatchObject(ERROR);
  });

  test('channelId is a private channel to a global member. Deny enrolment', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', false);
    const answer = channelJoinV1(user0.authUserId, channel.channelId);
    expect(answer).toMatchObject(ERROR);
  });


  test('channelId is a private channel to a global owner. Allow enrolment', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user0.authUserId, 'channel_1', false);
    expect(channelJoinV1(user.authUserId, channel.channelId)).toMatchObject({});
  });

  



   // Main cases:
   test('Testing channelJoinV1',() => {
    const user = authRegisterV1('XiangRen@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z45452255@hotmail.com.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    channelJoinV1(user0.authUserId, channel.channelId);
    let res = channelDetailsV1(user.authUserId,channel.channelId);
    console.log(res);
    expect(res).toStrictEqual(
      {
        name:'Xiang',
        isPublic:true,
        allMembers: [
          {
            uId: user.authUserId,
            email: 'XiangRen@unsw.edu.au',
            nameFirst: 'Xiang',
            nameLast: 'Ren',
            handleStr: 'xiangren'
          },
          {
            uId: user0.authUserId,
            email: 'z45452255@hotmail.com.au',
            nameFirst: 'Bill',
            nameLast: 'White',
            handleStr: 'billwhite'
          }
        ],
        ownerMembers: [
          {
            uId: user.authUserId,
            email: 'XiangRen@unsw.edu.au',
            nameFirst: 'Xiang',
            nameLast: 'Ren',
            handleStr: 'xiangren'
          }
        ]
      }
    )
  });

});


describe('channelDetailsV1', () => {
  // Error cases:
  test('Non-existent authUserId', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelDetailsV1(-1E5, channel.channelId)).toMatchObject(ERROR);
  });

  test('Non-existent channelId', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelDetailsV1(user.authUserId, -0xFFFFFFFF)).toMatchObject(ERROR);
  });

  test('User2 is not a member of User1\'s channel', () => {
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('Bob@unsw.edu.au', 'fmkagAFN23', 'Bob', 'Doe');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    expect(channelDetailsV1(user2.authUserId, channel.channelId)).toMatchObject(ERROR);
  });

  // Main cases:
  test('User 1 wants info on their channel', () => {
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    expect(channelDetailsV1(user1.authUserId, channel.channelId)).toStrictEqual(
      {
        name: 'Xiang',
        isPublic: true,
        allMembers: [
          {
            uId: user1.authUserId,
            email: 'Xiang@unsw.edu.au',
            nameFirst: 'Xiang',
            nameLast: 'Ren',
            handleStr: 'xiangren'
          }
        ],
        ownerMembers: [
          {
            uId: user1.authUserId,
            email: 'Xiang@unsw.edu.au',
            nameFirst: 'Xiang',
            nameLast: 'Ren',
            handleStr: 'xiangren'
          }
        ]
      }
    );
  });

  test('User 1 wants info on their channel, with two members inside it', () => {
    const dat = getData();
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('DBGW@unsw.edu.au', 'KGNEldar2', 'Don', 'Doe');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    dat.channels[0].allMembers.push({uId: user2.authUserId, email: 'DBGW@unsw.edu.au', nameFirst: 'Don',  nameLast: 'Doe', handleStr: 'dondoe'});
    dat.users.find(e => e.uId === user2.authUserId).enrolledChannelsId.push(channel.channelId);
    
    //Add user2 to the channel
    expect(channelDetailsV1(user1.authUserId, channel.channelId)).toStrictEqual(
      {
        name: 'Xiang',
        isPublic: true,
        ownerMembers: [
          {
            uId: user1.authUserId,
            email: 'Xiang@unsw.edu.au',
            nameFirst: 'Xiang',
            nameLast: 'Ren',
            handleStr: 'xiangren'
          }
        ],
        allMembers: [
          {
            uId: user1.authUserId,
            email: 'Xiang@unsw.edu.au',
            nameFirst: 'Xiang',
            nameLast: 'Ren',
            handleStr: 'xiangren'
          },
          {
            uId: user2.authUserId,
            email: 'DBGW@unsw.edu.au',
            nameFirst: 'Don',
            nameLast: 'Doe',
            handleStr: 'dondoe'
          }
        ]
      }
    );
  });


  // Edge cases:
});


//Helper functions for channelMessages
let getSeconds = (i) => {
  return Math.floor((Date.now() + 1E3*i)/1E3);
};

//Set messages inside the database
/**
 * @param {Array} num_messages
 * @param {Object} channelId
 * @param {Object} user1
 * @returns message_check : Array<>
 * 
 */
let setMessages = (num_messages, dat, user1) => {
  let message_check = [];
  for (let i = 0; i < num_messages; i +=1) {
    let message = {
      messageId: i, 
      uId: user1.authUserId, 
      message: `Hello user ${i}`, 
      timeStamp: getSeconds(i)
    };
    // setTimeout(() => {
    // }, 1000);
    //Mock set up for time stamp as setTimeout does not work
    dat.channels[0].messages.push(message);
    message_check.push(message);
  }
  //Sort from newest to oldest
  dat.channels[0].messages.reverse();
  message_check.reverse();
  return message_check;
};


describe('channelMessagesV1', () => {
  // Error cases:
  test('Non-existent authUserId', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelMessagesV1(-1E5, channel.channelId, 0)).toMatchObject(ERROR);
  });

  test('Non-existent channelId', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelMessagesV1(user.authUserId, -0xFFFFFFFF, 0)).toMatchObject(ERROR);
  });

  test('User2 is not a member of user1\'s channel', () => {
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('Dodo@unsw.edu.au', 'FNgFkdw13', 'dodo', 'uyu');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    expect(channelMessagesV1(user2.authUserId, channel.channelId, 0)).toMatchObject(ERROR);
  });

  test('Start exceeds the number of messages in a channel', () => {
    const dat = getData();
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('Dodo@unsw.edu.au', 'FNgFkdw13', 'dodo', 'uyu');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    const num_messages = 3;
    
    

    // console.log(dat.channels[0].messages);
    
    expect(channelMessagesV1(user1.authUserId, channel.channelId, 10)).toMatchObject(ERROR);
  });

  // Main cases:
  //One page = (50 messages) 
  test('Suppose 5 messages exist in a channel. Show them', () => {
    const dat = getData();
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('Dodo@unsw.edu.au', 'FNgFkdw13', 'dodo', 'uyu');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    const num_messages = 5;
    
    //Create messages for database
    let messages = setMessages(num_messages, dat, user1);

    
    let res = channelMessagesV1(user1.authUserId, channel.channelId, 0);
    expect(res).toEqual({messages , start: 0, end: -1});

  });

  //One page = (50 messages) 
  test('Suppose 50 messages exist in a channel. Show them', () => {
    const dat = getData();
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('Dodo@unsw.edu.au', 'FNgFkdw13', 'dodo', 'uyu');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    const num_messages = 50;
    
    //Create messages, from new to old
    let messages = setMessages(num_messages, dat, user1);

    let res = channelMessagesV1(user1.authUserId, channel.channelId, 0);    
    expect(res).toEqual({messages, start: 0, end: 50});

  });

  test('Suppose 150 messages exist in a channel. Show them', () => {
    const dat = getData();
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('Dodo@unsw.edu.au', 'FNgFkdw13', 'dodo', 'uyu');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    const num_messages = 150;
    const page = 50;
    
    //Create messages, from new to old
    let messages = setMessages(num_messages, dat, user1);

    let check = []
    
    for (let i = 0; i < num_messages / 50; i+=1) {
      check.push(channelMessagesV1(user1.authUserId, channel.channelId, page * i));
    }

    expect(check[0]).toEqual({messages: messages.slice(0, 50), start: 0, end: 50});
    expect(check[1]).toEqual({messages: messages.slice(50, 100), start: 50, end: 100});
    expect(check[2]).toEqual({messages: messages.slice(100, 150), start: 100, end: 150});

  });

  // Edge cases:
  
});