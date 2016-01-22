/* jshint expr:true */
'use strict';

var async = require('async'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    _ = require('lodash');

describe('GET /api/users', function() {
    it('should return only active users and only first, last', function(done) {
        let Users = _mycro.models['user'];
        sinon.spy(Users, 'find');
        async.auto({
            users: function createUsers(fn) {
                Users.create([{
                    first: 'jay',
                    last: 'z',
                    email: 'jz@email.com',
                    secret: 'laksdjf;laksdjf',
                    status: 'active'
                },{
                    first: 'kendrick',
                    last: 'lamar',
                    email: 'klamar@email.com',
                    secret: 'asdlfkasdflkj',
                    status: 'active'
                },{
                    first: 'lil',
                    last: 'wayne',
                    email: 'lwayne@email.com',
                    secret: 'asd09fsdofiasdf',
                    status: 'inactive'
                }], fn);
            },

            test: ['users', function execTest(fn, r) {
                request.get('/api/users')
                    .set('accept-version', '^1.0.0')
                    .expect(200)
                    .expect(function(res) {
                        expect(res.body).to.have.lengthOf(2);
                        expect(_(res.body).map('status').uniq().value()).to.eql(['active']);
                        expect(_(res.body).map('fullName').compact().value()).to.have.lengthOf(2);
                        expect(Users.find).to.have.been.called;
                    })
                    .end(fn);
            }],

            after: ['test', function cleanUp(fn, r) {
                Users.find.restore();
                Users.remove({}, fn);
            }]
        }, done);
    });
});
