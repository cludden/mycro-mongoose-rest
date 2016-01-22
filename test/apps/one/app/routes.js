'use strict';

module.exports = function(mycro) {
    return {
        'v1.0.0': {
            '/api': {
                '/groups': {
                    get: 'group.query',
                    post: 'group.insert',
                    '/:id': {
                        del: 'group.remove',
                        get: 'group.detail',
                        put: 'group.update'
                    }
                },
                '/healthy': {
                    get(req, res) {
                        res.json(200, {status: 'healthy'});
                    }
                },
                '/users': {
                    get: 'user.query',
                    post: 'user.insert',
                    '/:id': {
                        del: 'user.remove',
                        get: 'user.detail',
                        put: 'user.update',
                        '/secret': {
                            get: 'user.secret'
                        }
                    }
                }
            }
        }
    };
};
