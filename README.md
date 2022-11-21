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

### Para lhe auxiliar na avaliação da aplicação estou diponibilizando um arquivo json de fácil importação no <a href="https://insomnia.rest/download">Insomnia</a> com todas as rotas criadas e prontas pra teste. O arquivo se encontra na raiz do projeto e está nomeado como <code>Insomnia_2022-11-20.json</code>

#

## ✅ Rotas

#

### POST Register - "/users"

<br/>

<p>Essa rota vai realizar o cadastro do usuário na plataforma, sendo necessário informar um username com 3 ou mais caracters e uma senha com 8 caracters, 1 letra maiúscula, uma letra minúscula, um número e um caracter especial</p>

<br/>

<h3>Envio:</h3>

<br/>

```bash
{
    username: "Sergio",
    password: "Sergio@123"
}
```

<br/>

<h3>Resposta:</h3>

<br/>

<p>Na resposta da requisição é retornado o usuário criado com o username, id e dados da conta bancária já iniciando com um saldo de 100 reais</p>

<br/>

```bash
    {
	"user": {
		"username": "Sergio",
		"account": {
			"id": "dcbc0a0a-e324-4396-a518-e0a4962ce772",
			"balance": "100.00"
		},
		"id": "ab9ae89b-b3dc-4199-8a0d-42e38eea2c94"
	}
}
```

#

### POST Session - "/session"

<br/>

<p>Essa rota vai realizar o login do usuário na aplicação. São necessários o username e o password do usuário</p>

<br/>

<h3>Envio:</h3>

<br/>

```bash
{
    username: "Sergio",
    password: "Sergio@123"
}
```

<br/>

<h3>Resposta:</h3>

<br/>

<p>Na resposta da requisição é retornado o token de atutenticação jwt que vai validar as permissões do usuário durante todo o fluxo da apĺicação</p>

<br/>

```bash
    {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJkY2JjMGEwYS1lMzI0LTQzOTYtYTUxOC1lMGE0OTYyY2U3NzIiLCJpYXQiOjE2NjkwNDU4ODksImV4cCI6MTY2OTEzMjI4OSwic3ViIjoiYWI5YWU4OWItYjNkYy00MTk5LThhMGQtNDJlMzhlZWEyYzk0In0.IPonJiYwmDXWGZAxr4Wm01T0hzL9h8cucN7fSylihaE"
}
```

#

### GET Profile - "/profile"

<br/>

<p>Esta rota vai retornar todos os dados do usuário que estiver logado e autenticado via JWT na aplicação, não é necessário argumentos para está requisição</p>

<br/>

<h3>Resposta:</h3>

<br/>

<p>Na resposta da requisição é retornado um objeto com todos os dados do usuário, incluindo id, username, account e transações de cash out e cashin</p>

<br/>

```bash
    {
	"user": {
		"id": "ab9ae89b-b3dc-4199-8a0d-42e38eea2c94",
		"username": "Sergio",
		"account": {
			"id": "dcbc0a0a-e324-4396-a518-e0a4962ce772",
			"balance": "90.00",
			"creditedTransactions": [],
			"debitedTransactions": [
				{
					"id": "1bef501c-001b-4b41-93f7-c19e09789e66",
					"value": "20.00",
					"createdAt": "2022-11-21T15:27:15.863Z"
				},
			]
		}
	}
}
```

#

### POST Cashout - "/users/cashout"

<br/>

<p>Esta rota vai criar uma transação de cash out, são necessários o username do usuário de destino e o valor da transação, a rota é autenticada, por isso é necessário que se passe um token para executá-la, não é possível realizar cashout para o próprio usuário</p>

<br/>

<h3>Envio:</h3>

<br/>

```bash
{
    username: "Marcos",
    value: 5.43
}
```

<br/>

<h3>Resposta:</h3>

<br/>

<p>Na resposta da requisição são retornados os dados da transação como valor, id e saldo do usuário que foi debitado, id e saldo do usuário que foi creditado, id da transação e data de criação</p>

<br/>

```bash
    {
	"transaction": {
		"value": "5.43",
		"debitedAccount": {
			"id": "dcbc0a0a-e324-4396-a518-e0a4962ce772",
			"balance": "24.40"
		},
		"creditedAccount": {
			"id": "e7acd515-3df3-41a9-8339-33fa099a9f58",
			"balance": "22.03"
		},
		"id": "fd6df659-64eb-4f32-898e-10b14540375a",
		"createdAt": "2022-11-21T16:20:05.144Z"
	}
}
```

#

### GET Account - "/users/account"

<br/>

<p>Esta rota vai retornar todos os dados da conta bancária do usuário, não sendo necessário passar argumentos no corpo da requisição, mas é obrigatório o uso de token</p>

<br/>

<h3>Envio:</h3>

<br/>

```bash
{
    username: "Marcos",
    value: 5.43
}
```

<br/>

<h3>Resposta:</h3>

<br/>

<p>Na resposta da requisição são retornados os dados da conta bancária como id, balance, lista de transações de cash in e transações de cash out </p>

<br/>

```bash
    {
	"account": {
		"id": "0bd8092b-2c82-4dde-b2af-608315d21eac",
		"balance": 100,
		"creditedTransactions": [],
		"debitedTransactions": []
	    }
    }
```

#

<h1 align="center">Desenvolvedor</h1>

<h2 align="center">Gutemberg Lamark Araújo Batista</h2>

<br/>

<h2 align="center"><img src="https://avatars.githubusercontent.com/u/89531845?v=4" width="250px"></h2>
