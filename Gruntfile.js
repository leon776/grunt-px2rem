/*
 * px2rem
 * https://github.com/leon776/px2rem
 *
 * Copyright (c) 2015 xiaoweili
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/assets/css/*-rem.css']
    },

    // Configuration to be run (and then tested).
    px2rem: {
	    default: {
		    options: {
			    designWidth : 640,//设计稿宽度
			    baseFont    : 20,//基础字体
			    border      : 0,//1不处理border，0处理
			    ie8         : 0,//1生成ie8代码，0不生成
			    mode        : 0,//0px转rem，1rem转px
			    media       : 0,//1生成meadia query代码，0不生成
			    dest        : 'test/assets/css/base/'//rem css输出目录
		    },
	      files: [{
		      src : ['test/assets/css/base/*.css']//要监听的css目录
	      }]
      },
	    border: {
		    options: {
			    designWidth : 640,//设计稿宽度
			    baseFont    : 20,//基础字体
			    border      : 1,//1不处理border，0处理
			    ie8         : 0,//1生成ie8代码，0不生成
			    mode        : 0,
			    media       : 0,//1生成meadia query代码，0不生成
			    dest        : 'test/assets/css/border/'//rem css输出目录
		    },
		    files: [{
			    src : ['test/assets/css/border/*.css']//要监听的css目录
		    }]
	    },
	    ie8: {
		    options: {
			    designWidth : 640,//设计稿宽度
			    baseFont    : 20,//基础字体
			    border      : 0,//1不处理border，0处理
			    ie8         : 1,//1生成ie8代码，0不生成
			    mode        : 0,
			    media       : 0,//1生成meadia query代码，0不生成
			    dest        : 'test/assets/css/ie8/'//rem css输出目录
		    },
		    files: [{
			    src : ['test/assets/css/ie8/*.css']//要监听的css目录
		    }]
	    },
	    media: {
		    options: {
			    designWidth : 640,//设计稿宽度
			    baseFont    : 20,//基础字体
			    border      : 0,//1不处理border，0处理
			    ie8         : 0,//1生成ie8代码，0不生成
			    media       : 1,//1生成meadia query代码，0不生成
			    dest        : 'test/assets/css/media/'//rem css输出目录
		    },
		    files: [{
			    src : ['test/assets/css/media/*.css']//要监听的css目录
		    }]
	    },
	    rem2px: {
		    options: {
			    designWidth : 640,//设计稿宽度
			    baseFont    : 20,//基础字体
			    border      : 0,//1不处理border，0处理
			    ie8         : 0,//1生成ie8代码，0不生成
			    mode        : 1,
			    media       : 0,//1生成meadia query代码，0不生成
			    dest        : 'test/assets/css/rem2px/'//rem css输出目录
		    },
		    files: [{
			    src : ['test/assets/css/rem2px/*.css']//要监听的css目录
		    }]
	    }
    },

    watch: {
	    css: {
				files: ['test/assets/css/*.css', 'tasks/px2rem.js'],
				tasks: ['px2rem']
			}
    },

    // Unit tests.
	nodeunit: {
      tests: ['test/test*.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test',
	  ['clean',
	    'px2rem:default',
	    'px2rem:border',
	    'px2rem:ie8',
		  'px2rem:rem2px',
		  'px2rem:media',
	  'nodeunit']);


  // By default, lint and run all tests.

	grunt.registerTask('default', ['px2rem', 'watch']);
	grunt.registerTask('p2r', 'px2rem');

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};