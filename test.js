var assert = require('assert');

var sum = function(a,b) {
	return a + b + 1;
}

assert.strictEqual(
	sum(5,3), 8, '5 + 3 should equal 8'
	);