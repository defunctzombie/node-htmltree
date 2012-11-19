# dombie [![Build Status](https://secure.travis-ci.org/shtylman/node-dombie.png?branch=master)](https://travis-ci.org/shtylman/node-dombie) #

Very simple xml/html -> dom tree converter. Useful for further mangling your dom.

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
