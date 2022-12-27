# Curso Serverless Architecture - Gestão de Alunos

Comandos 
 
Instalar dependências
npm install

Intalar serverless
npm install -g serverless
 
Conectar a AWS
 - É necessário vincular a sua conta com a aws
serverless --console

Realizar o deploy na AWS
sls deploy

Verificar o deploy
CloudFormation - Stack

Verificar EndPoint na AWS
API Gateway

Testes Insominia
Local:
npm install serverless-offline --save-dev

comando: sls offline 
para buscar os endpoits e rodar local local:

   GET    | http://localhost:3000/dev/alunos                                        
   POST   | http://localhost:3000/2015-03-31/functions/listarAlunos/invocations     
   GET    | http://localhost:3000/dev/alunos/{alunoId}                              
   POST   | http://localhost:3000/2015-03-31/functions/obterAluno/invocations       
   POST   | http://localhost:3000/dev/alunos                                        
   POST   | http://localhost:3000/2015-03-31/functions/cadastrarAluno/invocations   
   PUT    | http://localhost:3000/dev/alunos/{alunoId}                              
   POST   | http://localhost:3000/2015-03-31/functions/atualizarAluno/invocations   
   DELETE | http://localhost:3000/dev/alunos/{alunoId}                              
   POST   | http://localhost:3000/2015-03-31/functions/excluirAluno/invocations


comando: sls info 
para buscar os edpoints em desenv

    GET    | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos
    GET    | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos/{alunoId}
    POST   | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos
    PUT    | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos/{alunoId}
    DELETE | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos/{alunoId}


Comando para rodar Local
sls offline

Instalção plugins do Dynamodb 
npm i serverless-dynamodb-local --save-dev && sls dynamodb install
npm i aws-sdk


Tabelas - DynamoDB
Nome da Tabela: alunos


Popular a tabela
aws dynamodb batch-write-item --request-items file://alunos.json

Biblioteca para geração de Ids
npm i uuid
