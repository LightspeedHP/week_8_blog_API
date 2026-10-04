const Joi = require("joi");
const ArticleModel = require("./models/article_model")

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
        const Articles = await ArticleModel.find({}).limit(limit).skip(skip)
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
    } catch (error) {
        next(error)
    }
}