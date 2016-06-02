var express = require('express');
var Airport = require('../models/airport');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Airport.find(function(err, airports) {
      if (err) return res.status(500).send(err);
      res.send(airports);
    });
  })
  .post(function(req, res) {
    Airport.create(req.body, function(err, airport) {
      if (err) return res.status(500).send(err);
      res.send(airport);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Airport.findById(req.params.id, function(err, airport) {
      if (err) return res.status(500).send(err);
      res.send(airport);
    });
  })
  .put(function(req, res) {
    Airport.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Airport.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;
