
// Testing for authRegisterV1
// Main case:
// Edge case:
// Error case:

import {
  authRegisterV1,
  authLoginV1
} from "./src/auth.js"

const ERROR = {error : "error"};



describe('authRegisterV1', () => {
  //Error cases
  test('Invalid email', () => {
    expect(authRegister({email : "hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"})).toStrictEqual(ERROR);
  });
  test('Address already used', () => {
    expect(authRegister({email : "Alison@hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"})).toStrictEqual(ERROR);
  });
  test('Length of password is less than 6', () => {
    expect(authRegister({email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: "Patman"})).toStrictEqual(ERROR);
  });
  test('firstName is not between 1 to 50 inclusive', () => {
    expect(authRegister({email : "Alison@hello.com", password: "123456", nameFirst: "E", nameLast: "Patman"})).toStrictEqual(ERROR);
  });
  test('lastName is not between 1 to 50 inclusive', () => {
    expect(authRegister({email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: "B"})).toStrictEqual(ERROR);
  });
  

})  