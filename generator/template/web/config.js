var serveStatic = require('serve-static'),
	helmet = require('helmet');

var path = require('path');
var Rester = require('./providers/Rester');

module.exports = {
	floca: {
		appName: 'AppName',
		entityName: 'EntityName'
	},
	server: {
		active: true,
		port: 8080,
		rest: false,
		websocket: false
	},
	radiation: {
		name: 'Radiation',
		rest: {
			ignoreRESTPattern: true,
			harconrpcPath: '/Harcon'
		},
		websocket: {
			socketPath: '/Harcon',
			passthrough: true
		}
	},
	connectMiddlewares: function( config ){
		var wares = [
			// helmet.csp( contentSecurityPolicy ),
			helmet.xframe('deny'),
			// helmet.xssFilter(),
			// helmet.hsts( { includeSubdomains: true }),
			helmet.nosniff(),
			helmet.ienoopen(),
			serveStatic( path.join( process.cwd(), 'www' ) )
		];
		return wares;
	},
	extendREST: function( config, rester, pathToIgnore, harcon, tools ){
		Rester.addJADERendering( config, rester, pathToIgnore, harcon );
	}
};
