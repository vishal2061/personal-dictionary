const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dictionaryRoutes = require('./routes/dictionary-routes');
const HttpError = require('./models/http-error');


const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');

    next();
})

app.use('/api/words', dictionaryRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.ulg0s.mongodb.net:27017,cluster0-shard-00-01.ulg0s.mongodb.net:27017,cluster0-shard-00-02.ulg0s.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-kzaa66-shard-0&authSource=admin&retryWrites=true&w=majority`)
    .then(() => app.listen(process.env.PORT || 5000))
    .catch(err => console.log(err))

