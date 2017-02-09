'use strict'

// var conf 	= require('../conf');
var Authorization = require('./authController');
var upload = require('./uploadController').init();

module.exports = function (app) {

    app.get('*', Authorization.isLoggedIn);

    app.get('/', function (req, res) {
        res.render('mainPage');
    });

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.get('/logout', Authorization.loggout);

    app.post('/login', Authorization.checkAuthorisation);


    app.all('/editor/*', Authorization.isEditor); // Проверка роли редактора

    app.get('/editor/addNews', function (req, res) {
        res.render('addNews');
    });

    app.post('/editor/addNews', upload.any(), function (req, res) {
        console.log(req.files);
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
    })
}
