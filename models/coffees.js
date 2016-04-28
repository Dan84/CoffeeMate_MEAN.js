var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

var CoffeeMateSchema = new mongoose.Schema({
    coffeename: String,
    coffeeshop: String,
    price: Number,
    rating: {type: Number, default: 0},
    favourite: {type: Boolean, default: false},
    latitude: Number,
    longitude: Number,
    userId: String
});

module.exports = mongoose.model('Coffee', CoffeeMateSchema);