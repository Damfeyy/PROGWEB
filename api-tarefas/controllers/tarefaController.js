const tarefas = require("../models/tarefaModel");

// GET
exports.listarTarefas = (req, res) => {
  res.json(tarefas);
};

// POST
exports.criarTarefa = (req, res) => {
  const novaTarefa = {
    id: Date.now(),
    titulo: req.body.titulo,
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
};

// PUT
exports.atualizarTarefa = (req, res) => {
  const id = Number(req.params.id);

  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({
      erro: "Tarefa não encontrada",
    });
  }

  tarefa.titulo = req.body.titulo;

  res.json(tarefa);
};

// DELETE
exports.deletarTarefa = (req, res) => {
  const id = Number(req.params.id);

  const indice = tarefas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Tarefa não encontrada",
    });
  }

  tarefas.splice(indice, 1);

  res.json({
    mensagem: "Tarefa removida",
  });
};
