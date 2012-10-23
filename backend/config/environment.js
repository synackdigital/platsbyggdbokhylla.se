var express = require('express');
var rwps = require('railway-passport');

//var passport = require('passport');
var crypto = require('crypto');
//var LocalStrategy = require('passport-local').Strategy;

app.configure(function(){
    var cwd = process.cwd();

    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('view engine', 'ejs');
    app.set('view options', {complexNames: true});
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session({secret: 'secret'}));
    app.use(express.methodOverride());

    rwps.init();
    // hook up user model
    process.nextTick(function () {
        rwps.loadUser(User);
    });
    
    app.use(app.router);
});

