import {
    channelsCreateV1, 
    channelsListV1, 
    channelsListAllV1
} from "./channels";
import {authRegisterV1} from "./auth";
import {clearV1} from "./other";

//Remember to test for three types of cases!
//Main case
//Error case
//Edge case


const ERROR = {error : "error"};


//Add your code that you need to run for before each test here
beforeEach(() => {
  clearV1();
})

// Testing for authRegisterV1
// Main case: If it works
// Edge case: (Same name, but different email)
// Error case: Below

describe('channelsCreateV1', () => {
// Error cases:
  test('Length of name is less than 1', () => {
    const user = authRegisterV1('xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');

    expect(channelsCreateV1(user.authUserId, '', true)).toMatchObject(ERROR);
  });

  test('Length of name is greater than 20', () => {
    const user = authRegisterV1('xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');

    expect(channelsCreateV1(user.authUserId, 'asdfuasgdfasuygahjasgovuyasiufasjbdliuy', true)).toMatchObject(ERROR);
  });

  test('authUserId not found', () => {
    const user = authRegisterV1('xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');

    expect(channelsCreateV1(4, 'Xiang', true)).toStrictEqual(ERROR);
  });
  
  // Edge case:
  test('Same user creates a second channel', () => {
    const user = authRegisterV1('xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel1 = channelsCreateV1(user.authUserId, 'channel_1', true);
    const channel2 = channelsCreateV1(user.authUserId, 'channel_2', true);
    expect(channelsListV1(user.authUserId)).toMatchObject({ channels: [{ channelId: channel1.channelId, name: 'channel_1' }, { channelId: channel2.channelId, name: 'channel_2' }] });
  });

  // ASSUMPTION: CHANNELNAME IS NOT UNIQUE
  test('Same user creates a second channel with the same name', () => {
    const user = authRegisterV1('Xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel1 = channelsCreateV1(user.authUserId, 'channel_1', true);
    const channel2 = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelsListV1(user.authUserId)).toMatchObject({ channels: [{ channelId: channel1.channelId, name: 'channel_1' }, { channelId: channel2.channelId, name: 'channel_1' }] });
  });

  // Main case:
  test('Create the first channel', () => {
    const user = authRegisterV1('xiangren@unsw.edu.au', '123456', 'xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelsListV1(user.authUserId)).toMatchObject({ channels: [{ channelId: channel.channelId, name: 'channel_1' }] });
  });

  test('User 1 and 2 creates their own channel. User1 requests data. Only from their channel', () => {
    const user1 = authRegisterV1('Xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('z123456@unsw.edu.au', '123456', 'Juia', 'Ashe');
    const channel1 = channelsCreateV1(user1.authUserId, 'channel_1', true);
    const channel2 = channelsCreateV1(user2.authUserId, 'channel_2', true);
    expect(channelsListV1(user1.authUserId)).toMatchObject({ channels: [{ channelId: channel1.channelId, name: 'channel_1' }] });
  });

});  

describe('channelsListV1', () => {
// Error cases:
  test('authUserId is invalid', () => {
    const user = authRegisterV1('Xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelsListV1(3)).toMatchObject(ERROR);
  });
  // Edge case:
  test('List one specified channel', () => {
    const user = authRegisterV1('Xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelsListV1(user.authUserId)).toMatchObject({ channels: [{ channelId: channel.channelId, name: 'channel_1' }] });
  });

  test('List two specified channels', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel1 = channelsCreateV1(user.authUserId, 'channel_1', true);
    const channel2 = channelsCreateV1(user.authUserId, 'channel_2', true);
    expect(channelsListV1(user.authUserId)).toEqual({ channels: [{ channelId: channel1.channelId, name: 'channel_1' }, { channelId: channel2.channelId, name: 'channel_2' }] });
  });

  // Main case:
  test('List channels with the for User 2', () => {
    const user1 = authRegisterV1('Ashe@unsw.edu.au', '123456', 'Ashe', 'Ruby');
    const user2 = authRegisterV1('XiangRen@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel1 = channelsCreateV1(user1.authUserId, 'channel_1', true);
    const channel2 = channelsCreateV1(user2.authUserId, 'channel_2', true);
    expect(channelsListV1(user2.authUserId)).toEqual({ channels: [{ channelId: channel2.channelId, name: 'channel_2' }] });
  });
});


describe('channelsListAllV1', () => {
  // Error cases:
  test('Non-existent userID', () => {
    const user1 = authRegisterV1('Ashe@unsw.edu.au', '123456', 'Ashe', 'Ruby');
    const channel1 = channelsCreateV1(user1.authUserId, 'channel_1', true);
    expect(channelsListV1(-1E5)).toStrictEqual(ERROR);
  });

  // Edge case:

  // Main case:
  test('User 1 and 2 creates their channels. List all channels for user1', () => {
    const user1 = authRegisterV1('Ashe@unsw.edu.au', '123456', 'Ashe', 'Ruby');
    const user2 = authRegisterV1('XiangRen@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel1 = channelsCreateV1(user1.authUserId, 'channel_1', true);
    const channel2 = channelsCreateV1(user2.authUserId, 'channel_2', true);
    console.log(channelsListAllV1(user1.authUserId));
    expect(channelsListAllV1(user1.authUserId)).toEqual({ channels: [ { channelId: channel1.channelId, name: 'channel_1' } , { channelId: channel2.channelId, name: 'channel_2' }] });
  });


  test('List all channels. Only one in the database', () => {
    const user = authRegisterV1('Xiangren@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelsListAllV1(user.authUserId)).toMatchObject({ channels: [{ channelId: channel.channelId, name: 'channel_1' }] });
  });
  test('List all channels. Two in the database ', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel1 = channelsCreateV1(user.authUserId, 'channel_1', true);
    const channel2 = channelsCreateV1(user.authUserId, 'channel_2', true);
    expect(channelsListAllV1(user.authUserId)).toEqual({ channels: [{ channelId: channel1.channelId, name: 'channel_1' }, { channelId: channel2.channelId, name: 'channel_2' }] });
  });
  test('List all channels. Three in the database ', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel1 = channelsCreateV1(user.authUserId, 'channel_1', true);
    const channel2 = channelsCreateV1(user.authUserId, 'channel_2', true);
    const channel3 = channelsCreateV1(user.authUserId, 'channel_3', true);

    expect(channelsListAllV1(user.authUserId)).toEqual({ channels: [{ channelId: channel1.channelId, name: 'channel_1' }, { channelId: channel2.channelId, name: 'channel_2' }, { channelId: channel3.channelId, name: 'channel_3' }] });
  });


});


