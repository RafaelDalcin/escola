const db = require('../config/db');

const getAllProfessores = async () => {
    let sql = `
    select * from professores
    `;
    let professores = await db.query(sql);
    return professores.rows;
}

const getProfessoresById = async (params) => {
    let sql = `select * from professores where id = $1`;
    let professores = await db.query(sql, [params.id]);
    return professores.rows;
  }
  
  const persistirProfessores = async (params) => {
    if (!params.id) {
      let sql = `insert into professores
      (matricula, id_pessoa)
      values ($1, $2) returning id;`
      const {matricula, id_pessoa} = params;
      const query = await db.query(sql, [matricula, id_pessoa]);
      return { type: 'info', msg: 'Registro incluído com sucesso!', data: { id: query.rows[0].id } };
    }

    let fields = [];

    Object.keys(params).forEach(e => {
      if (e !== 'id') {
        if (params[e] === '' || params[e] == null) {
          fields.push(`${e} = null`)
        } else {
          fields.push(`${e} = '${params[e]}'`)
        }
      }
    });
    fields = fields.join(', ');
    const sql = `update professores set ${fields} where id = ${params.id}`;
  
    const resposta = await db.query(sql);
    const msg = resposta.rowCount === 0
      ? `Não foi encontrado nenhum professor com o id ${params.id}`
      : `Registro do professor com ID ${params.id} alterado com sucesso!`;
  
    return { type: 'info', msg }
  }

  const excluirProfessores = async (params) => {
    let sql = 'delete from pessoas where id = $1;';
    let professores = await db.query(sql, [params.id]);
    return professores.rowCount == 1;
  }

module.exports.excluirProfessores = excluirProfessores;
module.exports.persistirProfessores = persistirProfessores;
module.exports.getAllProfessores = getAllProfessores;
module.exports.getProfessoresById = getProfessoresById;