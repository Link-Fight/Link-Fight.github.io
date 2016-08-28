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

	module.exports = __webpack_require__(327);


/***/ },

/***/ 327:
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
	    template: __webpack_require__(328),
	    data: function data() {
	        return {
	            init: {
	                flag: false,
	                width: 0,
	                deviation: 0
	            },
	            dragMove: {
	                dragging: false,
	                direction: "", //L/R
	                x: -200,
	                count: 0,
	                start_x: 0,
	                start_y: 0
	            }
	        };
	    },

	    methods: {
	        getDragNode: function getDragNode(currentNode) {
	            while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
	                var className = currentNode.className;
	                if (className.indexOf("dragRight_Component") > -1) {
	                    return currentNode;
	                }
	                currentNode = currentNode.parentNode;
	            }
	            return window;
	        },
	        initViewData: function initViewData(curnode) {
	            if (!this.init.flag) {
	                this.init.flag = true;
	                curnode = this.getDragNode(curnode);
	                var rightNode = curnode.getElementsByClassName("center_parent")[0];
	                var width = rightNode.clientWidth;
	                this.init.width = width;
	                this.dragMove.x = -width + this.init.deviation;
	            }
	        },


	        startDrag: function startDrag(e) {
	            // debugger;
	            !this.init.flag && this.initViewData(e.target);
	            e = e.changedTouches ? e.changedTouches[0] : e;
	            this.dragMove.dragging = true;
	            this.dragMove.start_x = e.pageX;
	            this.dragMove.start_y = e.pageY;
	            this.dragMove.count = 0;
	        },

	        moveEle: function moveEle(direction) {
	            if (direction == "L") {
	                startMove(this.dragMove, { x: 0 });
	            } else if (direction == "R") {
	                startMove(this.dragMove, { x: -this.init.width + this.init.deviation });
	            }
	        },

	        onDrag: function onDrag(e) {
	            this.dragMove.count++;
	            var event = e;
	            e = e.changedTouches ? e.changedTouches[0] : e;
	            var dx = e.pageX - this.dragMove.start_x;
	            var dy = e.pageY - this.dragMove.start_y;
	            //左滑  dx<0   右滑  dx>0 
	            var direction = "";
	            this.dragMove.start_x = e.pageX;
	            this.dragMove.start_y = e.pageY;
	            console.count(dx + " " + dy);
	            console.count(this.dragMove.count);
	            if (this.dragMove.count < 3) return;
	            if (dx == 0) {
	                return;
	            } else {
	                if (Math.abs(dy / dx) > 4) {
	                    return;
	                }
	            }
	            if (dx < 0) {
	                direction = "L";
	                console.info(direction);
	                this.moveEle(direction);
	                if (this.dragMove.x >= 0) {
	                    this.dragMove.x = 0;
	                    return;
	                }
	            } else {
	                direction = "R";
	                console.info(direction);
	                this.moveEle(direction);
	                if (this.dragMove.x <= -this.init.width + this.init.deviation) {
	                    this.dragMove.x = -this.init.width + this.init.deviation;
	                    return;
	                }
	            }
	            this.dragMove.direction = direction;
	            var dampen = dx > 0 ? 3 : 4;

	            this.dragMove.x = this.dragMove.x - dx / dampen;
	            event.preventDefault();
	        },
	        stopDrag: function stopDrag(e) {
	            if (this.dragMove.dragging) {
	                this.dragMove.dragging = false;
	            }
	        },
	        clickRight: function clickRight() {
	            // debugger;
	            this.moveEle("R");
	        }
	    },
	    ready: function ready() {}
	};
	module.exports = {
	    option: option
	};

/***/ },

/***/ 328:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .center_parent::after {\r\n        content: \" \";\r\n        height: 100%;\r\n        display: inline-block;\r\n        vertical-align: middle;\r\n    }\r\n    \r\n    .dragRight_Component {\r\n        overflow: hidden;\r\n    }\r\n</style>\r\n<div class='dragRight_Component' @mousedown=\"startDrag\" @touchstart=\"startDrag\" @mousemove.stop=\"onDrag\" @touchmove.stop=\"onDrag\" @mouseup=\"stopDrag\" @touchend=\"stopDrag\" @mouseleave=\"stopDrag\" style='position:relative;'>\r\n    <slot name=\"content\"></slot>\r\n    <div style='position:absolute;top:0;right:0;height:100%;'>\r\n        <slot name=\"rightTip\"></slot>\r\n    </div>\r\n    <div class=\"right center_parent\" :style='{\"right\":dragMove.x+\"px\"}' style='position:absolute;top:0;height:100%;box-sizing:border-box;text-align: center;font-size: 0;' @click.stop=\"clickRight\">\r\n        <slot name=\"rightContent\"></slot>\r\n    </div>\r\n</div>";

/***/ }

/******/ });