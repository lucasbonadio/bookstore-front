# 📚 Gerenciador de Livros (Frontend)

Aplicação web moderna para gerenciamento de biblioteca pessoal, permitindo visualizar, criar, editar e excluir livros. Desenvolvido com foco em performance, responsividade e boas práticas de arquitetura.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **[React](https://reactjs.org/)** (com **[Vite](https://vitejs.dev/)**)
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)** (Estilização)
- **[Axios](https://axios-http.com/)** (Consumo de API)
- **[React Router DOM](https://reactrouter.com/)** (Roteamento)
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** (Notificações)
- **[Vitest](https://vitest.dev/)** & **[Testing Library](https://testing-library.com/)** (Testes Unitários)
- **[Docker](https://www.docker.com/)** (Containerização)

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/en/) (v18 ou superior recomendado)
- [Docker](https://www.docker.com/) & Docker Compose (Opcional, para rodar via container)
- **Backend API**: Este frontend precisa da API BookStoreApi rodando para funcionar. Certifique-se de a sua API C#/.NET está ativa.

---

## 🐳 Rodando com Docker (Recomendado)

A maneira mais simples de rodar o projeto, simulando um ambiente de produção com Nginx.

1.  **Clone o repositório e entre na pasta:**

    ```bash
    git clone [https://github.com/seu-usuario/seu-projeto.git](https://github.com/seu-usuario/seu-projeto.git)
    cd seu-projeto
    ```

2.  **Suba o container:**

    ```bash
    docker-compose up -d --build
    ```

3.  **Acesse a aplicação:**
    Abra seu navegador em: `http://localhost:3000`

---

## 💻 Rodando Localmente (Desenvolvimento)

Para rodar em modo de desenvolvimento (com Hot Reload).

1.  **Instale as dependências:**

    ```bash
    npm install
    ```

2.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

3.  **Acesse a aplicação:**
    Geralmente rodará em `http://localhost:5173` (verifique o terminal).

---

## 🧪 Rodando Testes

O projeto utiliza **Vitest** para testes unitários.

- **Rodar testes uma vez:**

  ```bash
  npm run test
  ```

- **Rodar testes em modo watch (observação):**
  ```bash
  npm run test:watch
  ```

---

## ✨ Funcionalidades Principais

* **Listagem de Livros:** Visualização em grid com cards responsivos.
* **Busca:** Filtro em tempo real por título ou autor.
* **Cadastro (CRUD):**
    * Criação de novos livros com upload de capa.
    * Edição de informações existentes.
    * Exclusão de livros.
* **Validação:** Formulários com validação de campos obrigatórios.
* **Feedback:** Notificações toast para sucesso ou erro nas operações.
* **Responsividade:** Layout adaptável para Mobile, Tablet e Desktop.