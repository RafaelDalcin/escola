const pessoas = require('./pessoasRoute');
const alunos = require('./alunosRoute');
const professores = require('./professoresRoute')
const disciplinas = require ('./disciplinasRoute');
const notas = require('./notasRoute');
const mediaAlunos = require('./mediaAlunosRoute')

module.exports = (app) => {
    pessoas(app)
    alunos(app)
    professores(app)
    disciplinas(app)
    notas(app)
    mediaAlunos(app)
}