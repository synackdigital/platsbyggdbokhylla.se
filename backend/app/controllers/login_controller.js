var passport = require("passport");

load('application');
skipBeforeFilter("auth",{only:["index"]});

action(function index() {
    this.title = 'Platsbyggdbokhylla.se Admin';
    this.user = {};
    render();
});
action(function post() {
	this.title = 'Platsbyggdbokhylla.se Admin';
    this.user = {};
    render();
});
