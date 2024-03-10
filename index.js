const makeid = require('./helper/roomid')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
io.on('connection', (socket) => {

  console.log('a user connected');

  // let roomName = makeid(5)
  // while (io.sockets.adapter.rooms.get(roomName) !== undefined) {
  //   roomName = makeid(5)
  // }

  let roomName = "room1"


  socket.on("create room", () => {
    console.log("emitted")
    io.to(socket.id).emit("create room", roomName)
  })
  

  socket.on("join room", (room) => {
    socket.join(room)
    console.log("user joined room")
    socket.emit("join room", room)
  })

  
  socket.on('spectator', (roomId) => {
    if (io.sockets.adapter.rooms.get(roomId)) {
      socket.join(roomId)
    }
    else {
      io.emit("room error", "room does not exist")
    }
  })

  socket.on("change name", (names) => {
    socket.broadcast.emit("change name", names)
  })

  socket.on("randomize colors", (colors) => {
    socket.broadcast.emit("randomize colors", colors)
  })

  socket.on("change amount", (amount) => {
    socket.broadcast.emit("change amount", amount)
  })

  socket.on("randomize characters", (randomize) => {
    socket.broadcast.emit("randomize characters", randomize)
  })

  socket.on("change characters", (characters) => {
    socket.broadcast.emit("change characters", characters)
  })

  socket.on("change total", (total) => {
    socket.broadcast.emit("change total", total)
  })

  socket.on("change loading time", (loadingTime) => {
    socket.broadcast.emit("change loading time", loadingTime)
  })

  socket.on("change loading", (loading) => {
    socket.broadcast.emit("change loading", loading)
  })

  socket.on("change history", (history) => {
    socket.broadcast.emit("change history", history)
  })

  socket.on("get info", () => {
    socket.broadcast.emit("get info", (socket.id))
  }) 

  socket.on("post info", (info) => {
    io.to(info[0]).emit("post info", info[1])
  })


  

  socket.on('disconnect', () => {
    console.log("user disconnected")
  });

});


server.listen(80, () => {
  console.log('listening on *:3001');
});