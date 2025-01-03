const Product = require('../models/products');

const createProduct = async (req, res) => {
    try {
        const { img, name, price, description, unities, color, category } = req.body;

        if (!name || !price || !description || !unities || !color || !category) {
            return res.status(400).json({
                ok: false,
                message: 'All inputs required.',
            });
        }

        const newProduct = new Product({ img, name, price, description, unities, color, category });
        await newProduct.save();

        return res.status(201).json({
            ok: true,
            message: 'Producto created.',
            product: newProduct,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error.',
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({
            ok: true,
            products,
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener los productos. Por favor, intente nuevamente.',
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;  
        const product = await Product.findById(id);
        console.log("product", product)
        if (!product) {
            return res.status(404).json({
                ok: false,
                message: 'Product not found.',
            });
        }

        return res.json({
            ok: true,
            product,
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
    createProduct,
    getProducts,
    getProductById,
};
