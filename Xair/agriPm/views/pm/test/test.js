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

	module.exports = __webpack_require__(510);


/***/ },

/***/ 510:
/***/ function(module, exports, __webpack_require__) {

	Xa.defineModule("/pm/test/test", function () {
	    return {
	        template: __webpack_require__(511),
	        data: function () {
	            var _this = this;
	            return {
	                dialogShow: false,
	                isFocusing:false,
	                dialogTitle: '提示',
	                dialogContent: '',
	                isLoading: true,
	                inboxItem: {},
	                inboxItems: []
	            }
	        },

	        created: function () {

	        },
	        watch: {},
	        methods: {
	            selectedFn: function (option) {
	                var _this = this;
	                _this.selectVal = option;
	            },
	            searchCancelFn: function () {
	                this.isFocusing = false;
	                this.searchResultShow = false;
	                this.searchVal = "";
	                this.$dispatch("isSelectShow");
	            },
	            customSearchEvent: function (type) {
	                var _this = this;
	                _this.isLoading = true;
	            },
	            searchClearFn: function () {
	                this.searchResultShow = false;
	                this.searchVal = "";
	            },
	            searchInputFn: function () {
	                this.isFocusing = true;
	            },

	        },
	        events: {
	        },
	        filters: {},
	        ready: function () {

	        },
	        components: {
	        }
	    }

	})




/***/ },

/***/ 511:
/***/ function(module, exports) {

	module.exports = "<!--搜索 -->\r\n<div class=\"weui_search_bar\" :class=\"{'weui_search_focusing':isFocusing}\" style=\"position: fixed;top:0;left: 0;width:100%;z-index: 3\">\r\n    <div class=\"weui_search_outer\">\r\n        <div class=\"weui_search_inner\">\r\n            <i class=\"weui_icon_search\" style=\"top:7px\"></i>\r\n            <input type=\"search\" @keyup.enter=\"customSearchEvent('search')\" v-model=\"searchVal\" class=\"weui_search_input\" id=\"search_input\"\r\n                   placeholder=\"输入搜索内容\" />\r\n            <a href=\"javascript:\" v-show=\"!!searchVal\" class=\"weui_icon_clear\" @click=\"searchClearFn\" style=\"top:7px\"></a>\r\n        </div>\r\n        <label for=\"search_input\" @click=\"searchInputFn\" class=\"weui_search_text\" id=\"search_text\">\r\n            <i class=\"weui_icon_search\"></i>\r\n            <span>搜索</span>\r\n        </label>\r\n    </div>\r\n    <a href=\"javascript:\" v-show=\"!!searchVal\" @click=\"customSearchEvent('search')\" class=\"weui_search_cancel\">搜索</a>\r\n    <a href=\"javascript:\" v-show=\"!searchVal\" @click=\"searchCancelFn\" class=\"weui_search_cancel\" id=\"search_cancel\">取消</a>\r\n</div>\r\n<div style=\"padding-top: 44px\">\r\n    <div>小明子1</div>\r\n    <div>小明子2</div>\r\n    <div>小明子3</div>\r\n    <div>小明子4</div>\r\n    <div>小明子5</div>\r\n    <div>小明子6</div>\r\n    <div>小明子7</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子</div>\r\n    <div>小明子end7</div>\r\n    <div>小明子end6</div>\r\n    <div>小明子end5</div>\r\n    <div>小明子end4</div>\r\n    <div>小明子end3</div>\r\n    <div>小明子end2</div>\r\n    <div>小明子end1</div>\r\n    <div>小明子end</div>\r\n</div>\r\n\r\n";

/***/ }

/******/ });