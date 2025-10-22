# Product Management Dashboard

Este projeto é um painel de administração (Dashboard) para gerenciamento de produtos, consumindo a API pública DummyJSON e implementado com React, TypeScript, TailwindCSS e React Query.

---

## Funcionalidades e Requisitos

### Requisitos Obrigatórios

1.  **Dashboard & KPIs:** Exibe as métricas de negócio: **Valor Total do Estoque**, **Média de Preço** e **Total de Categorias**.
2.  **CRUD Completo (Simulado):** Implementação das funcionalidades de **Read, Create, Update e Delete** de produtos.
3.  **Atualização Instantânea:** A UI é atualizada sem recarregar a página após as operações de CRUD, proporcionando uma experiência de usuário fluida.
4.  **Técnicos:** Uso de **TypeScript** (tipagem completa) e estilização com **TailwindCSS** (layout responsivo).

### Requisitos Bônus (Diferenciais)

1.  **React Query (TanStack Query):** Usado para todo o gerenciamento de estado de servidor, garantindo mutações otimistas e controle de cache eficiente.
2.  **Gráficos:** Inclusão de dois gráficos dinâmicos (`Recharts`) no Dashboard para insights de **Distribuição por Categoria** e **Produtos com Baixo Estoque**.
3.  **UX:** Animações com **Framer Motion** e design limpo.

---

## Stack Tecnológica

* **Build Tool:** ViteJS
* **Biblioteca/Framework:** ReactJS
* **Linguagem:** TypeScript
* **Estilização:** TailwindCSS
* **Gerenciamento de Estado de Servidor:** React Query (TanStack Query)
* **Roteamento:** React Router
* **Requisições HTTP:** Axios
* **Gráficos:** Recharts
* **Animações:** Framer Motion
* **Notificações:** React Hot Toast
* **Ícones:** React Icons

## Como Rodar o Projeto

Siga os passos abaixo para iniciar a aplicação localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [SEU_LINK_DO_REPOSITÓRIO]
    cd nome-do-projeto
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou yarn install
    ```

3.  **Execute o projeto:**
    ```bash
    npm run dev
    # ou yarn dev
    ```

A aplicação estará disponível em seu navegador (geralmente em `http://localhost:5173`).

## Deploy

Você pode acessar o projeto em: https://product-management-dashboard-one.vercel.app/