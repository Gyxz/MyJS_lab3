const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/space_stations', function(req, res) {
    res.render('pages/space_stations');
});
router.get('/goods', function(req, res) {
    res.render('pages/goods');
});

router.get('/goodstoStations', function(req, res) {
    res.render('pages/GoodstoStations');
});

router.get('/goodstoPlanets', function(req, res) {
    res.render('pages/GoodstoPlanet');
});

router.get('/goodstoPlanetsLessThen30', function(req, res) {
    res.render('pages/GoodstoPlanet');
});

router.get('/goodstoStationsLessThen30', function(req, res) {
    res.render('pages/GoodstoStations');
});

router.get('/planets', function(req, res) {
    res.render('pages/planets');
});

module.exports = router;