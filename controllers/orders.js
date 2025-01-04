const Order = require('../models/order');
const Product = require('../models/products');
const generateOrder = async (req, res) => {
    console.log("Inicio de la solicitud"); // Log para trazar el inicio
    console.log(req.body);

    try {
        const { productId, paymentMethod, code, status, total, color, size, name, quantity } = req.body;
        if (!productId || !code || !total) {
            return res.status(400).json({
                ok: false,
                message: 'Product ID, code, and total are required.',
            });
        }
        const productExists = await Product.findById(productId);
        console.log("Producto encontrado:", productExists);

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
            total,
            name,
            color,
            size,
            quantity,
            status: status || "pending",
        });

        await newOrder.save();
        console.log("Orden creada:", newOrder);

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


const canceledOrder = async (req, res) => {
   const { id, status } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                ok: false,
                message: 'Order not found.',
            });
        }
        if(order.status === 'canceled') {
            return res.status(400).json({
                ok: false,
                message: 'Order has been canceled.',
            });
        }
        order.status = status;
        await order.save();
        return res.json({
            ok: true,
            message: 'Order canceled successfully.',
            order,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            ok: false,
            message: 'An error occurred while canceled the order.',
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
    canceledOrder,
};
