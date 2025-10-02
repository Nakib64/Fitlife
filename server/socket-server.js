// server/socket-server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // frontend er origin here (dev: http://localhost:3000, prod: vercel url)
    methods: ["GET", "POST"],
  },
});

// socket connection
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("userMessage", async (msg) => {
    console.log("👤 User:", msg);

    try {
      // call OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 
        },
        body: JSON.stringify({
          model: "x-ai/grok-4-fast:free",
          messages: [
            {
              role: "system",
              content: "You are a friendly AI Fitness Coach. Give short, clear, motivational answers.",
            },
            { role: "user", content: msg },
          ],
        }),
      });

      const data = await response.json();
      const aiReply = data?.choices?.[0]?.message?.content || "⚠️ Sorry, I couldn’t generate a reply.";

      // send back to client
      socket.emit("aiMessage", aiReply);
    } catch (err) {
      console.error("AI error:", err);
      socket.emit("aiMessage", "⚠️ Something went wrong. Try again.");
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// start server
const PORT = process.env.SOCKET_PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Socket.io server running on http://localhost:${PORT}`);
});
