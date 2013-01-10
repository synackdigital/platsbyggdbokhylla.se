var passport = require("passport");

load('application');
skipBeforeFilter("auth",{only:["index", "status"]});

action(function index() {
    this.title = 'Platsbyggdbokhylla.se Admin';
    this.user = {};
    render();
});

action(function status() {
    if (session.passport.user) {
    	send({online:true,user:session.passport.user});
    } else {
    	send({online:false});
    }
});