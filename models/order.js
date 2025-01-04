
const { Schema, model } = require('mongoose');


const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product", 
        required: true, 
    },
    paymentMethod: {
        type: String,
        enum: ["Transfer", "cash"], 
        default: "Transfer",
        required: false,
    },
    code: {
        type: String,
        unique: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["canceled", "pending", "confirm"], 
        default: "pending", 
    },
});

module.exports = model("Order", orderSchema);