var Coffee = require('../models/coffees');
var express = require('express');
var router = express.Router();


router.findAll = function(req, res) {

    Coffee.find({"userId": req.params.id},function(err, coffees) {
        if (err)
            res.send(err);

        res.json(coffees);
    });
}


router.findOne = function(req, res) {

    Coffee.find({ "_id" : req.params.id },function(err, coffee) {
        if (err)
            res.json({ message: 'Coffee NOT Found!', errmsg : err } );
        else
            res.json(coffee);
    });
}


router.addCoffee = function(req, res) {

    var coffee = new Coffee();

    coffee.coffeename = req.body.coffeename;
    coffee.coffeeshop = req.body.coffeeshop;
    coffee.price = req.body.price;
    coffee.latitude = req.body.latitude;
    coffee.longitude = req.body.longitude;
    coffee.userId = req.body.userId;


    console.log('Adding your Coffee: ' + JSON.stringify(coffee));


    coffee.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Coffee Added!', data: coffee });
    });
}



router.updateCoffee = function(req, res) {
    Coffee.findById(req.params.id, function(err,coffee) {
        coffee.coffeename = req.body.coffeename;
        coffee.coffeeshop = req.body.coffeeshop;
        coffee.price = req.body.price;
        coffee.rating = req.body.rating;
        coffee.favourite = req.body.favourite;


        if (err)
            res.send(err);
        else {

            coffee.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Coffee Updated!', data: coffee });
            });
        }
    });
}


router.deleteCoffee = function(req, res) {
    Coffee.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Coffee Deleted!'});
    });
}

function getByValue(arr, id) {

    var result  = arr.filter(function(o){return o.id == id;} );

    return result ? result[0] : null;
}

module.exports = router;