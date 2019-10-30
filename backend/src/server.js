const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);

/** - REQ : Pega qualquer tipo de parâmetro que o usuário informar
 *  - RES : Manda a resposta
 *  - req.query : Acessar a query params (para filtros)
 *  - req.parmas : Acessar route params (para edição, delete)
 *  - req.body : Acessar o corpo da requisição (para criação, edição)
 */

//  MÉTODO PUT É USADO PARA ALTERAR OS DADOS

// app.put("/users/:id", (req, res) => {
//   return res.json({ id: req.query.id });
// });

// app.get("/users", (req, res) => {
//   return res.json({ id: req.query.id });
// });

// app.post("/users", (req, res) => {
//   return res.json(req.body.nome);
// });

mongoose.connect(
  "mongodb+srv://vinistrauss:vinicius@cluster0-u0dek.mongodb.net/aircnc?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
