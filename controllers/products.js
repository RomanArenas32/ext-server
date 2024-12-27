const Product = require('../models/products');

const createProduct = async (req, res) => {
    console.log("second")
    try {
        const { img, nombre, precio, descripcion, unidades, color, categoria } = req.body;

        if (!nombre || !precio || !descripcion || !unidades || !color || !categoria) {
            return res.status(400).json({
                ok: false,
                message: 'Todos los campos son obligatorios.',
            });
        }

        const newProduct = new Product({ img, nombre, precio, descripcion, unidades, color, categoria });
        await newProduct.save();

        return res.status(201).json({
            ok: true,
            message: 'Producto creado con éxito.',
            product: newProduct,
        });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al crear el producto. Por favor, intente nuevamente.',
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
        const { id } = req.params;  // Obtener el id de los parámetros de la URL

        // Buscar el producto por id
        const product = await Product.findById(id);

        // Verificar si el producto existe
        if (!product) {
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado.',
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
            message: 'Error al obtener el producto. Por favor, intente nuevamente.',
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
};
