'use strict';

var restifyMongoose = require('restify-mongoose'),
    _ = require('lodash');

module.exports = function restify_microservice_mongoose_rest(cb) {
    var self = this;

    var config = self._config['restify-mongoose'] || {},
        include = config.include,
        exclude = config.exclude,
        log = function log(level) {
            var self = this,
                prefix = '[restify-microservice-mongoose-rest]',
                args = [level, prefix].concat(Array.prototype.slice.call(arguments));

            self.log.apply(null, args);
        }.bind(self),
        supportedMethods = ['query', 'detail', 'insert', 'update', 'remove'];


    if (!include && !exclude) {
        log('silly', 'No `include` or `exclude` options found in config["restify-mongoose"]');
        return cb();
    }

    include = include ? (_.isArray(include) ? include : [include]) : [];
    exclude = exclude ? (_.isArray(exclude) ? exclude : [exclude]) : [];

    _.each(self.models, function(model, name) {
        if (exclude.length && exclude.indexOf(name) !== -1) return;
        if (include.length && include.indexOf(name) === -1) return;

        var options = model._definition['restifyMongoose'] || {};
        _.defaults(options, config.options);

        var controller = self.controllers[name] || {},
            restFactory = restifyMongoose(model, _.omit(options, supportedMethods));

        restFactory = _(restFactory).pick(supportedMethods).mapValues(function(factory, method) {
            return factory.call(restFactory, options[method] || {});
        }).value();

        _.extend(controller, restFactory);

        self.controllers[name] = controller;
    });

    cb();
};
