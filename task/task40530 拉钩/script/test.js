/*!common/widgets/login_toolbar/main.js*/
;
define("common/widgets/login_toolbar/main", ["require", "exports", "module"],
function() {
    function a(o, n) {
        if (navigator.userAgent.indexOf("Firefox") > 0) $("#loginToolBar ." + o).html(n);
        else for (var a = $("#loginToolBar ." + o + " i"), c = String(n).length, i = 0; c > i; i++) {
            0 != i && c % 3 == i % 3 && c > 3 && $("#loginToolBar ." + o).append("<b></b>"),
            a.length <= i && $("#loginToolBar ." + o).append("<i></i>");
            var g = String(n).charAt(i),
            b = 30 * -parseInt(g),
            v = $("#loginToolBar ." + o + " i").eq(i);
            v.animate({
                backgroundPositionY: String(b) + "px"
            },
            "3000", "swing",
            function() {})
        }
    }
    var c = $("#cc").val(),
    g = $("#cp").val();
    if (a("companycount", c), a("positioncount", g), $("#loginToolBar")) {
        var b = function() {
            var a = $(this).scrollTop(),
            c = $(document).height(),
            g = $(this).height();
            if (a + g >= c - 68) {
                var b = 68 - (c - a - g);
                $("#loginToolBar").css("bottom", b);
                var v = 140 + b;
                $("#backtop").css("bottom", v);
                var h = 80 + b;
                $("#product-fk").css("bottom", h);
                var T = 80 + b;
                $("#feedback-con").css("bottom", T)
            } else $("#loginToolBar").css("bottom", 0),
            $("#backtop").css("bottom", 140),
            $("#product-fk").css("bottom", 80),
            $("#feedback-con").css("bottom", 80)
        };
        $(window).scroll(b),
        $(window).resize(b)
    }
});
/*!common/components/jquery-ui-custom/jquery-ui.custom.js*/
;
define("common/components/jquery-ui-custom/jquery-ui.custom", ["require", "exports", "module"],
function() { !
    function(a, h) {
        function c(h, c) {
            var g, _, b, y = h.nodeName.toLowerCase();
            return "area" === y ? (g = h.parentNode, _ = g.name, h.href && _ && "map" === g.nodeName.toLowerCase() ? (b = a("img[usemap=#" + _ + "]")[0], !!b && v(b)) : !1) : (/input|select|textarea|button|object/.test(y) ? !h.disabled: "a" === y ? h.href || c: c) && v(h)
        }
        function v(h) {
            return a.expr.filters.visible(h) && !a(h).parents().addBack().filter(function() {
                return "hidden" === a.css(this, "visibility")
            }).length
        }
        var g = 0,
        _ = /^ui-id-\d+$/;
        a.ui = a.ui || {},
        a.extend(a.ui, {
            version: "1.10.4",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }),
        a.fn.extend({
            focus: function(h) {
                return function(c, v) {
                    return "number" == typeof c ? this.each(function() {
                        var h = this;
                        setTimeout(function() {
                            a(h).focus(),
                            v && v.call(h)
                        },
                        c)
                    }) : h.apply(this, arguments)
                }
            } (a.fn.focus),
            scrollParent: function() {
                var h;
                return h = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                }).eq(0),
                /fixed/.test(this.css("position")) || !h.length ? a(document) : h
            },
            zIndex: function(c) {
                if (c !== h) return this.css("zIndex", c);
                if (this.length) for (var v, g, _ = a(this[0]); _.length && _[0] !== document;) {
                    if (v = _.css("position"), ("absolute" === v || "relative" === v || "fixed" === v) && (g = parseInt(_.css("zIndex"), 10), !isNaN(g) && 0 !== g)) return g;
                    _ = _.parent()
                }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++g)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    _.test(this.id) && a(this).removeAttr("id")
                })
            }
        }),
        a.extend(a.expr[":"], {
            data: a.expr.createPseudo ? a.expr.createPseudo(function(h) {
                return function(c) {
                    return !! a.data(c, h)
                }
            }) : function(h, i, c) {
                return !! a.data(h, c[3])
            },
            focusable: function(h) {
                return c(h, !isNaN(a.attr(h, "tabindex")))
            },
            tabbable: function(h) {
                var v = a.attr(h, "tabindex"),
                g = isNaN(v);
                return (g || v >= 0) && c(h, !g)
            }
        }),
        a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"],
        function(i, c) {
            function v(h, c, v, _) {
                return a.each(g,
                function() {
                    c -= parseFloat(a.css(h, "padding" + this)) || 0,
                    v && (c -= parseFloat(a.css(h, "border" + this + "Width")) || 0),
                    _ && (c -= parseFloat(a.css(h, "margin" + this)) || 0)
                }),
                c
            }
            var g = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
            _ = c.toLowerCase(),
            b = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
            a.fn["inner" + c] = function(g) {
                return g === h ? b["inner" + c].call(this) : this.each(function() {
                    a(this).css(_, v(this, g) + "px")
                })
            },
            a.fn["outer" + c] = function(h, g) {
                return "number" != typeof h ? b["outer" + c].call(this, h) : this.each(function() {
                    a(this).css(_, v(this, h, !0, g) + "px")
                })
            }
        }),
        a.fn.addBack || (a.fn.addBack = function(a) {
            return this.add(null == a ? this.prevObject: this.prevObject.filter(a))
        }),
        a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(h) {
            return function(c) {
                return arguments.length ? h.call(this, a.camelCase(c)) : h.call(this)
            }
        } (a.fn.removeData)),
        a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
        a.support.selectstart = "onselectstart" in document.createElement("div"),
        a.fn.extend({
            disableSelection: function() {
                return this.bind((a.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
                function(a) {
                    a.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }),
        a.extend(a.ui, {
            plugin: {
                add: function(module, h, c) {
                    var i, v = a.ui[module].prototype;
                    for (i in c) v.plugins[i] = v.plugins[i] || [],
                    v.plugins[i].push([h, c[i]])
                },
                call: function(a, h, c) {
                    var i, v = a.plugins[h];
                    if (v && a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType) for (i = 0; i < v.length; i++) a.options[v[i][0]] && v[i][1].apply(a.element, c)
                }
            },
            hasScroll: function(h, c) {
                if ("hidden" === a(h).css("overflow")) return ! 1;
                var v = c && "left" === c ? "scrollLeft": "scrollTop",
                g = !1;
                return h[v] > 0 ? !0 : (h[v] = 1, g = h[v] > 0, h[v] = 0, g)
            }
        })
    } (jQuery),
    function(a, h) {
        var c = 0,
        v = Array.prototype.slice,
        g = a.cleanData;
        a.cleanData = function(h) {
            for (var c, i = 0; null != (c = h[i]); i++) try {
                a(c).triggerHandler("remove")
            } catch(e) {}
            g(h)
        },
        a.widget = function(h, c, v) {
            var g, _, b, y, w = {},
            C = h.split(".")[0];
            h = h.split(".")[1],
            g = C + "-" + h,
            v || (v = c, c = a.Widget),
            a.expr[":"][g.toLowerCase()] = function(h) {
                return !! a.data(h, g)
            },
            a[C] = a[C] || {},
            _ = a[C][h],
            b = a[C][h] = function(a, h) {
                return this._createWidget ? void(arguments.length && this._createWidget(a, h)) : new b(a, h)
            },
            a.extend(b, _, {
                version: v.version,
                _proto: a.extend({},
                v),
                _childConstructors: []
            }),
            y = new c,
            y.options = a.widget.extend({},
            y.options),
            a.each(v,
            function(h, v) {
                return a.isFunction(v) ? void(w[h] = function() {
                    var a = function() {
                        return c.prototype[h].apply(this, arguments)
                    },
                    g = function(a) {
                        return c.prototype[h].apply(this, a)
                    };
                    return function() {
                        var h, c = this._super,
                        _ = this._superApply;
                        return this._super = a,
                        this._superApply = g,
                        h = v.apply(this, arguments),
                        this._super = c,
                        this._superApply = _,
                        h
                    }
                } ()) : void(w[h] = v)
            }),
            b.prototype = a.widget.extend(y, {
                widgetEventPrefix: _ ? y.widgetEventPrefix || h: h
            },
            w, {
                constructor: b,
                namespace: C,
                widgetName: h,
                widgetFullName: g
            }),
            _ ? (a.each(_._childConstructors,
            function(i, h) {
                var c = h.prototype;
                a.widget(c.namespace + "." + c.widgetName, b, h._proto)
            }), delete _._childConstructors) : c._childConstructors.push(b),
            a.widget.bridge(h, b)
        },
        a.widget.extend = function(c) {
            for (var g, _, b = v.call(arguments, 1), y = 0, w = b.length; w > y; y++) for (g in b[y]) _ = b[y][g],
            b[y].hasOwnProperty(g) && _ !== h && (c[g] = a.isPlainObject(_) ? a.isPlainObject(c[g]) ? a.widget.extend({},
            c[g], _) : a.widget.extend({},
            _) : _);
            return c
        },
        a.widget.bridge = function(c, g) {
            var _ = g.prototype.widgetFullName || c;
            a.fn[c] = function(b) {
                var y = "string" == typeof b,
                w = v.call(arguments, 1),
                C = this;
                return b = !y && w.length ? a.widget.extend.apply(null, [b].concat(w)) : b,
                this.each(y ?
                function() {
                    var v, g = a.data(this, _);
                    return g ? a.isFunction(g[b]) && "_" !== b.charAt(0) ? (v = g[b].apply(g, w), v !== g && v !== h ? (C = v && v.jquery ? C.pushStack(v.get()) : v, !1) : void 0) : a.error("no such method '" + b + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; attempted to call method '" + b + "'")
                }: function() {
                    var h = a.data(this, _);
                    h ? h.option(b || {})._init() : a.data(this, _, new g(b, this))
                }),
                C
            }
        },
        a.Widget = function() {},
        a.Widget._childConstructors = [],
        a.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(h, v) {
                v = a(v || this.defaultElement || this)[0],
                this.element = a(v),
                this.uuid = c++,
                this.eventNamespace = "." + this.widgetName + this.uuid,
                this.options = a.widget.extend({},
                this.options, this._getCreateOptions(), h),
                this.bindings = a(),
                this.hoverable = a(),
                this.focusable = a(),
                v !== this && (a.data(v, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(a) {
                        a.target === v && this.destroy()
                    }
                }), this.document = a(v.style ? v.ownerDocument: v.document || v), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)),
                this._create(),
                this._trigger("create", null, this._getCreateEventData()),
                this._init()
            },
            _getCreateOptions: a.noop,
            _getCreateEventData: a.noop,
            _create: a.noop,
            _init: a.noop,
            destroy: function() {
                this._destroy(),
                this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),
                this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
                this.bindings.unbind(this.eventNamespace),
                this.hoverable.removeClass("ui-state-hover"),
                this.focusable.removeClass("ui-state-focus")
            },
            _destroy: a.noop,
            widget: function() {
                return this.element
            },
            option: function(c, v) {
                var g, _, i, b = c;
                if (0 === arguments.length) return a.widget.extend({},
                this.options);
                if ("string" == typeof c) if (b = {},
                g = c.split("."), c = g.shift(), g.length) {
                    for (_ = b[c] = a.widget.extend({},
                    this.options[c]), i = 0; i < g.length - 1; i++) _[g[i]] = _[g[i]] || {},
                    _ = _[g[i]];
                    if (c = g.pop(), 1 === arguments.length) return _[c] === h ? null: _[c];
                    _[c] = v
                } else {
                    if (1 === arguments.length) return this.options[c] === h ? null: this.options[c];
                    b[c] = v
                }
                return this._setOptions(b),
                this
            },
            _setOptions: function(a) {
                var h;
                for (h in a) this._setOption(h, a[h]);
                return this
            },
            _setOption: function(a, h) {
                return this.options[a] = h,
                "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!h).attr("aria-disabled", h), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")),
                this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(h, c, v) {
                var g, _ = this;
                "boolean" != typeof h && (v = c, c = h, h = !1),
                v ? (c = g = a(c), this.bindings = this.bindings.add(c)) : (v = c, c = this.element, g = this.widget()),
                a.each(v,
                function(v, b) {
                    function y() {
                        return h || _.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof b ? _[b] : b).apply(_, arguments) : void 0
                    }
                    "string" != typeof b && (y.guid = b.guid = b.guid || y.guid || a.guid++);
                    var w = v.match(/^(\w+)\s*(.*)$/),
                    C = w[1] + _.eventNamespace,
                    D = w[2];
                    D ? g.delegate(D, C, y) : c.bind(C, y)
                })
            },
            _off: function(a, h) {
                h = (h || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
                a.unbind(h).undelegate(h)
            },
            _delay: function(a, h) {
                function c() {
                    return ("string" == typeof a ? v[a] : a).apply(v, arguments)
                }
                var v = this;
                return setTimeout(c, h || 0)
            },
            _hoverable: function(h) {
                this.hoverable = this.hoverable.add(h),
                this._on(h, {
                    mouseenter: function(h) {
                        a(h.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(h) {
                        a(h.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(h) {
                this.focusable = this.focusable.add(h),
                this._on(h, {
                    focusin: function(h) {
                        a(h.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(h) {
                        a(h.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(h, c, v) {
                var g, _, b = this.options[h];
                if (v = v || {},
                c = a.Event(c), c.type = (h === this.widgetEventPrefix ? h: this.widgetEventPrefix + h).toLowerCase(), c.target = this.element[0], _ = c.originalEvent) for (g in _) g in c || (c[g] = _[g]);
                return this.element.trigger(c, v),
                !(a.isFunction(b) && b.apply(this.element[0], [c].concat(v)) === !1 || c.isDefaultPrevented())
            }
        },
        a.each({
            show: "fadeIn",
            hide: "fadeOut"
        },
        function(h, c) {
            a.Widget.prototype["_" + h] = function(v, g, _) {
                "string" == typeof g && (g = {
                    effect: g
                });
                var b, y = g ? g === !0 || "number" == typeof g ? c: g.effect || c: h;
                g = g || {},
                "number" == typeof g && (g = {
                    duration: g
                }),
                b = !a.isEmptyObject(g),
                g.complete = _,
                g.delay && v.delay(g.delay),
                b && a.effects && a.effects.effect[y] ? v[h](g) : y !== h && v[y] ? v[y](g.duration, g.easing, _) : v.queue(function(c) {
                    a(this)[h](),
                    _ && _.call(v[0]),
                    c()
                })
            }
        })
    } (jQuery),
    function(a) {
        var h = !1;
        a(document).mouseup(function() {
            h = !1
        }),
        a.widget("ui.mouse", {
            version: "1.10.4",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var h = this;
                this.element.bind("mousedown." + this.widgetName,
                function(a) {
                    return h._mouseDown(a)
                }).bind("click." + this.widgetName,
                function(c) {
                    return ! 0 === a.data(c.target, h.widgetName + ".preventClickEvent") ? (a.removeData(c.target, h.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
                }),
                this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName),
                this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(c) {
                if (!h) {
                    this._mouseStarted && this._mouseUp(c),
                    this._mouseDownEvent = c;
                    var v = this,
                    g = 1 === c.which,
                    _ = "string" == typeof this.options.cancel && c.target.nodeName ? a(c.target).closest(this.options.cancel).length: !1;
                    return g && !_ && this._mouseCapture(c) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        v.mouseDelayMet = !0
                    },
                    this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1, !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
                        return v._mouseMove(a)
                    },
                    this._mouseUpDelegate = function(a) {
                        return v._mouseUp(a)
                    },
                    a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), c.preventDefault(), h = !0, !0)) : !0
                }
            },
            _mouseMove: function(h) {
                return a.ui.ie && (!document.documentMode || document.documentMode < 9) && !h.button ? this._mouseUp(h) : this._mouseStarted ? (this._mouseDrag(h), h.preventDefault()) : (this._mouseDistanceMet(h) && this._mouseDelayMet(h) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, h) !== !1, this._mouseStarted ? this._mouseDrag(h) : this._mouseUp(h)), !this._mouseStarted)
            },
            _mouseUp: function(h) {
                return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
                this._mouseStarted && (this._mouseStarted = !1, h.target === this._mouseDownEvent.target && a.data(h.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(h)),
                !1
            },
            _mouseDistanceMet: function(a) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return ! 0
            }
        })
    } (jQuery),
    function(a, h) {
        function c(a, h, c) {
            return [parseFloat(a[0]) * (T.test(a[0]) ? h / 100 : 1), parseFloat(a[1]) * (T.test(a[1]) ? c / 100 : 1)]
        }
        function v(h, c) {
            return parseInt(a.css(h, c), 10) || 0
        }
        function g(h) {
            var c = h[0];
            return 9 === c.nodeType ? {
                width: h.width(),
                height: h.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            }: a.isWindow(c) ? {
                width: h.width(),
                height: h.height(),
                offset: {
                    top: h.scrollTop(),
                    left: h.scrollLeft()
                }
            }: c.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: c.pageY,
                    left: c.pageX
                }
            }: {
                width: h.outerWidth(),
                height: h.outerHeight(),
                offset: h.offset()
            }
        }
        a.ui = a.ui || {};
        var _, b = Math.max,
        y = Math.abs,
        w = Math.round,
        C = /left|center|right/,
        D = /top|center|bottom/,
        E = /[\+\-]\d+(\.[\d]+)?%?/,
        N = /^\w+/,
        T = /%$/,
        k = a.fn.position;
        a.position = {
            scrollbarWidth: function() {
                if (_ !== h) return _;
                var c, v, g = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                b = g.children()[0];
                return a("body").append(g),
                c = b.offsetWidth,
                g.css("overflow", "scroll"),
                v = b.offsetWidth,
                c === v && (v = g[0].clientWidth),
                g.remove(),
                _ = c - v
            },
            getScrollInfo: function(h) {
                var c = h.isWindow || h.isDocument ? "": h.element.css("overflow-x"),
                v = h.isWindow || h.isDocument ? "": h.element.css("overflow-y"),
                g = "scroll" === c || "auto" === c && h.width < h.element[0].scrollWidth,
                _ = "scroll" === v || "auto" === v && h.height < h.element[0].scrollHeight;
                return {
                    width: _ ? a.position.scrollbarWidth() : 0,
                    height: g ? a.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(h) {
                var c = a(h || window),
                v = a.isWindow(c[0]),
                g = !!c[0] && 9 === c[0].nodeType;
                return {
                    element: c,
                    isWindow: v,
                    isDocument: g,
                    offset: c.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: c.scrollLeft(),
                    scrollTop: c.scrollTop(),
                    width: v ? c.width() : c.outerWidth(),
                    height: v ? c.height() : c.outerHeight()
                }
            }
        },
        a.fn.position = function(h) {
            if (!h || !h.of) return k.apply(this, arguments);
            h = a.extend({},
            h);
            var _, T, M, A, W, P, I = a(h.of),
            S = a.position.getWithinInfo(h.within),
            H = a.position.getScrollInfo(S),
            L = (h.collision || "flip").split(" "),
            O = {};
            return P = g(I),
            I[0].preventDefault && (h.at = "left top"),
            T = P.width,
            M = P.height,
            A = P.offset,
            W = a.extend({},
            A),
            a.each(["my", "at"],
            function() {
                var a, c, v = (h[this] || "").split(" ");
                1 === v.length && (v = C.test(v[0]) ? v.concat(["center"]) : D.test(v[0]) ? ["center"].concat(v) : ["center", "center"]),
                v[0] = C.test(v[0]) ? v[0] : "center",
                v[1] = D.test(v[1]) ? v[1] : "center",
                a = E.exec(v[0]),
                c = E.exec(v[1]),
                O[this] = [a ? a[0] : 0, c ? c[0] : 0],
                h[this] = [N.exec(v[0])[0], N.exec(v[1])[0]]
            }),
            1 === L.length && (L[1] = L[0]),
            "right" === h.at[0] ? W.left += T: "center" === h.at[0] && (W.left += T / 2),
            "bottom" === h.at[1] ? W.top += M: "center" === h.at[1] && (W.top += M / 2),
            _ = c(O.at, T, M),
            W.left += _[0],
            W.top += _[1],
            this.each(function() {
                var g, C, D = a(this),
                E = D.outerWidth(),
                N = D.outerHeight(),
                k = v(this, "marginLeft"),
                P = v(this, "marginTop"),
                F = E + k + v(this, "marginRight") + H.width,
                U = N + P + v(this, "marginBottom") + H.height,
                R = a.extend({},
                W),
                j = c(O.my, D.outerWidth(), D.outerHeight());
                "right" === h.my[0] ? R.left -= E: "center" === h.my[0] && (R.left -= E / 2),
                "bottom" === h.my[1] ? R.top -= N: "center" === h.my[1] && (R.top -= N / 2),
                R.left += j[0],
                R.top += j[1],
                a.support.offsetFractions || (R.left = w(R.left), R.top = w(R.top)),
                g = {
                    marginLeft: k,
                    marginTop: P
                },
                a.each(["left", "top"],
                function(i, c) {
                    a.ui.position[L[i]] && a.ui.position[L[i]][c](R, {
                        targetWidth: T,
                        targetHeight: M,
                        elemWidth: E,
                        elemHeight: N,
                        collisionPosition: g,
                        collisionWidth: F,
                        collisionHeight: U,
                        offset: [_[0] + j[0], _[1] + j[1]],
                        my: h.my,
                        at: h.at,
                        within: S,
                        elem: D
                    })
                }),
                h.using && (C = function(a) {
                    var c = A.left - R.left,
                    v = c + T - E,
                    g = A.top - R.top,
                    _ = g + M - N,
                    w = {
                        target: {
                            element: I,
                            left: A.left,
                            top: A.top,
                            width: T,
                            height: M
                        },
                        element: {
                            element: D,
                            left: R.left,
                            top: R.top,
                            width: E,
                            height: N
                        },
                        horizontal: 0 > v ? "left": c > 0 ? "right": "center",
                        vertical: 0 > _ ? "top": g > 0 ? "bottom": "middle"
                    };
                    E > T && y(c + v) < T && (w.horizontal = "center"),
                    N > M && y(g + _) < M && (w.vertical = "middle"),
                    w.important = b(y(c), y(v)) > b(y(g), y(_)) ? "horizontal": "vertical",
                    h.using.call(this, a, w)
                }),
                D.offset(a.extend(R, {
                    using: C
                }))
            })
        },
        a.ui.position = {
            fit: {
                left: function(a, h) {
                    var c, v = h.within,
                    g = v.isWindow ? v.scrollLeft: v.offset.left,
                    _ = v.width,
                    y = a.left - h.collisionPosition.marginLeft,
                    w = g - y,
                    C = y + h.collisionWidth - _ - g;
                    h.collisionWidth > _ ? w > 0 && 0 >= C ? (c = a.left + w + h.collisionWidth - _ - g, a.left += w - c) : a.left = C > 0 && 0 >= w ? g: w > C ? g + _ - h.collisionWidth: g: w > 0 ? a.left += w: C > 0 ? a.left -= C: a.left = b(a.left - y, a.left)
                },
                top: function(a, h) {
                    var c, v = h.within,
                    g = v.isWindow ? v.scrollTop: v.offset.top,
                    _ = h.within.height,
                    y = a.top - h.collisionPosition.marginTop,
                    w = g - y,
                    C = y + h.collisionHeight - _ - g;
                    h.collisionHeight > _ ? w > 0 && 0 >= C ? (c = a.top + w + h.collisionHeight - _ - g, a.top += w - c) : a.top = C > 0 && 0 >= w ? g: w > C ? g + _ - h.collisionHeight: g: w > 0 ? a.top += w: C > 0 ? a.top -= C: a.top = b(a.top - y, a.top)
                }
            },
            flip: {
                left: function(a, h) {
                    var c, v, g = h.within,
                    _ = g.offset.left + g.scrollLeft,
                    b = g.width,
                    w = g.isWindow ? g.scrollLeft: g.offset.left,
                    C = a.left - h.collisionPosition.marginLeft,
                    D = C - w,
                    E = C + h.collisionWidth - b - w,
                    N = "left" === h.my[0] ? -h.elemWidth: "right" === h.my[0] ? h.elemWidth: 0,
                    T = "left" === h.at[0] ? h.targetWidth: "right" === h.at[0] ? -h.targetWidth: 0,
                    k = -2 * h.offset[0];
                    0 > D ? (c = a.left + N + T + k + h.collisionWidth - b - _, (0 > c || c < y(D)) && (a.left += N + T + k)) : E > 0 && (v = a.left - h.collisionPosition.marginLeft + N + T + k - w, (v > 0 || y(v) < E) && (a.left += N + T + k))
                },
                top: function(a, h) {
                    var c, v, g = h.within,
                    _ = g.offset.top + g.scrollTop,
                    b = g.height,
                    w = g.isWindow ? g.scrollTop: g.offset.top,
                    C = a.top - h.collisionPosition.marginTop,
                    D = C - w,
                    E = C + h.collisionHeight - b - w,
                    N = "top" === h.my[1],
                    T = N ? -h.elemHeight: "bottom" === h.my[1] ? h.elemHeight: 0,
                    k = "top" === h.at[1] ? h.targetHeight: "bottom" === h.at[1] ? -h.targetHeight: 0,
                    M = -2 * h.offset[1];
                    0 > D ? (v = a.top + T + k + M + h.collisionHeight - b - _, a.top + T + k + M > D && (0 > v || v < y(D)) && (a.top += T + k + M)) : E > 0 && (c = a.top - h.collisionPosition.marginTop + T + k + M - w, a.top + T + k + M > E && (c > 0 || y(c) < E) && (a.top += T + k + M))
                }
            },
            flipfit: {
                left: function() {
                    a.ui.position.flip.left.apply(this, arguments),
                    a.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    a.ui.position.flip.top.apply(this, arguments),
                    a.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var h, c, v, g, i, _ = document.getElementsByTagName("body")[0],
            b = document.createElement("div");
            h = document.createElement(_ ? "div": "body"),
            v = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            },
            _ && a.extend(v, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (i in v) h.style[i] = v[i];
            h.appendChild(b),
            c = _ || document.documentElement,
            c.insertBefore(h, c.firstChild),
            b.style.cssText = "position: absolute; left: 10.7432222px;",
            g = a(b).offset().left,
            a.support.offsetFractions = g > 10 && 11 > g,
            h.innerHTML = "",
            c.removeChild(h)
        } ()
    } (jQuery),
    function(a) {
        a.widget("ui.autocomplete", {
            version: "1.10.4",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var h, c, v, g = this.element[0].nodeName.toLowerCase(),
                _ = "textarea" === g,
                b = "input" === g;
                this.isMultiLine = _ ? !0 : b ? !1 : this.element.prop("isContentEditable"),
                this.valueMethod = this.element[_ || b ? "val": "text"],
                this.isNewMenu = !0,
                this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
                this._on(this.element, {
                    keydown: function(g) {
                        if (this.element.prop("readOnly")) return h = !0,
                        v = !0,
                        void(c = !0);
                        h = !1,
                        v = !1,
                        c = !1;
                        var _ = a.ui.keyCode;
                        switch (g.keyCode) {
                        case _.PAGE_UP:
                            h = !0,
                            this._move("previousPage", g);
                            break;
                        case _.PAGE_DOWN:
                            h = !0,
                            this._move("nextPage", g);
                            break;
                        case _.UP:
                            h = !0,
                            this._keyEvent("previous", g);
                            break;
                        case _.DOWN:
                            h = !0,
                            this._keyEvent("next", g);
                            break;
                        case _.ENTER:
                        case _.NUMPAD_ENTER:
                            this.menu.active && (h = !0, g.preventDefault(), this.menu.select(g));
                            break;
                        case _.TAB:
                            this.menu.active && this.menu.select(g);
                            break;
                        case _.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(g), g.preventDefault());
                            break;
                        default:
                            c = !0,
                            this._searchTimeout(g)
                        }
                    },
                    keypress: function(v) {
                        if (h) return h = !1,
                        void((!this.isMultiLine || this.menu.element.is(":visible")) && v.preventDefault());
                        if (!c) {
                            var g = a.ui.keyCode;
                            switch (v.keyCode) {
                            case g.PAGE_UP:
                                this._move("previousPage", v);
                                break;
                            case g.PAGE_DOWN:
                                this._move("nextPage", v);
                                break;
                            case g.UP:
                                this._keyEvent("previous", v);
                                break;
                            case g.DOWN:
                                this._keyEvent("next", v)
                            }
                        }
                    },
                    input: function(a) {
                        return v ? (v = !1, void a.preventDefault()) : void this._searchTimeout(a)
                    },
                    focus: function() {
                        this.selectedItem = null,
                        this.previous = this._value()
                    },
                    blur: function(a) {
                        return this.cancelBlur ? void delete this.cancelBlur: (clearTimeout(this.searching), this.close(a), void this._change(a))
                    }
                }),
                this._initSource(),
                this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().data("ui-menu"),
                this._on(this.menu.element, {
                    mousedown: function(h) {
                        h.preventDefault(),
                        this.cancelBlur = !0,
                        this._delay(function() {
                            delete this.cancelBlur
                        });
                        var c = this.menu.element[0];
                        a(h.target).closest(".ui-menu-item").length || this._delay(function() {
                            var h = this;
                            this.document.one("mousedown",
                            function(v) {
                                v.target === h.element[0] || v.target === c || a.contains(c, v.target) || h.close()
                            })
                        })
                    },
                    menufocus: function(h, ui) {
                        if (this.isNewMenu && (this.isNewMenu = !1, h.originalEvent && /^mouse/.test(h.originalEvent.type))) return this.menu.blur(),
                        void this.document.one("mousemove",
                        function() {
                            a(h.target).trigger(h.originalEvent)
                        });
                        var c = ui.item.data("ui-autocomplete-item"); ! 1 !== this._trigger("focus", h, {
                            item: c
                        }) ? h.originalEvent && /^key/.test(h.originalEvent.type) && this._value(c.value) : this.liveRegion.text(c.value)
                    },
                    menuselect: function(a, ui) {
                        var h = ui.item.data("ui-autocomplete-item"),
                        c = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = c, this._delay(function() {
                            this.previous = c,
                            this.selectedItem = h
                        })),
                        !1 !== this._trigger("select", a, {
                            item: h
                        }) && this._value(h.value),
                        this.term = this._value(),
                        this.close(a),
                        this.selectedItem = h
                    }
                }),
                this.liveRegion = a("<span>", {
                    role: "status",
                    "aria-live": "polite"
                }).addClass("ui-helper-hidden-accessible").insertBefore(this.element),
                this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching),
                this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),
                this.menu.element.remove(),
                this.liveRegion.remove()
            },
            _setOption: function(a, h) {
                this._super(a, h),
                "source" === a && this._initSource(),
                "appendTo" === a && this.menu.element.appendTo(this._appendTo()),
                "disabled" === a && h && this.xhr && this.xhr.abort()
            },
            _appendTo: function() {
                var h = this.options.appendTo;
                return h && (h = h.jquery || h.nodeType ? a(h) : this.document.find(h).eq(0)),
                h || (h = this.element.closest(".ui-front")),
                h.length || (h = this.document[0].body),
                h
            },
            _initSource: function() {
                var h, c, v = this;
                a.isArray(this.options.source) ? (h = this.options.source, this.source = function(c, v) {
                    v(a.ui.autocomplete.filter(h, c.term))
                }) : "string" == typeof this.options.source ? (c = this.options.source, this.source = function(h, g) {
                    v.xhr && v.xhr.abort(),
                    v.xhr = a.ajax({
                        url: c,
                        data: h,
                        dataType: "json",
                        success: function(a) {
                            g(a)
                        },
                        error: function() {
                            g([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(a) {
                clearTimeout(this.searching),
                this.searching = this._delay(function() {
                    this.term !== this._value() && (this.selectedItem = null, this.search(null, a))
                },
                this.options.delay)
            },
            search: function(a, h) {
                return a = null != a ? a: this._value(),
                this.term = this._value(),
                a.length < this.options.minLength ? this.close(h) : this._trigger("search", h) !== !1 ? this._search(a) : void 0
            },
            _search: function(a) {
                this.pending++,
                this.element.addClass("ui-autocomplete-loading"),
                this.cancelSearch = !1,
                this.source({
                    term: a
                },
                this._response())
            },
            _response: function() {
                var h = ++this.requestIndex;
                return a.proxy(function(a) {
                    h === this.requestIndex && this.__response(a),
                    this.pending--,
                    this.pending || this.element.removeClass("ui-autocomplete-loading")
                },
                this)
            },
            __response: function(a) {
                a && (a = this._normalize(a)),
                this._trigger("response", null, {
                    content: a
                }),
                !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close()
            },
            close: function(a) {
                this.cancelSearch = !0,
                this._close(a)
            },
            _close: function(a) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", a))
            },
            _change: function(a) {
                this.previous !== this._value() && this._trigger("change", a, {
                    item: this.selectedItem
                })
            },
            _normalize: function(h) {
                return h.length && h[0].label && h[0].value ? h: a.map(h,
                function(h) {
                    return "string" == typeof h ? {
                        label: h,
                        value: h
                    }: a.extend({
                        label: h.label || h.value,
                        value: h.value || h.label
                    },
                    h)
                })
            },
            _suggest: function(h) {
                var ul = this.menu.element.empty();
                this._renderMenu(ul, h),
                this.isNewMenu = !0,
                this.menu.refresh(),
                ul.show(),
                this._resizeMenu(),
                ul.position(a.extend({
                    of: this.element
                },
                this.options.position)),
                this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var ul = this.menu.element;
                ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(ul, h) {
                var c = this;
                a.each(h,
                function(a, h) {
                    c._renderItemData(ul, h)
                })
            },
            _renderItemData: function(ul, a) {
                return this._renderItem(ul, a).data("ui-autocomplete-item", a)
            },
            _renderItem: function(ul, h) {
                return a("<li>").append(a("<a>").text(h.label)).appendTo(ul)
            },
            _move: function(a, h) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a) ? (this._value(this.term), void this.menu.blur()) : void this.menu[a](h) : void this.search(null, h)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(a, h) { (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(a, h), h.preventDefault())
            }
        }),
        a.extend(a.ui.autocomplete, {
            escapeRegex: function(a) {
                return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(h, c) {
                var v = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
                return a.grep(h,
                function(a) {
                    return v.test(a.label || a.value || a)
                })
            }
        }),
        a.widget("ui.autocomplete", a.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(a) {
                        return a + (a > 1 ? " results are": " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(a) {
                var h;
                this._superApply(arguments),
                this.options.disabled || this.cancelSearch || (h = a && a.length ? this.options.messages.results(a.length) : this.options.messages.noResults, this.liveRegion.text(h))
            }
        })
    } (jQuery),
    function(a) {
        a.widget("ui.menu", {
            version: "1.10.4",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-carat-1-e"
                },
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element,
                this.mouseHandled = !1,
                this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                    role: this.options.role,
                    tabIndex: 0
                }).bind("click" + this.eventNamespace, a.proxy(function(a) {
                    this.options.disabled && a.preventDefault()
                },
                this)),
                this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
                this._on({
                    "mousedown .ui-menu-item > a": function(a) {
                        a.preventDefault()
                    },
                    "click .ui-state-disabled > a": function(a) {
                        a.preventDefault()
                    },
                    "click .ui-menu-item:has(a)": function(h) {
                        var c = a(h.target).closest(".ui-menu-item"); ! this.mouseHandled && c.not(".ui-state-disabled").length && (this.select(h), h.isPropagationStopped() || (this.mouseHandled = !0), c.has(".ui-menu").length ? this.expand(h) : !this.element.is(":focus") && a(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(h) {
                        var c = a(h.currentTarget);
                        c.siblings().children(".ui-state-active").removeClass("ui-state-active"),
                        this.focus(h, c)
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(a, h) {
                        var c = this.active || this.element.children(".ui-menu-item").eq(0);
                        h || this.focus(a, c)
                    },
                    blur: function(h) {
                        this._delay(function() {
                            a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(h)
                        })
                    },
                    keydown: "_keydown"
                }),
                this.refresh(),
                this._on(this.document, {
                    click: function(h) {
                        a(h.target).closest(".ui-menu").length || this.collapseAll(h),
                        this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),
                this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                    var h = a(this);
                    h.data("ui-menu-submenu-carat") && h.remove()
                }),
                this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
            },
            _keydown: function(h) {
                function c(a) {
                    return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                }
                var v, g, _, b, y, w = !0;
                switch (h.keyCode) {
                case a.ui.keyCode.PAGE_UP:
                    this.previousPage(h);
                    break;
                case a.ui.keyCode.PAGE_DOWN:
                    this.nextPage(h);
                    break;
                case a.ui.keyCode.HOME:
                    this._move("first", "first", h);
                    break;
                case a.ui.keyCode.END:
                    this._move("last", "last", h);
                    break;
                case a.ui.keyCode.UP:
                    this.previous(h);
                    break;
                case a.ui.keyCode.DOWN:
                    this.next(h);
                    break;
                case a.ui.keyCode.LEFT:
                    this.collapse(h);
                    break;
                case a.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(h);
                    break;
                case a.ui.keyCode.ENTER:
                case a.ui.keyCode.SPACE:
                    this._activate(h);
                    break;
                case a.ui.keyCode.ESCAPE:
                    this.collapse(h);
                    break;
                default:
                    w = !1,
                    g = this.previousFilter || "",
                    _ = String.fromCharCode(h.keyCode),
                    b = !1,
                    clearTimeout(this.filterTimer),
                    _ === g ? b = !0 : _ = g + _,
                    y = new RegExp("^" + c(_), "i"),
                    v = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return y.test(a(this).children("a").text())
                    }),
                    v = b && -1 !== v.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : v,
                    v.length || (_ = String.fromCharCode(h.keyCode), y = new RegExp("^" + c(_), "i"), v = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return y.test(a(this).children("a").text())
                    })),
                    v.length ? (this.focus(h, v), v.length > 1 ? (this.previousFilter = _, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    },
                    1e3)) : delete this.previousFilter) : delete this.previousFilter
                }
                w && h.preventDefault()
            },
            _activate: function(a) {
                this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(a) : this.select(a))
            },
            refresh: function() {
                var h, c = this.options.icons.submenu,
                v = this.element.find(this.options.menus);
                this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length),
                v.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var h = a(this),
                    v = h.prev("a"),
                    g = a("<span>").addClass("ui-menu-icon ui-icon " + c).data("ui-menu-submenu-carat", !0);
                    v.attr("aria-haspopup", "true").prepend(g),
                    h.attr("aria-labelledby", v.attr("id"))
                }),
                h = v.add(this.element),
                h.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }),
                h.children(":not(.ui-menu-item)").each(function() {
                    var h = a(this);
                    /[^\-\u2014\u2013\s]/.test(h.text()) || h.addClass("ui-widget-content ui-menu-divider")
                }),
                h.children(".ui-state-disabled").attr("aria-disabled", "true"),
                this.active && !a.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                } [this.options.role]
            },
            _setOption: function(a, h) {
                "icons" === a && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(h.submenu),
                this._super(a, h)
            },
            focus: function(a, h) {
                var c, v;
                this.blur(a, a && "focus" === a.type),
                this._scrollIntoView(h),
                this.active = h.first(),
                v = this.active.children("a").addClass("ui-state-focus"),
                this.options.role && this.element.attr("aria-activedescendant", v.attr("id")),
                this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),
                a && "keydown" === a.type ? this._close() : this.timer = this._delay(function() {
                    this._close()
                },
                this.delay),
                c = h.children(".ui-menu"),
                c.length && a && /^mouse/.test(a.type) && this._startOpening(c),
                this.activeMenu = h.parent(),
                this._trigger("focus", a, {
                    item: h
                })
            },
            _scrollIntoView: function(h) {
                var c, v, g, _, b, y;
                this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, v = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, g = h.offset().top - this.activeMenu.offset().top - c - v, _ = this.activeMenu.scrollTop(), b = this.activeMenu.height(), y = h.height(), 0 > g ? this.activeMenu.scrollTop(_ + g) : g + y > b && this.activeMenu.scrollTop(_ + g - b + y))
            },
            blur: function(a, h) {
                h || clearTimeout(this.timer),
                this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", a, {
                    item: this.active
                }))
            },
            _startOpening: function(a) {
                clearTimeout(this.timer),
                "true" === a.attr("aria-hidden") && (this.timer = this._delay(function() {
                    this._close(),
                    this._open(a)
                },
                this.delay))
            },
            _open: function(h) {
                var c = a.extend({
                    of: this.active
                },
                this.options.position);
                clearTimeout(this.timer),
                this.element.find(".ui-menu").not(h.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
                h.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c)
            },
            collapseAll: function(h, c) {
                clearTimeout(this.timer),
                this.timer = this._delay(function() {
                    var v = c ? this.element: a(h && h.target).closest(this.element.find(".ui-menu"));
                    v.length || (v = this.element),
                    this._close(v),
                    this.blur(h),
                    this.activeMenu = v
                },
                this.delay)
            },
            _close: function(a) {
                a || (a = this.active ? this.active.parent() : this.element),
                a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
            },
            collapse: function(a) {
                var h = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                h && h.length && (this._close(), this.focus(a, h))
            },
            expand: function(a) {
                var h = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
                h && h.length && (this._open(h.parent()), this._delay(function() {
                    this.focus(a, h)
                }))
            },
            next: function(a) {
                this._move("next", "first", a)
            },
            previous: function(a) {
                this._move("prev", "last", a)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(a, h, c) {
                var v;
                this.active && (v = "first" === a || "last" === a ? this.active["first" === a ? "prevAll": "nextAll"](".ui-menu-item").eq( - 1) : this.active[a + "All"](".ui-menu-item").eq(0)),
                v && v.length && this.active || (v = this.activeMenu.children(".ui-menu-item")[h]()),
                this.focus(c, v)
            },
            nextPage: function(h) {
                var c, v, g;
                return this.active ? void(this.isLastItem() || (this._hasScroll() ? (v = this.active.offset().top, g = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                    return c = a(this),
                    c.offset().top - v - g < 0
                }), this.focus(h, c)) : this.focus(h, this.activeMenu.children(".ui-menu-item")[this.active ? "last": "first"]()))) : void this.next(h)
            },
            previousPage: function(h) {
                var c, v, g;
                return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (v = this.active.offset().top, g = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                    return c = a(this),
                    c.offset().top - v + g > 0
                }), this.focus(h, c)) : this.focus(h, this.activeMenu.children(".ui-menu-item").first()))) : void this.next(h)
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(h) {
                this.active = this.active || a(h.target).closest(".ui-menu-item");
                var ui = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(h, !0),
                this._trigger("select", h, ui)
            }
        })
    } (jQuery)
});
/*!dep/jquery-hoverdir/jquery.hoverdir.js*/
; !
function(h) {
    "use strict";
    "function" == typeof define && define.amd ? define("dep/jquery-hoverdir/jquery.hoverdir", ["jquery"], h) : "undefined" != typeof exports ? module.exports = h(require("jquery")) : h(jQuery)
} (function(h) {
    "use strict";
    function a(a, c) {
        this.$el = h(a),
        this.options = h.extend(!0, {},
        this.defaults, c),
        this.isVisible = !1,
        this.$hoverElem = this.$el.find(this.options.hoverElem),
        this.transitionProp = "all " + this.options.speed + "ms " + this.options.easing,
        this.support = this._supportsTransitions(),
        this._loadEvents()
    }
    a.prototype = {
        defaults: {
            speed: 300,
            easing: "ease",
            hoverDelay: 0,
            inverse: !1,
            hoverElem: "div"
        },
        constructor: a,
        _supportsTransitions: function() {
            if ("undefined" != typeof Modernizr) return Modernizr.csstransitions;
            var h = document.body || document.documentElement,
            s = h.style,
            p = "transition";
            if ("string" == typeof s[p]) return ! 0;
            var a = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (var i = 0; i < a.length; i++) if ("string" == typeof s[a[i] + p]) return ! 0;
            return ! 1
        },
        _loadEvents: function() {
            this.$el.on("mouseenter.hoverdir mouseleave.hoverdir", h.proxy(function(h) {
                this.direction = this._getDir({
                    x: h.pageX,
                    y: h.pageY
                }),
                "mouseenter" === h.type ? this._showHover() : this._hideHover()
            },
            this))
        },
        _showHover: function() {
            var a = this._getStyle(this.direction);
            this.support && this.$hoverElem.css("transition", ""),
            this.$hoverElem.hide().css(a.from),
            clearTimeout(this.tmhover),
            this.tmhover = setTimeout(h.proxy(function() {
                this.$hoverElem.show(0, h.proxy(function() {
                    this.support && this.$hoverElem.css("transition", this.transitionProp),
                    this._applyAnimation(a.to)
                },
                this))
            },
            this), this.options.hoverDelay),
            this.isVisible = !0
        },
        _hideHover: function() {
            var h = this._getStyle(this.direction);
            this.support && this.$hoverElem.css("transition", this.transitionProp),
            clearTimeout(this.tmhover),
            this._applyAnimation(h.from),
            this.isVisible = !1
        },
        _getDir: function(h) {
            var a = this.$el.width(),
            c = this.$el.height(),
            x = (h.x - this.$el.offset().left - a / 2) * (a > c ? c / a: 1),
            v = (h.y - this.$el.offset().top - c / 2) * (c > a ? a / c: 1),
            y = Math.round((Math.atan2(v, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
            return y
        },
        _getStyle: function(h) {
            var a, c, v = {
                left: "0",
                top: "-100%"
            },
            y = {
                left: "0",
                top: "100%"
            },
            _ = {
                left: "-100%",
                top: "0"
            },
            b = {
                left: "100%",
                top: "0"
            },
            $ = {
                top: "0"
            },
            g = {
                left: "0"
            };
            switch (h) {
            case 0:
            case "top":
                a = this.options.inverse ? y: v,
                c = $;
                break;
            case 1:
            case "right":
                a = this.options.inverse ? _: b,
                c = g;
                break;
            case 2:
            case "bottom":
                a = this.options.inverse ? v: y,
                c = $;
                break;
            case 3:
            case "left":
                a = this.options.inverse ? b: _,
                c = g
            }
            return {
                from: a,
                to: c
            }
        },
        _applyAnimation: function(a) {
            h.fn.applyStyle = this.support ? h.fn.css: h.fn.animate,
            this.$hoverElem.stop().applyStyle(a, h.extend(!0, [], {
                duration: this.options.speed
            }))
        },
        show: function(h) {
            this.$el.off("mouseenter.hoverdir mouseleave.hoverdir"),
            this.isVisible || (this.direction = h || "top", this._showHover())
        },
        hide: function(h) {
            this.rebuild(),
            this.isVisible && (this.direction = h || "bottom", this._hideHover())
        },
        setOptions: function(a) {
            this.options = h.extend(!0, {},
            this.defaults, this.options, a)
        },
        destroy: function() {
            this.$el.off("mouseenter.hoverdir mouseleave.hoverdir"),
            this.$el.data("hoverdir", null)
        },
        rebuild: function(h) {
            "object" == typeof h && this.setOptions(h),
            this._loadEvents()
        }
    },
    h.fn.hoverdir = function(c, v) {
        return this.each(function() {
            var y = h(this).data("hoverdir"),
            _ = "object" == typeof c && c;
            y || (y = new a(this, _), h(this).data("hoverdir", y)),
            "string" == typeof c && (y[c](v), "destroy" === c && h(this).data("hoverdir", !1))
        })
    },
    h.fn.hoverdir.Constructor = a
});
/*!index/modules/sidebar/main.js*/
;
define("index/modules/sidebar/main", ["require", "exports", "module"],
function() {
    function h() {
        return window.innerHeight ? winHeight = window.innerHeight: document.body && document.body.clientHeight && (winHeight = document.body.clientHeight),
        document.documentElement && document.documentElement.clientHeight && (winHeight = document.documentElement.clientHeight),
        winHeight
    }
    $(".sidebar .menu_main h2 i.design").click(function() {
        window.open("http://www.lagou.com/activity/dist/imageCollection/pc/html/index.html")
    }),
    function(h) {
        h.fn.hoverDelay = function(c) {
            var a, $, g = {
                hoverDuring: 200,
                outDuring: 200,
                hoverEvent: function() {
                    h.noop()
                },
                outEvent: function() {
                    h.noop()
                }
            },
            v = h.extend(g, c || {}),
            b = this;
            return h(this).each(function() {
                h(this).hover(function() {
                    clearTimeout($),
                    a = setTimeout(function() {
                        v.hoverEvent.apply(b)
                    },
                    v.hoverDuring)
                },
                function() {
                    clearTimeout(a),
                    $ = setTimeout(function() {
                        v.outEvent.apply(b)
                    },
                    v.outDuring)
                })
            })
        }
    } (jQuery),
    $("#sidebar .menu_box").each(function(i) {
        $(this).hoverDelay({
            hoverDuring: 200,
            hoverEvent: function() {
                switch (i) {
                case 1:
                    $(this).addClass("current").children(".menu_sub").css({
                        top:
                        $(this).prev().position().top + 120
                    }).removeClass("dn");
                    break;
                case 2:
                    $(this).addClass("current").children(".menu_sub").css({
                        top:
                        $(this).prev().position().top
                    }).removeClass("dn");
                    break;
                case 3:
                    $(this).addClass("current").children(".menu_sub").css({
                        top:
                        $(this).position().top + $(this).height() - $(this).children(".menu_sub").height() + 64
                    }).removeClass("dn");
                    break;
                case 4:
                    $(this).addClass("current").children(".menu_sub").css({
                        top:
                        $(this).position().top + $(this).height() - $(this).children(".menu_sub").height() + 24
                    }).removeClass("dn");
                    break;
                case 5:
                    $(this).addClass("current").children(".menu_sub").css({
                        top:
                        $(this).position().top + $(this).height() - $(this).children(".menu_sub").height() + 30
                    }).removeClass("dn");
                    break;
                case 6:
                    $(this).addClass("current").children(".menu_sub").css({
                        top:
                        $(this).position().top + $(this).height() - $(this).children(".menu_sub").height() - 24
                    }).removeClass("dn");
                    break;
                default:
                    $(this).addClass("current").children(".menu_sub").css({
                        top:
                        $(this).position().top
                    }).removeClass("dn")
                }
            },
            outEvent: function() {
                $(this).removeClass("current").children(".menu_sub").addClass("dn")
            }
        })
    });
    var c = $("#sidebar").offset(),
    a = h() - $("#footer").height(),
    g = $("#sidebar").height();
    $("#loginToolBar").size() > 0 && (a -= $("#loginToolBar").height()),
    $(window).scroll(function() {
        var h = $(window).scrollTop();
        h >= c.top && a > g ? $("#sidebar").addClass("fixed") : $("#sidebar").removeClass("fixed")
    }),
    $("#container").css("min-height", $("#sidebar").height()),
    $(".mainNavs a").click(function(e) {
        e.preventDefault();
        var h = $(this),
        c = h.attr("href");
        window.location.href = c + "?labelWords=label"
    })
});
/*!index/modules/sub_remind/main.js*/
;
define("index/modules/sub_remind/main", ["require", "exports", "module"],
function() {
    $(".mr_del").on("click",
    function() {
        $(".mr_remind").hide(),
        $.ajax({
            type: "POST",
            data: {},
            url: GLOBAL_DOMAIN.ctx + "/resume/clearShowNoticeInSeesion.json"
        }).done(function() {})
    })
});
/*!index/modules/search/main.js*/
;
define("index/modules/search/main", ["require", "exports", "module"],
function() {
    function a(a) {
        c = a;
        var h = $("#search_input"),
        g = h.val(),
        v = $("#isIndex").val();
        if (g == h.attr("placeholder") && (g = ""), "" != a.hotwords) {
            for (var w = "<dt>热门搜索：</dt>",
            i = 0; i < a.hotwords.length; i++) w += a.hotwords[i].isHighLight ? '<dd><a href="' + a.hotwords[i].url + '" class="current">' + a.hotwords[i].text + "</a></dd>": '<dd><a href="' + a.hotwords[i].url + '">' + a.hotwords[i].text + "</a></dd>";
            $(".hotSearch").html(w),
            $(".hotSearch a").click(function(e) {
                e.preventDefault();
                var a = $(this),
                c = a.attr("href");
                window.location.href = c + "?labelWords=hot"
            })
        }
        "" != a.recommendSearchWord && "" == g && "true" == v && h.css("color", "#999").val(a.recommendSearchWord.text),
        "" != $("#userid").val() && $.ajax({
            url: GLOBAL_DOMAIN.sctx + "/queryrec?userid=" + $("#userid").val(),
            dataType: "jsonp",
            jsonp: "suggestback",
            success: function(a) {
                var c = "";
                if (a.querys.length > 0) {
                    for (var i = 0; i < a.querys.length; i++) c += "<li>" + a.querys[i] + "</li>";
                    $(".guess_wrapper ul").append(c),
                    $(".guess_wrapper ul").on("mousedown", "li",
                    function() {
                        window.location.href = GLOBAL_DOMAIN.ctx + "/jobs/list_" + $(this).text() + "?labelWords=&fromSearch=true&suginput="
                    })
                } else $(".guess_wrapper").hide()
            }
        }),
        h.on("focus",
        function() {
            this.value == a.recommendSearchWord.text && "true" == v && (this.value = "", this.style.color = "#333", "" != $("#userid").val() && $(".guess_wrapper").show())
        }).on("blur",
        function() {
            this.value || "true" != v || (this.value = a.recommendSearchWord.text, this.style.color = "#999", "" != $("#userid").val() && $(".guess_wrapper").hide())
        })
    }
    var c = "";
    $.getJSON("http://service.lagou.com/hotword?callback=?",
    function(c) {
        a(c)
    }),
    $(window).resize(function() {
        var a = $("#search_box").offset().left + 96;
        $(".ui-autocomplete").css("left", a)
    }),
    $(".ui-autocomplete").css("height", "200px"),
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderItem: function(ul, a) {
            var c = a.hotness >= 450 ? "大于": "共";
            return $("<li></li>").data("item.autocomplete", a).append("<a><span class='fl'>" + a.cont + "</span><span class='fr'>" + c + "<i>" + (a.hotness >= 450 ? 450 : a.hotness) + "个</i>职位</span></a>").appendTo(ul)
        },
        _renderMenu: function(ul, a) {
            function c(a, c) {
                ul.append("<li class='ui-autocomplete-category'>" + a + "</li>");
                for (var i = 0,
                l = c.length; l > i; i++) h._renderItemData(ul, c[i])
            }
            var h = this;
            a = a[0],
            a.POSITION && a.POSITION.length && c("职位", a.POSITION),
            a.COMPANY && a.COMPANY.length && c("公司", a.COMPANY),
            ul.find(".ui-autocomplete-category:not(:first-child)").next().css("borderTop", "1px dashed #e5e5e5"),
            ul.find(".ui-autocomplete-category").first().css("borderTop", "none")
        }
    });
    $("#search_input").catcomplete({
        minLength: 0,
        source: function(a, c) {
            "" != $.trim(a.term) ? $.ajax({
                url: GLOBAL_DOMAIN.sctx + "/suggestion/mix",
                dataType: "jsonp",
                jsonp: "suggestback",
                data: {
                    input: a.term,
                    type: 1,
                    num: 10
                },
                success: function(a) {
                    if (a) if (a.POSITION && a.POSITION.length || a.COMPANY && a.COMPANY.length) {
                        var h = [];
                        h.push(a),
                        c(h)
                    } else c("");
                    else c("")
                }
            }) : c("")
        },
        focus: function() {
            return ! 1
        },
        select: function(a, ui) {
            return $("#suginput").val($("#search_input").val()),
            $("#search_input").val(ui.item.cont),
            $("#labelWords").val("sug"),
            $("#searchForm").trigger("submit"),
            !1
        }
    }),
    $("#searchForm").on("submit",
    function() {
        var a = $("#isIndex").val(),
        h = $("#search_input").val(),
        g = /[\\\/]/g;
        return h = h.replace(g, " "),
        "" != h && c.recommendSearchWord.text != h || "true" != a ? (h = h.replace(/.html$/, " html").replace(/.jsp$/, " jsp"), h = encodeURIComponent(h), $(this).attr("action", GLOBAL_DOMAIN.ctx + "/jobs/list_" + h), !0) : (window.location.href = c.recommendSearchWord.url, !1)
    }),
    $("#search_input").on("keyup",
    function() {
        this.value.length > 64 && (this.value = this.value.substring(0, 64)),
        "" == this.value && "" != $("#userid").val() ? $(".guess_wrapper").show() : $(".guess_wrapper").hide()
    })
});
/*!index/modules/banner/main.js*/
;
define("index/modules/banner/main", ["require", "exports", "module"],
function() {
    function a(a) {
        a >= 0 && (i = a),
        $(".banner_control em").animate({
            top: 55 * i + "px"
        },
        200),
        $(".thumbs li").removeClass("current"),
        $(".thumbs li").eq(i).addClass("current"),
        $(".banner_bg").animate({
            "margin-top": "-" + 160 * i + "px"
        },
        200),
        i++,
        i >= v && (i = 0)
    }
    for (var b = $("#home_banner .banner_bg li a"), h = "http://", i = 0; i < b.length; i++) {
        var c = $(b[i]).attr("href");
        c.indexOf(h) < 0 && $(b[i]).attr("target", "_self")
    }
    var v = $(".banner_bg li").length,
    i = 1;
    $(".banner_bg").css("height", 160 * v + "px");
    var g = setInterval(a, 5e3);
    $(".thumbs li").hover(function() {
        if (!$(this).hasClass("current")) {
            $(".banner_bg").stop(!1, !0, !0),
            $(".thumbs li").stop(!1, !0, !0),
            $(".banner_control em").stop(!1, !0, !0),
            clearInterval(g);
            var b = $(this).index();
            a(b),
            g = setInterval(a, 5e3)
        }
    }),
    $(".banner_bg li").hover(function() {
        $(".banner_bg li").stop(!0, !0),
        $(".thumbs li").stop(!0, !0),
        clearInterval(g)
    },
    function() {
        g = setInterval(a, 5e3)
    }),
    $("#da-thumbs > li").each(function() {
        $(this).hoverdir()
    })
});
/*!common/widgets/plat/exposure.js*/
;
define("common/widgets/plat/exposure", ["require", "exports", "module"],
function(require, exports) {
    function a(a, w) {
        for (var g = [], i = 0; i < a.length; i++) g.push(c(a[i][0], a[i][1], a[i][2]));
        var j = new Image,
        v = {
            lt: "trackshow",
            a: g.join(","),
            t: w,
            v: 0,
            dl: encodeURIComponent(window.location.href),
            dr: encodeURIComponent(window.location.protocol + "//" + window.location.hostname),
            time: (new Date).getTime()
        };
        paramsArr = [];
        for (var A in v) paramsArr.push(A + "=" + v[A]);
        j.src = h.jsonURL + "?" + paramsArr.join("&")
    }
    function c(a, c, h) {
        return [$.trim(a), $.trim(c), 0, $.trim(h), Math.round(1e4 * Math.random())].join("_")
    }
    exports.exposure = a;
    var h = {
        jsonURL: "http://a.lagou.com/json"
    };
    exports.postoA = function(a) {
        if (a) {
            var c = [],
            h = new Image;
            for (var i in a) c.push(i + "=" + a[i]);
            c.push("time=" + Math.random()),
            h.src = "http://a.lagou.com/show?" + c.join("&")
        }
    }
});
/*!index/modules/job_list/js/history.js*/
;
define("index/modules/job_list/js/history", ["require", "exports", "module"],
function() {
    function a(a, c, I, O) {
        var _ = !1,
        h = [],
        g = 5,
        k = a + "," + c + "," + I + "," + O,
        v = "|",
        S = k + v,
        T = $.cookie("HISTORY_POSITION"),
        b = !0;
        if (b = null == T || "undefined" == T ? !0 : !1) $.cookie("HISTORY_POSITION", S, {
            expires: 7,
            path: "/"
        });
        else {
            h = T.split("|");
            for (var y = "",
            i = 0,
            N = h.length; N > i; i++) {
                var R = h[i].split(",")[0];
                if (R == a) {
                    _ = !0,
                    y = R;
                    break
                }
            }
            if (_) {
                var C = new RegExp(y + ",.*?\\|"),
                H = C.exec(T);
                S = T.replace(H, ""),
                S = H + S
            } else {
                if (h.length >= g + 1) {
                    var P = T.lastIndexOf("|", T.length - 2);
                    T = T.substring(0, P + 1)
                }
                S += T
            }
            $.cookie("HISTORY_POSITION", S, {
                expires: 7,
                path: "/"
            })
        }
    }
    $("body").on("click", ".position_list .position_list_item",
    function(e) {
        var c = e.target ? e.target: e.srcElement,
        I = $(this),
        O = I.attr("data-positionId"),
        _ = I.attr("data-salary"),
        h = I.attr("data-company"),
        g = I.attr("data-positionName"); ($(c).hasClass("position_link") || $(c).parents(".position_link").hasClass("position_link")) && (global.userCtx || a(O, _, h, g))
    })
});
/*!index/modules/job_list/main.js*/
;
define("index/modules/job_list/main", ["require", "exports", "module", "common/widgets/plat/exposure", "index/modules/job_list/js/history"],
function(require) {
    function a(a) {
        var c = [],
        h = $(".position_list").eq(a).find(".position_list_item a.position_link");
        h.each(function(a, h) {
            if ($(h).attr("data-lg-tj-id")) {
                var _ = $(h).attr("data-lg-tj-id") || "idnull",
                v = $(h).attr("data-lg-tj-no") || "idnull",
                j = $(h).attr("data-lg-tj-cid") || "idnull";
                c.push([_, v, j])
            }
        }),
        _(c, "p")
    }
    function c(t, a) {
        var c = encodeURIComponent(document.URL),
        h = $(".position_list").eq(a).find("li"),
        _ = [];
        h.each(function() {
            var a = $(this).attr("data-jobId");
            _.push(a)
        }),
        "最新职位" == t ? t = "new": "热门职位" == t ? t = "hot": "推荐职位" == t && (t = "recommend"); {
            var j, g = _.join(",");
            Math.random()
        }
        j = g;
        var b = {
            t: t,
            dl: c,
            jids: j
        };
        v(b)
    }
    function h(t, a, c) {
        var h = encodeURIComponent(document.URL),
        _ = Math.random(),
        j = a.find("li"),
        g = a.children("dl"),
        b = [],
        w = [];
        if (j.length && !(j.length < 1)) {
            if (j.each(function() {
                var a = $(this).attr(c);
                void 0 != a && b.push(a)
            }), g.each(function() {
                var a = $(this).attr(c);
                w.push(a)
            }), "" == b) var k = w.join(",");
            else var k = b.join(",");
            var C = k,
            M = {
                t: t,
                dl: h,
                jids: C,
                z: _
            };
            v(M)
        }
    }
    var _ = require("common/widgets/plat/exposure").exposure,
    v = require("common/widgets/plat/exposure").postoA; !
    function() {
        var a = [],
        c = $(".init_joblist .position_list_item a.position_link");
        c.each(function(c, h) {
            if ($(h).attr("data-lg-tj-id")) {
                var _ = $(h).attr("data-lg-tj-id") || "idnull",
                v = $(h).attr("data-lg-tj-no") || "idnull",
                j = $(h).attr("data-lg-tj-cid") || "idnull";
                a.push([_, v, j])
            }
        }),
        _(a, "p")
    } (),
    function() {
        var a = $(".init_joblist"),
        c = "data-jobid",
        t = $.trim($(".job_tab").children("li:first").text());
        "热门职位" == t ? t = "hot": "推荐职位" == t && (t = "recommend"),
        h(t, a, c)
    } ();
    var j = $(".recommend_tips"),
    g = j.find(".re_tips_iknow");
    $.cookie("RECOMMEND_TIP") || (j.removeClass("dn"), g.click(function() {
        j.addClass("dn"),
        $.cookie("RECOMMEND_TIP", !0, {
            expires: 365
        })
    })),
    $.cookie("RECOMMEND_TIP") && j.addClass("dn"),
    $(".job_tab li").bind("click",
    function() {
        $(this).addClass("current").siblings().removeClass("current");
        var h = $(this).index();
        $("#hotList .position_list").each(function() {
            $(this).fadeOut(200)
        }),
        $("#hotList .position_list").eq(h).fadeIn(200);
        var t = $.trim($(this).text());
        a(h),
        c(t, h)
    }),
    $("#hotList").on("click", ".rec_posHotPosition h2 a",
    function(e) {
        e.preventDefault();
        var a = $(this),
        c = a.attr("href"),
        h = a.attr("data-index");
        window.open(c + "?source=home_rec&i=home_rec-" + h)
    }),
    $("#hotList").on("click", ".hot_posHotPosition h2 a",
    function(e) {
        e.preventDefault();
        var a = $(this),
        c = a.attr("href"),
        h = a.attr("data-index");
        window.open(c + "?source=home_hot&i=home_hot-" + h)
    }),
    $("#hotList").on("click", ".new_posHotPosition h2 a",
    function(e) {
        e.preventDefault();
        var a = $(this),
        c = a.attr("href"),
        h = a.attr("data-index");
        window.open(c + "?source=home_latest&i=home_latest-" + h)
    }),
    require("index/modules/job_list/js/history")
});
/*!index/modules/sub_site/main.js*/
;
define("index/modules/sub_site/main", ["require", "exports", "module"],
function() {
    function a(a, c) {
        for (var g = "",
        i = 0,
        h = c.length; h > i; i++) g += '<li><a class="tab" href="javascript:void(0);">' + c[i] + "站</a></li>",
        i % 3 == 2 && (g += '<li style="display:block;width:auto;float:none;clear:both;"></li>');
        $.colorbox({
            html: '<div id="changeCityBox" class="popup changeCityBox"><div class="changeCity_header"><strong>亲爱的用户您好：</strong><p class="tips">切换城市分站，让我们为您提供更准确的职位信息。</p></div><p class="checkTips">点击进入<a class="tab focus" href="javascript:void(0);">' + a + '站</a>or 切换到以下城市</p><ul class="clearfix">' + g + '</ul><p class="changeCity_footer">其他城市正在开通中，敬请期待～</p></div>',
            title: "切换城市",
            scrolling: !1,
            onClosed: function() {
                global.isLogin ? $.get(GLOBAL_DOMAIN.ctx + "/user/saveCity.json?t=" + Math.random(), {
                    city: global.subSite
                },
                function(a) {
                    "object" != typeof a && (a = JSON.parse(a)),
                    1 != a.state && alert(a.message)
                }) : $.cookie("index_location_city", global.subSite, {
                    expires: 30,
                    domain: "lagou.com",
                    path: "/"
                })
            }
        })
    }
    global.isFirst && a(global.subSite, global.subSites),
    $("#changeCity_btn").click(function() {
        a(global.subSite, global.subSites)
    }),
    global.isLogin ? $(document).on("click", "#changeCityBox a.tab",
    function() {
        var a = $(this).html().replace("站", "");
        $.cookie("index_location_city", a, {
            expires: 30,
            domain: "lagou.com",
            path: "/"
        }),
        $.get(GLOBAL_DOMAIN.ctx + "/user/saveCity.json?t=" + Math.random(), {
            city: a
        },
        function(a) {
            "object" != typeof a && (a = JSON.parse(a)),
            1 == a.state ? location.href = location.href: alert(a.message)
        })
    }) : $(document).on("click", "#changeCityBox a.tab",
    function() {
        var a = $(this).html().replace("站", "");
        $.cookie("index_location_city", a, {
            expires: 30,
            domain: "lagou.com",
            path: "/"
        }),
        location.href = location.href
    })
});
/*!index/modules/event/addIcon/main.js*/
;
define("index/modules/event/addIcon/main", ["require", "exports", "module"],
function() {
    function a(a) {
        for (var c = [], v = {},
        i = 0; i < a.length; i++) {
            var h = a[i],
            $ = typeof h + h;
            1 !== v[$] && (c.push(h), v[$] = 1)
        }
        return c
    }
    function c(a) {
        for (var i = 0; i < h.length; i++) {
            var c = $(h[i]).data("companyid");
            if (1 == a[c]) {
                var v = $(h[i]).find(".pli_top .position_name");
                $(h[i]).find(".pli_top .position_link").css("max-width", "194px"),
                v.append(y.clone())
            }
        }
    }
    for (var v = [], h = $(".position_list_item"), i = 0; i < h.length; i++) v.push($(h[i]).data("companyid"));
    v = a(v);
    var _ = v.join(","),
    y = $("<i class='activity_icon1'>升值季</i>");
    $.ajax({
        url: "http://c.lagou.com/icon/showIcon.json",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            type: "COMPANY",
            ids: _
        }
    }).done(function(a) {
        c && c(a)
    }).fail(function() {})
});
/*!index/modules/event/promotion0322/slide_banner/main.js*/
;
define("index/modules/event/promotion0322/slide_banner/main", ["require", "exports", "module"],
function(require) {
    function a() {
        B.animate({
            height: C
        },
        600,
        function() {
            y.fadeOut("300")
        })
    }
    function c() {
        y.fadeIn(300,
        function() {
            B.animate({
                height: G
            },
            600)
        })
    }
    require(["dep/jquery.cookie/jquery.cookie"]);
    var v = $("#serverTime").val();
    if (v && $("#top_bannerC").size() > 0) {
        var h = new Date(parseInt(v)),
        g = new Date("2016/03/22 00:00:00"),
        w = new Date("2016/03/22 23:59:59"),
        j = new Date("2016/03/28 00:00:00"),
        k = new Date("2016/03/28 23:59:59"),
        b = "";
        if (h >= g && w >= h) {
            var _ = "http://www.lagou.com/activity/dist/promotionDev/evolution/pc/index.html",
            D = "http://pstatic.lagou.com/www/static/index/modules/event/promotion0322/img/slider-banner-0322_a94408f.jpg";
            b = ['<div class="slideBanner" id="slideBanner" style="background: url(' + D + ') center top no-repeat;">', '    <a href="' + _ + '" target="_blank" data-lg-tj-id="eG00" data-lg-tj-no="idnull" data-lg-tj-cid="idnull">', '        <div class="slideContent">', "            <h3>全民升职季第二弹 升职进化论</h3>", '            <span class="close"></span>', "        </div>", "    </a>", "</div>"].join("")
        } else if (h >= j && k >= h) {
            var _ = "http://www.lagou.com/activity/dist/promotionDev/evolution/pc/index.html",
            D = "http://pstatic.lagou.com/www/static/index/modules/event/promotion0322/img/slider-banner-0328_5af2e71.jpg";
            b = ['<div class="slideBanner" id="slideBanner" style="background: url(' + D + ') center top no-repeat;">', '    <a href="' + _ + '" target="_blank" data-lg-tj-id="eG00" data-lg-tj-no="idnull" data-lg-tj-cid="idnull">', '        <div class="slideContent">', "            <h3>全民升职季第二弹 升职进化论</h3>", '            <span class="close"></span>', "        </div>", "    </a>", "</div>"].join("")
        }
        if (b) {
            var B = $("#top_bannerC"),
            y = $(b);
            B.find("a").addClass("topBanner_link"),
            B.append(y);
            var C = $("#top_bannerC").height(),
            G = y.height();
            y.on("click", ".close",
            function(c) {
                a(),
                c.preventDefault()
            }),
            B.on("click", "a.topBanner_link",
            function(a) {
                c(),
                a.preventDefault()
            });
            var I = "hideSlideBanner";
            1 == $.cookie(I) || global.isFirst ? y.hide() : (y.show(), B.height(G), $.cookie(I, 1, {
                expires: 1,
                path: "/"
            }), window.setTimeout(a, 3e3))
        }
    }
});
/*!index/page/index/main.js*/
;
define("index/page/index/main", ["require", "exports", "module", "dep/jquery.cookie/jquery.cookie", "common/components/jquery-ui-custom/jquery-ui.custom", "dep/jquery-colorbox/jquery.colorbox", "dep/jquery-hoverdir/jquery.hoverdir", "index/modules/sidebar/main", "index/modules/sub_remind/main", "index/modules/search/main", "index/modules/banner/main", "index/modules/job_list/main", "index/modules/sub_site/main", "common/widgets/plat/poster", "index/modules/event/addIcon/main", "index/modules/event/promotion0322/slide_banner/main"],
function(require) {
    require("dep/jquery.cookie/jquery.cookie"),
    require("common/components/jquery-ui-custom/jquery-ui.custom"),
    require("dep/jquery-colorbox/jquery.colorbox"),
    require("dep/jquery-hoverdir/jquery.hoverdir"),
    require("index/modules/sidebar/main"),
    require("index/modules/sub_remind/main"),
    require("index/modules/search/main"),
    require("index/modules/banner/main"),
    require("index/modules/job_list/main"),
    require("index/modules/sub_site/main"),
    require("common/widgets/plat/poster"),
    require("index/modules/event/addIcon/main"),
    require("index/modules/event/promotion0322/slide_banner/main")
});