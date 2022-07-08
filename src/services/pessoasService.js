const db = require('../config/db');

const getAllPessoas = async () => {
    let sql = `
    select * from pessoas
    `;
    let pessoas = await db.query(sql);
    return pessoas.rows;
}

const getPessoaById = async (params) => {
    let sql = `select * from pessoas where id = $1`;
    let pessoas = await db.query(sql, [params.id]);
    return pessoas.rows;
  }
  
  const persistirPessoas = async (params) => {
    if (!params.id) {
      let sql = `insert into pessoas 
      (nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning id;`
      const { nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio} = params;
      const query = await db.query(sql, [nome, cpfcnpj, celular, email, endereco, numero, bairro, complemento, cep, municipio, uf, ibge_municipio]);
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
    const sql = `update pessoas set ${fields} where id = ${params.id}`;
    console.log(sql);
  
    const resposta = await db.query(sql);
    const msg = resposta.rowCount === 0
      ? `Não foi encontrado nenhuma pessoa com o id ${params.id}`
      : `Registro da pessoa com ID ${params.id} alterado com sucesso!`;
  
    return { type: 'info', msg }
  }

  const excluirPessoa = async (params) => {
    let sql = 'delete from pessoas where id = $1;';
    let pessoas = await db.query(sql, [params.id]);
    return pessoas.rowCount == 1;
  }

module.exports.excluirPessoa = excluirPessoa;
module.exports.persistirPessoas = persistirPessoas;
module.exports.getAllPessoas = getAllPessoas;
module.exports.getPessoaById = getPessoaById;