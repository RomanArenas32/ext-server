const express = require('express');
const cors = require('cors');
const { dbConnecion } = require('../database/config');

class AppServer {

    
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.productPath = '/products';
        this.servicePath = '/services';

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
        this.app.use(this.productPath, require('../routes/products'));
        this.app.use(this.servicePath, require('../routes/service'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log("Servidor corriendo en el puerto:", this.PORT);
        });
    }
}

module.exports = AppServer;