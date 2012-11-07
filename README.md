# dombie [![Build Status](https://secure.travis-ci.org/shtylman/node-dombie.png?branch=master)](https://travis-ci.org/shtylman/node-dombie) #

Sometimes you don't want anything fancy.

```javascript
var dombie = require('dombie');

dombie('<html><body onclick=foo></body></html>', function(err, dom) {
    // dom
    [
        {
            tag: 'html',
            children: [
                {
                    tag: body,
                    attributes: {
                        onclick: 'foo'
                    }
                },
                ...
            ]
        }
    ]
});
```
