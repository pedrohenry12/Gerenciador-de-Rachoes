import express from "express";
import cors from "cors";
import rachaRoutes from "./rotas/racha.routes";
import jogadoresRoutes from "./rotas/jogadores.routes";
import presencaRoutes from "./rotas/presenca.routes";
import "dotenv/config";

const app = express();

// 🔥 Render usa a porta via variável de ambiente
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gerenciador-de-rachoes.vercel.app"
  ]
}));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.use("/rachas", rachaRoutes);
app.use("/jogadores", jogadoresRoutes);
app.use("/presencas", presencaRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
