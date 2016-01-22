'use strict';

var adapter = require('restify-microservice-mongoose');

module.exports = {
    sample: {
        adapter: adapter,
        config: {
            host: process.env.MYCRO_MONGOOSE_REST_DB_HOST || 'localhost',
            port: process.env.MYCRO_MONGOOSE_REST_DB_PORT || 27017,
            username: process.env.MYCRO_MONGOOSE_REST_DB_USERNAME,
            password: process.env.MYCRO_MONGOOSE_REST_DB_PASSWORD,
            database: process.env.MYCRO_MONGOOSE_REST_DB_DATABASE
        }
    }
};
