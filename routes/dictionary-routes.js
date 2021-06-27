const express = require('express');
const { check } = require('express-validator');

const dictionaryControllers = require('../controllers/dictionary-controller');
const router = express.Router();

router.post(
    '/',
    [
        check('metadata')
            .not()
            .isEmpty(),

        check('results')
            .not()
            .isEmpty()
    ],
    dictionaryControllers.createWord
);

router.get('/:wid', dictionaryControllers.getWordById);
router.get('/', dictionaryControllers.getWordList);
router.get('/search/:word', dictionaryControllers.searchWord);

module.exports = router;