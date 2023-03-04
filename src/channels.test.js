import {
    channelsCreateV1, 
    channelsListV1, 
    channelsListAllV1
} from "./channels";
import {authRegisterV1} from "./auth";
import {clearV1} from "./other";

//Remember to test for three types of cases!
//Main case
//Error case
//Edge case


const ERROR = {error : "error"};


//Add your code that you need to run for before each test here
beforeEach(() => {
  clearV1();
})

// Testing for authRegisterV1
// Main case: If it works
// Edge case: (Same name, but different email)
// Error case: Below

describe('channelsCreateV1', () => {

  //Error cases:

  //Edge case:

  //Main case:

});  

describe('channelsListV1', () => {

  //Error cases:
  
  //Edge case:

  //Main case:
  
}); 

describe('channelsListAllV1', () => {

  //Error cases:
  
  //Edge case:

  //Main case:
  
}); 



