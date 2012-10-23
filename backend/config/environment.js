var express = require('express');


//var passport = require('passport');
var crypto = require('crypto');
//var LocalStrategy = require('passport-local').Strategy;

app.configure(function(){
    var cwd = process.cwd();

    // init passport
    //rwps.init();
    // hook up user model
    //process.nextTick(function () {
      //  rwps.loadUser(User);
    //});
    /**
    passport.use(new LocalStrategy(
      function(username, password, done) {
        console.log("lookup user");
        console.log(username);
        User.findOne({ username: username }, function(err, user) {
          console.log("find one");
          if (err) { return done(err); }
          if (!user) {
            console.log("no user found");
            return done(null, false, { message: 'Unknown user' });
          }
          var shasum = crypto.createHash('sha1');
          shasum.update('platsbyggdftw' + password);
          var pw = shasum.digest('hex');
          console.log(pw);
          if(pw!=user.password){
            console.log("not valid password");
            return done(null, false, { message: 'Invalid password' });
          }
          console.log("valid user");
          return done(null, user);
        });
      }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findOne(id, function (err, user) {
        done(err, user);
      });
    });
  **/

    
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('view engine', 'ejs');
    app.set('view options', {complexNames: true});
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session({secret: 'secret'}));
    app.use(express.methodOverride());
    //app.use(passport.initialize());
    //app.use(passport.session());
    
    app.use(app.router);
});

