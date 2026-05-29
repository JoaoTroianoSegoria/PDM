# Diagnostico local do backend

Este arquivo registra o que foi encontrado nesta maquina em 29/05/2026.

## Instalado

- Node.js: `v24.14.1`
- npm: `11.11.0`
- Git: `2.53.0.windows.2`
- MySQL Server: instalado e com o servico `MySQL80` rodando
- MySQL Workbench: instalado
- MySQL Shell: `8.0.46`
- VS Code: instalado

## Projeto backend

- Pasta analisada: `D:\workspace D\PDM\PDM\praticas\gestao-financeira-api`
- Dependencias instaladas:
  - `express`
  - `cors`
  - `zod`
  - `dotenv`
  - `@prisma/client@5.22.0`
  - `prisma@5.22.0`
  - `nodemon`
- Estrutura da API criada:
  - `src/server.js`
  - `src/routes/categories.js`
  - `src/routes/transactions.js`
  - `src/schemas/categorySchema.js`
  - `src/schemas/transactionSchema.js`
  - `src/lib/prisma.js`
  - `src/middlewares/errorHandler.js`
  - `prisma/schema.prisma`
  - `prisma/seed.js`

## Pontos pendentes

- O MySQL responde em `localhost:3306`, mas as senhas testadas para `root` nao autenticaram.
- O `.env` atual usa `mysql://root:iesb@localhost:3306/gestao_financeira`, mas essa senha falhou no teste local.
- Tambem foi testada a senha `Senha10adaps`, citada no tutorial original, e ela tambem falhou.
- Antes de rodar a migration, confirme a senha correta do usuario `root` no MySQL Workbench ou crie um usuario proprio para o projeto.
- O comando `mysql` nao esta no PATH, mas existe em `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe`. Isso nao impede o uso do Workbench.
- Postman e Insomnia nao foram encontrados no PATH. Eles sao opcionais, mas ajudam a testar a API.
