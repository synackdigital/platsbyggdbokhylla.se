load('application');

before(loadOrder, {only: ['index']});

action('index', function () {
    render({
        title: "dashboard#index"
    });
});
function loadOrder() {
	this.orderCount = 0;
	this.orderCountNew = 0;
	this.drawingCount = 0;
	Order.count({}, function(err,count) {
    	this.orderCount = count;
    	Order.count({new:true}, function(err,count) {
	    	this.orderCountNew = count;
    		Drawing.count({}, function(err,count) {
		    	this.drawingCount = count;
	    		next();
		    }.bind(this));
	    }.bind(this));
    }.bind(this));
}