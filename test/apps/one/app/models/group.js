'use strict';

module.exports = function(connection, Schema) {
    let options = {
        collection: 'groups'
    };

    let schema = new Schema({
        name: String,
        desc: String
    });

    return connection.model('group', schema);
};
