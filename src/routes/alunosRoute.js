const controller = require('../controllers/alunosController');

module.exports = (app) => {
    app.get('/alunos', controller.getAllAlunos)
    app.get('/alunos/:id', controller.getAlunoById)
    app.post('/alunos', controller.persistirAlunos)
    app.delete('/alunos/:id', controller.excluirAluno)
};