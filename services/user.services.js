const User = require('../models');

const {
    createUser
} = require('./my.queries');

const createNewUser = async (reqBody) => {
    const user = await createUser({...reqBody },User);
    return user;
}

module.exports = {
    createNewUser,
}