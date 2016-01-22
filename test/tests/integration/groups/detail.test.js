/* jshint expr:true */
'use strict';

var async = require('async'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    _ = require('lodash');

describe('GET /api/groups/:id', function() {
    it('should return the specified group', function(done) {
        let Group = _mycro.models['group'];
        sinon.spy(Group, 'findOne');
        async.auto({
            group: function createGroup(fn) {
                Group.create({
                    name: 'test',
                    desc: 'a test group'
                }, fn);
            },

            test: ['group', function execTest(fn, r) {
                request.get('/api/groups/' + r.group._id)
                    .set('accept-version', '^1.0.0')
                    .expect(200)
                    .expect(function(res) {
                        expect(res.body._id).to.equal(r.group._id.toString());
                        expect(Group.findOne).to.have.been.called;
                    })
                    .end(fn);
            }],

            after: ['test', function cleanUp(fn, r) {
                Group.findOne.restore();
                Group.remove({_id: r.group._id}, fn);
            }]
        }, done);
    });
});
