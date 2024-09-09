const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle dynamic meeting links
app.get("/meeting/:id", (req, res) => {
  const meetingId = req.params.id;
  // Here you could render a page for the meeting or redirect to another route
  res.send(`Meeting ID: ${meetingId}`);
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Handle custom events, e.g., 'message'
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast the message to all clients
  });

  // You can add more event handlers as needed
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
