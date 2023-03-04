###### 1) Auth.js currently assumes that the dataStore.js user contains only fields with: 
user: {
    uId,
    userName,
    nameFirst,
    nameLast,
    email,
}
###### 2) authRegisterV1 assumes edge cases currently work, but need to test using userProfileV1