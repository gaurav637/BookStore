const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.verifyToken = async (req,res,next) => {
    const token = req.header('Authorization');
    if(!token){
        res.status(401).json({
            Message: "Unauthorized!",
            Status: "Fail"
        });
    }
    try{
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user; 
        next();
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}