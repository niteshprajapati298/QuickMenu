const mongoose = require("mongoose");

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

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);
module.exports = RestaurantModel;
