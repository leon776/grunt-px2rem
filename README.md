# px2rem
## 功能
监听某个目录下的css文件，自动将里面px单位值转按照一定规则化为rem单位值。

## 参数
<pre>
default: {
  options: {
    designWidth : 640,            //设计稿宽度
    baseFont    : 20,             //基础字体
    border      : 1,              //1不处理border，0处理
    ie8         : 1,              //1生成ie8代码，0不生成
    dest        : 'assets/css/'   //rem css输出目录
    mode        : 0               //0:px转rem，1rem转px
  },
  files: [{
    src : ['assets/css/*.css']//要监听的css目录
  }]
}
</pre>

