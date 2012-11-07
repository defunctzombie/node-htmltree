var fs = require('fs');
var assert = require('assert');
var dombie = require('..');

var GENERATE = process.env.TEST_GENERATE;

var fixtures = __dirname + '/fixtures';
var reference = __dirname + '/reference';

fs.readdirSync(fixtures).forEach(function(filename) {
    var path = fixtures + '/' + filename;
    var expected_filename = reference + '/' + filename + '.json';

    test(filename, function(done) {
        var src = fs.readFileSync(path, 'utf8');

        dombie(src, function(err, dom) {
            assert.ok(!err);

            var actual = JSON.stringify(dom, null, '  ');

            if (GENERATE) {
                fs.writeFileSync(expected_filename, actual, 'utf8');
                return done();
            }

            var expected = fs.readFileSync(expected_filename, 'utf8');
            assert.equal(actual, expected);
            done();
        });
    });
});
