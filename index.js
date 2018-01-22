'use strict';

const fs = require('fs');
const path = require('path');
const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');
const bell = require('bell');
const cookie = require('hapi-auth-cookie');
const doorkeeper = require('hapi-doorkeeper');

const server = hapi.server({
    host   : 'localhost',
    port   : 3000,
    routes : {
        files : {
            relativeTo : path.join(__dirname, 'lib', 'static')
        }
    },
    // Openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes
    tls : !process.env.NOW && {
        /* eslint-disable no-sync */
        key  : fs.readFileSync('./key.pem'),
        cert : fs.readFileSync('cert.pem')
        /* eslint-enable no-sync */
    }
});

server.register([
    {
        plugin : vision
    },
    {
        plugin : inert
    },
    {
        plugin : bell
    },
    {
        plugin : cookie
    },
    {
        plugin  : doorkeeper,
        options : {
            sessionSecretKey : 'please-make-this-much-more-secure',
            auth0Domain      : 'nedbailov.auth0.com',
            auth0PublicKey   : 'Z5q2GJOFa0vqvKPd0xXTrJ3wNeOzA8kx',
            auth0SecretKey   : 'SRIBcJk699lop48wiUbmFedu1gmFPixOIbmaNaHVx9JdvvwDqvEoZmCxEtfjEmPk'
        }
    }
]).then(() => {
    // Template rendering configuration using "vision" plugin.
    server.views({
        engines : {
            html : handlebars
        },
        relativeTo   : path.join(__dirname, 'lib', 'view'),
        // Directories for views, helpers, partials, and layouts.
        path         : '.',
        layoutPath   : 'layout',
        // Name of the default layout file. Can be overriden in routes.
        layout       : 'default-layout'
    });

    /* eslint-disable global-require */
    server.route([
        require('./lib/route/static'),
        ...require('./lib/route/app')
    ]);
    /* eslint-enable global-require */

    server.start()
        .then(console.log(server.info.uri));
});
