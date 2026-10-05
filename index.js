require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db")
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error_handler');
const router = require("./routes/article_routes");
const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use(logger);

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})