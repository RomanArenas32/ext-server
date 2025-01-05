const { Schema, model } = require('mongoose');


const serviceSchema = Schema({

    img: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
    },
    description: {
        type: String,
        required: [true, "Coloque una descripcion"],
    },
    category: {
        type: String,
        required: [true, "Coloque una catgoria"],
    },
    seller: {
        type: String,
        required: [true, "Coloque un vendedor"],
    },
});


module.exports = model("Service", serviceSchema);