//var passport = require("passport");

before('protect from forgery', function () {
    protectFromForgery('4a928c31a3efa9fe4031e2b06d677515b3f2848f');
});

/**
function requireLogin() {
	//passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
	passport.authenticate('local', function(err, user, info) {
      console.log("authenticate")
    	if (err) { return next(err) }
    	if (!user) { return res.redirect('/login') }
    	req.logIn(user, function(err) {
      		if (err) { return next(err); }
      		return res.redirect('/users/' + user.username);
    	});
  	})(req, res, next);
}

before("auth",requireLogin);
**/