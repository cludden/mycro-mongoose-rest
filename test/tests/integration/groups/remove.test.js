/* jshint expr:true */
'use strict';

var async = require('async'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    _ = require('lodash');

describe('DELETE /api/groups/:id', function() {
    it('should update the specified group', function(done) {
        let Groups = _mycro.models['group'];
        sinon.spy(Groups.collection, 'remove');
        async.auto({
            group: function createGroup(fn) {
                Groups.create({
                    name: 'test'
                }, fn);
            },

            test: ['group', function execTest(fn, r) {
                request.del('/api/groups/' + r.group._id)
                    .set('accept-version', '^1.0.0')
                    .expect(200)
                    .expect(function(res) {
                        expect(Groups.collection.remove).to.have.been.called;
                    })
                    .end(fn);
            }],

            after: ['test', function cleanUp(fn, r) {
                Groups.collection.remove.restore();
                fn();
            }]
        }, done);
    });
});
