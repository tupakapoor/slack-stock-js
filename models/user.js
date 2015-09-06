var Joi = require('joi');
var bookshelf = require('../lib/bookshelf');

var TABLE_NAME = 'users';
module.exports.TABLE_NAME = TABLE_NAME;

var User = bookshelf.Model.extend({
  tableName: TABLE_NAME
});
module.exports.Model = User;

var DatabaseSchema = function(table) {
  table.timestamp('created_at').defaultTo(bookshelf.knex.raw('now()'));
  table.timestamp('updated_at').defaultTo(bookshelf.knex.raw('now()'));
  table.increments('id').primary();
  table.string('name');
  table.string('email');
  table.string('password');
  table.string('token');
  table.string('organization_name');
  table.string('slack_user_name');
}
module.exports.DatabaseSchema = DatabaseSchema;

var ValidationSchema = {
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  token: Joi.string().required(),
  organization_name: Joi.string().required(),
  slack_user_name: Joi.string()
};
module.exports.ValidationSchema = ValidationSchema;

module.exports.validate = function validate(object, callback) {
  Joi.validate(object, ValidationSchema, { stripUnknown: true }, function validationResponse(error, value) {
    return callback(error, value);
  });
};
