# ----------------------------------------------------------
##### auth.js Assumptions

###### 1) Auth.js currently assumes that the dataStore.js user contains only fields with: 
user: {
    uId,
    userName,
    nameFirst,
    nameLast,
    email,
}
###### 2) authRegisterV1 assumes edge cases currently work, but need to test using userProfileV1

# ----------------------------------------------------------
##### channels.js Assumptions

###### 3) Assume channelName is not unique

###### 4) Assume channelId is a unique id. Our implementation increases starts from 0 and increases by 1 with every new channel id

###### 5) Assume channelId has a one-one relation with users.enrolledChannelsId. ie; you cannot be enrolled twice in the same channel


# ----------------------------------------------------------
##### channel.js Assumptions


# ----------------------------------------------------------
##### user.js Assumptions


# ----------------------------------------------------------
##### other.js Assumptions