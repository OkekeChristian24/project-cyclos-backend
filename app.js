require('dotenv').config();
const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const cluster = require('cluster');
const os = require('os');
const multer = require('multer');
const connectFlash = require('connect-flash');
const path = require("path");
const { sessionStore } = require('./config/database');

const numCPUs = os.cpus().length;
const numOfForks = numCPUs > 2 ? numCPUs : 6;

// Load config
dotenv.config({path: './config/config.env'});

if(cluster.isMaster){
    for(let i = 0; i < numOfForks; i++){
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        cluster.fork();
    });
}else{

    const app = express();
    
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
            secure: process.env.NODE_ENV === 'PRODUCTION',
            maxAge: 1000 * 60 * 24 // 86400000 1 day
        }
    }));
    
    //Enable flash message
    app.use(connectFlash());
    
    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
      
    app.use(cors({ origin: "*" }));
    
    
    // Routing
    app.use('/api/user', require('./api/users/user.router'));
    app.use('/api/admin', require('./api/admin/admin.router'));
    app.use('/api/order', require('./api/orders/order.router'));
    app.use('/api/payment', require('./api/payments/payment.router'));
    app.use('/api/fee', require('./api/fees/fee.router'));
    app.use('/api/products', require('./api/products/product.router'));
    app.use('/api/shippings', require('./api/shippingDetails/shippingDetail.router'));
    
    
    
    // app.use('/api/sorter', require('./api/sorters/sorter.router'));
    
    
    // app.use('/api/shops', require('./api/shops/shop.router'));
    // app.use('/api/categories', require('./api/categories/category.router'));
    // app.use('/api/products', require('./api/products/product.router'));
    
    
    app.listen(process.env.PORT || 5000, console.log(`Server ${process.pid} running on port ${process.env.PORT}`));
}

