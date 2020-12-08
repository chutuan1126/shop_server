const products = require('../models/product.model');
const assert = require('assert');

module.exports.getProducts = (req, res) => {
    const { code, size } = req.body;
    products.find({ sellerCategories: {$elemMatch: { id: { $in: code } }} }, (err, products) => {
        assert.equal(null, err);
        res.send(products);
    }).limit(size);
};

module.exports.product = (req, res) => {
    product.find({}, (err, products) => {
        assert.equal(null, err);
        res.send(products);
    });
};

module.exports.addProduct = (req, res) => {
    res.render('products/addProduct');
};

module.exports.postAddProduct = (req, res) => {
    let errors = [];

    if (!req.file) {
        errors.push("Product Avatar is not require !");
    }
    else {
        if (req.file.mimetype == "image/png" || req.file.mimetype == "image/jpg") {
            req.body.avatar = "/" + req.file.path.split('\\').slice(1).join('/') || "";
        }
        else {
            errors.push("The path must be an image have .jpg, .png format.");
        }
    }

    if (!req.body.proName) {
        errors.push("Product name is not require !");
    }
    if (!req.body.proContent) {
        errors.push("Content is not require !");
    }
    if (!req.body.proPrice) {
        errors.push("proPrice is not require !");
    }
    if (!req.body.proId) {
        errors.push("Product ID is not require !");
    }

    if (errors.length) {
        res.render('products/addProduct', {
            errors: errors,
            values: req.body
        });
        return;
    }

    let data = {
        proName: req.body.proName,
        proContent: req.body.proContent,
        proPrice: req.body.proPrice,
        proId: req.body.proId,
        avatar: req.body.avatar
    }

    var newProduct = new product(data);
    newProduct.save();

    res.redirect('/product');
};

module.exports.view = (req, res) => {
    let id = req.params.id;
    product.findById({ _id: id }, (err, product) => {
        assert.equal(null, err);
        res.render('products/view', { product: product });
    })
};

module.exports.postDelete = (req, res) => {
    let id = req.params.id;
    product.findOneAndDelete({ _id: id }, (err, product) => {
        assert.equal(null, err);
        res.redirect('/product');
    });
};

module.exports.getEdit = (req, res) => {
    let id = req.params.id;

    product.findById({ _id: id }, (err, product) => {
        assert.equal(null, err);
        res.render('products/edit', { product: product });
    });
};

module.exports.postEdit = (req, res) => {
    let id = req.params.id;

    if (!req.file) {
        errors.push("Product Avatar is not require !");
    }
    else {
        if (req.file.mimetype == "image/png" || req.file.mimetype == "image/jpg") {
            req.body.avatar = req.file.path.split('\\').slice(1).join('/') || "";
        }
        else {
            errors.push("The path must be an image have .jpg, .png format.");
        }
    }

    product.findByIdAndUpdate({ _id: id }, {
        $set: {
            proName: req.body.proName,
            proContent: req.body.proContent,
            proPrice: req.body.proPrice,
            proId: req.body.proId
        }
    }, { new: true }, (err, product) => {
        assert.equal(null, err);
        res.redirect('/product');
    });
};