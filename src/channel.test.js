import { authLoginV1, authRegisterV1 } from './auth';
import { channelsCreateV1, channelsListallV1, channelsListV1 } from './channels';
import { clearV1 } from './other';
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 } from './channel';

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
  // Main cases:

  // Error cases:
  test('Testing channelJoinV1: the authorised user is already a member of the channel', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    const Join = channelJoinV1(user0.authUserId, channel.channelId);
    const answer = channelJoinV1(user0.authUserId, channel.channelId);
    expect(answer).toMatchObject({ ERROR });
  });

  test('Testing channelJoinV1: channelId does not refer to a valid channel', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    const answer = channelJoinV1(user0.authUserId, 5);
    expect(answer).toMatchObject({ ERROR });
  });

  test('Testing channelJoinV1: channelId refers to a channel that is private', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', false);
    const answer = channelJoinV1(user0.authUserId, channel.channelId);
    expect(answer).toMatchObject({ ERROR });
  });

  test('Testing channelJoinV1: authUserId is invalid', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    const answer = channelJoinV1(5, channel.channelId);
    expect(answer).toMatchObject({ ERROR });
  });
});

describe('channelInviteV1', () => {
  //Error cases:
  test('Invalid authUserId', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelInviteV1(-1E5, channel.channelId, user.authUserId)).toMatchObject(ERROR);
  });

  test('channelId does not refer to a valid channel', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelInviteV1(user.authUserId, -0xFFFFFFFF, user.authUserId)).toMatchObject(ERROR);
  });

  test('Invalid uId', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelInviteV1(user.authUserId, channel.channelId, -1E5)).toMatchObject(ERROR);
  });

  test('uId is already member of the channel', () => {
    const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
    expect(channelInviteV1(user.authUserId, channel.channelId, user.authUserId)).toMatchObject(ERROR);
  });

  test('authUserId is not member of channel', () => {
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('Bob@unsw.edu.au', 'fmkagAFN23', 'Bob', 'Doe');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    expect(channelInviteV1(user2.authUserId, channel.channelId, user1.authUserId)).toMatchObject(ERROR);
    expect(channelInviteV1(user2.authUserId, channel.channelId, user2.authUserId)).toMatchObject(ERROR);
  });

  // Edge cases:

  // Main cases:
  test('user1 invites user2 to their channel', () => {
    const user1 = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
    const user2 = authRegisterV1('Bob@unsw.edu.au', 'fmkagAFN23', 'Bob', 'Doe');
    const channel = channelsCreateV1(user1.authUserId, 'channel_1', true);
    expect(channelInviteV1(user1.authUserId, channel.channelId, user2.authUserId)).toMatchObject({});
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

  // Main cases:

  // Edge cases:
});
