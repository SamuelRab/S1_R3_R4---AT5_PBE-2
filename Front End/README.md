# PÁGINA DE PRODUTOS

Aplicação Front-End desenvolvida como **Single Page Application (SPA)** utilizando **Vite** e consumindo dados da **HP API**.

Permite explorar produtos, com suporte a **paginação** e **carrinho** no navegador. 


## 🚀 Tecnologias

![HTML5](https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=black)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-purple?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

## 🌐 API utilizada

https://hp-api.onrender.com/

## 📦 Instalação e execução

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/S2_R4-AT1_PEND.git
```

### 2. Instalar dependências
```bash
cd harry-potter-explorer
npm install
```

### 3. Rodar em ambiente de desenvolvimento
```bash
npm run dev
```

### 4. Gerar build de produção
```bash
npm run build
```

### 5. Visualizar build
```bash
npm run preview
```

## 📁 Estrutura do projeto
```pgsql
📦 atividade front-end
 ┣ 📂 public
 ┣ 📂 src
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 layout
 ┃ ┃ ┣ 📂 produtos
 ┃ ┃ ┣ 📂 shared
 ┃ ┃ ┗ 📂 ui
 ┃ ┣ 📂 config
 ┃ ┣ 📂 pages
 ┃ ┣ 📂 services
 ┃ ┣ 📂 storage
 ┃ ┣ 📜 main.js
 ┃ ┗ 📜 style.css
 ┣ 📜 index.html
 ┗ 📜 README.md
```

## 🧠 Arquitetura do Projeto

| Pasta / Arquivo | Responsabilidade |
|---|---|
| `components/` | Componentes reutilizáveis da interface, organizados por contexto. |
| `pages/` | Responsável pelas telas da aplicação (SPA). |
| `services/` | Camada de comunicação com APIs. |
| `storage/` | Responsável pelo armazenamento local. |
| `config/` | Centraliza configurações globais da aplicação. |
| `main.js` | Ponto de entrada da aplicação. |
| `style.css` | Estilos globais da aplicação. |

## ✨ Funcionalidades
- 🔍 Listagem de produtos;
- 📄 Paginação dinâmica;
- 🛒 Sistema de carrinho;
- 💾 Persistência no navegador;
- ⚡ Interface rápida com Vite;

## 🚧 Melhorias futuras

Algumas evoluções planejadas para o projeto:

- [ ] Migrar para React;
- [ ] Adicionar modo escuro (dark mode);
- [ ] Animações suaves na troca de páginas;
- [ ] Filtros (casa, espécie, gênero, etc.);
- [ ] Ordenação (nome, casa, etc.);

## Estrutura Inicial do Projeto

O projeto foi iniciado por Miguel, responsável pela criação da estrutura base da aplicação, incluindo:

📁Components

Organização dos componentes reutilizáveis da interface:

-layout → Componentes estruturais da aplicação
-produtos → Componentes relacionados aos produtos (botão, o card e a imagem)
-shared → Componentes compartilhados entre páginas
-ui → Elementos visuais e de interface

📁Config
-app config → Configurações gerais da aplicação

📁Pages
Estrutura inicial das páginas:

-carrinho → Página do carrinho de compras
-produtos → Página de listagem/exibição de produtos


## Estrutura Inicial do Projeto

O projeto foi iniciado por Miguel, responsável pela criação da estrutura base da aplicação, incluindo:

📁Components

Organização dos componentes reutilizáveis da interface:

-layout → Componentes estruturais da aplicação
-produtos → Componentes relacionados aos produtos (botão, o card e a imagem)
-shared → Componentes compartilhados entre páginas
-ui → Elementos visuais e de interface

📁Config
-app config → Configurações gerais da aplicação

📁Pages
Estrutura inicial das páginas:

-carrinho → Página do carrinho de compras
-produtos → Página de listagem/exibição de produtos

## Continuidade do Desenvolvimento

Posteriormente, o projeto teve continuidade por Akila, responsável pela implementação e organização de novas funcionalidades e estruturas da aplicação, incluindo:

📁 Pages

Criação e desenvolvimento de páginas:

categorias.page.js, carrinho.page.js, produtos.page.js → Página de listagem e gerenciamento de categorias, produtos e carrinho

📁 Services

Implementação da camada de comunicação com a API:

categorias.api.js → Serviços relacionados às categorias
produtos.api.js → Serviços relacionados aos produtos
pedido.api.js → Serviços relacionados ao pedido

📁 Storage

Estrutura de persistência de dados no navegador:

carrinho.storage.js → Gerenciamento e armazenamento do carrinho de compras
📄 Arquivos Principais da Aplicação
main.js → Inicialização e configuração principal da aplicação
style.css → Estilização global do projeto
index.html → Estrutura base da aplicação web

Além disso, Akila também participou da organização da arquitetura do projeto e da integração das funcionalidades à versão final da aplicação.
