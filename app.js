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

// Requests for all articles
app.route("/articles")
.get(async function(req, res){
    try {
        const allArticles = await Article.find(); 
        res.send(allArticles);
    } catch (error) {
        res.send(error.message);
    }
})

.post(async function(req, res){
    try {
        const newArticle = await Article.create({
            title: req.body.title,
            content: req.body.content,
        });
        res.send("Succesfully added an article");
    } catch (error) {
        res.send(error.message);
    }
})

.delete(async function(req, res){
    try {
        await Article.deleteMany();
        res.send("Succesfully deleted all articles");
    } catch (error) {
        res.send(error.message);
    }
});


// requests for a specific article

app.route("/articles/:articleTitle")

.get(async function(req, res){
    try {
        const specificArticle = await Article.findOne({title: req.params.articleTitle});
        res.send(specificArticle);
    } catch (error) {
        res.send(error.message);
    }

})

.put(async function(req, res){
    try {
        const mongodbResponse = await Article.replaceOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content});
            res.send(mongodbResponse.acknowledged);
    } catch (error) {
        res.send(error.message);
    }
})

.patch(async function(req, res){
    try {
        const mongodbResponse = await Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body}
        );
        res.send(mongodbResponse.acknowledged)
    } catch (error) {
        res.send(error.message);
    }
})

.delete(async function(req, res){
    try {
        const mongodbResponse = await Article.deleteOne({title: req.params.articleTitle});
        res.send(mongodbResponse.acknowledged);
    } catch (error) {
        res.send(error.message);
    }
});

app.listen(3000, function(){
    console.log("Server running on port 3000");
})