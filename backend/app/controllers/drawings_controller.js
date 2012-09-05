load('application');

before(loadDrawing, {only: ['show', 'edit', 'update', 'destroy']});
skipBeforeFilter('protect from forgery',['create']);

action('new', function () {
    this.title = 'New drawing';
    this.drawing = new Drawing;
    render();
});

action(function create() {
    var theDraw = req.body.Drawing;
    theDraw.createDate = new Date();
    theDraw.updateDate = new Date();
    Drawing.create(theDraw, function (err, drawing) {
        send({id:drawing.id});
        return;
        respondTo(function (format) {
            format.html(function(){
                if (err) {
                    flash('error', 'Drawing can not be created');
                    render('new', {
                        drawing: drawing,
                        title: 'New drawing'
                    });
                } else {
                    flash('info', 'Drawing created');
                    redirect(path_to.drawings());
                }
            });
            format.json(function () {
                send({id:drawing.id});
            }.bind(this));
        });
    });
});

action(function index() {
    this.title = 'Drawings index';
    Drawing.all(function (err, drawings) {
        render({
            drawings: drawings
        });
    });
});

action(function show() {
    this.title = 'Drawing show';
    respondTo(function (format) {
        format.html(render);
        format.json(function () {
            var drawing = this.drawing;
            drawing.data = JSON.parse(drawing.data);
            send(drawing);
        }.bind(this));
    }.bind(this));
});

action(function edit() {
    this.title = 'Drawing edit';
    render();
});

action(function update() {
    this.drawing.updateAttributes(body.Drawing, function (err) {
        if (!err) {
            flash('info', 'Drawing updated');
            redirect(path_to.drawing(this.drawing));
        } else {
            flash('error', 'Drawing can not be updated');
            this.title = 'Edit drawing details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.drawing.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy drawing');
        } else {
            flash('info', 'Drawing successfully removed');
        }
        send("'" + path_to.drawings() + "'");
    });
});

function loadDrawing() {
    Drawing.find(params.id, function (err, drawing) {
        if (err || !drawing) {
            redirect(path_to.drawings());
        } else {
            this.drawing = drawing;
            next();
        }
    }.bind(this));
}
