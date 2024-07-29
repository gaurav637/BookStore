const {userService} = require('../services/user.services');

module.exports.createUser = async(req,res) =>{
    const user = await userService.createUser(req.body);
    res.status(200).json({
        Message: "user created",
        Data: user
    })
}

