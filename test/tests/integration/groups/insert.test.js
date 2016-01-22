/* jshint expr:true */
'use strict';

var async = require('async'),
    expect = require('chai').expect,
    sinon = require('sinon');

describe('POST /api/groups', function() {
    it('should create a group', function(done) {
        let error;
        sinon.spy(_mycro.models['group'].collection, 'insert');
        async.waterfall([
            function execTest(fn) {
                request.post('/api/groups')
                    .set('accept-version', '^1.0.0')
                    .send({
                        name: 'admins',
                        desc: 'site administrators'
                    })
                    .expect(201)
                    .end(function(err, res) {
                        error = err;
                        expect(_mycro.models['group'].collection.insert).to.have.been.called;
                        fn(null, res.body);
                    });
            },

            function cleanup(group, fn) {
                _mycro.models['group'].collection.insert.restore();
                _mycro.models['group'].remove({_id: group._id}, fn);
            }
        ], function(err) {
            done(err || error);
        });
    });
});
