var express = require('express');
var router = express.Router();

// GET /goods
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('goods');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

// GET /goods/{id}

router.get('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('goods');
    var goodsId = req.params.id;
    collection.findOne({ id: goodsId }).then(function(goodsExists) {
        if (goodsExists) {
            res.send(`Вантаж з id ${goodsId} існує`);
        } else{
            res.send(`Вантаж з id ${goodsId} не існує`);
        }

    });
});

router.post('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('goods');
    var goodsId = req.params.id;
    var goods = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        mass: req.body.mass,
    }
    collection.update({ id:goodsId  }, { $set: { code: goods.code, name:goods.name,mass:goods.mass } }).then((result) => {
        res.send(`Успішно оновлено вантаж з id ${goods.id} `);
    })
});

// POST /goods
router.post('/', function (req, res) {
    var db = req.db;
    var collection = db.get('goods');
    collection.findOne({ id: req.body.id }, {}, function (e, docs) {
        return !!docs;
    }).then(function(goodsExists) {
        if (goodsExists) {
            res.send(`Вантаж з id ${req.body.id} вже існує`);
        } else {
            var goods = {
                id: req.body.id,
                code: req.body.code,
                name: req.body.name,
                mass: req.body.mass,
            };
            collection.insert(goods, function (e, docs) {
                if (e) {
                    res.send(e);
                } else {
                    res.send(`Успішно створено вантаж з id ${goods.id}`);
                }
            });
        }
    });
});

// PUT /goods
router.put('/', function (req, res) {
    var db = req.db;
    var collection = db.get('goods');
    var goods = {
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        mass: req.body.mass
    };
    collection.update({ id: goods.id }, goods, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно оновлено вантаж з id [${goods.id}]`);
        }
    });
});

// DELETE /goods/{id}
router.delete('/:id', function (req, res) {
    var db = req.db;
    var collection = db.get('goods');
    var goodsId = req.params.id;
    collection.remove({ id: goodsId }, {}, function (e, docs) {
        if (e) {
            res.send(e);
        } else {
            res.send(`Успішно видалено вантаж з id ${goodsId}`);
        }
    });
});

module.exports = router;