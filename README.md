# domebie

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
