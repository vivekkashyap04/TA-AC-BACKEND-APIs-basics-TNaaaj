var express = require('express');
var Book = require('../models/Book');

var router = express.Router();

// GET list of all books
router.get('/', function (req, res, next) {
  Book.find({}, (err, books) => {
    if (err) return next(err);
    res.json({ books });
  });
});

//create a new book
router.post('/', (req, res, next) => {
  Book.create(req.body, (err, bookdata) => {
    if (err) return next(err);
    res.json({ bookdata });
  });
});

//update a book

router.put('/:id', (req, res, next) => {
  let id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, (err, bookdata) => {
    if (err) return next(err);
    res.json({ bookdata });
  });
});

//delete a book

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;

  Book.findByIdAndDelete(id, (err, bookdata) => {
    if (err) return next(err);
    res.json({ bookdata });
  });
});
//get book by id

router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.json({ book });
  });
});

module.exports = router;
