# dombie [![Build Status](https://secure.travis-ci.org/shtylman/node-dombie.png?branch=master)](https://travis-ci.org/shtylman/node-dombie) #

Very simple xml/html -> dom tree converter. Useful for further mangling your dom.

```javascript
var dombie = require('dombie');

dombie('<html><body onclick=foo></body></html>', function(err, doc) {
    // doc
    {
        // stuff in the doctype tag
        doctype: undefined || string
        root: [
            ... node type, see below ...
        ]
    }
});
```

Each node entry is an object with the following form.
```javascript
// node
[
    {
        tag: 'html',
        attributes: {
        },
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
```
