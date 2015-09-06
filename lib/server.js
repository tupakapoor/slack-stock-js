var config = require('./config');

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection(config.get('/SERVER'));

var plugins = fs.readdirSync(path.resolve(__dirname, '..', 'routes'));
// Create tables if they dont exist
require('../models').createRelations();

_.forEach(plugins, function eachPlugin(plugin) {
  plugin = require(path.resolve(__dirname, '..', 'routes', plugin));

  server.register(plugin, { 
    routes: { 
      prefix: plugin.routePrefix
    }
  }, function registerPluginCallback(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});

module.exports = server;
