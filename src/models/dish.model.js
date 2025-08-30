const { default: mongoose, mongo } = require("mongoose");

const dishSchema = new mongoose.Schema({
    restaurantId :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Restaturant"
    },
    name:{
       type:String,
       required:true
    },
    price:{
           type:Number,
           required:true
    },
    discount:{
        type:Number,
        default:0,
    },
    photoUrl:{
        type:String,
        required:true
    }
},{timestamps:true});

const DishModel = mongoose.model("Dish",dishSchema);
module.exports = DishModel;