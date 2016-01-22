'use strict';

module.exports = function(connection, Schema) {
    let options = {
        collection: 'roles'
    };

    let schema = new Schema({
        name: String,
        desc: String
    });

    return connection.model('roles', schema);
};
