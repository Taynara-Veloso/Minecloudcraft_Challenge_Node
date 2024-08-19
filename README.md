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

### Deploy and Test
