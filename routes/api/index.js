var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports.routePrefix = '/v1';

module.exports.register = function registerFixturePlugin(server, options, next) {
  // require(path.resolve(__dirname, 'auth'))(server, function(err) {
  //   if (err) {
  //     console.log('failed to register auth');
  //     process.exit(1);
  //   }

    var routes = [];

    var routeFiles = fs.readdirSync(path.resolve(__dirname));
    routeFiles = _.without(routeFiles, 'index.js');

    _.forEach(routeFiles, function iterateRouteFiles(file) {
      routes.push(require(path.resolve(__dirname, file)).routes);
    });

    routes = _.flatten(routes);
    if (routes.length) {
      server.route(routes);
      _.forEach(routes, function iterateRoutes(route) {
        console.log('Registered route ' + route.method + ' ' + route.path);
      });
    }

    next();
  //});
}

module.exports.register.attributes = {
  name: 'v1',
  version: require(path.resolve(__dirname, '..', '..', 'package.json')).version
}
