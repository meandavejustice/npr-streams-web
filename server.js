var Hapi = require('hapi');
var catalogTmp = require('./views/catalog');
var showsTmp = require('./views/shows');
// var routes = require('./routes/routes');
var PORT = 8888;
var orm = require('./orm');

var config = {};

var server = new Hapi.Server('0.0.0.0', PORT, config);
server.route([
  {
    method: 'GET', path: '/{path*}',
    handler: {
      directory: {
        path: './public',
        listing: false,
        index: true
      }
    }
  },
  {
    method: 'GET',
    path: '/catalog',
    handler: function(req, reply) {
      orm.getKeyStream(function (err, stations) {
        if (err) console.error(err);
        reply(catalogTmp(stations));
      });
    }
  },
  {
    method: 'GET',
    path: '/catalog/{station}',
    handler: function(req, reply) {
      orm.getShows(req.params.station, function (err, shows) {
        if (err) console.error(err);
        reply(showsTmp({
          station: req.params.station,
          shows: shows
        }));
      });
    }
  },
  {
    method: 'GET',
    path: '/stations',
    handler: function(req, reply) {
      orm.getKeyStream(function (err, stations) {
        if (err) console.error(err);

        reply(stations.map(function(station) {
                return {
                  'title': station,
                  'showLink': '/shows/'+ station
                }
        }))
      });
    }
  },
  {
    method: 'GET',
    path: '/shows/{station}',
    handler: function(req, reply) {
      orm.getShows(req.params.station, function(err, shows) {
        reply(shows)
      });
    }
  },
  {
    method: 'GET',
    path: '/shows/{station}/{title}',
    handler: function(req) {
      console.log(req.params.station+ '\n');
      console.log(req.params.station);
    }
  }
]);

server.start();
console.log('server running on PORT:', PORT);