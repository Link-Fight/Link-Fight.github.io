/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(325);


/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function startMove(obj, json, endFn) {

	    clearInterval(obj.timer);

	    obj.timer = setInterval(function () {

	        var bBtn = true;

	        for (var attr in json) {

	            var iCur = 0;
	            iCur = obj[attr];
	            var iSpeed = (json[attr] - iCur) / 10;
	            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	            if (Math.abs(iCur - json[attr]) > 1) {
	                bBtn = false;
	                obj[attr] = iCur + iSpeed;
	            } else {
	                obj[attr] = json[attr];
	                // Object.assign(obj,json);
	                for (var mAttr in json) {
	                    if (json[mAttr] != obj[mAttr]) {
	                        bBtn = false;
	                        break;
	                    }
	                }
	            }
	        }
	        if (bBtn) {
	            clearInterval(obj.timer);

	            if (endFn) {
	                endFn.call(obj);
	            }
	        }
	    }, 20);
	}
	var throttle = function throttle(delay, action) {
	    var last = 0;
	    return function () {
	        var curr = +new Date();
	        if (curr - last > delay) {
	            action.apply(this, arguments);
	            last = curr;
	        }
	    };
	};
	var debounce = function debounce(idle, action) {
	    var last;
	    return function () {
	        var ctx = this,
	            args = arguments;
	        clearTimeout(last);
	        last = setTimeout(function () {
	            action.apply(ctx, args);
	        }, idle);
	    };
	};
	var option = {
	    template: __webpack_require__(326),
	    data: function data() {
	        return {
	            dragging: false,
	            svg: {
	                height: 0,
	                width: 0,
	                reflash_height: 150,
	                bottom_height: 250
	            },
	            tip: {
	                show: false,
	                opacity: 0
	            },
	            // quadratic bezier control point
	            c: { timer: 0, x: 0, y: 0 },
	            // record drag start point
	            start: { x: 0, y: 0 },
	            status: {
	                isRefresh: false
	            }
	        };
	    },

	    watch: {
	        "status.isRefresh": function statusIsRefresh(val, oldVal) {
	            if (val) {
	                // console.info("status.isRefresh");
	            }
	        }
	    },
	    computed: {
	        headerPath: function headerPath() {
	            return 'M0,0 L' + this.svg.width + ',0 ' + this.svg.width + ',' + this.svg.height + ' Q' + this.c.x + ',' + this.c.y + ' 0,' + this.svg.height;
	        },
	        contentPosition: function contentPosition() {
	            var dy = this.c.y - this.svg.height;
	            var dampen = dy > 0 ? 2 : 4;
	            return {
	                transform: 'translate3d(0,' + dy / dampen + 'px,0)'
	            };
	        },
	        contentHeight: function contentHeight() {
	            var dy = this.c.y - this.svg.height;
	            var dampen = dy > 0 ? 2 : 4;
	            return 'height:' + dy / dampen + 'px';
	        },
	        tipPosition: function tipPosition() {
	            var dy = this.c.y - this.svg.height;
	            var dampen = dy > 0 ? 2 : 4;
	            return 'translate3d(0,' + dy / dampen / 2 + 'px,0)';
	        },
	        tipRotate: function tipRotate() {
	            var dy = this.c.y - this.svg.height;
	            var rotate = this.tip.opacity * 90;
	            return {
	                transform: 'rotate(' + rotate + 'deg)'
	            };
	        }
	    },

	    methods: {
	        getScroll: function getScroll(currentNode) {
	            while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
	                var overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
	                if (overflowY === 'scroll' || overflowY === 'auto') {
	                    return currentNode;
	                }
	                currentNode = currentNode.parentNode;
	            }
	            return window;
	        },
	        setReflash: function setReflash(flag) {
	            this.status.isRefresh = flag;
	        },
	        startDrag: function startDrag(e) {
	            e = e.changedTouches ? e.changedTouches[0] : e;
	            clearInterval(this.c.timer);
	            this.dragging = true;
	            // this.start.x = e.pageX
	            this.start.y = e.pageY;
	        },
	        onDrag: function onDrag(e) {
	            var event = e;
	            e = e.changedTouches ? e.changedTouches[0] : e;
	            if (this.dragging) {
	                var diyMain = document.getElementById("diyMain");
	                // this.c.x = 10 + (e.pageX - this.start.x)
	                // dampen vertical drag by a factor
	                var dy = e.pageY - this.start.y;
	                // console.log(dy);
	                if (dy < 0) return;
	                var scrollTop = this.getScroll(event.target).scrollTop;
	                console.info(scrollTop);
	                if (scrollTop != 0) {
	                    return;
	                }
	                var dampen = dy > 0 ? 1.5 : 4;
	                var maxH = this.svg.height + dy / dampen;

	                var opacity = maxH / this.svg.reflash_height;
	                // console.info(opacity*100.0+"%")
	                var flag = false;
	                if (opacity > 1) {
	                    // console.log("opacity",opacity);
	                    opacity = 1;
	                    flag = dy > 0 ? true : false;
	                }
	                this.tip.opacity = opacity;
	                this.setReflash(flag);
	                if (maxH > this.svg.bottom_height) {
	                    return;
	                }
	                event.preventDefault();
	                this.c.y = maxH;
	            }
	        },
	        stopDrag: function stopDrag() {
	            if (this.dragging) {
	                this.dragging = false;
	                startMove(this.c, { y: this.svg.height });
	                this.tip.opacity = 0;
	                if (this.status.isRefresh) {
	                    this.sendReflashMsg();
	                    this.status.isRefresh = false;
	                }
	            }
	        },
	        sendReflashMsg: function sendReflashMsg() {
	            // console.log("dispatch");
	            this.$dispatch('child-msg', {
	                name: "dragMore",
	                msg: "reflash"
	            });
	        }
	    },
	    ready: function ready() {
	        var h = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
	        var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
	        this.svg.width = w;
	        this.c.x = w / 2;
	        // this.svg.height = h / 3;
	        // console.log("ready", w, h);
	    }
	};
	module.exports = {
	    option: option
	};

/***/ },

/***/ 326:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .draggable-header-view {\r\n        /*background-color: #fff;\r\n        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\r\n        overflow: hidden;*/\r\n        position: relative;\r\n        /*font-family: 'Roboto', Helvetica, Arial, sans-serif;*/\r\n        -webkit-user-select: none;\r\n        -moz-user-select: none;\r\n        -ms-user-select: none;\r\n        user-select: none;\r\n    }\r\n    \r\n    .draggable-header-view .svghead {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        z-index: 0;\r\n    }\r\n    \r\n    .draggable-header-view .svgbottom {\r\n        position: absolute;\r\n        bottom: 0;\r\n        left: 0;\r\n        z-index: 0;\r\n    }\r\n    \r\n    .draggable-header-view .header {\r\n        position: relative;\r\n        /*z-index: 1;\r\n        padding: 10px;\r\n        box-sizing: border-box;*/\r\n    }\r\n    \r\n    .drag_more_bottom {\r\n        height: 65px;\r\n    }\r\n</style>\r\n\r\n<div id=\"header-view-template\">\r\n    <div class=\"draggable-header-view\" @mousedown.stop=\"startDrag\" @touchstart.stop=\"startDrag\" @mousemove.stop=\"onDrag\" @touchmove.stop=\"onDrag\"\r\n        @mouseup.stop=\"stopDrag\" @touchend.stop=\"stopDrag\" @mouseleave.stop=\"stopDrag\">\r\n        <svg class=\"svghead\" :width=\"svg.width\" :height=\"svg.bottom_height\">\r\n            <path :d=\"headerPath\" fill=\"#8bc34a\"></path>\r\n        </svg>\r\n        <div class=\"header\" :style=\"{'height':svg.height}\">\r\n            <div class=\"showTip\" style='text-align:center;color:#fff;' :style=\"{'opacity':tip.opacity,'transform':tipPosition}\">\r\n                <span :style=\"tipRotate\" style='display: inline-block;'>\r\n                    <i class=\"iconfont icon-zuojiantou\" ></i>\r\n                </span>\r\n                <!--<p>下拉刷新</p>-->\r\n            </div>\r\n            <!--<slot name=\"drag_more_header\"></slot>-->\r\n        </div>\r\n        <div class=\"content\" :style=\"contentPosition\">\r\n            <slot name=\"drag_more_content\"></slot>\r\n        </div>\r\n        <div :style='contentHeight'>\r\n\r\n        </div>\r\n        <slot name='drag_more_bottom'></slot>\r\n    </div>\r\n</div>";

/***/ }

/******/ });