const controller = require('../controllers/professoresController');

module.exports = (app) => {
    app.get('/professores', controller.getAllProfessores)
    app.get('/professores/:id', controller.getProfessorById)
    app.post('/professores', controller.persistirProfessores)
    app.delete('/professores/:id', controller.excluirProfessores)
};