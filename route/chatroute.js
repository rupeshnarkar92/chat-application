const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("../db");
const Chats = require("../model/chat");

const router = express.Router();

router.route("/").get((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    connectdb.then(db => {
        let data = Chats.find({ message: "User-1" });
        Chats.find({}).then(chat => {
            res.json(chat);
        });
    });
});

module.exports = router;