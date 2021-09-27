var express = require('express');
var router = express.Router();
var State = require('../modles/state');

/* GET home page. */
router.get('/asc', function (req, res, next) {});

router.get('/asc', function (req, res, next) {
  State.find({})
    .sort({ name: 'asc' })
    .exec((err, data) => {
      res.json({ data });
    });
});

router.get('/desc', function (req, res, next) {
  State.find({})
    .sort({ name: 'desc' })
    .exec((err, data) => {
      res.json({ data });
    });
});

router.put('/state', (req, res, next) => {
  let query = {};
  if (req.query.country) {
    query.country = req.query.country;
  }
  State.find(query)
    .populate('neighbouring_states')
    .exec((err, data) => {
      res.json(data);
    });
});

router.post('/:id/update', (req, res, next) => {
  let id = req.params.id;

  State.findByIdAndUpdate(id, req.body, (err, updatedState) => {
    if (err) return next(err);
    res.json({ updatedState });
  });
});

//delete state

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;

  State.findByIdAndDelete(id, (err, info) => {
    if (err) return next(err);

    Country.findByIdAndUpdate(
      deletedState.country,
      {
        $pull: { states: deletedState.id },
      },
      (err, updatedInfo) => {
        if (err) return next(err);

        res.json({ info, updatedInfo });
      }
    );
  });
});

module.exports = router;
