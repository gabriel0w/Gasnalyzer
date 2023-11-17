const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  methods: ["GET", "POST"],
});

server.listen(3001, () => {
  console.log("Socket.io rodando na porta 3001");
});

io.on("connection", (socket) => {
  console.log("Usuário conectado ao socket.io");
  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

module.exports = io;
