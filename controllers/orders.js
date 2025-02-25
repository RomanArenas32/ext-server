const Order = require('../models/order');
const Product = require('../models/products');



const generateOrder = async (req, res) => {
    try {
        const { productId, paymentMethod, status, total, color, size, name, quantity, seller } = req.body;
        if (!productId || !total) {
            return res.status(400).json({
                ok: false,
                message: 'Product ID, and total are required.',
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
            code: new Date().getTime(),
            total,
            name,
            color,
            size,
            quantity,
            seller,
            code: new Date().getTime(),
            status: status || "pending",
        });
        console.log("Nueva orden:", newOrder);

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
   const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                ok: false,
                message: 'Order not found.',
            });
        }
        console.log("Order:", order);
        if(order.status === 'canceled') {
            return res.status(400).json({
                ok: false,
                message: 'Order has been canceled.',
            });
        }
        order.status = "canceled";
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


const confirmOrder = async (req, res) => {
    const { id } = req.params;
     try {
         const order = await Order.findById(id);
         if (!order) {
             return res.status(404).json({
                 ok: false,
                 message: 'Order not found.',
             });
         }
         console.log("Order:", order);
         if(order.status === 'confirm') {
             return res.status(400).json({
                 ok: false,
                 message: 'Order has been confirm.',
             });
         }
         order.status = "confirm";
         await order.save();
         return res.json({
             ok: true,
             message: 'Order confirm successfully.',
             order,
         });
     } catch (error) {
         console.error('Error:', error);
         return res.status(500).json({
             ok: false,
             message: 'An error occurred while confirm the order.',
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


const getOrderByCode = async (req, res) => {
    const { code } = req.params;
    try {
        const order = await Order.findOne({code});
        if(!order) {
            return res.status(404).json({
                ok: false,
                message: 'Order not found.',
            });
        }
        return res.json({
            ok: true,
            order,
        });
    } catch (error) {
        console.error('Error get order:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error.',
        });
    }
}


const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;  
        const order = await Order.findById(id);
        console.log("order", order)
        if (!order) {
            return res.status(404).json({
                ok: false,
                message: 'Order not found.',
            });
        }

        return res.json({
            ok: true,
            order,
        });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error.',
        });
    }
};

module.exports = {
    generateOrder,
    getOrders,
    canceledOrder,
    confirmOrder,
    getOrderByCode,
    getOrderById
};
