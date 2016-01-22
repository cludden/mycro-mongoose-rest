/* jshint expr:true */
'use strict';

var async = require('async'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    _ = require('lodash');

describe('PUT /api/groups/:id', function() {
    it('should update the specified group', function(done) {
        let Groups = _mycro.models['group'];
        sinon.spy(Groups.collection, 'update');
        async.auto({
            group: function createGroup(fn) {
                Groups.create({
                    name: 'test'
                }, fn);
            },

            test: ['group', function execTest(fn, r) {
                request.put('/api/groups/' + r.group._id)
                    .set('accept-version', '^1.0.0')
                    .send({
                        desc: 'sample desc'
                    })
                    .expect(200)
                    .expect(function(res) {
                        expect(res.body._id).to.equal(r.group._id.toString());
                        expect(Groups.collection.update).to.have.been.called;
                    })
                    .end(fn);
            }],

            after: ['test', function cleanUp(fn, r) {
                Groups.collection.update.restore();
                Groups.remove({_id: r.group._id}, fn);
            }]
        }, done);
    });
});
