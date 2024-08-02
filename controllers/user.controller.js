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
}

module.exports.signin = async (req,res) => {
    const {email,password} = req.body;
    if(!email){
        res.status(400).json({Message: "user not provide email!"})
    }
    if(!password){
        res.status(400).json({Message: "user not provide password!"})
    }
    try{
        const data = await userService.signinUser(email,password);
        res.status(200).json({
            Message: "user is authenticated successfully",
            Token: data
        })
    }catch(err){
        res.status(401).json({Message: err.message});
    }
}

module.exports.logout = async (req, res) => {
    try {
        const bearerToken = req.header('Authorization');
        if (!bearerToken) {
            return res.status(401).json({ Message: 'Authorization token is missing' });
        }
        const tokenParts = bearerToken.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ Message: 'Invalid token format' });
        }
        const token = tokenParts[1];
        const message = await userService.logoutUser(token);
        res.clearCookie('token');
        res.status(200).json({ Message: message });
    } catch (err) {
        res.status(500).json({ Message: err.message });
    }
};

module.exports.getAllUser = async (req,res) => {
    try{
        const users = await userService.getUsers();
        res.status(200).json({
            Message: "All User",
            Data: users
        })
    }catch(err){
        res.status(500).json({Message: err.message});
    }
}
