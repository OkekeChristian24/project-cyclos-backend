require('dotenv').config();
const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const multer = require('multer');
const connectFlash = require('connect-flash');
const path = require("path");
const { sessionStore } = require('./config/database');

const app = express();

// Load config
dotenv.config({path: './config/config.env'});

// Cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: process.env.ENV === 'PRODUCTION',
        maxAge: 1000 * 60 * 24 // 86400000 1 day
    }
}));

//Enable flash message
app.use(connectFlash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(cors({ origin: "*" }));
app.use('/uploads', express.static('uploads'));

// Routing
app.use('/api/users', require('./api/users/user.router'));
// app.use('/api/shops', require('./api/shops/shop.router'));
app.use('/api/admin', require('./api/admin/admin.router'));
// app.use('/api/categories', require('./api/categories/category.router'));
// app.use('/api/products', require('./api/products/product.router'));
app.use('/api/unsorted', require('./api/unsortedQuotations/unsortedQuotation.router'));
app.use('/api/sorted', require('./api/sortedQuotations/sortedQuotation.router'));
app.use('/api/orders', require('./api/orders/order.router'));



app.listen(process.env.PORT || 5000, console.log(`Server running on port ${process.env.PORT}`));
