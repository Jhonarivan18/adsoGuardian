const usersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.post('/api/users/create', usersController.register);
    app.post('/api/users/login', usersController.login);
    app.put('/api/users/update', passport.authenticate('jwt', {session: false}), usersController.UserUpdate);


}