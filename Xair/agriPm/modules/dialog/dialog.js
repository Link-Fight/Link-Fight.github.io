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

	module.exports = __webpack_require__(405);


/***/ },

/***/ 405:
/***/ function(module, exports, __webpack_require__) {

	Vue.component('dialog',{
	    template:__webpack_require__(406),
	    props: {
	        /**
	         * 对话框类型
	         * alert: 提示框，只包含确定按钮（默认）
	         * confirm: 询问框，包含确定和取消按钮
	         */
	          type: {
	          type: String,
	          required: false,
	          default: 'alert'
	      },

	      /**
	       * 对话框标题
	       */
	       title: {
	          type: String,
	          required: true
	      },

	      /**
	       * 确定按钮名称
	       */
	       confirmButton: {
	        type: String,
	        required: false,
	        default: '确定'
	      },

	      /**
	       * 取消按钮名称
	       */
	       cancelButton: {
	        type: String,
	        required: false,
	        default: '取消'
	      }

	    },

	    methods: {
	      dispathEventAndClose:function(event) {
	        this.$dispatch(event);
	      }
	    }
	});

/***/ },

/***/ 406:
/***/ function(module, exports) {

	module.exports = "<div :class=\"'weui_dialog_' + type\" v-show=\"show\">\r\n  <div class=\"weui_mask\"></div>\r\n  <div class=\"weui_dialog\">\r\n    <div class=\"weui_dialog_hd\">\r\n      <div class=\"weui_dialog_title\">{{title}}</div>\r\n    </div>\r\n    <div class=\"weui_dialog_bd\"><slot></slot></div>\r\n    <div class=\"weui_dialog_ft\">\r\n      <a v-if=\"type === 'confirm'\" href=\"javascript:;\" class=\"weui_btn_dialog default\" @click=\"dispathEventAndClose('weui-dialog-cancel')\">{{cancelButton}}</a>\r\n      <a href=\"javascript:;\" class=\"weui_btn_dialog primary\" @click=\"dispathEventAndClose('weui-dialog-confirm')\">{{confirmButton}}</a>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ }

/******/ });