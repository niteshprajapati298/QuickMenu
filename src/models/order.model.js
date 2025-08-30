const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    tableNumber: {
        type: Number,
        required: true
    },
    items: [
        {
            dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
            quantity: Number,
        }
    ],
    status:{
         type: String,
         enum: ["pending", "preparing", "served"],
         default: "pending"
         },
},{timestamps:true});

const OrderModel = mongoose.model("Order",orderSchema);
module.exports = OrderModel;