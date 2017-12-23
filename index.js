#!/usr/bin/env node

'use strict';

const path = require('path');
const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const handlebars = require('handlebars');

const server = hapi.server({
    host   : 'localhost',
    port   : 3001,
    routes : {
        files : {
            relativeTo : path.join(__dirname, 'lib', 'static')
        }
    }
});

server.register([
    {
        plugin : vision
    },
    {
        plugin : inert
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
        // HelpersPath  : 'helper',
        partialsPath : 'partials',
        layoutPath   : 'layout',
        // Name of the default layout file. Can be overriden in routes.
        layout       : 'default-layout'
    });

    /* eslint-disable global-require */
    server.route([
        require('./lib/route/static'),
        require('./lib/route/root')
    ]);
    /* eslint-enable global-require */

    server.start()
        .then(console.log(server.info.uri));
});
