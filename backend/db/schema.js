/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var bcrypt = require("bcrypt"), SALT_WORK_FACTOR = 10;



var Drawing = describe('Drawing', function () {
    property('createDate', Date);
    property('updateDate', Date);
    property('data', String);
});var Order = describe('Order', function () {
    property('new', Boolean);
    property('createDate', Date);
    property('updateDate', Date);
    property('name', String);
    property('email', String);
    property('phone', String);
    property('adress', String);
    property('zip', String);
    property('city', String);
    property('wantsfunding', Boolean);
    property('drawing', String);
    property('status', String);
    property('usercomment',String);
    property('comment', String);
});var Drawing = describe('Drawing', function () {
    property('createDate', Date);
    property('updateDate', Date);
    property('data', String);
});var Drawing = describe('Drawing', function () {
    property('createDate', Date);
    property('updateDate', Date);
    property('data', String);
});var User = describe('User', function () {
    property('name', String);
    property('password', String);
});
/**
User.pre(save, function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});
User.methods.validPassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
**/