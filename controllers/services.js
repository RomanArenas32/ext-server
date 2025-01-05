const Service = require('../models/services');

const createService = async (req, res) => {
    console.log("second")
    try {
        const { img, name, price, description, category, seller } = req.body;

        if (!name || !price || !description || !category) {
            return res.status(400).json({
                ok: false,
                message: 'All inputs required.',
            });
        }

        const newService = new Service({ img, name, price, description, category, seller });
        await newService.save();

        return res.status(201).json({
            ok: true,
            message: 'Service created.',
            product: newService,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error.',
        });
    }
};


const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        return res.json({
            ok: true,
            services,
        });
    } catch (error) {
        console.error('Error al obtener los services:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener los servicios. Por favor, intente nuevamente.',
        });
    }
}

const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                ok: false,
                message: 'Service not found.',
            });
        }

        return res.json({
            ok: true,
            service,
        });
    } catch (error) {
        console.error('Error al obtener el service:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error.',
        });
    }
};

module.exports = {
    createService,
    getServices,
    getServiceById,
};
