var sax = require('sax');

function dombie(str, cb) {

    var strict = false;
    var parser = sax.parser(strict, {
        lowercase: true
    });

    var current = {
        children: []
    };

    var stack = [];

    parser.onerror = function (err) {
        cb(err);
    };

    parser.ontext = function (text) {
        current.children.push({
            type: 'text',
            data: text
        });
    };

    parser.oncomment = function(comment) {
        current.children.push({
            type: 'comment',
            data: comment
        });
    };

    parser.onscript = function(script) {
        current.data = script;
    };

    parser.onopentag = function (node) {

        var element = {
            type: 'tag',
            name: node.name,
            attributes: node.attributes,
            children: [],
        };

        // push the current parent onto the node stack
        stack.push(current);

        current.children.push(element);

        // now our new tag is the current element
        current = element;
    };

    parser.onclosetag = function(tag) {
        // current tag is closed, get the parent back
        current = stack.pop();

        if (!current) {
            return cb(new Error('hm: ' + tag));
        }
    };

    parser.onend = function () {
        cb(null, current.children);
    };

    parser.write(str).close();
}

module.exports = dombie;

