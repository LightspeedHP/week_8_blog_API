const mongoose = require("mongoose");

articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    content: {
        type: String,
        required: true,
        minlength: 20
    },
    author: {
        type: String,
        default: "Guest"
    },
    subheadings:{
        type: String,
        minlength: 5
    },
    comment: {
        type: String,
        minlength: 5
    }
}, {timestamps: true});

module.exports = mongoose.model("ArticleModel", articleSchema);