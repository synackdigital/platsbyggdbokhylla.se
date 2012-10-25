//var passport = require("passport");

before('protect from forgery', function () {
    protectFromForgery('4a928c31a3efa9fe4031e2b06d677515b3f2848f');
});

before("auth", function requireManager() {
    console.log("autj");
    if (!session.passport.user) {
        console.log("no session.passport.user");
        req.session.redirect = req.path;
        redirect('/login');
    } else {
        console.log("got session.passport.user");
        User.find(session.passport.user, function (err, user) {
            console.log("find user");
            console.log(user);
            console.log(user.email);
            if (user && user.access) {
                req.user = user;
                next();
            } else {
                flash('error', 'You have no permission to access this area');
                redirect('/login');
            }
        });
    }
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