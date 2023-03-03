const ERROR = {error : "error"};
/**
  * <Register a new user, when the email, name, first name and last name is given and return the authUserId>
  * 
  * @param {string} email 
  * @param {string} password 
  * @param {string} nameFirst 
  * @param {string} nameLast 
  * @returns {authUserId: number}
*/



function AuthRegisterV1 (email, password, nameFirst, nameLast) {

}
  
//Alison
/**
  * <Sign in when the email and password are given, return the authUserId>
  * 
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
  if(!(email in data.users)){
   return ERROR;
  } 
  if (data.users[email].password !== password){
      return ERROR;
  } else{
      return {
          authUserId: data.users[email].userId
      }
  }
  
}
