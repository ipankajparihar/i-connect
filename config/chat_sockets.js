module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "*",
    },
  });

  io.sockets.on("connect", function (socket) {
    console.log("new connection received ", socket.id);
    socket.on("disconnected", function () {
      console.log("socket disconnected");
    });

    socket.on("join_room", function (data) {
      console.log("joining the req recieve", data);
      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });

    socket.on("send-message", function (data) {
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
