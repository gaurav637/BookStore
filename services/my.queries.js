const {
    User,
    Book,
    Review
} = require('../models');

const createUser = async (query,model) => {
    const data = await model.create(query);
    return data;
}

module.exports = {
    createUser,
}