/* jshint expr:true */
'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinonChai = require('sinon-chai'),
    supertest = require('supertest');

var originalEnv = process.env.NODE_ENV,
    cwd = process.cwd();
process.env.NODE_ENV = 'test';
process.chdir(__dirname + '/../apps/one');
chai.use(sinonChai);

before(function(done) {
    var mycro = require('../apps/one/app');
    global._mycro = mycro;

    mycro.start(function(err) {
        expect(err).to.not.exist;
        global.request = supertest.agent(mycro.server);
        done(err);
    });
});

after(function() {
    process.env.NODE_ENV = originalEnv;
    process.chdir(cwd);
});

describe('basic tests', function() {
    it('should start successfully', function(done) {
        request.get('/api/healthy')
            .set('accept-version', '^1.0.0')
            .expect(200)
            .end(done);
    });
});
