# Wispr AI

Wispr AI é uma plataforma que permite a criação de salas de áudio interativas, onde os participantes podem fazer perguntas que são transcritas e respondidas com o auxílio de inteligência artificial.

## Stack de Tecnologias

**Back-end (Server):**
- Node.js
- Fastify
- TypeScript
- PostgreSQL
- Drizzle ORM
- Docker
- Zod (para validação)
- Biome (para formatação e lint)

**Front-end (Web):**
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Biome (para formatação e lint)

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:
- [Node.js](httpss://nodejs.org/) (versão 20 ou superior)
- [Docker](httpss://www.docker.com/get-started) e Docker Compose
- [npm](https://www.npmjs.com/) (ou outro gerenciador de pacotes como npm/yarn)

## Como Iniciar (Getting Started)

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento local.

### 1. Configuração do Back-end (Server)

1.  **Navegue até o diretório do servidor:**
    ```bash
    cd server
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Preencha as variáveis necessárias, como as credenciais do banco de dados e chaves de API.

4.  **Inicie o banco de dados com Docker:**
    ```bash
    docker-compose up -d
    ```

5.  **Execute as migrações do banco de dados:**
    ```bash
    npm drizzle:migrate
    ```

6.  **(Opcional) Popule o banco com dados de teste:**
    ```bash
    npm db:seed
    ```

7.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3333`.

### 2. Configuração do Front-end (Web)

1.  **Em um novo terminal, navegue até o diretório do front-end:**
    ```bash
    cd web
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o cliente de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## Estrutura do Projeto

```
.
├── server/ # Código-fonte do back-end
└── web/    # Código-fonte do front-end
```

## Endpoints da API

Uma visão geral dos principais endpoints da API disponíveis no back-end:

- `POST /rooms` - Cria uma nova sala.
- `GET /rooms` - Lista as salas existentes.
- `POST /rooms/:roomId/questions` - Cria uma nova pergunta em uma sala.
- `GET /rooms/:roomId/questions` - Lista as perguntas de uma sala.
- `POST /rooms/:roomId/audio` - Faz upload de um trecho de áudio para uma sala.

Para mais detalhes, consulte o arquivo `server/client.http`.
