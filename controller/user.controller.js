const user = require('../models/user.model');
const assert = require('assert');

module.exports.users = (req, res) => {
    user.find({}, (err, users) => {
        assert.equal(null, err);
        res.render('users/users', { users: users });
    });
};

module.exports.view = (req, res) => {
    let id = req.params.id;
    user.findOne({ _id: id }, (err, user) => {
        assert.equal(null, err);
        res.render('users/view', { user: user });
    });
};

module.exports.postDelete = (req, res) => {
    let id = req.params.id;
    user.findByIdAndRemove({ _id: id }, (err, users) => {
        assert.equal(null, err);
        res.redirect('/users');
    });
};

module.exports.getEdit = (req, res) => {
    let id = req.params.id;
    user.findOne({ _id: id }, (err, user) => {
        assert.equal(null, err);
        res.render('users/edit', { user: user });
    });
};

module.exports.postEdit = (req, res) => {
    let id = req.params.id;

    let errors = [];

    let userName = req.body.userName;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    user.findOne({ _id: id }, (err, user) => {
        assert.equal(null, err);

        if (userName !== user.userName || oldPassword !== user.password) {
            errors.push("User name or password does not exist !");
        }

        if (newPassword !== req.body.confirmPassword || newPassword.length < 6) {
            errors.push("Password must be more than 6 characters and Password must match !");
        }

        if (errors.length) {
            res.render('users/edit', {
                errors: errors,
                userName: userName
            });
            return;
        }
    });

    user.findOneAndUpdate({ _id: id }, {
        $set: {
            userName: userName,
            password: newPassword,
            confirmPassword: newPassword
        }
    }, { new: true }, (err, user) => {
        assert.equal(null, err);
        res.redirect('/users');
    });
};