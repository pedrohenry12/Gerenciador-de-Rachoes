import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware para ler JSON
app.use(express.json());

// Rota de verificação
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
