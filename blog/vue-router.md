# vue-router

src/history/base.js


运行顺序：

起步于`mixin:beforeCreate`:
* `VueRouter.init()` - 选择路由器的模式：hash/history
* `HashHistory.transitionTo()`
* `VueRouter.match` - 用当前页面地址匹配对应的页面
* `matchRoute` - 使用regex来匹配
* `History.confirmTransition()`
* `runQueue()`

钩子顺序：

1. `beforeRouteLeave`
2. `beforeEach`
3. `beforeRouteUpdate`
4. `beforeEnter`
5. `beforeRouteEnter`
6. `beforeResolve`
7. `afterEach`


## to do

1. Hash,HTML5模式的区别？

2. 为什么Hash模式的启动监听要延迟执行(`setupListeners`),而HTML5模式是在`constructor`就开始了

3. Hash模式下分别什么情况下监听`pushState`或`hashchange`事件