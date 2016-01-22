'use strict';

var restifyMongoose = require('restify-mongoose'),
    _ = require('lodash');

module.exports = function mycro_mongoose_rest(cb) {
    var self = this;

    var config = self._config['restify-mongoose'] || {},
        log = function log(level) {
            var self = this,
                prefix = '[mycro-mongoose-rest]',
                args = [level, prefix].concat(Array.prototype.slice.call(arguments, 1));

            self.log.apply(null, args);
        }.bind(self),
        supportedMethods = ['query', 'detail', 'insert', 'update', 'remove'];


    if (!config.models && !_.keys(config.models).length) {
        log('silly', 'No `include` or `exclude` options found in config["restify-mongoose"]');
        return cb();
    }


    _.each(self.models, function(model, name) {
        if (!config.models[name]) {
            return;
        }

        var options = _.defaults({}, config.defaults || {});
        if (_.isPlainObject(config.models[name]) && config.models[name].defaults) {
            _.extend(options, config.models[name].defaults);
        }

        var controller = self.controllers[name] || {},
            restFactory = restifyMongoose(model, _.omit(options, supportedMethods));

        restFactory = _(restFactory).pick(supportedMethods).mapValues(function(factory, method) {
            let methodOptions = _.extend(_.clone(options), config.models[name][method] || {});
            return factory.call(restFactory, methodOptions);
        }).value();

        _.defaults(controller, restFactory);

        log('silly', 'augmenting controller methods for `' + name + '` controller');
        self.controllers[name] = controller;
    });

    cb();
};
