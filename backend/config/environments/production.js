/**app.configure('production', function () {
    app.enable('view cache');
    app.enable('model cache');
    app.enable('eval cache');
    app.enable('merge javascripts');
    app.enable('merge stylesheets');
    app.disable('assets timestamps');
    app.use(require('express').errorHandler());
    app.settings.quiet = true;
});
**/
app.configure('production', function () {
    app.disable('view cache');
    app.disable('model cache');
    app.disable('eval cache');
    app.enable('log actions');
    app.enable('env info');
    app.use(require('express').errorHandler({ dumpExceptions: true, showStack: true }));
});

