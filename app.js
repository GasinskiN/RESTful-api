const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Article = require(__dirname + "/Article");

const app = express();

async function connectToMongoDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
}
connectToMongoDB();

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.get("/articles", async function(req, res){
    try {
        const allArticles = await Article.find(); 
        res.send(allArticles);
    } catch (error) {
        res.send(error.message);
    }
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})