const express = require('express');
const cors = require('cors');
const { dbConnecion } = require('../database/config');

class AppServer {

    
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.productPath = '/products';
        this.servicePath = '/services';
        this.orderPath = '/orders';


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
        const corsOptions = {
            origin: ['http://localhost:3000', 'https://willowy-baklava-e089e5.netlify.app'], 
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
            optionsSuccessStatus: 200
        };
        this.app.use(cors(corsOptions));
        this.app.use(express.json()); 
        this.app.use(express.static('public')); 
    }

    routes() {
        this.app.use(this.productPath, require('../routes/products'));
        this.app.use(this.servicePath, require('../routes/service'));
        this.app.use(this.orderPath, require('../routes/orders'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log("Servidor corriendo en el puerto:", this.PORT);
        });
    }
}

module.exports = AppServer;