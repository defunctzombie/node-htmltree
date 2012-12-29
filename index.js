var sax = require('sax');

//http://dev.w3.org/html5/spec-author-view/syntax.html#syntax-start-tag
//http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
var void_elements = {};
[
    'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
    'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
].forEach(function(tag) {
    void_elements[tag] = true;
});

function htmltree(str, cb) {

    var strict = false;
    var parser = sax.parser(strict, {
        lowercase: true
    });

    // document doctype if set
    var doctype = undefined;

    var current = {
        children: []
    };

    var stack = [];

    parser.onerror = function (err) {
        cb(err);
    };

    parser.ondoctype = function(type) {
        doctype = type;
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
            void: void_elements[node.name]
        };

        current.children.push(element);

        // if element is a void tag we will not push it
        if (!void_elements[element.name]) {
            stack.push(current);
            current = element;
        }
    };

    parser.onclosetag = function(tag) {
        if (current.name === tag) {
            // current tag is closed, get the parent back
            current = stack.pop();
        }

        if (!current) {
            return cb(new Error('mismatched closing tag: ' + tag));
        }
    };

    parser.onend = function () {
        cb(null, {
            doctype: doctype,
            root: current.children
        });
    };

    parser.write(str).close();
}

module.exports = htmltree;

