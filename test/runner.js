var fs = require('fs');
var assert = require('assert');
var htmltree = require('..');

var fixtures = __dirname + '/fixtures';
var reference = __dirname + '/reference';

var StringStream = function() {
    var self = this;
    self._str = new String();
};

StringStream.prototype.write = function(str) {
    this._str += str;
};

StringStream.prototype.toString = function() {
    return this._str;
};

//http://dev.w3.org/html5/spec-author-view/syntax.html#syntax-start-tag
//http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
var void_elements = [
    'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
    'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];

function render(out, node) {
    if (node instanceof Array) {
        return node.forEach(render.bind(this, out));
    }

    switch(node.type) {
    case 'text':
        return out.write(node.data);
    case 'comment':
        out.write('<!--' + node.data + '-->');
        return;
    case 'tag':
        out.write('<' + node.name);

        var attrs = node.attributes;
        Object.keys(attrs).forEach(function(key) {
            out.write(' ' + key + '="' + attrs[key] + '"');
        });

        // void elements must self terminate
        if (void_elements.indexOf(node.name) > 0) {
            return out.write('/>');
        }

        out.write('>');

        if (node.data) {
            out.write(node.data);
        }

        node.children.forEach(render.bind(this, out));
        out.write('</' + node.name + '>');
        return;
    }
};

fs.readdirSync(fixtures).forEach(function(filename) {
    var path = fixtures + '/' + filename;
    var expected_filename = reference + '/' + filename + '.json';

    test(filename, function(done) {
        var src = fs.readFileSync(path, 'utf8');

        htmltree(src, function(err, doc) {
            assert.ok(!err);

            var expected = src;

            var buff = new StringStream();
            if (doc.doctype) {
                buff.write('<!doctype' + doc.doctype + '>');
            }

            doc.root.forEach(function(elem) {
                render(buff, elem);
            });

            var actual = buff.toString();
            assert.equal(actual, expected);
            done();
        });
    });
});
