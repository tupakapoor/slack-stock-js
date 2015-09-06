var server = require('./lib/server');

server.start(function serverStarted() {
  console.log('Server started running at: ', server.info.uri);
});
