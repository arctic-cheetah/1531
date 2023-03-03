//Test cases

import {
  authRegisterV1,
  authLoginV1
} from "./src/auth.js"

const ERROR = {error : "error"};


beforeEach(() => {
  clearV1();
})

// Testing for authRegisterV1
// Main case: If it works
// Edge case: (Same name, but different email)
// Error case: Below
describe('authRegisterV1', () => {

  //Error cases:
  test('Invalid email', () => {
    const check = {email : "hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"};
    expect(authRegisterV1(check)).toStrictEqual(ERROR);
  });
  
  test('Email address already used', () => {
    const check = {email : "Alison@hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"};
    expect(authRegisterV1(check)).toStrictEqual(ERROR);
  });
  
  test('Length of password is less than 6', () => {
    const check = {email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: "Patman"};
    expect(authRegisterV1(check)).toStrictEqual(ERROR);
  });

  test('firstName is not between 1 to 50 inclusive', () => {
    const check = {email : "Alison@hello.com", password: "123456", nameFirst: "E", nameLast: "Patman"};
    expect(authRegisterV1(check)).toStrictEqual(ERROR);
  
  });
  test('lastName is not between 1 to 50 inclusive', () => {
    const check = {email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: "B"};
    expect(authRegisterV1(check)).toStrictEqual(ERROR);
  });
  


})  


describe('authLoginV1', () => {
  //right cases:

  test ( 'Testing login', () => {

    const userRegister = authRegisterV1('joseph@unsw.edu.au', '123456', 'Joseph', 'Caspar');
    const userRegisterId = userRegister.userId;

    const userLogin = authLoginV1('joseph@unsw.edu.au', '123456');
    const userLoginId = userLogin.userId;

    expect(userLoginId).toBe(userRegisterId);

  });

  //Error cases:

  test ( 'Testing login - email that hasnt been used', () => {

    const userLogin = authLoginV1('jcasp@unsw.edu.au', 'gamer189');
    expect(userLogin).toStrictEqual({ERROR});

  });

  test ( 'Testing login - password not correct ' , () => {

    const userRegister = authRegisterV1('joseph@unsw.edu.au', '123456', 'Joseph', 'Caspar');
    const userRegisterPassword = userRegister.password;

    const userLogin = authLoginV1('joseph@unsw.edu.au', '123489');
    const userLoginPassword = userLogin.password;

    expect(userLogin).toStrictEqual({ERROR});

  });


  test( 'Testing Login - email entered does not belong to a user' , () => {

    const userRegister = authRegisterV1('joseph@unsw.edu.au', '123456', 'Joseph', 'Caspar');
    const check = AuthLoginV1( 'xiang.ren@unsw.edu.au' , '123456')
    
    expect(check).to =toStrictEqual({ERROR});
  })

})