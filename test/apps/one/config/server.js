'use strict';

module.exports = {
    port: process.env.MYCRO_MONGOOSE_REST_PORT,
    middleware: [
        'acceptParser',
        'dateParser',
        'queryParser',
        'bodyParser',
        function morgan() {
            return require('morgan')('dev');
        },
        'request'
    ]
};
