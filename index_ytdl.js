// server/index.js
const express = require("express");
const socketio = require("socket-io");
const ytdl = require("ytdl-core");

const UrlParts = {
  YOUTUBE_PATTERN_REGEX: /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)[\w=]*)?/,
};

const SocketEvents = {
  ID: 'id',
  INFO: 'info',
};

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const server = app.listen(PORT)

const io = socketio(server);
io.on('connection', (socket) => {
  socket.on(SocketEvents.ID, (id) => {
    ytdl
      .getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then(videoInfo => socket.emit(SocketEvents.INFO, videoInfo));
  });
});