const http = require("http");

const servidor = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });

  res.end(`
    <h1>Servidor Node.js</h1>
    <p>Olá FATEC!</p>
  `);
});

servidor.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
