const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const notifications = [];

app.get("/api/notifications", (req, res) => {
  res.json(notifications);
});

app.get("/api/trigger-notification", (req, res) => {
  const newNotification = {
    id: `notif-${Date.now()}`,
    message: `This is a new notification at ${new Date().toLocaleTimeString()}`,
    isRead: false,
  };
  notifications.push(newNotification);

  io.emit("new_notification", newNotification);
  res.status(200).json({ success: true, notification: newNotification });
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
