var express = require('express');
var router = express.Router();

/* GET users listing. */
let Book = [];
router.get('/', function (req, res, next) {
  Book.find({}, (err, data) => {
    res.status(200).json({ data });
  });
});
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Book.findById(id)
    .populate('comment')
    .exec((err, data) => {
      res.status(200).json({ data });
    });
});

router.post('/', function (req, res, next) {
  Book.create(req.body, (err, data) => {
    res.status(200).json({ data });
  });
});

router.put('/:id', function (req, res, next) {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, data) => {
    res.status(200).json({ data });
  });
});

router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, data) => {
    Comment.deleteMany({ userId: id }, (err, info));
    res.status(200).json({ info });
  });
});

module.exports = router;
