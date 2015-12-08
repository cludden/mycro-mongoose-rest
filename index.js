'use strict';

var restifyMongoose = require('restify-mongoose'),
    _ = require('lodash');

module.exports = function(cb) {
    var self = this,
        config = self._config['restify-mongoose'] || {},
        include = config.include,
        exclude = config.exclude,
        log = function log(level) {
            var self = this,
                prefix = '[restify-microservice-mongoose-rest]',
                args = [level, prefix].concat(Array.prototype.slice.call(arguments));

            self.log.apply(null, args);
        }.bind(self);

    log('silly', 'starting hook');

    if (!include && !exclude) {
        log('silly', 'No `include` or `exclude` options found in config["restify-mongoose"]');
        log('info', 'hook complete');
        return cb();
    }

    include = include ? (_.isArray(include) ? include : [include]) : [];
    exclude = exclude ? (_.isArray(exclude) ? exclude : [exclude]) : [];

    _.each(self.models, function(model, name) {
        if (exclude.length && exclude.indexOf(name) !== -1) return;
        if (include.length && include.indexOf(name) === -1) return;

        var options = model._definition['restifyMongoose'] || {};
        _.defaults(options, config.options);

        var controller = self.controllers[name] || {};
        _.extend(controller, restifyMongoose(model, options));
        self.controllers[name] = controller;
    });

    log('info', 'hook complete');
    cb();
};
