const HttpError = require('../models/http-error');
const Dictionay = require('../models/dictionary-model');
const { validationResult } = require('express-validator');

const createWord = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    const { metadata, results, word } = req.body;

    const createWord = new Dictionay({
        metadata,
        results,
        word
    });

    try {
        await createWord.save();
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }
    res.status(201).json({ word: createWord });
};

const getWordById = async (req, res, next) => {
    const wordId = req.params.wid;
    let word;
    try {
        words = await Dictionay.findById(wordId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the word',
            500
        );
        return next(error);
    }

    if (!words) {
        const error = new HttpError(
            'Could not find a word for the provided id',
            404
        );
        return next(error);
    }
    res.json({ words: words.toObject({ getters: true }) });

}


const searchWord = async (req, res, next) => {
    const wordForSearch = req.params.word;
    let word;
    try {
        words = await Dictionay.find({ word: wordForSearch });
        console.log("serached word one----------------", words.length)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the word which you are finding',
            500
        );
        return next(error);
    }

    if (words.length === 0) {
        const error = new HttpError(
            'Could not find a word for the provided id',
            404
        );
        return next(error);
    }
    res.json({ words: words.map(word => word.toObject({ getters: true })) });

}

const getWordList = async (req, res, next) => {

    let words;
    try {
        words = await Dictionay.find({});
        console.log("vishal data--------------------", words)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the word',
            500
        );
        return next(error);
    }

    // if (!word) {
    //     const error = new HttpError(
    //         'Could not find a word for the provided id',
    //         404
    //     );
    //     return next(error);
    // }
    console.log("from json ------ test")
    res.json({ words: words.map(word => word.toObject({ getters: true })) });

}

exports.createWord = createWord;
exports.getWordById = getWordById;
exports.getWordList = getWordList;
exports.searchWord = searchWord;