exports.findOrCreate = function (data, done) {
    console.log("find and create");
    /* GOOGLE OPENID */
    if (data.openId) {
        User.all({
            where: {
                googleId: data.openId
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            console.log("create user");
            User.create({
                username: data.profile.displayName,
                email: data.profile.emails[0].value,
                googleId: data.openId
            }, done);
        });
    } 

};

exports.verifyPassword = function (password, user_password) {
    if(!password && !user_password){
	return false;
    } 
    if(password == user_password){
	return true;
    } 
    return false;
}