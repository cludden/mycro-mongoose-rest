'use strict';

module.exports = {
    secret(req, res) {
        req.mycro.models['user'].findOne({_id: req.params.id}, function(err, user) {
            if (err) {
                req.mycro.log('error', 'error retreiving user:', err);
                res.json(500, {error: err});
            }
            res.json(200, {secret: user.secret});
        });
    }
};
