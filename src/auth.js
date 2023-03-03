import {isEmail} from 'validator/lib/isEmail';
import {getData} from "./dataStore.js";
import { v4 as uuidv4 } from 'uuid';

const ERROR = {error : "error"};

/**
  * Register a new user, when the email, name, first name and last name is given and 
  * return the authUserId
  * 
  * @param {string} email 
  * @param {string} password 
  * @param {string} nameFirst 
  * @param {string} nameLast 
  * @returns {authUserId: number}
*/

function AuthRegisterV1 (email, password, nameFirst, nameLast) {
  const data = getData();
  //Check email address
  if (isEmail(email) === false) {
    return ERROR;
  }
  //Email exists?
  let emailFound = data.users.filter(e => e.email === email);
  if (emailFound.length > 0) {
    return ERROR;
  }
  //Password length is less than 6
  if (password.length < 6) {
    return ERROR;
  }
  //First name is within [1,60] characters?
  if (1 < nameFirst.length || nameFirst.length > 50) {
    return ERROR;
  }
  //Last name is within [1,60] characters?
  if (1 < nameLast.length || nameLast.length > 50) {
    return ERROR;
  }
  
  //Generate user name from first and last name.
  //Remove non alphanumeric chars
  let nameFirstFiltered = nameFirst.replace(/\W/g, "").toLower();
  let nameLastFiltered = nameLast.replace(/\W/g, "").toLower();
  let newUserName = nameFirstFiltered + nameLastFiltered;
  
  //if userName is longer than 20 characters, cut off at 20.
  newUserName = newUserName.slice(0, 20);
  //Check if name has been taken by user
  //This is buggy!
  let nameFound = data.users.filter(e => e.userName === newUserName);
  if (nameFound.length > 1) {
    // Add a final number to make the user name unique
    newUserName = newUserName.concat(nameFound.length);
  }

  //Generate new user ID
  let uId = uuidv4();

  //Is the dataStore initially empty?
  if (Object.keys(data).length === 0) {
    setData({users : [] , channels: []});
  }
  else{
    //Create new account
    data.users.push({
      uId,
      nameFirst,
      nameLast,
      email,
    });
  }

  return {authUserId: uId}

}
  
/**
  * Sign in when the email and password are given, 
  * return the authUserId
  * @param {string} email 
  * @param {string} password 
  * @returns {authUserId: number}
*/
/* 
authLoginV1: Once given a currently registered users email and password, 
the users: authUserId is returned. If the entered email does not belong 
to a user or the inputted password is incorrect {error: 'error'} will be returned.
*/
function AuthLoginV1 (email, password) {

  const data = getData();
  if (!(email in data.users)) {// This is incorrect, assumes one user only
   return ERROR;
  } 
  if (data.users[email].password !== password) {
    return ERROR;
  }
  else{
    return {
      authUserId: data.users[email].userId
    }
  } 
}

export { AuthLoginV1, AuthRegisterV1 }
