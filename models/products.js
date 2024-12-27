const { Schema, model } = require('mongoose');


const productSchema = Schema({

    img: {
        type: String,
    },
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    precio: {
        type: Number,
        required: [true, "El precio es obligatorio"],
    },
    descripcion: {
        type: String,
        required: [true, "Coloque una descripcion"],
    },
    unidades: {
        type: Number,
        required: [true, "Coloque una cantidad"],
    },
    color: {
        type: String,
        required: [true, "Coloque un color"],
    }
});


module.exports = model("Product", productSchema);