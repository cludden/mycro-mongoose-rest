/* jshint expr:true */
'use strict';

var async = require('async'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    _ = require('lodash');

describe('GET /api/users/:id/secret', function() {
    it('should exist', function(done) {
        let Users = _mycro.models['user'];
        async.auto({
            user: function createUser(fn) {
                Users.create({
                    first: 'jay',
                    last: 'z',
                    email: 'jz@email.com',
                    secret: 'super awesome secret',
                    status: 'active'
                }, fn);
            },

            test: ['user', function execTest(fn, r) {
                request.get('/api/users/' + r.user._id + '/secret')
                    .set('accept-version', '^1.0.0')
                    .expect(200)
                    .expect(function(res) {
                        expect(res.body).to.equal('super awesome secret');
                    })
                    .end(fn);
            }],

            after: ['test', function cleanUp(fn, r) {
                Users.remove({}, fn);
            }]
        }, done);
    });
});
