
'use strict';

module.exports = {
    method  : 'GET',
    path    : '/',
    options : {
        handler(request, h) {
            return h.view('root');
        }
    }
};