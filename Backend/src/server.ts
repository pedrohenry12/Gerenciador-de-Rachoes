import express from "express";
import rachaRoutes from "./rotas/racha.routes";
import jogadoresRoutes from "./rotas/jogadores.routes";
import presencaRoutes from "./rotas/presenca.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.use("/rachas", rachaRoutes);
app.use("/jogadores", jogadoresRoutes);
app.use("/presencas", presencaRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
