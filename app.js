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

app.post("/articles", async function(req, res){
    try {
        const newArticle = await Article.create({
            title: req.body.title,
            content: req.body.content,
            
        });
        res.send("Succesfully added an article");
    } catch (error) {
        console.log(error.message);
    }
})

app.delete("/articles", async function(req, res){
    try {
        await Article.deleteMany();
        console.log("Succesfully deleted all articles");
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})