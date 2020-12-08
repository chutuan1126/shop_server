const  mongoose = require('mongoose');

var user = new mongoose.Schema({
    userName: String,
    password: String,
    confirmPassword: String,
    avatar: String
});

var user = mongoose.model('user', user, 'user');

module.exports = user;