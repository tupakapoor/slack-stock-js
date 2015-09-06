var User = require('../../models/user');
var sha = require('crypto');
var Joi = require('joi');

module.exports.routes = [
  {
    method: 'POST',
    path: '/users',
    handler: function usersHandler(request, reply) {
      User.validate(request.payload.user, function(error, response) {
        if (error) {
          console.error(error);
          return reply().code(400);
        }

        var newUser = request.payload.user;
        if (newUser.password) {
          newUser.password = require("crypto").createHash("sha256").update(newUser.password, "utf8").digest("base64");
        }

        User.Model.forge(newUser).save().then(function (userModel) {
          return reply({
           user: userModel,
          }).code(201);
        }).catch(function (err) {
          console.error(err);
          return reply().code(500);
        });
      });
    }
  }
];
