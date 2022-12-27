"use strict";
const alunos = [
  { id: 1, nome: "Maria", dataNascimento: "1984-11-01" },
  { id: 2, nome: "Joao", dataNascimento: "1980-01-16" },
  { id: 3, nome: "Jose", dataNascimento: "1998-06-06" },
];

const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Dynamodb local
const dynamodbOfflineOptions = {
  region: "localhost",
  endpoint: "http://localhost:8000"
}

const isOffline = () => process.env.IS_OFFLINE;

const dynamoDb = isOffline() 
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions) 
  : new AWS.DynamoDB.DocumentClient();
  
const params = {
  TableName: process.env.ALUNOS_TABLE,
};

//Listar Alunos com paginação
module.exports.listarAlunos = async (event) => {
  // DynamoDB
  // Limit = LIMIT, ExclusiveStartKey = OFFSET e LastEvaluatedKey = "Numero da Pagina"

  try {
    const queryString = {
      limit: 5,
      ...event.queryStringParameters
    }
    
    const { limit, next } = queryString
    
    let localParams = {
      ...params,
      Limit: limit
    }
    
    if (next) {
      localParams.ExclusiveStartKey = {
        aluno_id: next
      }
    }
    
    let data = await dynamoDb.scan(localParams).promise();
    
    let nextToken = data.LastEvaluatedKey != undefined
      ? data.LastEvaluatedKey.aluno_id
      : null;
    
    const result = {
      items: data.Items,
      next_token: nextToken
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};

// Listar Aluno e Consultar aluno pelo Id
module.exports.obterAluno = async (event) => {
  try {
    const { alunoId } = event.pathParameters;

    const data = await dynamoDb
      .get({
        ...params,
        Key: {
          aluno_id: alunoId,
        },
      })
      .promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Aluno não existe" }, null, 2),
      };
    }

    const aluno = data.Item;

    return {
      statusCode: 200,
      body: JSON.stringify(aluno, null, 2),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
// Cadastrar Aluno
module.exports.cadastrarAluno = async (event) => {
  try {
    const timestamp = new Date().getTime();

    let dados = JSON.parse(event.body);

    const { nome, data_nascimento, email, telefone } = dados;

    const aluno = {
      aluno_id: uuidv4(),
      nome,
      data_nascimento,
      email,
      telefone,
      status: true,
      criado_em: timestamp,
      atualizado_em: timestamp,
    };

    await dynamoDb
      .put({
        TableName: "ALUNOS",
        Item: aluno,
      })
      .promise();

    return {
      statusCode: 201,
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
// Atualizar dados do Aluno
module.exports.atualizarAluno = async (event) => {
  const { alunoId } = event.pathParameters

  try {
    const timestamp = new Date().getTime();

    let dados = JSON.parse(event.body);

    const { nome, data_nascimento, email, telefone } = dados;

    await dynamoDb
      .update({
        ...params,
        Key: {
          aluno_id: alunoId
        },
        UpdateExpression:
          'SET nome = :nome, data_nascimento = :dt, email = :email,' 
          + ' telefone = :telefone, atualizado_em = :atualizado_em',
        ConditionExpression: 'attribute_exists(aluno_id)',
        ExpressionAttributeValues: {
          ':nome': nome,
          ':dt': data_nascimento,
          ':email': email,
          ':telefone': telefone,
          ':atualizado_em': timestamp
        }
      })
      .promise()

    return {
      statusCode: 204,
    };
  } catch (err) {
    console.log("Error", err);

    let error = err.name ? err.name : "Exception";
    let message = err.message ? err.message : "Unknown error";
    let statusCode = err.statusCode ? err.statusCode : 500;

    if (error == 'ConditionalCheckFailedException') {
      error = 'Aluno não existe';
      message = `Recurso com o ID ${alunoId} não existe e não pode ser atualizado`;
      statusCode = 404;
    }

    return {
      statusCode,
      body: JSON.stringify({
        error,
        message
      }),
    };
  }
};
// Excluir Aluno
module.exports.excluirAluno = async event => {
  const { alunoId } = event.pathParameters

  try {
    await dynamoDb
      .delete({
        ...params,
        Key: {
          aluno_id: alunoId
        },
        ConditionExpression: 'attribute_exists(aluno_id)'
      })
      .promise()
 
    return {
      statusCode: 204
    }
  } catch (err) {
    console.log("Error", err);

    let error = err.name ? err.name : "Exception";
    let message = err.message ? err.message : "Unknown error";
    let statusCode = err.statusCode ? err.statusCode : 500;

    if (error == 'ConditionalCheckFailedException') {
      error = 'Aluno não existe';
      message = `Recurso com o ID ${alunoId} não existe e não pode ser excluído`;
      statusCode = 404;
    }

    return {
      statusCode,
      body: JSON.stringify({
        error,
        message
      }),
    };
  }
}
