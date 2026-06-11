const express = require("express");

const router = express.Router();

const controller = require("../controllers/tarefaController");

router.get("/", controller.listarTarefas);

router.post("/", controller.criarTarefa);

router.put("/:id", controller.atualizarTarefa);

router.delete("/:id", controller.deletarTarefa);

module.exports = router;
