const express = require('express');
const cors = require('cors');
const { dbConnecion } = require('../database/config');

class AppServer {

    
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.usuariosPath = '/products';

        // db connection
        this.dbConnecion();

        // middlewares
        this.middlewares();
        this.routes();
    }

    async dbConnecion() {
        await dbConnecion();
    }

    middlewares() {
        this.app.use(express.json()); // Formatea todo lo que viene en formato json
        this.app.use(cors()); // Soluciona errores de los cors
        this.app.use(express.static('public')); // Renderiza el html de la carpeta public
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/products'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log("Servidor corriendo en el puerto:", this.PORT);
        });
    }
}

module.exports = AppServer;