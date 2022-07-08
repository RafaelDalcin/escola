const db = require('../config/db');

const getAllNotas = async () => {
    let sql = `
    select * from notas
    `;
    let notas = await db.query(sql);
    return notas.rows;
}

const getNotaById = async (params) => {
    let sql = `select * from notas where id = $1`;
    let notas = await db.query(sql, [params.id]);
    return notas.rows;
  }
  
  const persistirNotas = async (params) => {
    if (!params.id) {
      let sql = `insert into notas
      (nota, peso, id_disciplina, id_aluno, observacao)
      values ($1, $2, $3, $4, $5) returning id;`
      const {nota, peso, id_disciplina, id_aluno, observacao} = params;
      const query = await db.query(sql, [nota, peso, id_disciplina, id_aluno, observacao]);
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
    const sql = `update notas set ${fields} where id = ${params.id}`;
  
    const resposta = await db.query(sql);
    const msg = resposta.rowCount === 0
      ? `Não foi encontrado nenhuma nota com o id ${params.id}`
      : `Registro da nota com ID ${params.id} alterado com sucesso!`;
  
    return { type: 'info', msg }
  }

  const excluirNota = async (params) => {
    let sql = 'delete from pessoas where id = $1;';
    let notas = await db.query(sql, [params.id]);
    return notas.rowCount == 1;
  }

module.exports.excluirNota = excluirNota;
module.exports.persistirNotas = persistirNotas;
module.exports.getAllNotas = getAllNotas;
module.exports.getNotaById = getNotaById;