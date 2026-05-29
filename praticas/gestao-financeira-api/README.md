# Gestao Financeira API

API REST em Node.js com Express, Prisma e MySQL para o app de gestao financeira.

## 1. Requisitos

Instale antes de rodar o projeto:

- Node.js LTS
- npm, que ja vem com o Node.js
- MySQL Server 8
- MySQL Workbench, DBeaver ou outro cliente visual para criar/ver o banco
- Postman, Insomnia ou curl para testar os endpoints

Para conferir no terminal:

```bash
node -v
npm -v
git --version
```

## 2. Instalar dependencias

Entre na pasta da API:

```bash
cd praticas/gestao-financeira-api
```

Instale os pacotes:

```bash
npm install
```

As principais dependencias do projeto sao:

- `express`: servidor HTTP
- `cors`: libera acesso da API pelo app
- `zod`: validacao dos dados recebidos
- `dotenv`: leitura do arquivo `.env`
- `prisma` e `@prisma/client`: ORM e cliente do banco
- `nodemon`: reinicia o servidor automaticamente em desenvolvimento

## 3. Criar o banco MySQL

Abra o MySQL Workbench, conecte no servidor local e execute:

```sql
CREATE DATABASE IF NOT EXISTS gestao_financeira
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

## 4. Configurar variaveis de ambiente

Copie o arquivo de exemplo:

```bash
copy .env.example .env
```

No Windows PowerShell, tambem pode usar:

```powershell
Copy-Item .env.example .env
```

Edite o `.env` com o usuario e a senha reais do MySQL:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/gestao_financeira"
PORT=3000
```

Exemplo, se o usuario for `root`:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/gestao_financeira"
PORT=3000
```

Se a senha tiver caracteres especiais, como `@`, `#`, `%` ou espaco, use a versao codificada para URL.

## 5. Preparar o Prisma

Gere o Prisma Client:

```bash
npm run prisma:generate
```

Crie as tabelas no banco:

```bash
npm run prisma:migrate -- --name init
```

Insira as categorias iniciais:

```bash
npm run prisma:seed
```

## 6. Rodar a API

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Se tudo estiver certo, o terminal mostrara:

```text
API rodando em http://localhost:3000
```

Abra no navegador:

```text
http://localhost:3000/
```

A resposta esperada e:

```json
{
  "ok": true,
  "name": "gestao-financeira-api"
}
```

## 7. Abrir Prisma Studio

Em outro terminal, na mesma pasta da API:

```bash
npm run prisma:studio
```

O Prisma Studio normalmente abre em:

```text
http://localhost:5555
```

## 8. Endpoints principais

Base URL:

```text
http://localhost:3000
```

Rotas:

- `GET /`: health-check da API
- `GET /categories`: lista categorias
- `POST /categories`: cria categoria
- `PUT /categories/:id`: atualiza categoria
- `DELETE /categories/:id`: exclui categoria personalizada
- `GET /transactions`: lista transacoes
- `POST /transactions`: cria transacao
- `PUT /transactions/:id`: atualiza transacao
- `DELETE /transactions/:id`: exclui transacao

Exemplo de categoria:

```json
{
  "name": "health",
  "displayName": "Saude",
  "icon": "favorite",
  "background": "#FFB6B6",
  "isIncome": false
}
```

Exemplo de transacao:

```json
{
  "description": "Salario de maio",
  "value": 3500.5,
  "date": "2026-05-29",
  "categoryId": "COLE_AQUI_O_ID_DA_CATEGORIA"
}
```

## 9. Problemas comuns

### Access denied for user

Erro parecido com:

```text
Access denied for user 'root'@'localhost'
```

Significa que o usuario ou a senha no `.env` estao incorretos. Confirme a senha no MySQL Workbench e ajuste `DATABASE_URL`.

### Database does not exist

Crie o banco `gestao_financeira` no Workbench e rode a migration novamente.

### Porta 3000 ocupada

Troque a porta no `.env`:

```env
PORT=3001
```

Depois acesse `http://localhost:3001`.

### Comando mysql nao reconhecido

Nao e obrigatorio usar `mysql` no terminal. Voce pode criar o banco pelo MySQL Workbench.

## 10. Ordem resumida para o professor rodar

```bash
npm install
```

Criar o banco no MySQL Workbench:

```sql
CREATE DATABASE IF NOT EXISTS gestao_financeira
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Criar e ajustar o `.env`:

```bash
copy .env.example .env
```

Rodar Prisma:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

Subir API:

```bash
npm run dev
```
