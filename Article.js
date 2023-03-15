const mongoose = require("mongoose");

const articleSchema = {
    title: String,
    content: String,
}

module.exports = mongoose.Schema("article", articleSchema);