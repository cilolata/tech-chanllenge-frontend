<h1 align="center">📚 Postaí Frontend</h1>

<p align="center">
  Interface web do projeto <b>Postaí</b>, desenvolvida no curso <b>FullStack - FIAP</b>, onde professores podem compartilhar conteúdos e alunos podem visualizar e interagir com posts.
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /></a>
  <a href="https://chakra-ui.com/"><img src="https://img.shields.io/badge/ChakraUI-319795?style=for-the-badge&logo=chakraui&logoColor=white" /></a>
  <a href="https://axios-http.com/"><img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" /></a>
  <a href="https://render.com/"><img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white" /></a>
</p>

---

## 🎯 Objetivo

Este repositório contém o **frontend** do projeto **Postaí**, parte do Tech Challenge Fase 3 da FIAP.  
O objetivo é entregar uma interface **responsiva, acessível e intuitiva**, permitindo a interação com os endpoints REST do backend:

- 👩‍🏫 Professores → Criar, editar e excluir postagens.
- 👨‍🎓 Alunos → Visualizar e pesquisar conteúdos.
- 🔒 Autenticação → Login e cadastro de usuários.

---

## 🧰 Funcionalidades

| Página / Recurso          | Descrição                                                               |
| ------------------------- | ----------------------------------------------------------------------- |
| **Home (Lista de posts)** | Exibe todos os posts com título, autor e resumo. Inclui campo de busca. |
| **Leitura de post**       | Exibe conteúdo completo. (Comentários: opcional).                       |
| **Criação de post**       | Professores autenticados podem criar novos posts.                       |
| **Edição de post**        | Professores podem editar posts existentes.                              |
| **Administração**         | Professores podem listar, editar e excluir posts.                       |
| **Autenticação**          | Cadastro e login de usuários (com permissão de professor/aluno).        |

---

## 🏗️ Arquitetura do Frontend

A aplicação segue uma arquitetura baseada em **camadas e organização modular**:

```mermaid
flowchart TB
  A["Usuário (Aluno/Professor)"] --> B["Interface React"]
  B --> C["Rotas (React Router)"]
  C --> D["Páginas (pages/)"]
  D --> E["Componentes (components/)"]
  D --> F["Layout (layout/)"]
  D --> G["Hooks & Contexts"]
  G --> H["Gerenciamento de Estado"]
  D --> I["Axios Service / API Postaí"]
  I --> J["Backend - Postaí API"]
```
# tech-chanllenge-frontend
