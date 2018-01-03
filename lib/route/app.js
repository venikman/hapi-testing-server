'use strict';

const path = require('path');

const appName = 'app.js';
const appDir = path.join(__dirname, '..', '..', 'build');

module.exports = [
    {
        method  : 'GET',
        path    : '/{pathComponent*}',
        options : {
            auth : {
                strategy : 'session',
                mode     : 'required'
            },
            /* eslint-disable global-require */
            handler(request, h) {
                return h.view('app', {
                    appPath : '/app.js'
                });
            /* eslint-enable global-require */
            }
        }
    },
    {
        method  : 'GET',
        path    : '/app.js',
        options : {
            files : {
                relativeTo : appDir
            },
            /* eslint-disable global-require */
            handler(request, h) {
                return h.file(appName);
            /* eslint-enable global-require */
            }
        }
    }
];
