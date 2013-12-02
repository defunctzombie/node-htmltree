# htmltree [![Build Status](https://secure.travis-ci.org/defunctzombie/node-htmltree.png?branch=master)](https://travis-ci.org/defunctzombie/node-htmltree) #

Very simple xml/html -> syntax tree converter. Useful for further mangling your html source.

```javascript
var htmltree = require('htmltree');

htmltree('<html><body onclick=foo></body></html>', function(err, doc) {
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
        type: 'tag' | 'text' | 'comment',
        name: 'html', // set for 'tag' nodes
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
        ],
        // true if the tag node is a void element no body
        void: boolean
    }
]
```

## license

MIT
