'use strict';

module.exports = {
    method  : 'GET',
    path    : '/static/{file*}',
    options : {
        handler : {
            directory : {
                path  : '.',
                redirectToSlash : true
            }
        }
    }
};
