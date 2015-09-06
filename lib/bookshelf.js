var config = require('./config');
var knex = require('knex')(config.get('/KNEX'));
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;