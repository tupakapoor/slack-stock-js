var should = require('chai').should()
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var User = require('../../models/user');
var server = require('../../lib/server');
var fixtures = require('../../lib/fixtures');

lab.experiment('Users CRUD', function () {

      lab.test('valid user should be created', function (done) {
        server.inject({
          method: 'POST',
          url: '/v1/users',
          payload: VALID_NEIGHBORHOOD
        }, function(res) {
          res.statusCode.should.equal(200);

          var payload = JSON.parse(res.payload);
          console.log(payload);
          VALID_NEIGHBORHOOD.name.should.equal(payload.user.name);
          done();
        });
      });

});
