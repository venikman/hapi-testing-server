
'use strict';

module.exports = {
    method  : 'GET',
    path    : '/',
    options : {

        /* eslint-disable global-require */
        handler(request, hhh) {
            return hhh.view('root');
        /* eslint-enable global-require */
        }
    }
};
