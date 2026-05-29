# Frontend Gestao Financeira

App Expo com Expo Router, tres abas e integracao preparada para a API em `gestao-financeira-api`.

## Rodar

```bash
npm install
npm run android
```

## API

Por padrao, o app tenta usar a maquina que esta rodando o Expo e a porta `3000`.

Se precisar apontar manualmente:

```env
EXPO_PUBLIC_API_URL=http://SEU_IP:3000
```

Rotas consumidas:

- `GET /categories`
- `POST /categories`
- `GET /transactions`
- `POST /transactions`
- `DELETE /transactions/:id`
