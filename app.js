const express = require('express');
const mongoose = require('mongoose');
const assert = require('assert');
const cookieParser = require('cookie-parser');

// require router
// const userRoute = require('./route/user.route');
// const authRoute = require('./route/auth.route');
// const cartRoute = require('./route/cart.route');
const productRoute = require('./route/product.route');
// const categoryRoute = require('./route/category.route');

//middleware
// const authMiddleware = require('./middleware/auth.middleware');
// const sissionMiddleware = require('./middleware/session.middleware');

const app = express();

const port = process.env.PORT || 8080;
const hostname = 'localhost';

mongoose.connect('mongodb+srv://myDB:Tuan261197@m0.nc9vh.gcp.mongodb.net/MyDB', {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log('Connect to mongodb success'))
    .catch(error => console.log('Connect to mongodb false !', error));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
});

// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('wed23fhkj545iew76wuh234w'));
app.use(express.static('public'));
// app.use(sissionMiddleware);

//use router
// app.use('/auth', authRoute);
// app.use('/category', categoryRoute);
// app.use('/cart', cartRoute);
// app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/product', productRoute);

//port listen
app.listen(port, hostname, () => {
    console.log(`server listening on http://${hostname}:${port}`);
});