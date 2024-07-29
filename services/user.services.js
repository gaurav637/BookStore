const {User} = require('../models');

const {
    createUser
} = require('./my.queries');

const createNewUser = async (reqBody) => {
    const user = new User(reqBody);
    return user.save();
};

module.exports = {
    createNewUser,
}