import isEmail from 'validator/lib/isEmail.js';
import {getData} from "./dataStore.js";

const ERROR = {error : "error"};
const MAX_INT32 = 0xFFFFFFFFFFFFFFFF;
const MIN_INT = 1;

//Return a new UUID
const getUUIDv1 = () => {
  return Math.floor(Math.random(Date.now()) * (MAX_INT32 - MIN_INT)) + MIN_INT;
};

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
export function authRegisterV1 (email, password, nameFirst, nameLast) {
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
  if (50 < nameFirst.length || nameFirst.length < 1) {
    return ERROR;
  }
  //Last name is within [1,60] characters?
  if (50 < nameLast.length || nameLast.length < 1) {
    return ERROR;
  }
  
  //Cannot test below because userDetailsV1 not completed


  //Generate user name from first and last name.
  //Convert to lowercase
  //Remove non alphanumeric chars
  let nameFirstFiltered = nameFirst.toLowerCase().replace(/\W/g, "");
  let nameLastFiltered = nameLast.toLowerCase().replace(/\W/g, "");
  let userName = nameFirstFiltered + nameLastFiltered;

  //if userName is longer than 20 characters, cut off at 20.
  //Check if 20 character length name has been taken by user

  //Test if this is buggy!
  if (userName.length >= 20) {
    userName = userName.slice(0, 20);
    let nameFound = data.users.filter(e => e.userName.matchAll(userName));
    if (nameFound.length > 1) {
      //Add a final number to make the user name unique
      userName = userName.concat(nameFound.length);
    }
  }
  
  //Generate new user ID
  let uId = getUUIDv1();

  //Is the dataStore initially empty?
  //Add permision for global owner
  // if (Object.keys(data).length === 0) {
  //   uId = 1;
  // }


  //Create new account
  data.users.push({
    uId,
    userName,
    nameFirst,
    nameLast,
    email,
  });

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
export function authLoginV1 (email, password) {

  const data = getData();
  
  let userGet = data.users.filter(e => e.email === email);
  if (userGet.length === 0) {// This is incorrect, assumes one user only
   return ERROR;
  } 
  if (userGet[0].password !== password) {
    return ERROR;
  }
  else {
    return {authUserId: userGet[0].uId};
  } 
}

