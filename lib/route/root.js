
'use strict';

module.exports = {
    method  : 'GET',
    path    : '/',
    options : {

        /* eslint-disable global-require */
        handler(request, h) {
            return h.view('root');
        /* eslint-enable global-require */
        }
    }
};
