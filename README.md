# NG Cash Back End

<br/>
<br/>

<h2 align="center">🔨 Tecnologias utilizadas na aplicação</h2>

<br/>

- ### NodeJS e TypeScript - Ambiente de execução e Linguagem
- ### Express - Framework
- ### Jest e supertest - Testes unitários e de integração
- ### TypeORM - ORM
- ### Jsonwebtoken e bcrypt - Segurança e autenticação
- ### Yup - Validação e serialização
- ### Express-async-errors - Tratamento de erros
- ### PostgresSQL - Sistema gerenciador de banco de dados(SGDB)
- ### Docker - Conteinerização

<br/> 
 
## Links de acesso

- <a href="https://github.com/GutembergLamark/ng-cash-teste-backend">Repositório</a>

#

## ✅ Como executar a aplicação localmente

<br/>

### Algumas ferramentas são essencias para a execução da aplicação, são elas:

- [Node](https://nodejs.org/en/)
- [Postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) (opcional)

<h3>1 - Primero passo:</h3>

#

<p>Vamos realizar a configuração do arquivo .env do nosso projeto</p>

<br/>

```bash
# Buscar na raiz do projeto o arquivo .env-example, faça uma cópia desse arquivo ainda na raiz do projeto, o nomeie como .env e configure-o com os seguintes dados:

#POSTGRES_USER="seu usuário postgres"
#POSTGRES_PASSWORD="senha do seu usuário postgres"
#POSTGRES_DB="nome do banco de dados que você criou no postgres para teste"
#HOST=localhost
#SECRET_KEY="pode ser qualquer valor"

#Exemplo:

POSTGRES_USER=joao
POSTGRES_PASSWORD=1234
POSTGRES_DB=ng_cash
HOST=localhost
SECRET_KEY=minhachavesecreta

```

<br/>

<h3>2 - Segundo passo:</h3>

#

<p>Vamos instalar as dependências da nossa aplicação:</p>

<br/>

```bash
# Abra o seu terminal na raiz do projeto e execute o seguinte comando:

$yarn

ou

$npm install

```

<h3>3 - Terceiro passo:</h3>

#

<p>Vamos rodar as migrações para que as tabelas do nosso banco sejam criadas:</p>

<br/>

```bash
# Abra o seu terminal na raiz do projeto e execute o seguinte comando:

$yarn typeorm migration:run -d src/data-source

ou

$npx typeorm-ts-node-commonjs migration:run -d src/data-source

```

<br/>

<h3>4 - Quarto passo:</h3>

#

<p>Iniciando o projeto:</p>

<br/>

```bash
# Abra o seu terminal na raiz do projeto e execute o seguinte comando:

$yarn dev

ou

$npm run dev

```

#

## ✅ Testes

### Para a execução dos testes iremos rodar a seguinte linha de comando no terminal:

#

```bash
# Abra o seu terminal na raiz do projeto e execute o seguinte comando:

$yarn test

ou

$npm run test

```

#

## ✅ Utilização

### Para lhe auxiliar na avaliação da aplicação estou diponibilizando um arquivo json de fácil importação no <a href="https://insomnia.rest/download">Insomnia</a> com todas as rotas criadas e prontas pra teste. O arquivo se encontra na raiz do projeto e está nomeado como Insomnia_2022-11-20.json

#
