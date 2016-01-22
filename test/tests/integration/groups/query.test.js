/* jshint expr:true */
'use strict';

var async = require('async'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    _ = require('lodash');

describe('GET /api/groups', function() {
    it('should return the first 20 groups', function(done) {
        let Groups = _mycro.models['group'];
        sinon.spy(Groups, 'find');
        async.auto({
            create: function create21Groups(fn) {
                let groups = [];
                _.range(21).forEach(function(i) {
                    groups.push({name: 'group_' + i, desc: 'group number ' + i});
                });
                Groups.create(groups, fn);
            },

            test: ['create', function execTest(fn) {
                request.get('/api/groups')
                    .set('accept-version', '^1.0.0')
                    .expect(200)
                    .expect(function(res) {
                        expect(res.body).to.have.lengthOf(20);
                        expect(Groups.find).to.have.been.called;
                    })
                    .end(fn);
            }],

            destroy: ['test', function cleanUp(fn) {
                Groups.find.restore();
                Groups.remove({}, fn);
            }]
        }, done);
    });
});
