var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.configure(function(){
    var cwd = process.cwd();

    // init passport
    //rwps.init();
    // hook up user model
    //process.nextTick(function () {
      //  rwps.loadUser(User);
    //});

    passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Unknown user' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Invalid password' });
          }
          return done(null, user);
        });
      }
    ));

    
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('view engine', 'ejs');
    app.set('view options', {complexNames: true});
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session({secret: 'secret'}));
    app.use(express.methodOverride());
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(app.router);
});

