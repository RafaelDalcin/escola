
const service = require('../services/alunosService');

const getAllAlunos = async (req, res) => {
    try {
        const resposta = await service.getAllAlunos();
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getAlunoById = async (req, res) => {
    try {
        const resposta = await service.getAlunoById(req.params);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistirAlunos = async (req, res) => {
    try {
        const resposta = await service.persistirAlunos(req.body);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const excluirAluno = async (req, res) => {
    try {
        let deletado = await service.excluirAluno(req.params);
        let resposta = deletado 
            ? `Pessoa com ID ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ resposta });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllAlunos = getAllAlunos;
module.exports.getAlunoById = getAlunoById;
module.exports.persistirAlunos = persistirAlunos;
module.exports.excluirAluno = excluirAluno;