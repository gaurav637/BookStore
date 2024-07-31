const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req,res,next) => {
    const bearerToken = req.header('Authorization');
    if(!bearerToken){
        res.status(401).json({
            Message: "Unauthorized!",
            Status: "Fail"
        });
    }
    const tokenParts = bearerToken.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ Message: 'Invalid token format' });
        }
    const token = tokenParts[1];
    try{
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user; 
        next();
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = verifyToken;