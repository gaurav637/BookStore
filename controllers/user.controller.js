const {userService} = require('../services');
const ApiError = require('../utils/ApiError');

module.exports.createUser = async(req,res) =>{
    console.log("request body -> ",req.body);
    if (!req.body.password) {
        res.status(400).json({Message: "Password is not provided!"})
        throw new ApiError(400, "Password is required");
    }
    const user = await userService.createNewUser(req.body);
    res.status(200).json({
        Message: "user created",
        Data: user
    })
}// password store hash formate 

module.exports.signin = async(req,res) => {
    const {email,password} = req.body;
    if(!email){
        res.status(400).json({Message: "user not provide email!"})
    }
    if(!email){
        res.status(400).json({Message: "user not provide password!"})
    }


}