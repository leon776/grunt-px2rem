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
		test.expect(1);
		var actual = grunt.file.read('test/assets/css/base/base-rem.css');
		var expected = '.test{width: 0.25rem;height: 0.1rem;}\n.test-shorthand{padding:1rem 0.5rem 1.5rem 1rem;}\n.test-border{border:0.05rem solid #fff;border-radius:0.25rem;}\n.test-other-unit{width:100%;padding:0.05rem 1rem 0.05rem 1%;}\n.test-single-line{width: 0.25rem;height: 0.1rem;}.test-single-line{padding:1rem 0.5rem 1.5rem 1rem;}\n.test-no-semicolon{width:0.05rem;\n}\n.test-no-trans{font-size:12px/*notrans*/;}';
		test.equal(actual, expected, 'default test.');
		test.done();
	},

	testNoBorder: function(test) {
		test.expect(1);
		var actual = grunt.file.read('test/assets/css/border/border-rem.css');
		var expected = '.test{border:1px solid #fff;}\r\n.test{border-top:1px solid #fff;}\r\n.test{border-bottom:1px solid #fff;}\r\n.test{border-left:1px solid #fff;}\r\n.test{border-right:1px solid #fff;}\r\n.test{border-width:1px;}\r\n.test-other-with-noborder{width:0.5rem;border:1px;height:0.75rem;border-radius: 25px;margin:0.05rem;\n}';
		test.equal(actual, expected, 'no border test.');
		test.done();
	},

	testIe8: function(test) {
		test.expect(1);
		var actual = grunt.file.read('test/assets/css/ie8/ie8-rem.css');
		var expected = '.test{width: 5px;width: 0.25rem;height: 2px;height: 0.1rem;}';
		test.equal(actual, expected, 'ie8 code test.');
		test.done();
	},

	testMedia: function(test) {
		test.expect(1);
		var actual = grunt.file.read('test/assets/css/media/media-rem.css');
		var expected = '@media only screen and (max-width: 1080px), only screen and (max-device-width:1080px) {\nhtml,body {\nfont-size:33.75px;\n}\n}\n@media only screen and (max-width: 960px), only screen and (max-device-width:960px) {\nhtml,body {\nfont-size:30px;\n}\n}\n@media only screen and (max-width: 800px), only screen and (max-device-width:800px) {\nhtml,body {\nfont-size:25px;\n}\n}\n@media only screen and (max-width: 720px), only screen and (max-device-width:720px) {\nhtml,body {\nfont-size:22.5px;\n}\n}\n@media only screen and (max-width: 640px), only screen and (max-device-width:640px) {\nhtml,body {\nfont-size:20px;\n}\n}\n@media only screen and (max-width: 600px), only screen and (max-device-width:600px) {\nhtml,body {\nfont-size:18.75px;\n}\n}\n@media only screen and (max-width: 540px), only screen and (max-device-width:540px) {\nhtml,body {\nfont-size:16.875px;\n}\n}\n@media only screen and (max-width: 480px), only screen and (max-device-width:480px) {\nhtml,body {\nfont-size:15px;\n}\n}\n@media only screen and (max-width: 414px), only screen and (max-device-width:414px) {\nhtml,body {\nfont-size:12.9375px;\n}\n}\n@media only screen and (max-width: 400px), only screen and (max-device-width:400px) {\nhtml,body {\nfont-size:12.5px;\n}\n}\n@media only screen and (max-width: 375px), only screen and (max-device-width:375px) {\nhtml,body {\nfont-size:11.71875px;\n}\n}\n@media only screen and (max-width: 360px), only screen and (max-device-width:360px) {\nhtml,body {\nfont-size:11.25px;\n}\n}\n@media only screen and (max-width: 320px), only screen and (max-device-width:320px) {\nhtml,body {\nfont-size:10px;\n}\n}\n@media only screen and (max-width: 240px), only screen and (max-device-width:240px) {\nhtml,body {\nfont-size:7.5px;\n}\n}\n.test{width: 0.25rem;height: 0.1rem;}';
		test.equal(actual, expected, 'media code test.');
		test.done();
	},

	testRem2px: function(test) {
		test.expect(1);
		var actual = grunt.file.read('test/assets/css/rem2px/rem2px-rem.css');
		var expected = '.test{width: 5px;height: 2px;}';
		test.equal(actual, expected, 'rem 2 px test.');
		test.done();
	}
};