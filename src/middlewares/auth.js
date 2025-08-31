const jwt = require('jsonwebtoken');
const RestaurantModel = require('../models/restauran.model');
module.exports.auth = async (req,res,next) => {
    try {
        const token = req.cookies.token || req.headers.Authorization.split("")['1'];
        if(!token) return res.status(401).json("Invalid or expiry Token");
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        const id = decoded._id;
        const isUserExists = await RestaurantModel.findById(id);
        if(!isUserExists) return res.status(401).json("UnAuthorized User");
        req.owner = decoded._id;
        next();
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}