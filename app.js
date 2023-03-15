const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));



app.listen(3000, function(){
    console.log("Server running on port 3000");
})