/* jshint expr:true */
'use strict';

var expect = require('chai').expect;

describe('[controller] role', function() {
    it('should not exist', function() {
        expect(_mycro.controllers.role).to.not.exist;
    });
});
