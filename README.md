<h1 align="center">📚 Postaí Frontend</h1>

<p align="center">
  Interface web do projeto <b>Postaí</b>, desenvolvida no curso <b>FullStack - FIAP</b>.
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /></a>
  <a href="https://chakra-ui.com/"><img src="https://img.shields.io/badge/ChakraUI-319795?style=for-the-badge&logo=chakraui&logoColor=white" /></a>
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

## Setup

- yarn install
- yarn dev

## 🧰 Funcionalidades

| Página / Recurso          | Descrição                                                               |
| ------------------------- | ----------------------------------------------------------------------- |
| **/**                     | Login / Cadastro                                                          | 
| **/aulas**                | Exibe todas as aulas.                                                   |
| **/aula/:id**             | Acessa a aula escolhida.                                                |
| **/aula/criar**           | Cria uma nova aula.                                                     |
| **/dashboard**            | Dashboard do professor (visualiza, edita, deleta e cria aula.)           |


---

## 🏗️ Arquitetura do Frontend

Arquitetura:

```mermaid
flowchart TB
  A["Usuário (Aluno/Professor)"] --> B["Interface React"]
  B --> C["Rotas (React Router)"]
  I --> D["Páginas"]
  E --> J["Hooks"]
  D --> J["Hooks"]
  I --> E["Componentes"]
  J --> G["Services / API Postaí"]
  C --> I["Contextos"]

```
