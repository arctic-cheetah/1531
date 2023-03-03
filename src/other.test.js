import { clearV1 } from "./other";
import { getData } from "./dataStore";
import {authRegisterV1, authLoginV1} from "./auth";


const DEFAULT_DATA = {users: [], channels: []}


beforeEach(() => {
  clearV1();
});

describe("clearV1" ,() => {

  //Error cases:
  test('Check that data base is empty', () => {
    const user = {email : "hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"};
    authRegisterV1(user.email, user.password, user.nameFirst, user.nameLast);
    clearV1();
    expect(getData()).toStrictEqual(DEFAULT_DATA);
  });

})

