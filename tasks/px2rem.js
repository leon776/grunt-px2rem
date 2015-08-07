/*
 * px2rem
 * https://github.com/leon776/px2rem
 *
 * Copyright (c) 2015 xiaoweili
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');

var RemTransform = function(option) {
	var baseFont = option.baseFont, designWidth = option.designWidth;
	//创建media query
	function _createMedia() {
		var tmp = '';
		var tpl = '@media only screen and (max-width: <%=screenWidth%>px), only screen and (max-device-width:<%=screenWidth%>px) {\n' +
			'html,body {\n' +
			'font-size:<%=fontSize%>px;\n' +
			'}\n' +
			'}\n';
		var screens = [1080, 960, 800, 720, 640, 600, 540, 480, 414, 400, 375, 360, 320, 240];
		for (var i = 0; i < screens.length; i++) {
			tmp += (tpl.replace(/\<%\=screenWidth%\>/g, screens[i]).replace('<%=fontSize%>', (screens[i] / designWidth)*baseFont));
		}
		return tmp;
	}
	//获取rem值
	function _getRem(px) {
		var reg = new RegExp("[0-9]+([.]{1}[0-9]+){0,1}","g"), rem = px;
		var tmp = px.match(reg);
		for (var i = 0; i < tmp.length; i++) {
			if(Number(tmp[i]) === 0 || px.indexOf( tmp[i] + 'px' ) < 0) {
				continue;//0不做处理,数字后面不是px不做处理
			}
			rem = rem.replace(tmp[i] + 'px', (Number(tmp[i]) / baseFont) + 'rem');
		}
		return rem;
	}
	//获取px值
	function _getPx(rem) {
		var reg = new RegExp("[0-9]+([.][0-9]+)?","g"), px = rem;
		var tmp = rem.match(reg);
		for (var i = 0; i < tmp.length; i++) {
			px = px.replace(tmp[i] + 'rem', (Number(tmp[i]) * baseFont) + 'px');
		}
		return px;
	}
	//末尾自动添加分号
	function _addSemicolon (str) {
		var reg = new RegExp(/([0-9]+)([^;{}])?}/g);
		return str.replace(reg, "$1$2;}");
	}
	function _filterBorder(str) {
		if(str.substr(-6) === 'border'
			|| str.substr(-12) === 'border-width'
			|| str.substr(-10) === 'border-top'
			|| str.substr(-11) === 'border-left'
			|| str.substr(-12) === 'border-right'
			|| str.substr(-13) === 'border-bottom'
			|| str.substr(-13) === 'border-radius'
		) {
			return true;
		}
		return false;
	}
	//将px转换成rem
	function changeToRem (input) {
		var after = '', tmp = [],
			reg = new RegExp(":[^:]*px([^;/])*;","g"),
			before = _addSemicolon(input);
		var pxArray = before.match(reg);
		if(!pxArray) { return; }
		for (var i = 0; i < pxArray.length; i++) {
			tmp = before.split(pxArray[i]);
			if(option.border && _filterBorder(tmp[0])) {
				continue;
			}
			after += tmp[0];
			if(option.ie8) {
				after += pxArray[i];
				after += tmp[0].substr(Math.max( tmp[0].lastIndexOf(';'), tmp[0].lastIndexOf('{') ) + 1);
			}
			after += _getRem(pxArray[i], baseFont);
			before = before.replace(tmp[0], '').replace(pxArray[i], '');
		}
		if(option.media) {
			return _createMedia() + after + before;
		} else {
			return after + before;
		}
	}
	//rem转px
	function changeToPx (input) {
		var after = '', tmp = [], reg = new RegExp(":.*rem","g"), before = input;
		var pxArray = before.match(reg);
		if(!pxArray) { return; }
		for (var i = 0; i < pxArray.length; i++) {
			tmp = before.split(pxArray[i]);
			after += tmp[0]  + _getPx(pxArray[i], baseFont);
			before = before.replace(tmp[0], '').replace(pxArray[i], '');
		}
		return after + before;
	}
	return {
		px2rem: changeToRem,
		rem2px: changeToPx
	};
};

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('px2rem', function() {
		var options = this.options({});
		var rem = new RemTransform(options);
		//console.log(JSON.stringify(this.files));
		grunt.file.defaultEncoding = 'utf8';
		this.files.forEach(function(file) {

			file.src.forEach(function(src) {
				var input = '', output = '', filepath = options.dest;
				if(src.indexOf('-rem') > 0) {
					return false;
				}
				if (!grunt.file.exists(src)) {
					grunt.log.warn('Source file "' + src + '" not found.');
					return false;
				}
				input = grunt.file.read(src);
				if(!options.mode) {
					output = rem.px2rem(input);
				} else{
					output = rem.rem2px(input);
				}
				filepath += path.basename(src, '.css') + '-rem.css';
				grunt.file.write(filepath, output);
			});
		});
	});
};
