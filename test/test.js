/*
 * test rem2px plug
 *
 *
 * Copyright (c) 2014
 * Licensed under the MIT license.
 */

'use strict';
var grunt = require('grunt');
var path = require('path');

exports.test = {
	setUp: function (done) {
		// setup here if necessary
		done();
	},
	base: function (test) {
		console.log(test);
		test.expect(1);
		var actual = grunt.file.read('test/assets/css/base-rem.css');
		var expected = '.test{width: 1px;height: 2px;width: 0.05rem;height: 0.1rem;}';
		test.equal(actual, expected, 'should describe what the default behavior is.');
		test.done();
	},

	testNoBorder: function(test) {
		test.expect(1);
		var actual = grunt.file.read('test/assets/css/border/border-rem.css');
		var expected = '.test{border:1px solid #fff;}\r\n.test{border-top:1px solid #fff;}\r\n.test{border-bottom:1px solid #fff;}\r\n.test{border-left:1px solid #fff;}\r\n.test{border-right:1px solid #fff;}\r\n.test{border-width:1px;}';
		test.equal(actual, expected, 'should describe what the default behavior is.');
		test.done();
	}
};