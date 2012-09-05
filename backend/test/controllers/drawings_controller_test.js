require('../test_helper.js').controller('drawings', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        createDate: '',
        updateDate: '',
        data: ''
    };
}

exports['drawings controller'] = {

    'GET new': function (test) {
        test.get('/drawings/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/drawings', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Drawing.find;
        Drawing.find = sinon.spy(function (id, callback) {
            callback(null, new Drawing);
        });
        test.get('/drawings/42/edit', function () {
            test.ok(Drawing.find.calledWith('42'));
            Drawing.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Drawing.find;
        Drawing.find = sinon.spy(function (id, callback) {
            callback(null, new Drawing);
        });
        test.get('/drawings/42', function (req, res) {
            test.ok(Drawing.find.calledWith('42'));
            Drawing.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var drawing = new ValidAttributes;
        var create = Drawing.create;
        Drawing.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, drawing);
            callback(null, drawing);
        });
        test.post('/drawings', {Drawing: drawing}, function () {
            test.redirect('/drawings');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var drawing = new ValidAttributes;
        var create = Drawing.create;
        Drawing.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, drawing);
            callback(new Error, drawing);
        });
        test.post('/drawings', {Drawing: drawing}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Drawing.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/drawings/1', new ValidAttributes, function () {
            test.redirect('/drawings/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Drawing.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/drawings/1', new ValidAttributes, function () {
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

