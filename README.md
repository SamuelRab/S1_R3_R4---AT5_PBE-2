# E-Commerce API

API REST de e-commerce desenvolvida com Node.js, Express e MySQL. A API tem o objetivo de ser integrado ao Front-end que será desenvolvido.

## Tecnologias

- Node.
- Express
- MySQL2
- Multer
- CORS
- Dotenv

## Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar o `.env`
```env
SERVER_PORT=8080
DB_HOST=localhost
DB_DATABASE=S1_R3_R4_AT5_PBE2
DB_USER=root
DB_PASSWORD=1234
DB_PORT=3306
```

### 3. Criar o banco de dados
Execute o arquivo `docs/banco.sql` no MySQL Workbench.

### 4. Iniciar o servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```
> Servidor rodando em `http://localhost:8080`

## Estrutura de Pastas

src/
├── configs/
│   ├── Database.js
│   └── produto.multer.js
├── controllers/
│   ├── categoriaController.js
│   ├── produtoController.js
│   └── pedidoController.js
├── enum/
│   └── statusPedido.js
├── middlewares/
│   └── uploadImage.middleware.js
├── models/
│   ├── Categoria.js
│   ├── Produto.js
│   ├── Pedido.js
│   └── ItensPedido.js
├── repositories/
│   ├── categoriaRepository.js
│   ├── produtoRepository.js
│   └── pedidoRepository.js
├── routes/
│   ├── categoriaRoutes.js
│   ├── produtoRoutes.js
│   ├── pedidoRoutes.js
│   └── routes.js
└── server.js
```

## Endpoints

### Categorias — `/categorias`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /categorias | Lista todas |
| POST | /categorias | Cria categoria |
| PUT | /categorias/:id | Atualiza categoria |
| DELETE | /categorias/:id | Remove categoria |

**Body (POST e PUT):**
```json
{
  "nome": "Eletrônicos",
  "descricao": "Produtos eletrônicos"
}
```

### Produtos — `/produtos`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /produtos | Lista todos |
| GET | /produtos/:id | Busca por ID |
| POST | /produtos | Cria produto |
| PUT | /produtos/:id | Atualiza produto |
| DELETE | /produtos/:id | Remove produto |

**Body (POST e PUT) — `multipart/form-data`:**
```
idCategoria:       1
nome:              Notebook Gamer
descricao:         Notebook com RTX 4060
preco:             4999.99
quantidadeEstoque: 10
imagem:            [arquivo .jpg ou .png]
```

### Pedidos — `/pedidos`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /pedidos | Lista todos |
| GET | /pedidos/:id | Busca por ID |
| POST | /pedidos | Cria pedido |
| DELETE | /pedidos/:id | Remove pedido |
| PUT | /pedidos/:id/status | Altera status |
| POST | /pedidos/:pedidoId/itens | Adiciona item |
| PUT | /pedidos/:pedidoId/itens/:itemId | Edita item |
| DELETE | /pedidos/:pedidoId/itens/:itemId | Remove item |

**Body POST /pedidos:**
```json
{
  "itens": [
    { "idProduto": 1, "quantidade": 2, "valorUnitario": 4999.99 }
  ]
}
```

**Body PUT /pedidos/:id/status:**
```json
{
  "status": "Finalizado"
}
```
> Status disponíveis: `Aberto` `Pendente` `Finalizado`

**Body POST /pedidos/:pedidoId/itens:**
```json
{
  "idProduto": 2,
  "quantidade": 1,
  "valorUnitario": 299.99
}
```

**Body PUT /pedidos/:pedidoId/itens/:itemId:**
```json
{
  "quantidade": 3
}
```

## Regras de Negócio

- O `valorTotal` do pedido é calculado automaticamente com base nos itens.
- O estoque é validado antes de criar o pedido — se insuficiente, retorna erro.
- O estoque é descontado automaticamente ao criar o pedido.
- Ao editar ou remover itens, o `valorTotal` é recalculado automaticamente.
- Todo pedido é criado com status `Aberto` por padrão.
- Imagens aceitas: `.jpg` e `.png`.

## Padrão de Erros

```json
{
  "sucesso": false,
  "mensagem": "Descrição do erro"
}
```

| Status | Situação |
|--------|----------|
| 400 | Campos obrigatórios não enviados |
| 404 | Recurso não encontrado |
| 500 | Erro interno no servidor |

## Padrões de Projeto

- Singleton — Conexão com o banco (`Database.js`)
- Factory — Criação dos models (`Categoria.criar()`, `Produto.criar()`, etc.)
- Repository — Separação entre regras de negócio e banco de dados
