const service = require('../services/mediaAlunosService');

const getMedia = async (req, res) => {
    try {
        const resposta = await service.getMedia(req.body);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getAllMedia = async (req, res) => {
    try {
        const resposta = await service.getAllMedia(req.body);
        res.status(200).send(resposta);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllMedia = getAllMedia
module.exports.getMedia = getMedia;

