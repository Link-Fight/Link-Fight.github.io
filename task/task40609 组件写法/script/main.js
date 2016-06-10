require.config({
    paths: {
        jquery: "jquery-1.9.1"
    },
    shim: {
        'jquery': {
            exports: '_'
        }
    }
});
require(["jquery"],
    v6
);

// V1~V6 学习自https://github.com/purplebamboo/demo-richbase/tree/master/example  http://purplebamboo.github.io/2015/03/16/javascript-component/

function v1(_$) {
    var input = _$("#J_input");

    function getNum() {
        return input.val().length;
    }

    function render() {
        var num = getNum();

        if (_$('#J_input_count').length === 0) {
            input.after('<span id="J_input_count"></span>');
        }
        $("#J_input_count").html(num + '个字');
    }

    input.on('keyup', function () {
        render();
    });

    render();
}

function v2($) {
    var textConut = {
        input: null,
        spanId: null,
        init: function (config) {
            this.input = $("#" + config.id);
            this.spanId = config.spanId;
            this.bind();
            return this;
        },
        bind: function () {
            var self = this;
            this.input.on('keyup', function () {
                self.render();
            });
        },
        getNum: function () {
            return this.input.val().length;
        },
        render: function () {
            var num = this.getNum();
            if ($("#" + this.spanId).length == 0) {
                this.input.after("<span id=" + this.spanId + "></span>");
            }
            $("#" + this.spanId).html(num + '个字');
        }

    }
    textConut.init({ id: 'J_input', spanId: 'J_input_span' }).render();
}

function v3($) {
    var TextCount = (function () {
        //私有方法_bind,_getNum
        var _bind = function (that) {
            that.input.on("keyup", function () {
                that.render();
            });
        }
        var _getNum = function (that) {
            return that.input.val().length;
        }
        var TextCountFun = function (config) {
        }
        TextCountFun.prototype.init = function (config) {
            this.input = $('#' + config.id);
            this.spanId = config.spanId;
            _bind(this);
            return this;
        };
        TextCountFun.prototype.render = function () {
            var num = _getNum(this);
            if (!this.span && $("#" + this.spanId).length == 0) {
                this.span = $('<span id=' + this.spanId + '></span>');
                this.input.after(this.span);
            }
            this.span.html(num + '个字');
        };
        return TextCountFun;
    })();

    new TextCount().init({ id: "J_input", spanId: "J_input_span" }).render();
}

function v4($) {
    var Class = (function () {
        var _mix = function (r, s) {
            for (var p in s) {
                if (s.hasOwnProperty(p)) {
                    r[p] = s[p];
                }
            }
        }
        var _extend = function () {
            this.initPrototype = true;
            var prototype = new this();
            this.initPrototype = false;

            var items = Array.prototype.slice.call(arguments) || [];
            var item;

            while (item = items.shift()) {
                _mix(prototype, item.prototype || item);
            }

            function SubClass() {
                if (!SubClass.initPrototype && this.init) {
                    this.init.apply(this, arguments);
                }
            }

            SubClass.prototype = prototype;

            SubClass.prototype.constructor = SubClass;

            SubClass.extend = _extend;

            return SubClass;

        }
        var Class = function () { };
        Class.extend = _extend;
        return Class;
    })();

    var TextCount = Class.extend({
        init: function (config) {
            this.input = $("#" + config.id);
            this.spanId = config.spanId;
            this.span = null;
            this._bind();
            this.render();
        },
        render: function () {
            var num = this._getNum();
            if (!this.span) {
                this.span = $('<span id=' + this.spanId + '></span>');
                this.input.after(this.span);
            }
            this.span.html(num + '个字');
        },
        _getNum: function () {
            return this.input.val().length;
        },
        _bind: function () {
            var self = this;
            self.input.on('keyup', function () {
                self.render();
            });
        }
    });
    new TextCount({ id: "J_input", spanId: "J_input_span" });
}

function v5($) {
    var Class = (function () {
        var _mix = function (r, s) {
            for (var p in s) {
                if (s.hasOwnProperty(p)) {
                    r[p] = s[p];
                }
            }
        }
        var _extend = function () {
            this.initPrototype = true;
            var prototype = new this();
            this.initPrototype = false;

            var items = Array.prototype.slice.call(arguments) || [];
            var item;

            while (item = items.shift()) {
                _mix(prototype, item.prototype || item);
            }

            function SubClass() {
                if (!SubClass.initPrototype && this.init) {
                    this.init.apply(this, arguments);
                }
            }

            SubClass.prototype = prototype;

            SubClass.prototype.constructor = SubClass;

            SubClass.extend = _extend;

            return SubClass;

        }
        var Class = function () { };
        Class.extend = _extend;
        return Class;
    })();

    var _indexOf = function (array, key) {
        if (array === null) return -1
        var i = 0, length = array.length
        for (; i < length; i++) if (array[i] === item) return i
        return -1
    }

    var Event = Class.extend({
        //添加监听
        on: function (key, listener) {
            //this.__events存储所有的处理函数
            if (!this.__events) {
                this.__events = {}
            }
            if (!this.__events[key]) {
                this.__events[key] = []
            }
            if (_indexOf(this.__events, listener) === -1 && typeof listener === 'function') {
                this.__events[key].push(listener)
            }

            return this
        },
        //触发一个事件，也就是通知
        fire: function (key) {

            if (!this.__events || !this.__events[key]) return

            var args = Array.prototype.slice.call(arguments, 1) || []

            var listeners = this.__events[key]
            var i = 0
            var l = listeners.length

            for (i; i < l; i++) {
                listeners[i].apply(this, args)
            }

            return this
        },
        //取消监听
        off: function (key, listener) {

            if (!key && !listener) {
                this.__events = {}
            }
            //不传监听函数，就去掉当前key下面的所有的监听函数
            if (key && !listener) {
                delete this.__events[key]
            }

            if (key && listener) {
                var listeners = this.__events[key]
                var index = _indexOf(listeners, listener)

                    (index > -1) && listeners.splice(index, 1)
            }

            return this;
        }
    })
    var Base = Class.extend(Event, {
        init: function (config) {
            this.__config = config;
            this.bind();
            this.render();
        },
        get: function (key) {
            return this.__config[key];
        },
        set: function (key, val) {
            this.__config[key] = val;
        },
        bind: function () { },
        render: function () { },
        destroy: function () { }
    });

    var TextCount = Base.extend({
        _getNum: function () {
            return this.get('input').val().length;
        },
        bind: function () {
            var self = this;
            self.get('input').on('keyup', function () {
                self.render();
            });
        },
        render: function () {
            var num = this._getNum();

            if (!this.get('span')) {
                this.set('span', $("<span id=" + this.get('spanId') + "></span>"));
                this.get('input').after(this.get('span'));
            }
            this.get('span').html(num + "个字");
        },
        destroy: function () {
            this.off();
            var key = Object.keys(this);
            key.forEach(function (k) {
                delete this[k];
            });
        }
    });

    new TextCount({
        input: $("#J_input"),
        spanId: "J_input_span"
    });
}

function v6($) {
    var Class = (function () {
        var _mix = function (r, s) {
            for (var p in s) {
                if (s.hasOwnProperty(p)) {
                    r[p] = s[p];
                }
            }
        }
        var _extend = function () {
            this.initPrototype = true;
            var prototype = new this();
            this.initPrototype = false;

            var items = Array.prototype.slice.call(arguments) || [];
            var item;

            while (item = items.shift()) {
                _mix(prototype, item.prototype || item);
            }

            function SubClass() {
                if (!SubClass.initPrototype && this.init) {
                    this.init.apply(this, arguments);
                }
            }

            SubClass.prototype = prototype;

            SubClass.prototype.constructor = SubClass;

            SubClass.extend = _extend;

            return SubClass;

        }
        var Class = function () { };
        Class.extend = _extend;
        return Class;
    })();

    var _indexOf = function (array, key) {
        if (array === null) return -1
        var i = 0, length = array.length
        for (; i < length; i++) if (array[i] === item) return i
        return -1
    }

    var Event = Class.extend({
        //添加监听
        on: function (key, listener) {
            //this.__events存储所有的处理函数
            if (!this.__events) {
                this.__events = {}
            }
            if (!this.__events[key]) {
                this.__events[key] = []
            }
            if (_indexOf(this.__events, listener) === -1 && typeof listener === 'function') {
                this.__events[key].push(listener)
            }

            return this
        },
        //触发一个事件，也就是通知
        fire: function (key) {

            if (!this.__events || !this.__events[key]) return

            var args = Array.prototype.slice.call(arguments, 1) || []

            var listeners = this.__events[key]
            var i = 0
            var l = listeners.length

            for (i; i < l; i++) {
                listeners[i].apply(this, args)
            }

            return this
        },
        //取消监听
        off: function (key, listener) {

            if (!key && !listener) {
                this.__events = {}
            }
            //不传监听函数，就去掉当前key下面的所有的监听函数
            if (key && !listener) {
                delete this.__events[key]
            }

            if (key && listener) {
                var listeners = this.__events[key]
                var index = _indexOf(listeners, listener)

                    (index > -1) && listeners.splice(index, 1)
            }

            return this;
        }
    })
    var Base = Class.extend(Event, {
        init: function (config) {
            this.__config = config;
            this.bind();
            this.render();
        },
        get: function (key) {
            return this.__config[key];
        },
        set: function (key, val) {
            this.__config[key] = val;
        },
        bind: function () { },
        render: function () { },
        destroy: function () { }
    });

    var RichBase = Base.extend({
        EVENTS: {},
        template: '',
        init: function (config) {
            this.__config = config;
            this._delegateEvent();
            this.setUp();
        },
        _delegateEvent: function () {
            var self = this;
            var events = this.EVENTS || {};
            var eventObjs, fn, select, type;
            var parentNode = this.get('parentNode') || $(document.body);

            for (select in events) {
                eventObjs = events[select];
                for (type in eventObjs) {
                    fn = eventObjs[type];

                    parentNode.delegate(select, type, function (e) {
                        fn.call(null, self, e);
                    })
                }

            }
        },
        //支持underscore的极简模板语法
        //用来渲染模板，这边是抄的underscore的。非常简单的模板引擎，支持原生的js语法
        _parseTemplate: function (str, data) {
            /**
             * http://ejohn.org/blog/javascript-micro-templating/
             * https://github.com/jashkenas/underscore/blob/0.1.0/underscore.js#L399
             */
            var fn = new Function('obj',
                'var p=[],print=function(){p.push.apply(p,arguments);};' +
                'with(obj){p.push(\'' + str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'") +
                "');}return p.join('');")
            return data ? fn(data) : fn
        },
        setUp: function () {
            this.render();
        },
        setChuckdata: function (key, value) {
            var self = this;
            var data = self.get('__renderData');

            // 更新对应的值
            data[key] = value;

            if (!this.template) return;
            // 重新渲染
            var newHtmlNode = $(self._parseTemplate(this.template, data));
            // 拿到存储的渲染后的节点
            var currentNode = self.get('__currentNode');
            if (!currentNode) return;
            // 替换元素
            currentNode.replaceWith(newHtmlNode);
            self.set('__currentNode', newHtmlNode);
        },
        render: function (data) {
            var self = this;
            // 先储存起来渲染的data，方便后面setChuckdata获取使用
            self.set('__renderData', data);

            if (!this.template) return;

            // 使用_parseTemplate解析渲染模板生成html
            // 子类可以覆盖整个方法使用其他的模板引擎解析
            var html = self._parseTemplate(this.template, data);

            var parentNode = this.get('parentNode') || $(document.body);

            var currentNode = $(html);
            //保存下来留待后面的区域刷新
            //存储起来，方便后面setChuckdata获取使用
            self.set('__currentNode', currentNode)
            parentNode.append(currentNode)

        },
        destroy: function () {
            var self = this
            //去掉自身的事件监听
            self.off()
            //删除渲染好的dom节点
            self.get('__currentNode').remove()
            //去掉绑定的代理事件
            var events = self.EVENTS || {}
            var eventObjs, fn, select, type
            var parentNode = self.get('parentNode')
            for (select in events) {
                eventObjs = events[select]
                for (type in eventObjs) {
                    fn = eventObjs[type]
                    parentNode.undelegate(select, type, fn)
                }
            }
        }
    });

    var TextCount = RichBase.extend({
        //事件直接在这里注册，会代理到parentNode节点，parentNode节点在下面指定
        EVENTS: {
            //选择器字符串，支持所有jQuery风格的选择器
            'input': {
                //注册keyup事件
                keyup: function (self, e) {
                    //单向绑定，修改数据直接更新对应模板
                    self.setChuckdata('count', self._getNum())
                }
            }
        },
        //指定当前组件的模板
        template: '<span id="J_input_count"><%= count %>个字</span>',
        //私有方法
        _getNum: function () {
            return this.get('input').val().length || 0
        },
        //覆盖实现setUp方法，所有逻辑写在这里。最后可以使用render来决定需不需要渲染模板
        //模板渲染后会append到parentNode节点下面，如果未指定，会append到document.body
        setUp: function () {
            var self = this;
            var input = this.get('parentNode').find('#J_input')
            self.set('input', input)
            var num = this._getNum()
            //赋值数据，渲染模板，选用。有的组件没有对应的模板就可以不调用这步。
            self.render({
                count: num
            })
        }
    });
    new TextCount({
        parentNode: $("#J_test_container")
    });
}
// richBase
// 事件代理：不需要用户自己去找dom元素绑定监听，也不需要用户去关心什么时候销毁。
// 模板渲染：用户不需要覆盖render方法，而是覆盖实现setUp方法。可以通过在setUp里面调用render来达到渲染对应html。
// 单向绑定：通过setChuckdata方法，更新数据，同时会更新html内容，不需要dom操作