const controller = require('../controllers/mediaAlunosController');

module.exports = (app) => {
    app.post('/media-alunos', controller.getMedia)
    app.post('/media-todos-alunos', controller.getAllMedia)
};