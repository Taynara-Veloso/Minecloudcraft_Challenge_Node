# Full-Stack Challenge - Node

## Part 2: Projeto Back-End

`Objetivo`
Desenvolva um aplicativo AWS Serverless usando SAM que fornece uma API RESTful para gerenciar sessões de jogos.

### Requisitos

`RESTful API:`

  - Implemente endpoints para criar e recuperar sessões de jogo.
Use AWS API Gateway, AWS Lambda e DynamoDB.

`Game Session Persistence:`

  - Armazene dados de sessão de jogo em uma tabela do DynamoDB com campos: 
    - sessionId (UUID), 
    - nome do host, 
    - jogadores, 
    - mapa, 
    - modo.

`Adherence to REST Principles:`

  - Design the API endpoints to follow REST conventions.

`Infrastructure as Code (IaC):`

  - Use o SAM para definir e implantar seus recursos da AWS.
  - Certifique-se de que seu modelo SAM esteja bem estruturado e siga as práticas recomendadas.

`Unit Tests:`

  - Escreva testes de unidade para suas funções Lambda usando uma estrutura como Jest ou Mocha.

### Example API Endpoints

Create Game Session: `POST /sessions`

```json
{
  "hostname": "<hostname>",
  "players": <number_of_players>,
  "map": "<game_map>",
  "mode": "<game_mode>"
}
```

List Game Sessions: `GET /sessions`

`Diretrizes de envio:`

[x] Crie um repositório GitHub separado para o projeto de back-end.

[ ] Inclua um README.md com instruções sobre como implantar e testar seu aplicativo.

[ ] Forneça um NOTES.md detalhando sua abordagem, quaisquer suposições feitas e instruções sobre como executar seus testes de unidade.

---

### Deploy 

[✔️] When downloading the repository, go to the install node_modules folder
```
npm install
```
[✔️] make sure serverless is installed on your machine globally 
```
npm i serverless -g
```
[✔️] Log in to serverless or, if necessary, create a new account 
```
serverless
```
[✔️] change the organization name in your serveless.yml file to the same as in your serverless profile
```yml
org: sua_organizacao_aqui
app: challenge-fullstack
service: serverless-game-sessions-new
frameworkVersion: "4"
```
[✔️] Setting AWS credentials
```
serverless
```
  * Select: `Save AWS credentials in a local profile`

    * Log into the AWS Account you want to use with Serverless Framework, 
    * Navigate to the AWS IAM Dashboard,
    * Navigate to the "Users" page - https://console.aws.amazon.com/iam/home?#/users 

    * Click "Create User". 
    * Enter a name (e.g. "serverless-framework"). 
    * Don't check the box for "Access to the AWS Management Console". 
    * Select "Attach Policies Directly". 
    * Find and check the "AdministratorAccess" policy to attach it. 
    * Create the IAM User.

    * Open the newly created IAM User
    * Click the "Security Credentials" tab. 
    * Click "Create Access Key". 
    * Select "Local Code". 
    * Check the box to confirm you want to proceed creating an Access Key. 
    * After creating the Access Key, copy the "Access Key" and "Secret Access Key" to enter below.

* Enter your Access Key in the serverless terminal
* Enter your Secret Access Key in the serverless terminal

[✔️] Setting AWS credentials
```
serverless invoke local --function GameSession
```

Console response:
```
// there are no requests

{
    "statusCode": 404,
    "headers": {
        "x-powered-by": "Express",
        "content-type": "application/json; charset=utf-8",
        "content-length": "21",
        "etag": "W/\"15-5KajTCx0AJD0xogoSeOjjV2M8K0\""
    },
    "isBase64Encoded": false,
    "body": "{\"error\":\"Not Found\"}"
}
```