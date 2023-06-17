const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
})

module.exports = mongoose.model('Book', bookSchema) // mongoose model gonna create a Book collection for us based on the the bookSchema that we have already created 
