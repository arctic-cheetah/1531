//Test cases

import {
  authRegisterV1,
  authLoginV1
} from "./src/auth.js"

const ERROR = {error : "error"};



// Testing for authRegisterV1
// Main case: If it works
// Edge case: (Same name, but different email)
// Error case: Below
describe('authRegisterV1', () => {
  //Error cases:
  test('Invalid email', () => {
    const check = {email : "hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"};
    expect(authRegister(check)).toStrictEqual(ERROR);
  });
  
  test('Address already used', () => {
    const check = {email : "Alison@hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"};
    expect(authRegister(check)).toStrictEqual(ERROR);
  });
  
  test('Length of password is less than 6', () => {
    const check = {email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: "Patman"};
    expect(authRegister(check)).toStrictEqual(ERROR);
  });

  test('firstName is not between 1 to 50 inclusive', () => {
    const check = {email : "Alison@hello.com", password: "123456", nameFirst: "E", nameLast: "Patman"};
    expect(authRegister(check)).toStrictEqual(ERROR);
  
  });
  test('lastName is not between 1 to 50 inclusive', () => {
    const check = {email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: "B"};
    expect(authRegister(check)).toStrictEqual(ERROR);
  });
  

})  