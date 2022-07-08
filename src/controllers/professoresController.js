
const service = require('../services/professoresService');

const getAllProfessores = async (req, res) => {
    try {
        const resposta = await service.getAllProfessores();
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getProfessorById = async (req, res) => {
    try {
        const resposta = await service.getProfessoresById(req.params);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistirProfessores = async (req, res) => {
    try {
        const resposta = await service.persistirProfessores(req.body);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const excluirProfessores = async (req, res) => {
    try {
        let deletado = await service.excluirProfessores(req.params);
        let resposta = deletado 
            ? `Professor com ID ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ resposta });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllProfessores = getAllProfessores;
module.exports.getProfessorById = getProfessorById;
module.exports.persistirProfessores = persistirProfessores;
module.exports.excluirProfessores = excluirProfessores;