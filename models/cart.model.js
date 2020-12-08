const  mongoose = require('mongoose');

var session = new mongoose.Schema({
    cart: {
        proId: String,
        sum: Number
    }
});

var session = mongoose.model('session', session, 'session');

module.exports = product;