'use strict';

const path = require('path');
const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const handlebars = require('handlebars');

const server = Hapi.Server({
    host : 'localhost',
    port : 3001,
    routes : {
        files : {
            relativeTo : path.join(__dirname, 'lib', 'static')
        }
    }
});

server.register([
    {
        plugin : Vision
    },
    {
        plugin : Inert
    }
]).then (() => {
        // Template rendering configuration using "vision" plugin.
        server.views({
            engines : {
                html : handlebars
            },
            relativeTo   : path.join(__dirname, 'lib', 'view'),
            // Directories for views, helpers, partials, and layouts.
            path         : '.',
            helpersPath  : 'helper',
            partialsPath : 'partial',
            layoutPath   : 'layout',
            // Name of the default layout file. Can be overriden in routes.
            layout       : 'default-layout'
        })

        server.route([
            require('./lib/route/static'),
            require('./lib/route/root')
        ])

        server.start()
        .then(console.log(server.info.uri))
    })
    .catch(err => {
        throw err
      })
