import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { LlamaModel, LlamaContext, LlamaChatSession } from "node-llama-cpp";
import "dotenv/config";
import { system } from "../dataset/system.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
  modelPath: path.join(__dirname, "models", "estopianmaid-13b.Q4_K_M.gguf"),
});
const context = new LlamaContext({ model });
const session = new LlamaChatSession({
  context,
  systemPrompt: system.info,
});

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("There is a new connection");
  socket.on("message", async (msg) => {
    const assisantResponse = await session.prompt(msg);
    socket.emit("response", assisantResponse);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
