var Portfolio = require('../../models/portfolio');
var User = require('../../models/user');
var Joi = require('joi');

module.exports.routes = [
  {
    method: 'POST',
    path: '/portfolios',
    handler: function usersHandler(request, reply) {
      Portfolio.validate(request.payload.portfolio, function(error, response) {
        if (error) {
          console.error(error);
          return reply().code(400);
        }

        var newPortfolio = request.payload.portfolio;

        Portfolio.Model.forge(newPortfolio).save().then(function (portfolioModel) {
          return reply({
           portfolio: portfolioModel,
          }).code(201);
        }).catch(function (err) {
          console.error(err);
        });
      });
    }
  },
  {
    method: 'PUT',
    path: '/portfolios/{id}/{stock}',
    handler: function usersHandler(request, reply) {
      Joi.validate(request.payload, { token: Joi.string().required() }, { stripUnknown: true }, function validationResponse(error, value) {
        if (error) {
          console.error(error);
          return reply().code(400);
        }

        User.Model.forge({ token: request.payload.token }).fetch().then(function (userModel) {
          Portfolio.Model.where({ id: request.params.id, owners: JSON.stringify([userModel.get('id')]) }).fetch().then(function (portfolioModel) {
            // TODO validate ticker symbol
            portfolioModel.symbols.push(request.params.stock);
            portfolioModel.save().then(function () {
              return reply({
               portfolio: portfolioModel,
              }).code(201);
            })
          });
        });
      });
    }
  },
];
