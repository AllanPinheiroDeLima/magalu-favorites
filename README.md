<p align="center">
  <img src="https://www.magazineluiza.com.br/static/img/logo-magalu.svg" width="320" alt="Magalu Logo" />
</p>

## Desafio Técnico Magalu

Este desafio foi feito usando o framework [NestJS](https://nestjs.com/) e a conexão com o banco de dados 
foi feita utilizando a ORM [TypeORM](https://typeorm.io/#/)

# Pré requisitos
- MySQL
- Docker com Docker-compose

##### Instalando os pré-requisitos 
Este projeto utiliza **MySQL** como banco de dados. Eu decidi criar
o ele usando o [Docker](https://www.docker.com/) para facilitar o desenvolvimento e reprodução
e não ter que criar um banco hospedado em algum outro lugar.

- [Instalação do Docker](https://docs.docker.com/desktop/)
- Se estiver no Linux, é necessário instalar o docker-compose separadamente. [Instalação do docker-compose](https://docs.docker.com/compose/install/)
- [Instalação do NodeJS](https://nodejs.org/en/download/)

# Rodando o projeto
Depois que os pré-requisitos estão instalados, você pode usar o comando 
abaixo para subir ele:

### Com docker
```bash
$ npm install
$ docker-compose up 
```
### Sem  docker
É necessário alterar as variáveis de ambiente listadas abaixo no arquivo `.env` para
coincidir com seu banco de dados:

- MYSQL_HOST
- MYSQL_PORT
- MYSQL_USER
- MYSQL_PASSWORD

Então você pode executar o projeto com os comandos:

```bash
$ npm install 
$ npm run start:dev
```

## Testes unitários

O desafio não especificava, mas um dos assuntos que conversamos foram testes unitários, então 
deixei uma pasta com alguns testes para visualizar de exemplo. Para rodar os testes, o comando abaixo 
deve ser executado

### Com Docker
```bash
$ docker-compose -f docker-compose.test.yaml up
```

### Sem Docker
```bash
$ npm install # esse passo não é necessário se já tiver sido feito ao rodar o projeto
$ npm run test
```

## Considerações
1. As variáveis do projeto estão em um arquivo `.env` preenchido, entretanto o correto, levando em consideração
segurança e governança, é este arquivo subir pro repositório apenas com as variáveis não preenchidas.
  Eu preenchi elas por que quem for avaliar o projeto não deve ter o trabalho 
   de criar todas as variáveis manualmente
2. Pra melhorar a performance da API, ao buscar o endereço `[GET] /customers`, eu envio
   exatamente o que eu gravei na api, visto que eu vou buscar talvez centenas de usuários e faço uma integração com uma 
   api externa, enviar apenas os ids dos produtos favorece a performance. Já ao consultar `[GET] /customers/:id` 
   eu faço a integração com a api externa e trago todos os produtos. Visto que o usuário, neste cenário, vai ter no máximo 10 a 20 produtos
   em seus favoritos. Entretanto, com múltiplos usuários acessando a api constantemente, é de se esperar que o volume de requisições exceda
   o razoável. Eu cheguei a cogitar fazer um cacheamento no `redis` porém, eu desisti da ideia, visto que
   é um marketplace, os preços podem flutuar muito e eu não conseguiria, com o setup que eu tenho agora, sincronizar os
   preços dos produtos constantemente, o que poderia causar um problema maior no final. (posso elaborar melhor 
   se precisar)
3. Apesar de não ser necessário, eu decidi disponibilizar o *client* de produtos como uma api à parte 
   enquanto eu testava o projeto no meu *mini-frontend*. No final, eu decidi deixar ele disponibilizado 
   na documentação pra que vocês pudessem ver o processo que tomei pra desenvolver
4. A documentação da API foi feita em modelo swagger, dessa maneira é possível avaliar os endpoints com facilidade
pelo recrutador. Ele fica disponível em `http://localhost:3000/swagger`
5. Levando em consideração que esta api pode ser reutilizada para criar clients pelo `swagger-codegen`, eu 
disponibilizei um yaml com as definições no endereço `http://localhost:3000/swagger-json`
6. Apesar de não ser necessário, eu fiz um pequeno front-end para testes, por isso habilitei o CORS
7. Eu habilitei algumas outras funcionalidades de segurança: [*rate-limiting*](https://www.npmjs.com/package/express-rate-limit) e [*helmet*](https://www.npmjs.com/package/helmet) são as principais
