var Confidence = require('confidence');

var criteria = {
  env: process.env.NODE_ENV
};

var config = {
  ENV:{
    type: process.env.NODE_ENV || 'stage'
  },
  KNEX: {
    client: process.env.DB_TYPE || 'postgres',
    connection: process.env.DB_CONNECTION_URL || {
      host     : process.env.DB_HOST || 'localhost',
      port     : process.env.DB_PORT || 5432,
      user     : process.env.DB_USER || 'root',
      password : process.env.DB_PASS || '',
      database : process.env.DB_NAME || 'stockbot',
      charset  : process.env.DB_CHARSET || 'utf8'
    }
  },
  SERVER: {
    port: process.env.PORT || 3000,
    routes: {
      cors: true
    }
  }
};

var store = new Confidence.Store();
store.load(config);

module.exports.get = function(key) {
  var value = store.get(key, criteria);

  if(!value) {
    console.warn('No value is defined for you specified key: ' + key);
  }

  return value;
};
