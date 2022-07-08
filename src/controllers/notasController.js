
const service = require('../services/notasService');

const getAllNotas = async (req, res) => {
    try {
        const resposta = await service.getAllNotas();
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getNotaById = async (req, res) => {
    try {
        const resposta = await service.getNotaById(req.params);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistirNotas = async (req, res) => {
    try {
        const resposta = await service.persistirNotas(req.body);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const excluirNota = async (req, res) => {
    try {
        let deletado = await service.excluirNota(req.params);
        let resposta = deletado 
            ? `Nota com ID ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ resposta });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllNotas = getAllNotas;
module.exports.getNotaById = getNotaById;
module.exports.persistirNotas = persistirNotas;
module.exports.excluirNota = excluirNota;