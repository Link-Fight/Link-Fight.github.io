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

	module.exports = __webpack_require__(347);


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

	module.exports = "<style>\r\n    .center_parent::after {\r\n        content: \" \";\r\n        height: 100%;\r\n        display: inline-block;\r\n        vertical-align: middle;\r\n    }\r\n    \r\n    .dragRight_Component {}\r\n    \r\n    .dragRight_Component .right_wrap {\r\n        overflow: hidden;\r\n        position: absolute;\r\n        left: 0;\r\n        right: 0;\r\n        top: 0;\r\n        bottom: 0;\r\n    }\r\n</style>\r\n<div class='dragRight_Component' @mousedown=\"startDrag\" @touchstart=\"startDrag\" @mousemove.stop=\"onDrag\" @touchmove.stop=\"onDrag\" @mouseup=\"stopDrag\" @touchend=\"stopDrag\" @mouseleave=\"stopDrag\" style='position:relative;'>\r\n    <slot name=\"content\"></slot>\r\n    <!--<div class=\"right_wrap\">-->\r\n        <div style='position:absolute;top:0;right:0;height:100%;'>\r\n            <slot name=\"rightTip\"></slot>\r\n        </div>\r\n    <!--</div>-->\r\n    <div class=\"right center_parent\" :style='{\"right\":dragMove.x+\"px\"}' style='position:absolute;top:0;height:100%;box-sizing:border-box;text-align: center;font-size: 0;' @click.stop=\"clickRight\">\r\n        <slot name=\"rightContent\"></slot>\r\n    </div>\r\n</div>";

/***/ },

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var optionData = {
	    curHtml: "你们号！",
	    mList: []
	};

	for (var i = 0; i < 10; i++) {
	    optionData.mList.push({
	        "id": 9,
	        "uid": "7ff856aa-e2b2-4ec2-8580-26864063767e",
	        "confirm_status": 1,
	        "fields": [{
	            "key": "面积",
	            "value": "2.909亩"
	        }, {
	            "key": "高度",
	            "value": "2.5米"
	        }, {
	            "key": "幅宽",
	            "value": "3米"
	        }, {
	            "key": "速度",
	            "value": "5米/秒"
	        }, {
	            "key": "流速",
	            "value": "300毫升/亩"
	        }, {
	            "key": "耗时",
	            "value": "2分40秒"
	        }, {
	            "key": "飞手",
	            "value": "郑晓欢"
	        }, {
	            "key": "审批",
	            "value": "通过（郑晓欢)"
	        }],
	        "errors": [{
	            "icon": "icon-dianchi",
	            "title": "电池电流过高"
	        }, {
	            "icon": "icon-dianchi",
	            "title": "电池主板温度低"
	        }, {
	            "icon": "icon-dianchi",
	            "title": "电池主板温度高"
	        }, {
	            "icon": "icon-dianchi",
	            "title": "电池主板温度异常"
	        }],
	        "airlines": [{
	            "lat": 23.173906734204,
	            "lng": 113.40930553727,
	            "action": 1,
	            "head": 1,
	            "spray": 0
	        }, {
	            "lat": 23.174305330426,
	            "lng": 113.40920818953,
	            "action": 1,
	            "head": 2,
	            "spray": 12
	        }, {
	            "lat": 23.173903891748,
	            "lng": 113.40927615515,
	            "action": 1,
	            "head": 1,
	            "spray": 0
	        }, {
	            "lat": 23.174301407483,
	            "lng": 113.4091790713,
	            "action": 7,
	            "head": 3,
	            "spray": 3
	        }]
	    });
	    optionData.mList.push({
	        "id": '#10',
	        "uid": "7ff856aa-e2b2-4ec2-8580-26864063767e",
	        "confirm_status": -1,
	        "fields": [{
	            "key": "面积",
	            "value": "2.909亩"
	        }, {
	            "key": "高度",
	            "value": "2.5米"
	        }, {
	            "key": "幅宽",
	            "value": "3米"
	        }, {
	            "key": "速度",
	            "value": "5米/秒"
	        }, {
	            "key": "流速",
	            "value": "300毫升/亩"
	        }, {
	            "key": "耗时",
	            "value": "2分40秒"
	        }, {
	            "key": "飞手",
	            "value": "郑晓欢"
	        }, {
	            "key": "审批",
	            "value": "通过（郑晓欢)"
	        }],
	        "errors": [{
	            "icon": "icon-dianchi",
	            "title": "电池电流过高"
	        }, {
	            "icon": "icon-dianchi",
	            "title": "电池主板温度低"
	        }, {
	            "icon": "icon-dianchi",
	            "title": "电池主板温度高"
	        }, {
	            "icon": "icon-dianchi",
	            "title": "电池主板温度异常"
	        }],
	        "airlines": [{
	            "lat": 23.173906734204,
	            "lng": 113.40930553727,
	            "action": 1,
	            "head": 1,
	            "spray": 0
	        }, {
	            "lat": 23.174305330426,
	            "lng": 113.40920818953,
	            "action": 1,
	            "head": 2,
	            "spray": 12
	        }, {
	            "lat": 23.173903891748,
	            "lng": 113.40927615515,
	            "action": 1,
	            "head": 1,
	            "spray": 0
	        }, {
	            "lat": 23.174301407483,
	            "lng": 113.4091790713,
	            "action": 7,
	            "head": 3,
	            "spray": 3
	        }]
	    });
	}

	var threeDobej = {
	    rotateY: 45,
	    transform: "transform: perspective(500px) rotateY(45deg)"
	};

	var dragObj = {
	    dragMove: {
	        dragging: false,
	        direction: "", //L/R
	        x: -200,
	        count: 0,
	        start_x: 0,
	        start_y: 0
	    }
	};
	window.XY = [];
	var option = {
	    template: __webpack_require__(349),
	    data: function data() {
	        return Object.assign({}, optionData, dragObj, threeDobej);
	    },
	    methods: {
	        clickFn: function clickFn(item, action, e) {
	            this.curHtml = "输出:" + JSON.stringify(action);
	        },

	        startDrag: function startDrag(e) {
	            // debugger;
	            // !this.init.flag && this.initViewData(e.target);
	            e = e.changedTouches ? e.changedTouches[0] : e;
	            this.dragMove.dragging = true;
	            this.dragMove.start_x = e.pageX;
	            this.dragMove.start_y = e.pageY;
	            this.dragMove.count = 0;
	            window.XY.push(" !! ");
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
	            console.info("xy:" + dx + " " + dy);
	            window.XY.push("xy:" + dx + " " + dy);
	            if (Math.abs(dy / dx) > 6) {
	                return;
	            }
	            if (dx < 0) {
	                direction = "L";
	                console.info(direction);
	            } else {
	                direction = "R";
	                console.info(direction);
	            }
	            console.info(direction);
	            if (direction == "R") {
	                this.rotateY += 2;
	                this.rotateY = this.rotateY % 360;
	                this.transform = "transform: perspective(500px) rotateY(" + this.rotateY + "deg);";
	            } else {
	                this.rotateY -= 2;
	                this.rotateY = this.rotateY % 360;
	                this.transform = "transform: perspective(500px) rotateY(" + this.rotateY + "deg);";
	            }
	            // this.dragMove.direction = direction;
	            // const dampen = dx > 0 ? 3 : 4;
	            // this.dragMove.x = this.dragMove.x - dx / dampen;
	            // event.preventDefault();
	        },
	        stopDrag: function stopDrag(e) {
	            if (this.dragMove.dragging) {
	                this.dragMove.dragging = false;
	            }
	        }
	    },
	    components: {
	        dragrightComponent: __webpack_require__(327).option
	    }

	};

	if (!Xa.hasModule('/main/main')) {
	    Xa.defineModule('/main/main', function () {
	        return option;
	    });
	}
	module.export = {
	    option: option
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(348)(module)))

/***/ },

/***/ 348:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 349:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .flywrap {\r\n        margin-top: 0;\r\n        padding: 10px;\r\n    }\r\n    \r\n    .center_parent::after {\r\n        content: \" \";\r\n        height: 100%;\r\n        display: inline-block;\r\n        vertical-align: middle;\r\n    }\r\n    \r\n    .dragRight_Component {\r\n        margin-top: 5px;\r\n    }\r\n    \r\n    .dragRight_Component:last-child {\r\n        margin-bottom: 56px;\r\n    }\r\n    \r\n    div.confirm_faili {\r\n        background: #F2F2F2;\r\n    }\r\n    \r\n    i.confirm_faili {\r\n        position: absolute;\r\n        left: 50%;\r\n        top: 50%;\r\n        transform: translate(-50%, -50%);\r\n        font-size: 30px;\r\n        line-height: 30px;\r\n        opacity: 0.5;\r\n        color: red;\r\n    }\r\n    \r\n    .stage_area {\r\n        width: 100%;\r\n        /*height: 100px;*/\r\n        margin-left: auto;\r\n        margin-right: auto;\r\n        padding: 20px 0px;\r\n        background-color: #f0f0f0;\r\n        box-shadow: inset 0 0 3px rgba(0, 0, 0, .35);\r\n        -webkit-transition: top .5s;\r\n        position: relative;\r\n        z-index: 2;\r\n        top: 0;\r\n    }\r\n    \r\n    .piece {\r\n        display:inline-block;\r\n        width: 100px;\r\n        height: 100px;\r\n        background-color: #cad5eb;\r\n        padding: 10px;\r\n        -moz-box-sizing: border-box;\r\n        -webkit-box-sizing: border-box;\r\n        box-sizing: border-box;\r\n        margin:10px 0;\r\n        position: relative;\r\n    }\r\n</style>\r\n<div>\r\n    <p>Test DragRight</p>\r\n    {{{curHtml}}}\r\n    <div id=\"stageSecond\" class=\"stage_area\" @mousedown=\"startDrag\" @touchstart=\"startDrag\" @mousemove.stop=\"onDrag\" @touchmove.stop=\"onDrag\" @mouseup=\"stopDrag\" @touchend=\"stopDrag\" @mouseleave=\"stopDrag\">\r\n        <div class=\"piece\"  :style=\"transform\"  style=\"z-index: 24; background-color: rgba(204, 153, 51, 0.74902);\"></div>\r\n        <div class=\"piece\"  style=\"z-index: 31; transform: perspective(500px) rotateY(45deg); background-color: rgba(51, 204, 87, 0.74902);\" :style=\"transform\"></div>\r\n        <div class=\"piece\"  style=\"z-index: 45; transform: perspective(500px) rotateY(45deg); background-color: rgba(51, 204, 161, 0.74902);\"></div>\r\n        <div class=\"piece\"  style=\"z-index: 83; transform: perspective(500px) rotateY(45deg); background-color: rgba(171, 51, 204, 0.74902);\"></div>\r\n        <div class=\"piece\"  style=\"z-index: 500; transform: perspective(500px) rotateY(45deg); background-color: rgba(204, 51, 110, 0.74902);\"></div>\r\n        <div class=\"piece\"  style=\"z-index: 125; transform: perspective(500px) rotateY(45deg); background-color: rgba(125, 204, 51, 0.74902);\"></div>\r\n        <div class=\"piece\"  style=\"z-index: 56; transform: perspective(500px) rotateY(45deg); background-color: rgba(204, 71, 51, 0.74902);\"></div>\r\n        <div class=\"piece\"  style=\"z-index: 36; transform: perspective(500px) rotateY(45deg); background-color: rgba(204, 122, 51, 0.74902);\"></div>\r\n        <div class=\"piece\"  style=\"z-index: 26; transform: perspective(500px) rotateY(45deg); background-color: rgba(204, 120, 51, 0.74902);\"></div>\r\n    </div>\r\n\r\n    <div style='clear:both;height:200px;overflow:hidden;overflow-y:auto;border-bottom:20px solid #CD7F32;border-top:20px solid #CD7F32;'>\r\n        <div style='overflow:hidden;width:100%'>\r\n            <template v-for='data in mList'>\r\n\t\t\t\t\t\t<dragright-Component>\r\n\t\t\t\t\t\t\t<template slot=\"content\">\r\n\t\t\t\t\t\t\t\t<div class=\"weui_cells weui_cells_access flywrap\"    >\r\n\t\t\t\t\t\t\t\t\t<a v-for='field in data.fields' style='display: inline-block;vertical-align: top;width: 50%'>\r\n\t\t\t\t\t\t\t\t\t\t{{field.key}}：{{field.value}}\r\n\t\t\t\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t\t\t\t<span style='position:absolute;top:10px;right:10px;'>{{data.id}}</span>\r\n\t\t\t\t\t\t\t\t\t<i v-if='data.confirm_status == -1' class=\"confirm_faili iconfont icon-chacha1\"></i>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</template>\r\n            <template slot=\"rightContent\">\r\n\t\t\t\t\t\t\t\t<div v-show='data.confirm_status != -1' @click.stop='clickFn(data,\"dialog\",$event)' class=\"center_parent\" style='height: 100%;background: red;display: inline-block;'>\r\n\t\t\t\t\t\t\t\t\t<span style=\"color:#fff;padding:0 20px;width:10px;font-size:12px;display:inline-block;vertical-align:middle\">不通过</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div v-show='data.confirm_status == -1' @click.stop='clickFn(data,\"cancel_alert_status\",$event)' class=\"center_parent\" style='height: 100%;background: green;display: inline-block;'>\r\n\t\t\t\t\t\t\t\t\t<span style=\"color:#fff;padding:0 20px;width:10px;font-size:12px;display:inline-block;vertical-align:middle\">取消</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</template>\r\n            <template slot='rightTip'>\r\n\t\t\t\t\t\t\t\t<div v-show='data.confirm_status != -1' style='height:100%;width:3px;background:red;'>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div v-show='data.confirm_status == -1' style='height:100%;width:3px;background:green;'>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</template>\r\n            </dragright-Component>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }

/******/ });