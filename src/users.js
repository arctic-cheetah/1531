import {getData} from "./dataStore.js";
import {authRegisterV1} from "./auth.js";

const ERROR = {error : "error"};

/**
 * Returns information about user ID, email, first name,
 * last name and handle when given a valid uId and authUserId
 * 
 * @param {number} authUserId
 * @param {number} uId
 * @returns {{user: {uId: number, email: string, 
 *  nameFirst: string, nameLast: string, handleStr: string}}}
 */

export function userProfileV1 (authUserId, uId) {
    let data = getData();

    // check uId refers to a valid user
    let uIdFound = data.users.filter(e => e.uId === uId);
    if (uIdFound === []) {
        return ERROR;
    }

    // check authUserId refers to a valid user 
    let authUserIdFound = data.users.filter(e => e.uId === authUserId);
    if (authUserIdFound === []) {
        return ERROR;
    }

    // check uId is the same as authUserId
    if (uId !== authUserId) {
        return ERROR;
    }

    // Return user info
    for (let y of data.users) {
        if(y.uId === uId && y.uId === authUserId) {
            let useruId = y.uId;
            let userEmail = y.email;
            let usernameFirst = y.nameFirst;
            let usernameLast = y.nameLast;
            let userhandleStr = y.userName;

            return { 
                user : {
                    uId : useruId,
                    email : userEmail,
                    nameFirst : usernameFirst,
                    nameLast : usernameLast,
                    handleStr : userhandleStr,
                },
            };
        }
    }
}