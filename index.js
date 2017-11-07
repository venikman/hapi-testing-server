'use strict';

const Hapi = require('hapi');
const Good = require('good');
const doorkeeper = require('hapi-doorkeeper');
const cookie = require('hapi-auth-cookie');
const bell = require('bell');

const server = new Hapi.Server();
server.connection({
    host : 'localhost',
    port : 3000
});

server.route({
    method  : 'GET',
    path    : '/{name}',
    handler : (request, reply) => {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register([{
    register : Good,
    options  : {
        reporters : {
            console : [{
                module : 'good-squeeze',
                name   : 'Squeeze',
                args   : [{
                    log      : '*',
                    response : '*'
                }]
            },
            {
                module : 'good-console'
            },
                'stdout']
        }
    }
},
    bell,
    cookie,
{
    register : doorkeeper,
    options  : {
        sessionSecretKey : 'venikmanhandballfewmoresimbolstogetenought',
        auth0Domain      : 'nedbailov.auth0.com',
        auth0PublicKey   : '4FvZeLbOnzu2qfxqZ9SLRAnbVLo53CSV',
        auth0SecretKey   : 'Gu9saPRDoLE5rFG8c52JKdR5gY5clZVbZQCJjfC1ZImI7dMVnA7pPvICUP4DWW2w'
    }
}]
);

server.route({
    method : 'GET',
    path   : '/home',
    config : {
        auth : {
            strategy : 'session',
            mode     : 'required'
        }
    },
    handler(request, reply) {
        reply('hi');
    }
});

server.start()
.then(() => {
    console.log(server.info.uri);
});
