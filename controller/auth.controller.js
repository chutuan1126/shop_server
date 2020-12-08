const user = require('../models/user.model');
const assert = require('assert');

module.exports.login = (req, res) => {
    res.render('auth/signUp');
};

module.exports.postLogin = (req, res) => {
    user.findOne({userName: req.body.userName}, (err, user) => {
        assert.equal(null, err);
        
        if(!user) {
            res.render('auth/signUp', {
                errors: [
                    "Vui lòng nhập email và mật khẩu."
                ],
                userName: req.body
            });
            return;
        }

        if(user.password !== req.body.password) {
            res.render('auth/signUp', {
                errors: [
                    "Vui lòng nhập mật khẩu."
                ],
                userName: req.body
            });
            return;
        }

        res.cookie('userId', user._id, {
            signed: true
        });
        res.redirect('/users');
    })
};

module.exports.postSignUp = (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    
    let errors = [];

    if(!userName) {
        errors.push("User name is require !");
    }
    if(!password) {
        errors.push("password is require !");
    }
    if(password !== confirmPassword) {
        errors.push("Password verification is not correct !");
    }

    if(errors.length) {
        res.render('auth/signUp', {
            errors: errors,
            userName: userName
        });
        return;
    }

    let data = {
        userName: userName,
        password: password,
        confirmPassword: confirmPassword
    }

    let newUse = new user(data);
    newUse.save();

    res.render('auth/signUpSuccess', {
    userName: userName
    });
};