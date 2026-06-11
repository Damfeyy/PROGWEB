const express = require("express");

const app = express();

const logger = require("./middleware/logger");

const tarefaRoutes = require("./routes/tarefaRoutes");

// Middleware
app.use(express.json());

app.use(logger);

// Rotas
app.use("/tarefas", tarefaRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
