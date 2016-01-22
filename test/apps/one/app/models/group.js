'use strict';

module.exports = function(connection, Schema) {
    let options = {
        collection: 'groups'
    };

    let schema = new Schema({
        desc: String,
        name: String,
        roles: [{
            type: Schema.Types.ObjectId,
            ref: 'roles'
        }],
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }]
    });

    return connection.model('group', schema);
};
