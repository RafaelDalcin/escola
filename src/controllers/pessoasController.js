
const service = require('../services/pessoasService');

const getAllPessoas = async (req, res) => {
    try {
        const resposta = await service.getAllPessoas();
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getPessoaById = async (req, res) => {
    try {
        const resposta = await service.getPessoaById(req.params);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistirPessoas = async (req, res) => {
    console.log('oi');
    try {
        const resposta = await service.persistirPessoas(req.body);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const excluirPessoa = async (req, res) => {
    try {
        let deletado = await service.excluirPessoa(req.params);
        let resposta = deletado 
            ? `Pessoa com ID ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ resposta });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllPessoas = getAllPessoas;
module.exports.getPessoaById = getPessoaById;
module.exports.persistirPessoas = persistirPessoas;
module.exports.excluirPessoa = excluirPessoa;