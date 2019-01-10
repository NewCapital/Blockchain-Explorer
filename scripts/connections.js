var mongoose = require('mongoose')
  , lib = require('../lib/explorer')
  , db = require('../lib/database')
  , settings = require('../lib/settings')
  , request = require('request');
  
var geoip = require('geoip-lite');

function exit() {
  mongoose.disconnect();
  process.exit(0);
}

request({uri: 'http://127.0.0.1:' + settings.port + '/ext/connections', json: true}, function (error, response, body) {
	if(response && response.statusCode == 200) {
		if(body && body.data) {
				console.log("body.data",body.data);
				for(var i in body.data) {
					var geo = geoip.lookup(body.data[i].address);
					console.log("geo",geo)
					console.log("geo.ll",geo.ll)
					console.log("body.data[i].address",body.data[i].address)
					console.log("body.data[i].createdAt",body.data[i].createdAt)
				}
		}
	}
});
