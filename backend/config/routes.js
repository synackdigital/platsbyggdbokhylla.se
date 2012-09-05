exports.routes = function (map) {
    map.root('dashboard#index');
    map.resources('drawings');
    map.resources('drawings');
    map.resources('orders');
    map.resources('drawings');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};