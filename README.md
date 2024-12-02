# Frontend - Lista de Tarefas

## Visão Geral do Projeto
Este é o **frontend** de uma aplicação simples de **Lista de Tarefas**, desenvolvida com **React.js** e estilizada usando **Tailwind CSS**. Ele se comunica com um **backend Node.js** por meio de uma API para gerenciar as tarefas.

## Funcionalidades
- Adicionar, editar, excluir e concluir tarefas.
- Visualizar todas as tarefas ou filtrar por **pendentes** e **concluídas**.
- Design dinâmico e responsivo utilizando **Tailwind CSS**.

## Requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

## Configuração do Projeto
1. Clone o repositório:
   ```bash
   git clone
   ```

2. Instale as dependências:

Use o npm ou yarn para instalar as dependências:
    ```bash
    npm install
    ```

3. Configure o arquivo .env:

Adicione a URL do backend

Certifique-se de substituir a URL http://localhost:3000 com a URL correta do seu backend, se necessário.

4. Inicie o servidor de desenvolvimento:

Execute o seguinte comando para iniciar o servidor:
    ```bash
    npm start
    ```
Isso abrirá o frontend no seu navegador, geralmente na URL http://localhost:3000.
5. Acesse o frontend:

Abra seu navegador e acesse a aplicação:

http://localhost:3000

Comandos Disponíveis

    npm start ou yarn start: Inicia o aplicativo em modo de desenvolvimento.

Estrutura do Projeto

    src/components: Componentes reutilizáveis do aplicativo.
    src/pages: Página principal da aplicação.
    src/styles: Arquivos de estilo global, incluindo a configuração do Tailwind CSS.
    src/utils: Utilitários como funções auxiliares.

Observações

    Certifique-se de que o backend está em execução e configurado corretamente.