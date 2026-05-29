import "dotenv/config";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import categoriesRouter from "./routes/categories.js";
import transactionsRouter from "./routes/transactions.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ ok: true, name: "gestao-financeira-api" });
});

app.use("/categories", categoriesRouter);
app.use("/transactions", transactionsRouter);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
