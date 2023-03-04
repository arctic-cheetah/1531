// Test cases

import {authRegisterV1} from "./auth";
import {userProfileV1} from "./users";
import {clearV1} from "./other";

const ERROR = {error : "error"};

beforeEach(() => {
    clearV1();
});

// Testing for userProfileV1
// Main case: If it works correctly
// Edge cases:
// Error case: 

describe('userProfileV1', () => {
    // Error cases:

    test('non existing authuserId and non existing uId in empty dataStore', () => {
        let uId = 10;
        let autherUserId = 8;
        expect(userProfileV1(uId, autherUserId)).toStrictEqual(ERROR);
    });
/*
    test('non existing authUserId and non existing uId in non-empty dataStore', () => {
        let user1 = {email : "Alison@hello.com", password : "ianfeDAWD24", nameFirst: "Alison", nameLast: "Patman"};
        let user1Auth = authRegisterV1(user1.email, user1.password, user1.nameFirst, user1.nameLast);
        let authUserId = user1Auth - 100;
        expect(userProfileV1(authUserId, authUserId)).toStrictEqual(ERROR);
    });

    // Edge cases:
    test('uId and autherUserId are different', () => {
        let user1 = {email : "Alison@hello.com", password : "ianfeDAWD24", nameFirst: "Alison", nameLast: "Patman"};
        let user1Auth = authRegisterV1(user1.email, user1.password, user1.nameFirst, user1.nameLast);
        let authUserId = user1Auth - 100;
        let uId = user1Auth - 20;
        expect(userProfileV1(authUserId, uId)).toStrictEqual(ERROR);
    });

    // Main cases:
    test('correct output', () => {
        let user1 = {email : "Alison@hello.com", password : "ianfeDAWD24", nameFirst: "Alison", nameLast: "Patman"};
        let user1Auth = authRegisterV1(user1.email, user1.password, user1.nameFirst, user1.nameLast);
        expect(userProfileV1(user1Auth, user1Auth)).toStrictEqual({
            user : {
                uId : user1Auth,
                email : user1.email,
                nameFirst : user1.nameFirst,
                nameLast : user1.nameLast,
                handleStr : user1.handleStr,
            }
        });
    });
    */
});