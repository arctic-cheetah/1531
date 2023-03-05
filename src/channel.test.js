import { authLoginV1, authRegisterV1 } from './auth';
import { channelsCreateV1, channelsListallV1, channelsListV1 } from './channels';
import { clearV1 } from './other' ;
import { channelDetailsV1, channelJoinV1, channelInviteV1, channelMessagesV1 } from './channel';

//Remember to test for three types of cases!
//Main case
//Error case
//Edge case


const ERROR = {error : "error"};


//Add your code that you need to run for before each test here
beforeEach(() => {
  clearV1();
})

// Testing for channelJoinV1
// Main case: If it works
// Edge case: 
// Error case: Below
describe('channelJoinV1', () => {
    // Main cases:

    //Error cases:
    test('Testing channelJoinV1: the authorised user is already a member of the channel',() => {
        const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
        const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
        const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
        const Join = channelJoinV1(user0.authUserId, channel.channelId);
        const answer = channelJoinV1(user0.authUserId, channel.channelId);
        expect(answer).toMatchObject({ERROR});
    
    });

    test('Testing channelJoinV1: channelId does not refer to a valid channel',() => {
        const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
        const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
        const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
        const answer = channelJoinV1(user0.authUserId, 5);
        expect(answer).toMatchObject({ERROR});
    
    });

    test('Testing channelJoinV1: channelId refers to a channel that is private',() => {
        const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
        const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
        const channel = channelsCreateV1(user.authUserId, 'channel_1', false);
        const answer = channelJoinV1(user0.authUserId, channel.channelId);
        expect(answer).toMatchObject({ERROR});
    
    });
   
    test('Testing channelJoinV1: authUserId is invalid',() => {
        const user = authRegisterV1('Xiang@unsw.edu.au', '123456', 'Xiang', 'Ren');
        const user0 = authRegisterV1('z123456789@unsw.edu.au', '123456', 'Bill', 'White');
        const channel = channelsCreateV1(user.authUserId, 'channel_1', true);
        const answer = channelJoinV1(5, channel.channelId);
        expect(answer).toMatchObject({ERROR});
    
    });
  });