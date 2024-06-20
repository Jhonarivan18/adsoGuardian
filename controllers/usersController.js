const User = require('../models/user');
const Rol = require('../models/rol')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {

    login(req, res){

        const email = req.body.email;
        const password = req.body.password; 

        User.findByEmail(email, async (err, myUser) => {

            console.log('Error', err);
            console.log('USUARIO', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ //EL CLIENTE NO TIENE AUTORIZACION PARA REALIZAR ESTA PETICION
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            const isPasswordsValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordsValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }
                return res.status(201).json({
                    success: true,
                    message: 'El Usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });
            }
            else {
                return res.status(401).json({ //EL CLIENTE NO TIENE AUTORIZACION PARA REALIZAR ESTA PETICION
                    success: false,
                    message: 'El password es incorrecto '
                });
            }

        });
    },



    register(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            user.id = `${data}`;
            const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
            user.session_token =`JWT ${token}`;
            
            Rol.create(user.id, 2, (err, data) =>{
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del rol de usuario',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });

            });

        });

    },

    async UserUpdate(req, res) {

        const user = req.body;

    User.update (user,(err, data) =>{
        if (err) {
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: err
            });
        }

    return res.status(201).json({
                success: true,
                message: 'El usuario se actualizo correctamente',
                data: user
            });

     })
    }
}