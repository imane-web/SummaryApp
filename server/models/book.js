const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = mongoose.Schema({
    writer: {
        type:String,
        
    },
    title: {
        type:String,
        maxlength:50,
    },
    date: {
        type: String,
    },
    category: {
        type: Number,
    },
    subcategory: {
        type: String,
    },
    
}, { timestamps: true })


const Book = mongoose.model('Book', bookSchema);

module.exports = { Book }