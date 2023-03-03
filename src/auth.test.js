//Test cases

import {
  authRegisterV1,
  authLoginV1
} from "./auth"

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
    const user = {email : "hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"};
    expect(authRegisterV1(user)).toStrictEqual(ERROR);
  });
  
  test('Email address already used', () => {
    const user1 = {email : "Alison@hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"};
    const user2 = {email : "Alison@hello.com", password: "balsfahge24", nameFirst: "Rachel", nameLast: "Patman"};
    authRegisterV1(user1);
    expect(authRegisterV1(user2)).toStrictEqual(ERROR);
  });
  
  test('Length of password is less than 6', () => {
    const user = {email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: "Patman"};
    expect(authRegisterV1(user)).toStrictEqual(ERROR);
  });

  test('firstName is not between 1 to 50 inclusive', () => {
    const user = {email : "Alison@hello.com", password: "123456", nameFirst: "", nameLast: "Patman"};
    expect(authRegisterV1(user)).toStrictEqual(ERROR);
  
  });
  test('lastName is not between 1 to 50 inclusive', () => {
    const user = {email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: ""};
    expect(authRegisterV1(user)).toStrictEqual(ERROR);
  });
  
  //Edge case:
  test('Same name, different email', () => {
    const user1 = {email : "Alison@hello.com", password: "123456", nameFirst: "Alison", nameLast: "Patman"};
    const user2 = {email : "Alison2@hello.com", password: "balsfahge24", nameFirst: "Rachel", nameLast: "Patman"};
    authRegisterV1(user1);
    expect(authRegisterV1(user2)).toStrictEqual(ERROR);
  });

  //Main case:
  test('New user', () => {
    const user1 = {email : "Alison@hello.com", password: "ianfeDAWD24", nameFirst: "Alison", nameLast: "Patman"};
    const authUser1 = authRegisterV1(user1)
    expect(user1).toStrictEqual(expect.any({authUserId : expect.any(Number)}));
  });


})  


// describe('authLoginV1', () => {
//   //right cases:

//   test ( 'Testing login', () => {

//     const userRegister = authRegisterV1('joseph@unsw.edu.au', '123456', 'Joseph', 'Caspar');
//     const userRegisterId = userRegister.userId;

//     const userLogin = authLoginV1('joseph@unsw.edu.au', '123456');
//     const userLoginId = userLogin.userId;

//     expect(userLoginId).toBe(userRegisterId);

//   });

//   //Error cases:

//   test ( 'Testing login - email that hasnt been used', () => {

//     const userLogin = authLoginV1('jcasp@unsw.edu.au', 'gamer189');
//     expect(userLogin).toStrictEqual({ERROR});

//   });

//   test ( 'Testing login - password not correct ' , () => {

//     const userRegister = authRegisterV1('joseph@unsw.edu.au', '123456', 'Joseph', 'Caspar');
//     const userRegisterPassword = userRegister.password;

//     const userLogin = authLoginV1('joseph@unsw.edu.au', '123489');
//     const userLoginPassword = userLogin.password;

//     expect(userLogin).toStrictEqual({ERROR});

//   });


//   test( 'Testing Login - email entered does not belong to a user' , () => {

//     const userRegister = authRegisterV1('joseph@unsw.edu.au', '123456', 'Joseph', 'Caspar');
//     const user = authLoginV1( 'xiang.ren@unsw.edu.au' , '123456')
    
//     expect(user).to =toStrictEqual({ERROR});
//   })

// })