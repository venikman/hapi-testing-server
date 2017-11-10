'use strict';

const Hapi = require('hapi');

const server = Hapi.Server({
    host : 'localhost',
    port : 3000
});

server.route({
    method  : 'GET',
    path    : '/{name}',
    options : {
        handler : (request, h) => {
            return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
         }
    }
});

server.route({
    method : 'GET',
    path   : '/',
    options : {
        handler(request, h) {
            return 'hi';
        }
    }
});

server.start()
    .then(console.log(server.info.uri));
