import { setData } from "./dataStore";

//Resets the internal data of the application to its initial state
//Returns no value
export function clearV1() {
  setData({users: [], channels: []});
  return {};
}