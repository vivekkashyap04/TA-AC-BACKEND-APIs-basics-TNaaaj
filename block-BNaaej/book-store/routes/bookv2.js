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

  Book.findById(id)
    .populate('comment')
    .exec((err, book) => {
      if (err) return next(err);
      res.json({ book });
    });
});

//creating new comment

router.post('/comment/new', (req, res, next) => {
  req.body.bookId = req.session.userId;
  Comment.create(req.body, (err, createdComment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { comments: createdComment.id },
      },
      (err, updatedUser) => {
        res.json({ updatedUser });
      }
    );
  });
});

//edit a comment

router.get('/comment/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.json({ comment });
  });
});

router.put('/comment/:id/edit', (req, res, next) => {
  let id = req.params.id;

  Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
    if (err) return next(err);
    res.json({ updatedComment });
  });
});

//delete a comment
router.delete('/comment/:id/delete', (req, res, next) => {
  let id = req.params.id;

  Comment.findByIdAndDelete(id, (err, data) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      data.bookId,
      {
        $pull: { comments: data.id },
      },
      (err, updatedUser) => {
        if (err) return next(err);
        res.json({ data });
      }
    );
  });
});

module.exports = router;
