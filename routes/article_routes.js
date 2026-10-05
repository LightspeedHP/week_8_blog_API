const express = require("express");
const router = express.Router();
const {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} = require("../controllers/article_controller");

router.post('/articles', postArticle);

router.get('/articles/', getAllArticles);

router.get('/articles/:id', getArticleById);

router.put('/articles/:id', updateArticle);

router.delete('/articles/:id', deleteArticle);

module.exports = router;