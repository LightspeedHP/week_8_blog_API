const Joi = require("joi");
const ArticleModel = require("../models/article_model")

const postArticle = async(req, res, next) => {
    const articleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(20).required(),
        author: Joi.string().default("Guest"),
        subheadings: Joi.string().default(""),
        comments: Joi.string().default("")
    })
     const {error, value} = articleSchema.validate(req.body);
     if(error){
        res.status(400).json({error: error})
     }
    try {
        const newArticle = new ArticleModel(value);
        await newArticle.save();
        res.status(201).json({
            message: "Article created",
            data: newArticle
        })
    } catch (error) {
        next(error)
    }
}

const getAllArticles = async(req, res, next) => {
    try {
        const {limit = 10, page = 1} = req.query;
        const skip = parseInt(page - 1) * limit;
        const Articles = await ArticleModel.find({}).sort({ createdAt: -1 }).limit(limit).skip(skip)
        res.status(200).json(Articles)
    } catch (error) {
        next(error)
    }
}

const getArticleById = async(req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);
        if(!article){
            res.status(404).json({message: "Article not found"})
        }
        res.status(200).json({
            message: "Article found",
            data: article
        })
    } catch (error) {
        next(error)
    }
}

const updateArticle = async(req, res, next) => {
    const articleSchema = Joi.object({
        title: Joi.string().min(5),
        content: Joi.string().min(20),
        author: Joi.string(),
        subheadings: Joi.string(),
        comments: Joi.string() 
    })
    try {
        const update = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!update){
            res.status(404).json({message: "Article not found"})
        }
        res.status(200).json({
            message: "Article updated",
            data: update
        })
    } catch (error) {
        next(error)
    }
}

const deleteArticle = async(res, req, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id);
        if(!article){
            res.status(404).json({message: "Article not found"})
        }
        res.status(200).json({
            message: "Article deleted",
            data: article
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
}