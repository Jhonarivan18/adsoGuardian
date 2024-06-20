const Registro = require('../models/registro');

module.exports = {

    async getAll(req, res){
        Registro.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al listar el registro del dispositivo',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    async create(req, res) {

        const registro = req.body;

        Registro.create(registro, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error "Duplicación De Datos: Ya se registro con estos campos. Verifique e intente nuevamente"',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro del dispositivo se realizo correctamente',
                data: `${id}`
            });

        });

    },

    async delete(req, res){
        const id = req.params.id;
        Registro.delete(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la eliminacion del registro',
                    error: err
                })
            }

            return res.status(201).json({
                success: true,
                message: 'El registro del dispositivo se elimino correctamente',
                data: `${id}`
            });
        })
    },


async RegistroUpdate(req, res) {

    const registro = req.body;
    Registro.update (registro,(err, data) =>{
        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Verifique los datos nuevamente, el registro esta duplicado',
                error: err 
        });
    }

return res.status(201).json({
            success: true,
            message: 'El Registro Dispositivo se actualizo correctamente',
            data: registro
        });

 })
}
}
