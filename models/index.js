var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var bookshelf = require('../lib/bookshelf');


function createRelations() {
  var models = _.without(fs.readdirSync(path.resolve(__dirname)), 'index.js');

  _.forEach(models, function eachModel(model) {
    model = require(path.resolve(__dirname, model));

    bookshelf.knex.schema.hasTable(model.TABLE_NAME).then(function hasTable(exists) {
      if (!exists) {
        return bookshelf.knex.schema.createTable(model.TABLE_NAME, model.DatabaseSchema);
      }
    });
  });
}
module.exports.createRelations = createRelations;
