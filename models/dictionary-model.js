const mongoose = require('mongoose');

const dictionarySchema = new mongoose.Schema({
    metadata: {
        operation: { type: String },
        provider: { type: String },
        schema: { type: String }
    },
    results: [{
        id: { type: String, required: true },
        language: { type: String, required: true },
        lexicalEntries: [{
            entries: [{
                homographNumber: { type: String },
                senses: [{
                    definitions: [String],
                    id: { type: String },
                    subsenses: [{
                        definitions: [String],
                        id: { type: String }
                    }]
                }],
                language: { type: String },
                lexicalCategory: {
                    id: { type: String },
                    text: { type: String }
                },
                text: { type: String }
            }],
            type: { type: String },
            word: { type: String }
        }],
        type: { type: String },
        word: { type: String, required: true }
    }],
    word: { type: String, required: true }

});

module.exports = mongoose.model("Dictionay", dictionarySchema)