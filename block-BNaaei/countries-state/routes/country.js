var express = require('express');
var router = express.Router();
var Country = require('../modles/countries');
var State = require('../modles/state');

/* GET home page. */
router.get('/asc', function (req, res, next) {
  Country.find({})
    .sort({ name: 'asc' })
    .exec((err, data) => {
      res.json({ data });
    });
});

router.get('/population', function (req, res, next) {
  Country.find({})
    .sort({ population: 'asc' })
    .exec((err, data) => {
      res.json({ data });
    });
});

router.get('/continent', function (req, res, next) {
  Country.find({})
    .sort({ continent: 'asc' })
    .exec((err, data) => {
      res.json({ data });
    });
});

router.get('/desc', function (req, res, next) {
  Country.find({})
    .sort({ name: 'desc' })
    .exec((err, data) => {
      res.json({ data });
    });
});

router.put('/country', (req, res, next) => {
  let query = {};
  if (req.query.country) {
    query.country = req.query.country;
  }
  Country.find(query)
    .populate('neighbouring_country')
    .exec((err, data) => {
      res.json(data);
    });
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  Country.findByIdAndUpdate(id, req.body, (err, data) => {
    res.json({ data });
  });
});

router.delete('/:id', (req, res, next) => {
  var id = req.params.id;
  Country.findByIdAndDelete(id, req.body, (err, data) => {
    State.deleteMany({ country: id }, (err, info));
    res.json({ info });
  });
});

router.get('/relegion', (req, res, next) => {
  Country.aggregate([
    { $group: { _id: '$relegion', count: { $sum: 1 } } },
  ]).exec((err, data) => {
    res.json(data);
  });
});

module.exports = router;
