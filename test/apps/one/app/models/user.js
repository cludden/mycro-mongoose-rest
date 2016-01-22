'use strict';

module.exports = function(connection, Schema) {
    let options = {
        collection: 'users'
    };

    let schema = new Schema({
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        secret: {
            type: String,
            required: true
        },
        status: {
            type: String
        }
    });

    return connection.model('user', schema);
};
