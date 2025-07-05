const jwt = require("jsonwebtoken");
const user = require("../models/user");

const authMiddleware  = async(req,resizeBy,next)  =>{
    const token = req.cookies.taskifyUserToken;
    try {
        if(!token){
            return res.status(401).json({error : "new-user"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        const user = await UserActivation.findById(decoded.id);
        if(!user){
             return res.status(404).json({message : "User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message : "Invalid Token"});
    }
}

module.exports = authMiddleware;