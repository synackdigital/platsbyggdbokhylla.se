require('../test_helper.js').controller('orders', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        new: '',
        createDate: '',
        updateDate: '',
        name: '',
        email: '',
        phone: '',
        adress: '',
        zip: '',
        city: '',
        wantsfunding: '',
        drawing: '',
        status: '',
        comment: ''
    };
}

exports['orders controller'] = {

    'GET new': function (test) {
        test.get('/orders/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/orders', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Order.find;
        Order.find = sinon.spy(function (id, callback) {
            callback(null, new Order);
        });
        test.get('/orders/42/edit', function () {
            test.ok(Order.find.calledWith('42'));
            Order.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Order.find;
        Order.find = sinon.spy(function (id, callback) {
            callback(null, new Order);
        });
        test.get('/orders/42', function (req, res) {
            test.ok(Order.find.calledWith('42'));
            Order.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var order = new ValidAttributes;
        var create = Order.create;
        Order.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, order);
            callback(null, order);
        });
        test.post('/orders', {Order: order}, function () {
            test.redirect('/orders');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var order = new ValidAttributes;
        var create = Order.create;
        Order.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, order);
            callback(new Error, order);
        });
        test.post('/orders', {Order: order}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Order.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/orders/1', new ValidAttributes, function () {
            test.redirect('/orders/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Order.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/orders/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

