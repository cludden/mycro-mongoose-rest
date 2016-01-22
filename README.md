# mycro-mongoose-rest
a [restify-mongoose](https://github.com/saintedlama/restify-mongoose) hook for [mycro](https://github.com/cludden/mycro)


**NOTE** *This is still very much a work in progress and is not yet suitable for use in production*
## Install
```javascript
npm install --save mycro-mongoose-rest
```

## General Usage
1. Define a config file at `/config/restify-mongoose.js`
2. Define a `defaults` attribute that defines the default options for `restify-mongoose`
3. Define a `models` attribute with a key for every model that you intend to create a `restify-mongoose` resource for.

```javascript
// in /config/restify-mongoose.js

module.exports = {
    // define default options for all models
    defaults: {
        pageSize: 20,
        baseUrl: 'https://www.example.com/api'
    }

    models: {
        // use defaults for `group` model
        group: true,

        // define additional options for `user` model
        user: {
            // define options that will be applied to all Resource methods
            defaults: {
                detailProjection: function(req, item, cb) {
                    cb(null, item.toObject());
                },
                filter: function(req, res) {
                    return { status: 'active' };
                },
                listProjection: function(req, item, cb) {
                    cb(null, item.toObject());
                }
            },
            // define options that will be applied to the `query` method
            query: {
                sort: '-first'
            }
        }
    }
}
```

## Contributing
1. [Fork it](https://github.com/cludden/mycro-mongoose-rest/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License
Copyright (c) 2015 Chris Ludden.
Licensed under the [MIT license](LICENSE.md).
