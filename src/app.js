const path = require('path');
const { Server } = require('@hapi/hapi');
const Inert = require('@hapi/inert');

const server = new Server({
	port: 3000,
	routes: {
		files: {
			relativeTo: path.join(__dirname, 'public') //this one makes html and js files available
		}
	}
});

const provision = async() => {
	await server.register(Inert);

	server.route({ //this one is also needed to ensure js files are made available. TODO: investigate a bit more thoroughly
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.',
				redirectToSlash: true,
				index: true,
			}
		}
	});

	server.route({
		method: 'GET',
		path: '/',
		handler: {
			file: 'index.html'
		}
	});

	server.start();
};

provision();
