//dependency
const express = require("express");
const socket = require("socket.io");
const app = express();
app.use(express.static("public"));
const http = require("http");
const expressHTTPServer = http.createServer(app);
const io = new socket.Server(expressHTTPServer);

//controller
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/room.html`);
});

//socket connection

io.on("connection", (socket) => {
  //get online users
  const getOnlineUsers = async () => {
    const activeUserSockets = io.sockets.sockets;
    const sids = io.sockets.adapter.sids;
    const activeUserArray = [...sids.keys()];
    const activeUser = [];
    activeUserArray.forEach((userId) => {
      const userSocket = activeUserSockets.get(userId);

      if (userSocket.name) {
        activeUser.push({
          id: userSocket.id,
          name: userSocket.name,
        });
      }
    });

    return activeUser;
  };

  //set name event

  socket.on("setName", async (name, cb) => {
    socket.name = name;
    cb();

    const activeUser = await getOnlineUsers();
    console.log(activeUser);
  });

  socket.on("disconnect", async () => {
    const activeUser = await getOnlineUsers();
    console.log(activeUser);
  });
});

//create server
expressHTTPServer.listen(3000, () => {
  console.log("Server listening on port 3000");
});
