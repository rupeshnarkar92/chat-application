const express = require("express");
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const path = require('path');

const chatRouter = require("./route/chatroute");

//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");

const port = 5000;

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/chats", chatRouter);

//set the express.static middleware
app.use(express.static(path.join(__dirname, 'public')));

//integrating socketio
socket = io(http);

//database connection
const Chat = require("./model/chat");
const connect = require("./db");

//setup event listener
socket.on("connection", socket => {
    console.log("user connected");

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });

    socket.on("chat message", function(msg) {
        console.log("message: " + msg);

        //broadcast message to everyone in port:5000 except yourself.
        socket.broadcast.emit("received", { message: msg });

        //save chat to the database
        connect.then(db => {
            console.log("connected to the server");
            let chatMessage = new Chat({ message: msg, sender: "User-1" });

            chatMessage.save();
        });
    });
});

http.listen(port, () => {
    console.log("Server is Running on Port: " + port);
});