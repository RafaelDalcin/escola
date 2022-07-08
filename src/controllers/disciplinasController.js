
const service = require('../services/disciplinasService');

const getAllDisciplinas = async (req, res) => {
    try {
        const resposta = await service.getAllDisciplinas();
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getDisciplinaById = async (req, res) => {
    try {
        const resposta = await service.getDisciplinaById(req.params);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistirDisciplinas = async (req, res) => {
    try {
        const resposta = await service.persistirDisciplinas(req.body);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const excluirDisciplina = async (req, res) => {
    try {
        let deletado = await service.excluirDisciplina(req.params);
        let resposta = deletado 
            ? `Pessoa com ID ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ resposta });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllDisciplinas = getAllDisciplinas;
module.exports.getDisciplinaById = getDisciplinaById;
module.exports.persistirDisciplinas = persistirDisciplinas;
module.exports.excluirDisciplina = excluirDisciplina;