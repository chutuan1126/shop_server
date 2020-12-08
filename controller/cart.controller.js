const db = require('../db');
// const session = require('../models/cart.model');

// module.exports.cart = (req, res) => {
//     var cart = db.get('session').get('cart').value();
//     res.render('users/cart', {cart: cart});
// }

module.exports.addToCart = (req, res) => {
    let productId = req.params.productId;
    let sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/');
        return;
    }
    var cout = db
        .get('session')
        .find({ id: sessionId })
        .get('cart.' + productId, 0)
        .value();

    db.get('session')
        .find({ id: sessionId })
        .set('cart.' + productId, cout + 1)
        .write();
    res.redirect('/');
};