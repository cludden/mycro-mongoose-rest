'use strict';

var mycro = require('./app');
mycro.start(function(err) {
    if (err) {
        mycro.log('error', err);
    } else {
        mycro.log('success', 'mycro started successfully');
    }
});
