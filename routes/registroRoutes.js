const registroController = require('../controllers/registroController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.get('/api/registro/getAll',passport.authenticate('jwt', {session: false}), registroController.getAll);
    app.post('/api/registro/create',passport.authenticate('jwt', {session: false}), registroController.create);
    app.delete('/api/registro/delete/:id',passport.authenticate('jwt', {session: false}), registroController.delete);
    app.put('/api/registro/update', passport.authenticate('jwt', {session: false}), registroController.RegistroUpdate);
}