const {User} = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createNewUser = async (reqBody) => {
    const user = new User(reqBody);
    return user.save();
};

const signinUser = async (email, password) => {
    // Perform aggregation to fetch user details
    const result = await User.aggregate([
      { $match: { email: email } }
    ]);
    // Check if user exists
    if (result.length === 0) {
      throw new ApiError(401, "Failed to authenticate!");
    }
    const user = result[0];

    if (!password || !user.password) {
      throw new ApiError(401, "Password or hashed password is missing!");
    }

    const passwordMatcher = await bcrypt.compare(password, user.password);
    if (!passwordMatcher) {
      throw new ApiError(401, "Failed to authenticate! Invalid password.");
    }
  
    // Generate JWT token
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ userId: user._id }, key, { expiresIn: '7d' });
  
    return token;
  };
  
const logoutUser = async (token) => {
    if (!token) {
        throw new ApiError(404, "User is not logged in");
    }
    try {
        console.log("before verification 37");
        const checkToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log("after verification 38!");
        if (!checkToken) {
            throw new ApiError(404, "User is not logged in!");
        }
        const message = "User is logged out";
        return message;
    } catch (err) {
        throw new ApiError(401, "Invalid token");
    }
};

const getUsers = async () => {
   // const users = await  User.find();
   const users = await User.aggregate([
       {$match: {}}
   ]);
   return users;
}

module.exports = {
    createNewUser,
    signinUser,
    logoutUser,
    getUsers,
}