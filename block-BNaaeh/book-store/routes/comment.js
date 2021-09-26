var express = require('express');
var router = express.Router();

let comment = [];

router.get('/', function (req, res, next) {
    Comment.find({}, (err, data) => {
      res.status(200).json({ data });
    });
  });
  router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Comment.findById(id, (err, data) => {
      res.status(200).json({ data });
    });
  });
  
  router.post('/', function (req, res, next) {
    req.body.userId = req.session.userId;  
    Comment.create(req.body, (err, data) => {
      res.status(200).json({ data });
    });
  });



router.put('/:id', function (req, res, next) {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, data) => {
    res.status(200).json({ data });
  });
});

router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err, data) => {
    Book.findByIdAndUpdate(
      data.userId,
      { $pull: { commentId: data.id } },
      (err, info)
    );
    res.status(200).json({ info });
  });
});

module.exports = router;
