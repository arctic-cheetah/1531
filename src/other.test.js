import { ClearV1 } from "./other";
import { getData } from "./dataStore";

const DEFAULT_DATA = {users: [], channels: []}


beforeEach(() => {
  clearV1();
});

describe("ClearV1" ,() => {

  //Error cases:
  test('Check that data base is empty', () => {
    const user = {email : "hello.com", password: "gihsbeFFKLWN23", nameFirst: "Alison", nameLast: "Patman"};
    authRegisterV1(user)
    ClearV1();
    expect(getData()).toStrictEqual(DEFAULT_DATA);
  });

})

