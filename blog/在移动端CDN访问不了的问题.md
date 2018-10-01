# 在移动端CDN访问不了的问题


手头上有个项目，主要在微信环境下运行，前端功能基本完善了，项目也发布到线上运行了。接下来的一步就是进行优化了。gzip开启，静态资源文件就变为之前的三分之一了，可以可以。

接着跑去看看`app.js`和`vender.js`文件，由于每个页面都做了懒加载，除了一个使用了地图框架的页面js外，体积最大就是这两个文件了。`app.js`里面放着些全局组件以及api的代码，还有微信sdk/安卓JSbridge的辅助代码,以及`vue-router`和`vuex`的业务代码，这些好像都动不了。而`vender.js`就是项目中使用到的库的代码，因为一般用到的库都不会这么变，所以都被收纳在这个文件里面，其实还有个类似的`vender-async.js`，这个也是放库的，主要是那些懒加载页面用到的库。

当项目用到的库越多，`vender.js`文件越大，我这个项目的`vender`就有`babel-polyfill`,`axios`,`wx-js-dsk`，`vue`，`vuex`和`vue-router`的源代码。面对这些很少变化库，我当时想到让它们走`CDN`好了。

说干就干，准备好CDN源：

``` html
<script src="https://cdn.bootcss.com/vue/2.5.2/vue.min.js"></script>
<script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
<script src="https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>
```

修改下webpack的配置，就是设置下`externals`的配置：

``` javasrcipt
  externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex'
    },
```

原来业务代码不需要变化，`vender.js`代码量就少去这些库的代码了。

简单看下实现：

1. 这些cdn引入的代码都把库挂载全局`window`上

https://cdn.bootcss.com/vue/2.5.2/vue.min.js 文件内容：
``` javascript
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Vue = t()
}(this, function() {
  /* 库的定义的代码 */
})
```
整个代码被一个立即自执行函数包裹起来，传递两个参数：`this`在这里运行是指向着`window`，而`function(){...}`就是框架的定义代码。这个自执行函数的运行结果就是把框架挂载到全局`windwo`上，因为`exports`和`module`在该运行环境下是不存在的。

2. `import`引入的库，其实就是使用`window`上的库。

在业务代码上，就爽走了CDN,使用库时候，还是通过`import`来引用库。看下其打包后的文件，可以找到：

``` JavaScript
    lRwf: function(t, e) {
        t.exports = Vue
    },
```

其实此时写 `import vue from Vue`是等效于`const vue = window.Vue`的。

好的，用上CDN后，`vender.js`看起来没那么碍眼了，也为我们服务器节省了带宽，心里美滋滋的。

把修改后的代码，部署到了正式站，一直相安无事。

一个月后....，今天！10月1

有人反馈，这个站点安卓机器访问不了，收到反馈后，立马上去找bug。

发现，我的小米6还是可以访问的，难道又是那些4.x的机器来折腾我？接着，又收到同事反馈说，他ip8也访问不了,卡在入口index.html,页面。然后，我当然拿他当样本进行调研，发现该站点有时候是可以打得开的，有时候是打不开的，实在怪异。此时我想到是不是CDN的问题，毕竟这个月在写小程序项目，没怎么动过它。当时，还不在电脑前，只能手机看页面代码(通过手机chrome，在页面地址添加`view-source：`)，然后发那三个cdn地址给同事。

同事反馈到，这个三个cdn地址很大概率访问不到，并且当可以成功访问时候，页面可以就可以访问了。我就把地址发给更过的朋友，他们的不少反馈也是打不开，有ios和安卓用户，而且大部分是联通的。好吧，好像有石锤了。接着，百度了下，看看有没有同病相怜的，还真有[https://www.cmsky.com/site/cdn-cmcc](https://www.cmsky.com/site/cdn-cmcc)。

结果是，我恢复没有CDN的版本，保证访问正常先。