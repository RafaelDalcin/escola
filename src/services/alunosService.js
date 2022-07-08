const db = require('../config/db');

const getAllAlunos = async () => {
    let sql = `
    select * from alunos
    `;
    let pessoas = await db.query(sql);
    return pessoas.rows;
}

const getAlunoById = async (params) => {
    let sql = `select * from alunos where id = $1`;
    let pessoas = await db.query(sql, [params.id]);
    return pessoas.rows;
  }
  
  const persistirAlunos = async (params) => {
    if (!params.id) {
      let sql = `insert into alunos
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
    const sql = `update alunos set ${fields} where id = ${params.id}`;
  
    const resposta = await db.query(sql);
    const msg = resposta.rowCount === 0
      ? `Não foi encontrado nenhuma pessoa com o id ${params.id}`
      : `Registro da pessoa com ID ${params.id} alterado com sucesso!`;
  
    return { type: 'info', msg }
  }

  const excluirAluno = async (params) => {
    let sql = 'delete from pessoas where id = $1;';
    let pessoas = await db.query(sql, [params.id]);
    return pessoas.rowCount == 1;
  }

module.exports.excluirAluno = excluirAluno;
module.exports.persistirAlunos = persistirAlunos;
module.exports.getAllAlunos = getAllAlunos;
module.exports.getAlunoById = getAlunoById;