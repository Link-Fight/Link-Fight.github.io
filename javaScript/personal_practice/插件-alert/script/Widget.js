(function(window, undefined) {
    function Widget() {
        if (!(this instanceof Widget)) {
            return new Widget();
        }
        this.boundingBox = null;
        this.EventListener = null;
        //这个属性会有些问题，
        // 当其子类的一个实例被创建，然后被销毁，这个而对这个属性的的操作会保留到下一个子类的实例中
        this.returnValue
    }

    Widget.prototype = {
        constructor: Widget,
        //方法
        on: function(key, fn) {
            var stack = this.EventListener[key];
            stack = stack ? stack : stack = this.EventListener[key] = [];
            stack.push(fn);
            return this;
        },
        //方法
        fire: function(key, data) {
            var stack = this.EventListener[key];
            stack && stack.forEach(function(fn) {
                fn && fn(data);
            });
            return this;
        },
        // 接口：添加dom节点
        renderUI: function(params) {

        },
        // 接口：监听事件
        bindUI: function(params) {

        },
        // 接口：初始化组件属性
        syncUI: function(params) {

        },
        // 接口：销毁前的处理函数
        destructor: function(params) {

        },
        // 方法销毁组件
        destroy: function(params) {
            this.destructor();
            this.boundingBox[0].parentElement.removeChild(this.boundingBox[0]);
        },
        // 方法:渲染组件
        render: function(container) {
            container = !container ? document.body : container;
            this.renderUI(container);
            this.EventListener = {};
            this.bindUI();
            this.syncUI();
            container.appendChild(this.boundingBox[0]);
        },
        say: function() {
            console.log("I'm Widget" + "@:" + this);
        }
    }

    if (typeof define === "function" && define.amd && !(define.amd.Owindow)) {
        define(function() {
            return { Widget };
        }
        );
    } else {
        window.Widget = Widget;
    }

})(window);