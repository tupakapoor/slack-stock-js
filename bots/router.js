module.exports = {
  path:    '/',
  handler: function(request, reply) {
    var payload = request.payload;
    if (payload.command) {
      console.log(payload.command + ' ' + request.server.info.uri + payload.command);
      return reply.redirect(request.server.info.uri + payload.command);
    }

    return reply().code(404);
  }
};
