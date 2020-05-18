var express = require('express');
var router = express.Router();

// GET /goodsto_planets
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('goodstoPlanets');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /goodsto_Planets/{id}
router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('goodstoPlanets');
    var goodstoPlanetId = req.params.id;
    collection.findOne({id: goodstoPlanetId}, {}, function (e, docs) {
        res.json(docs);
    });
});


// POST /goodsto_Planets
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('goodstoPlanets');
    var planets = db.get('planets');
    var goods= db.get('goods');
    let result={};
    var b = true;

    planets.findOne({ id: req.body.planet }, {}, function (e, docs) {
        return !!docs;
    }).then(function(goodstoPlanetsExists) {
            if (goodstoPlanetsExists) {
                goods.findOne({ id: req.body.goods }, {}, function (e, docs) {
                    return !!docs;
                }).then(function(goodstoPlanetsExists) {
                    if (goodstoPlanetsExists) {
                        collection.findOne({ id: req.body.id }, {}, function (e, docs) {
                            return !!docs;
                        }).then(function(goodstoPlanetsExists) {
                            if (goodstoPlanetsExists) {
                                res.send(`Вантаж на планеті з id ${req.body.id} вже існує`);
                            } else {
                                collection.find({}).then((docs) => {
                                    docs.forEach((value) => {
                                        result[value.planet] = result[value.planet] + 1 || 1;

                                    });

                                });

                                planets.find({}).then((docs) => {
                                    docs.forEach((value)=> {

                                        for (let key in result) {

                                            if (value.id==req.body.planet && value.id== key && +value.capacity <= result[key]) {
                                                b=false;
                                                break;
                                            }
                                        }

                                    })
                                    if(b) {
                                        var goodstoPlanet = {
                                            id: req.body.id,
                                            planet: req.body.planet,
                                            goods: req.body.goods
                                        };
                                        collection.insert(goodstoPlanet, function (e, docs) {
                                            if (e) {
                                                res.send(e);
                                            } else {
                                                
                                                res.send(`Успішно створений вантаж на планеті з id ${goodstoPlanet.id}`);
                                            }
                                        });
                                    }else{
                                        res.send(`На планеті з id ${req.body.planet} немає місця для вантажу!`);
                                    }

                                });
                            }
                        });
                    }
                    else
                    {
                        res.send(`Вантажу з id ${req.body.goods} не існує`);
                    }})
            }
            else
            {
                res.send(`Планети з id ${req.body.planet} не існує`);
            }
        }
    );

});

// PUT /goodsto_Planets
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('goodstoPlanets');
    var goodstoPlanet = {
        id: req.body.id,
        planet: req.body.planet,
        goods: req.body.goods
    };
    collection.update({ id: goodstoPlanet.id }, goodstoPlanet, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully updated goods on Planet with id [${goodstoPlanet.id}]`);
        }
    });
});

// DELETE /goodsto_Planets/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('goodstoPlanets');
    var goodstoPlanetId = req.params.id;
    collection.remove({ id: goodstoPlanetId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Successfully deleted goods on Planet with id ${goodstoPlanetId}`);
        }
    });
});

module.exports = router;