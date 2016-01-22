'use strict';

module.exports = {
    defaults: {
        pageSize: 20,
        baseUrl: 'http://www.example.com/api'
    },

    models: {
        user: {
            defaults: {
                select: 'first,last,email',
                filter: function(req, res) {
                    return {status: 'active'};
                },
                listProjection: function(req, item, cb) {
                    item = item.toObject();
                    item.fullName = item.first + ' ' + item.last;
                    cb(null, item);
                },
                detailProjection: function(req, item, cb) {
                    item.fullName = item.first + ' ' + item.last;
                    cb(null, item);
                }
            },
            query: {
                select: 'first,last'
            }
        },

        group: true
    }
};
