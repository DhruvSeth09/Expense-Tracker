const jwt=require("jsonwebtoken");
const User = require("../models/User")

exports.protect = async (req,res,next) => {
    let token=req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({msg:"Please login to access this route"})
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id).select("-password");
        req.user=user;
        next();
    } catch (error) {
        res.status(401).json({msg:"Invalid token"})
    }
};