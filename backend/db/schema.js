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
    property('comment', String);
});var Drawing = describe('Drawing', function () {
    property('createDate', Date);
    property('updateDate', Date);
    property('data', String);
});var Drawing = describe('Drawing', function () {
    property('createDate', Date);
    property('updateDate', Date);
    property('data', String);
});