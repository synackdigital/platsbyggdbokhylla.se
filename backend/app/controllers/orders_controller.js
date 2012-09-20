load('application');

before(loadOrder, {only: ['show', 'edit', 'update', 'destroy']});
skipBeforeFilter('protect from forgery',['create']);

action('new', function () {
    this.title = 'New order';
    this.order = new Order;
    render();
});

action(function create() {
    var theOrder = req.body.Order;
    theOrder.createDate = new Date();
    theOrder.updateDate = new Date();
    theOrder.new = true;
    theOrder.status = "new";
    Order.create(theOrder, function (err, order) {
        respondTo(function (format) {
            format.html(function(){
                if (err) {
                    flash('error', 'Order can not be created');
                    render('new', {
                        order: order,
                        title: 'New order'
                    });
                } else {
                    flash('info', 'Order created');
                    redirect(path_to.orders());
                }
            });
            format.json(function () {
                if (err) {
                    send({status:"error"});
                } else {
                    send({status:"success"});    
                }
            }.bind(this));
        });
    });
});

action(function index() {
    this.title = 'Orders index';
    Order.all(function (err, orders) {
        render({
            orders: orders
        });
    });
});

action(function show() {
    this.title = 'Order show';
    render();
});

action(function edit() {
    this.title = 'Order edit';
    render();
});

action(function update() {
    this.order.updateAttributes(body.Order, function (err) {
        if (!err) {
            flash('info', 'Order updated');
            redirect(path_to.order(this.order));
        } else {
            flash('error', 'Order can not be updated');
            this.title = 'Edit order details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.order.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy order');
        } else {
            flash('info', 'Order successfully removed');
        }
        send("'" + path_to.orders() + "'");
    });
});

function loadOrder() {
    Order.find(params.id, function (err, order) {
        if (err || !order) {
            redirect(path_to.orders());
        } else {
            this.order = order;
            next();
        }
    }.bind(this));
}
