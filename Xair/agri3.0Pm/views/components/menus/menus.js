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

	module.exports = __webpack_require__(451);


/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	var menusComponent = Vue.extend({
	    template: __webpack_require__(452),
	    props: {
	        menus: {
	            type: Array,
	            default: function () {
	                return [
	                    { text: "动态", iconfont: "icon-shenpi03", path: '/pm/dynamics' },
	                    { text: "工作", iconfont: "icon-gongzuo", path: '/pm/workTable' },
	                    { text: "报表", iconfont: "icon-baobiao", path: '/agri/report' },
	                    { text: "设置", iconfont: "icon-shezhi", path: '/setting' }
	                ];
	            },
	        }
	    },
	    computed: {
	        menuItemStyle: function () {
	            return {
	                width: (100.0 / this.menus.length) + "%",
	            }
	        }

	    },
	    ready: function () {
	        
	    },
	}
	);

	module.exports = {
	    menusComponent: menusComponent
	}

/***/ },

/***/ 452:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .footer_menu {\r\n        position: fixed;\r\n        bottom: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        border-top: 1px solid #cdcdcd;\r\n        margin: 0;\r\n        padding: 0;\r\n        font-size: 0;\r\n    }\r\n    \r\n    .footer_menu a {\r\n        text-align: center;\r\n        display: inline-block;\r\n        font-size: 16px;\r\n        background-color: #fff;\r\n        line-height: 1.2;\r\n        text-decoration: none;\r\n        padding-top: 2px;\r\n        padding-bottom: 5px;\r\n        color: #878787;\r\n    }\r\n    \r\n    .footer_menu p.iconfont {\r\n        font-size: 28px;\r\n    }\r\n    \r\n    .footer_menu a>span {\r\n        font-size: 12px;\r\n    }\r\n    \r\n    .footer_menu a.v-link-active {\r\n        color: #049a04;\r\n    }\r\n    \r\n    .footer_menu a {\r\n        text-decoration: none;\r\n    }\r\n    \r\n    .footer_menu a:hover {\r\n        text-decoration: none;\r\n        outline: none;\r\n    }\r\n    \r\n    .footer_menu a:focus {\r\n        text-decoration: none;\r\n        outline: none;\r\n    }\r\n    \r\n    :focus {\r\n        outline: 0;\r\n    }\r\n</style>\r\n\r\n\r\n<div class=\"footer_menu\">\r\n    <template v-for=\"menu of menus\">\r\n        <a v-link=\"menu.path\" :style=\"menuItemStyle\">\r\n            <p class=\"iconfont\" v-bind:class=\"menu.iconfont\"></p>\r\n            <span>{{menu.text}}</span>\r\n        </a>\r\n    </template>\r\n</div>";

/***/ }

/******/ });