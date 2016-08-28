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

	module.exports = __webpack_require__(350);


/***/ },

/***/ 344:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var user_api =  true ? __webpack_require__(345) : require("apis/user");
	module.exports = {
	    login: function login(data) {
	        var username = $.trim(data.username);
	        var password = $.trim(data.password);
	        var def = $.Deferred();
	        if (!username) def.reject({ msg: "请输入用户名" });else if (!password) def.reject({ msg: "请输入密码" });else def = user_api.login(username, password);
	        return def;
	    },
	    check_pm_login: function check_pm_login(data) {
	        var def = $.Deferred();
	        def = user_api.check_pm_login(data);
	        return def;
	    }
	};

/***/ },

/***/ 345:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    login: function login(username, password) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({ status: 200, message: "登录成功" });
	        }, 2000);
	        return def;
	    },
	    check_pm_login: function check_pm_login(data) {
	        // console.log(2);
	        // return $.when({
	        //     "status": 200,
	        //     "message": ""
	        // });

	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({ status: 200, message: "登录成功" });
	        }, 3000);
	        return def;
	    }
	};

/***/ },

/***/ 350:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var userComtroller = __webpack_require__(344);
	Xa.defineModule("/master/master", function () {
	    return {
	        template: __webpack_require__(351),
	        data: function data() {
	            return {};
	        },
	        computed: {},
	        created: function created() {},
	        ready: function ready() {},
	        destroyed: function destroyed() {
	            //  console.log("master:destroyed");
	        },
	        events: {
	            'change-title': function changeTitle(msg) {
	                // console.log(msg);
	            }
	        }
	    };
	});

/***/ },

/***/ 351:
/***/ function(module, exports) {

	module.exports = "\r\n<section id=\"content-box\">\r\n    <router-view></router-view>\r\n</section>";

/***/ }

/******/ });