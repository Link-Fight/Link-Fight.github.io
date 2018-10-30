# gulp和webpack的一些小事

>此文是基于本人的日常工作中的经验总结得来。

---

## gulp是什么？

`gulp`是一个运行于nodejs上自动任务运行器，采用`streams`的设计理念来设计任务流。就是输入目标文件，然后根据需要使用插件之类，进行修改后，输出新的文件，或者传递给下一个任务。

`gulp`可以说是构建任务的运行器，前端开发越来越复杂，需要一个构建过程。而`gulp`可以接管构建过程，通过把它们分成一个个任务`task`来执行。例如：sass/less文件的编译，js代码的混淆，以及生成文件的改名以及移动等，都是可以是一个个`gulp`的`task`,而把一个个`task`串联起来就是现代前端的自动化构建过程了。

## webpack是什么？

`webpack`是一个基于`module bundler`的存在，所有资源.js,.less,.img对于`webpack`都是要打包的文件，只是打包不同类型的文件，需要通过不同的`loader`来处理不同类型的文件。配置项比较多。

它以入口文件为起点，根据文件引入模块，不断加载需要的模块。里面

## gulp和webpack的不同之处？

`gulp`以一个任务为一个调度单位，用于对一个或一些文件进行修改，可以用于一些比较单独的任务：例如，单独打包sass/less文件，还可以做一些类似`bash`脚本的工作，例如：修改文件们，移动文件到某些目录等。

`webpack`是从某个特定入口为起点，根据模块的依赖关系，把各个模块资源当做文件来加载处理，当然加载处理，需要相应的loader。

## 为什么选择了webpack？

主要是现在选用了`vue-cli`，里面就包含的`webpack`的大部分配置，基本开箱可用。并且webpack的热更新用起来也好爽，还有后台代理也不错。虽然，这些用`gulp`也可以用相关的插件来实现，但毕竟`webpack`用起来方便些。

## 谈谈这些自动化工具中用到的插件或者loader?

gulp

* `gulp-babel`:把es6变为es5
* `gulp-changed`:就是只让改变过的文件传递过管道，特别在开发阶段，频繁修改文件时候。
* `gulp-htmlmin`:主要用于html代码的压缩，可以去掉写在html上的注解
* `gulp-if`:在管道执行过程中，可以添加条件判断。例如：只在发布环境下才压缩代码。
* `gulp-ignore`:可以在管道执行过程中，排除指定条件的文件。
* `gulp-jsonminify`:压缩json文件。
* `gulp-replace`:对途经管道的字符串进行替换操作
  > `gulp-replace`插件源码是直接基于`transform`
进行封装，而`gulp`教程上推荐用的`through2`其实也是`transform`的封装
* `gulp-rev-all`:对静态文件添加hash，用于缓存管理。是`gulp-rev`的升级版本。
* `webpack-stream`:gulp也可以配合`webpack`，就是靠这个插件

webpack

`babel-loader`,`css-loader`,`eslint-loader`,`file-loader`,`postcss-loader`,`url-loader`,`vue-loader`,`vue-style-loader`

这几个loader是做`vue`项目经常用到的，闻其名大概能知其意了。

#### plugin

* `extract-text-webpack-plugin`: 把所有样式抽离出来，放到一个css文件里面。对于vue项目，就是`.vue`类型文件，就是把文件里面的`style`标签内的样式都抽离，然后汇总到一个css文件中去。然后，加载时候统一加载。所以，加`scoped`在默认情况下还是有必要的。

* `optimize-css-assets-webpack-plugin`:专门压缩css的

* `uglifyjs-webpack-plugin`:压缩js代码，可以配置到压缩注释，以及去掉`debugger`,`console`代码

* `html-webpack-plugin`:处理单页应用的入口页面的`index.html`（这个你可以指定，一般用这个），它可以正确引用打包后的js，css文件

* `copy-webpack-plugin`: 用于把一个文件目录下的内容copy到指定文件目录

* `webpack.optimize.CommonsChunkPlugin` 可以抽取异步模块的共同加载到的模块。