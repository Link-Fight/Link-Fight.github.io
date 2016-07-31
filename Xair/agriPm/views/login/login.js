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

	module.exports = __webpack_require__(474);


/***/ },

/***/ 474:
/***/ function(module, exports, __webpack_require__) {

	var userController = __webpack_require__(475);

	Xa.defineModule('/login/login', function () {
	    var _username = Xa.localStorage.getItem("/login", "username");
	    _username === undefined ? "" : _username;
	    var _password = Xa.localStorage.getItem("/login", "password");
	    _password === undefined ? "" : _password;
	    var defaultUrl = "/pm/workTable";
	    return {
	        template: __webpack_require__(477),
	        data: function () {
	            return {
	                username: _username,
	                password: _password,
	                msg: "",
	                toastShow: false,
	                toastText: "",
	            };
	        },
	        computed: {
	        },
	        methods: {
	            loginFn: function () {
	                var _this = this;
	                this.displayMask = true;
	                userController.login({
	                    username: _this.username,
	                    password: _this.password,
	                }).done(function (data) {
	                    if (data.status == 200) {
	                        var index = window.location.hash.indexOf("goto=");
	                        var url = defaultUrl
	                        if (index >= 0) {//回调地址放在url上"http://192.168.11.130:97/pm/#!/login?goto=/agri/report",key是"goto="
	                            url = window.location.hash.substr(index + 5);
	                            if (!url || url.length < 2) {
	                                url = defaultUrl;
	                            }
	                        }
	                        _this.toastText = "登录成功！";
	                        _this.toastShow = true;
	                        setTimeout(function () {
	                            _this.toastShow = false;
	                            Router.go(url);
	                        }, 1000);
	                        _username = _this.username;
	                        _password = _this.password;
	                        Xa.localStorage.setItem("/login", "username", _this.username);
	                        Xa.localStorage.setItem("/login", "password", _this.password);

	                    }
	                    // _this.msg = data.message;
	                }).fail(function (data) {
	                    _this.displayMask = false;
	                    console.log(data.msg);
	                    _this.msg = data.msg;
	                })
	            }
	        },
	        ready: function () {
	            this.$root.seoPageInfo.title = "登录";
	            // document.getElementById('wechatLoading').style.display = 'none';
	        },
	        filters: {
	            getImageStr: function (obj) {
	                if (obj["backgroundImage"]) {
	                    obj["backgroundImage"] = "url(" + obj["backgroundImage"] + ")";
	                }
	                return obj;
	            }
	        },
	    }
	})

/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

	var user_api =  true ? __webpack_require__(476) : require("apis/user");
	module.exports = {
	    login: function (data) {
	        var username = $.trim(data.username);
	        var password = $.trim(data.password);
	        var def = $.Deferred();
	        if (!username)
	            def.reject({ msg: "请输入用户名" });
	        else if (!password)
	            def.reject({ msg: "请输入密码" });
	        else
	            def = user_api.login(username, password);
	        return def;
	    },
	    check_pm_login: function (data) {
	        var def = $.Deferred();
	        def = user_api.check_pm_login(data);
	        return def;
	    }
	}

/***/ },

/***/ 476:
/***/ function(module, exports) {

	module.exports = {
	    login: function (username, password) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            console.log("login");
	            def.resolve({ status: 200, message: "登录成功", });
	        }, 2000);
	        return def;
	    },
	    check_pm_login: function (data) {
	        // console.log(2);
	        // return $.when({
	        //     "status": 200,
	        //     "message": ""
	        // });

	         var def = $.Deferred();
	        setTimeout(function () {
	            console.log("login");
	            def.resolve({ status: 200, message: "登录成功", });
	        }, 3000);
	        return def;
	    }
	}

/***/ },

/***/ 477:
/***/ function(module, exports) {

	module.exports = "<style>    \r\n    input[type=\"text\"]:focus,\r\n    input[type=\"password\"]:focus {\r\n        outline: 0;\r\n        border: 1px solid #04bf02;\r\n    }\r\n    \r\n    .login_input {\r\n        margin: 0 22px;\r\n        margin-top: 81px;\r\n    }\r\n    \r\n    .login_input input {\r\n        width: 100%;\r\n        padding: 16px 12px;\r\n        font-size: 14px;\r\n        line-height: 14px;\r\n        color: #999;\r\n        margin-bottom: 10px;\r\n        border-radius: 3px;\r\n        outline: 0;\r\n        border: 1px solid #999;\r\n    }\r\n    \r\n    .login_input button {\r\n        width: 100%;\r\n        height: 42px;\r\n        font-size: 20px;\r\n        color: #fff;\r\n        background-color: #04bf02;\r\n        border: 1px solid #999;\r\n        border-radius: 3px;\r\n    }\r\n    \r\n    .login_input button:focus {\r\n        outline: 0;\r\n        background-color: #14a712;\r\n        border: 1px solid #999;\r\n    }\r\n    \r\n    .login_mask {\r\n        position: fixed;\r\n        left: 0;\r\n        right: 0;\r\n        top: 0;\r\n        bottom: 0;\r\n        background-color: rgba(255, 255, 255, 0.8);\r\n        z-index: 100;\r\n        background-repeat: no-repeat;\r\n        background-position: center center;\r\n    }\r\n    \r\n    .login_input .msg {\r\n        /*text-align: center;*/\r\n        color: red;\r\n        font-size: 14px;\r\n        line-height: 1.8;\r\n        padding-left: 13px;\r\n    }\r\n</style>\r\n\r\n<div class=\"login_area\">\r\n    <div class=\"login_input\">\r\n        <p class=\"msg\" v-show=\"msg.length>0\">{{msg}}</p>\r\n        <input placeholder=\"请输入账号\" type=\"text\" name=\"username\" v-model=\"username\">\r\n        <input placeholder=\"请输入密码\" type=\"password\" name=\"password\" v-model=\"password\">\r\n        <button type=\"button\" @click=\"loginFn\">登 录</button>\r\n    </div>\r\n</div>\r\n<toast v-show=\"toastShow\">{{ toastText }}</toast>";

/***/ }

/******/ });