var Joi = require('joi');
var bookshelf = require('../lib/bookshelf');

var TABLE_NAME = 'portfolios';
module.exports.TABLE_NAME = TABLE_NAME;

var Portfolio = bookshelf.Model.extend({
  tableName: TABLE_NAME
});
module.exports.Model = Portfolio;

var DatabaseSchema = function(table) {
  table.timestamp('created_at').defaultTo(bookshelf.knex.raw('now()'));
  table.timestamp('updated_at').defaultTo(bookshelf.knex.raw('now()'));
  table.increments('id').primary();
  table.string('name');
  table.json('owners');
  table.json('symbols');
}
module.exports.DatabaseSchema = DatabaseSchema;

var ValidationSchema = {
  name: Joi.string().required(),
  owners: Joi.array().required(),
  symbols: Joi.array().required()
};
module.exports.ValidationSchema = ValidationSchema;

module.exports.validate = function validate(object, callback) {
  Joi.validate(object, ValidationSchema, { stripUnknown: true }, function validationResponse(error, value) {
    return callback(error, value);
  });
};
