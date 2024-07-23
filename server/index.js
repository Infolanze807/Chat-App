const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: "https://chat-app-sepia-eight-66.vercel.app",
  credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-sepia-eight-66.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let connectionCount = 0;

io.on("connection", (socket) => {
  connectionCount++;
  console.log(`Client connected. Total connections: ${connectionCount}`);

  socket.on("chat", (chat) => {
    io.emit("chat", chat);
  });

  socket.on("disconnect", () => {
    connectionCount--;
    console.log(`Client disconnected. Total connections: ${connectionCount}`);
  });
});

server.listen(3001, () => {
  console.log("Running on port 3001");
});
