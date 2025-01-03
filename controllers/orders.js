const Order = require('../models/order');
const Product = require('../models/products'); 

const generateOrder = async (req, res) => {
    console.log("first")
    try {
        const { productId, paymentMethod, code, status } = req.body;
        if (!productId || !code) {
            return res.status(400).json({
                ok: false,
                message: 'Product ID and code are required.',
            });
        }

        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({
                ok: false,
                message: 'Product not found.',
            });
        }

        const newOrder = new Order({
            product: productId,
            paymentMethod: paymentMethod || "Transfer", 
            code,
            status: status || "pending",
        });

        await newOrder.save();

        return res.status(201).json({
            ok: true,
            message: 'Order created successfully.',
            order: newOrder,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            ok: false,
            message: 'An error occurred while creating the order.',
        });
    }
};
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.json({
            ok: true,
            orders,
        });
    } catch (error) {
        console.error('Error get orders:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error.',
        });
    }
}

module.exports = {
    generateOrder,
    getOrders,
};
