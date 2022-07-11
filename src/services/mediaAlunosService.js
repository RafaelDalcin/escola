const db = require('../config/db');

const getMedia = async (params) => {

   
    let sql = ` select	
    p.nome,
    n.nota,
    n.peso,
    a.matricula,
    n.id_disciplina

     from notas as n

    inner join alunos as a on (n.id_aluno = a.id)
    inner join pessoas as p on (a.id_pessoa = p.id)
    where a.matricula = $1 and  n.id_disciplina = $2 and n.datahora between $3 and $4;
    `
    let {matricula, id_disciplina, data_inicial, data_final} = params;
    let response = await db.query(sql, [matricula, id_disciplina, data_inicial, data_final]);
    
    let notas = response.rows; 
    let somaNotas = 0;
    let somaPesos = 0;
    let media = 0

    notas.forEach(nota => {
        somaNotas += parseFloat(nota.nota * nota.peso);
        somaPesos += parseFloat(nota.peso);
        
    })

    media = somaNotas / somaPesos;

    let status = ''

    if(media < 5){
        status = (`${notas[0].nome}, você está reprovado, sua média foi ${media}`);
    }
    else if(media >= 5 && media < 7){
        status = (`${notas[0].nome}, você esatá em recuperação, sua média foi ${media}`);
    }
    else if(media >= 7){
        status = (`${notas[0].nome}, você está aprovado, sua média foi ${media}`);
    }
    return {
        msg: status,
        notas: notas.map(nota => {
            return {nota: nota.nota, peso: nota.peso, }
        })
    }
  }

  const getAllMedia = async (params) => {

   
    let sql = ` select	
    a.id,
    p.nome,
    n.nota,
    n.peso,
    a.matricula,
    n.id_disciplina

     from notas as n

    inner join alunos as a on (n.id_aluno = a.id)
    inner join pessoas as p on (a.id_pessoa = p.id)
    where n.id_disciplina = $1 and n.datahora between $2 and $3
    order by a.id;
    `
    let {id_disciplina, data_inicial, data_final} = params;
    let response = await db.query(sql, [id_disciplina, data_inicial, data_final]);

    let somaNotas = 0;
    let somaPesos = 0;
    let media = 0;
    let status = ''
    let retorno = [];

    
    let notas = response.rows; 
    console.log(notas);
    retorno = [];
    for (let i = 0; i < notas.length; i++) {
        //somar as notas e pesos
        somaNotas += parseFloat(notas[i].nota * notas[i].peso);
        somaPesos += parseFloat(notas[i].peso);
        if(!notas[i+1] || (notas[i].id !== notas[i+1].id)){
            media = somaNotas / somaPesos
            somaNotas = 0;
            somaPesos = 0;

            status = media < 5 ? 'Aluno reprovado'
            : media >= 5 && media < 7? 'Aluno em recuperação'
            : 'Aluno aprovado'
            
            retorno.push({
                nome: notas[i].nome,
                media: media,
                status: status
            })
        }

         
        //se o id do atual é diferente do id do próximo
        //calcula a media e zera as somas
        //retorno.push({})
    }
    
    return retorno
    // console.log(retorno);
  }
   
  

  


module.exports.getAllMedia = getAllMedia
module.exports.getMedia = getMedia;