const express = require('express')
const db = require('../connection/mongo.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
var routes = require("./../routes/routes")


var initApp = function () {

    var app = express();
    
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    console.log("version:", process.env.NODE_ENV);
    /* advance and easy way of setting cors */
    // app.use(cors());
    routes(app);
    return app;
};
module.exports = initApp;