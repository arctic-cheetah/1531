//Alison
/**
  * <Register a new user, when the email, name, first name and last name is given and return the authUserId>
  * 
  * @param {string} email 
  * @param {string} password 
  * @param {string} nameFirst 
  * @param {string} nameLast 
  * @returns {authUserId: number}
*/
function authRegisterV1 (email, password, nameFirst, nameLast) {
    return {
      authUserId: 1 
    }   
}
  
//Alison
/**
  * <Sign in when the email and password are given, return the authUserId>
  * 
  * @param {string} email 
  * @param {string} password 
  * @returns {authUserId: number}
*/

function authLoginV1 (email, password) {
    return { 
      authUserId: 1 
    }       
}
  