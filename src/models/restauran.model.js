const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tables: [
        {
            tableNumber:{
                type:Number,
                unique:true
             },
            qrCode: String, // store QR as image url/base64
        }
    ],
}, { timestamps: true });

restaurantSchema.methods.getJWT = async function (params) {
    const token =  jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
}
restaurantSchema.statics.hashPassword = async function (password) {
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword;
}
restaurantSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}
const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);
module.exports = RestaurantModel;
