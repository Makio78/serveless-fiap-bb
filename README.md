# Curso Serverless Architecture - Gestão de Alunos  🤖🍻🍻😄

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=GREEN&style=for-the-badge)

## 🎯 Objetivo

Api de gestão de alunos.


## ⚙️ Como abrir e rodar o projeto

1. Instalar dependências: 
   - npm install
2. Instalar serverless:
   - npm install -g serverless
3. Conectar a AWS e vincular a sua conta com a aws:
   - serverless --console 
4. Realizar o deploy na AWS:
   - sls deploy
5. Verificar o deploy:
   - CloudFormation - Stack
6. Verificar EndPoint na AWS:
   - API Gateway
7. Testes Insominia Local: 
   - npm install serverless-offline --save-dev
8. Comando para buscar os endpoits e rodar local: 
   - sls offline

     - GET    | http://localhost:3000/dev/alunos                                        
     - POST   | http://localhost:3000/2015-03-31/functions/listarAlunos/invocations     
     - GET    | http://localhost:3000/dev/alunos/{alunoId}                              
     - POST   | http://localhost:3000/2015-03-31/functions/obterAluno/invocations       
     - POST   | http://localhost:3000/dev/alunos                                        
     - POST   | http://localhost:3000/2015-03-31/functions/cadastrarAluno/invocations   
     - PUT    | http://localhost:3000/dev/alunos/{alunoId}                              
     - POST   | http://localhost:3000/2015-03-31/functions/atualizarAluno/invocations   
     - DELETE | http://localhost:3000/dev/alunos/{alunoId}                              
     - POST   | http://localhost:3000/2015-03-31/functions/excluirAluno/invocations


9. Comando para buscar os edpoints em desenv: 
   - sls info

      - GET    | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos
      - GET    | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos/{alunoId}
      - POST   | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos
      - PUT    | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos/{alunoId}
      - DELETE | https://9y7mdm2ymj.execute-api.us-east-1.amazonaws.com/dev/alunos/{alunoId}


10. Comando para rodar Local: 
    - sls offline
11. Instalção plugins do Dynamodb:
   - npm i serverless-dynamodb-local --save-dev && sls dynamodb install
   - npm i aws-sdk
12. Tabelas - DynamoDB 
   - Nome da Tabela: alunos
13. Popular a tabela:
   - aws dynamodb batch-write-item --request-items file://alunos.json
14. Biblioteca para geração de Ids 
   - npm i uuid


## 👨🏽‍💻👩🏽‍💻 Desenvolvedores 

| [<img src="https://avatars.githubusercontent.com/Makio78" width=115><br><sub>Marcelo Akio Kitahara</sub>](https://github.com/Makio78) | [<img src="https://avatars.githubusercontent.com/lynixcarvalho" width=115><br><sub>Lincoln Silva Carvalho </sub>](https://github.com/lynixcarvalho) |  [<img src="https://avatars.githubusercontent.com/alessferns" width=115><br><sub>ALESSANDRO FERNANDES SANTOS</sub>](https://github.com/alessferns) |  [<img src="https://avatars.githubusercontent.com/KarinaFSantos" width=115><br><sub>Karina Fávero dos Santos</sub>](https://github.com/KarinaFSantos) | [<img src="https://avatars.githubusercontent.com/VANESSA-SS" width=115><br><sub>Vanessa Santos e Silva</sub>](https://github.com/VANESSA-SS) |
| :---: | :---: | :---: | :---: | :---: |


>
>Projeto realizado como requisito para conclusão da disciplina Serverless Architecture - FIAP 2022
>Prof. RAFAEL TSUJI MATSUYAMA (https://github.com/rafaelmatsuyama)
