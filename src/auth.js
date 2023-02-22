
//when the email and password is submitted.
//Return the object with user Id 
/**
 * @param {string} email
 * @param {string} name
 * @returns {{authUserId: number}}
 */ 
function AuthLoginV1 (email, password) {
    return {authUserId: 1}
}


//Create a new user
//when the email, password, first name and last name is submitted.
//then return an object with a userId
/**
 * @param {string} email
 * @param {string} password
 * @param {string} nameFirst
 * @param {string} nameLast
 * @returns {{authUserId: number}}
 */ 
function AuthRegisterV1 (email, password, nameFirst, nameLast) {
    return {authUserId: 1}
}

