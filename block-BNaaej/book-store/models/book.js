let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: String,
  author: String,
  description: String,
  categories: [String],
  tags: [String],
  comments: { type: mongoose.Types.ObjectId, ref: 'Comment' },
});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
