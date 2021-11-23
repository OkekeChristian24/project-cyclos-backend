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

// Routes
const userRouter = require('./api/users/user.router');
const shopRouter = require('./api/shops/shop.router');
const adminRouter = require('./api/admin/admin.router');
const categoryRouter = require('./api/categories/category.router');
const productRouter = require('./api/products/product.router');
const orderRouter = require('./api/orders/order.router');
// Routing
app.use('/api/users', userRouter);
app.use('/api/shops', shopRouter);
app.use('/api/admin', adminRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);



app.listen(process.env.PORT || 5000, console.log(`Server running on port ${process.env.PORT}`));
