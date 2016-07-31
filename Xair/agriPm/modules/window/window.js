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

	module.exports = __webpack_require__(440);


/***/ },

/***/ 417:
/***/ function(module, exports, __webpack_require__) {

	var mode_api =  true ? __webpack_require__(418) : require("apis/mode");
	module.exports = {
	    newCase: function (data) {
	        var def = $.Deferred();
	        if (!data.pro_uid)
	            def.reject({ msg: "pro_uid不能为空" });
	        else
	            def = mode_api.newCase(data);
	        return def;
	    },
	    getFormHtml: function (data) {
	        var def = $.Deferred();
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else
	            def = mode_api.getFormHtml(data);
	        return def;
	    },
	    getVariables: function (data) {
	        var def = $.Deferred();
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else
	            def = mode_api.getVariables(data);
	        return def;
	    },
	    sendForm: function (data) {
	        var def = $.Deferred();
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else if (!data.variables)
	            def.reject({ msg: "variables不能为空" });
	        else
	            def = mode_api.sendForm(data);
	        return def;
	    },
	    /**Cases_获取CASE的下一步TASK信息 - Agri_V3
	     * @param  {} data
	     */
	    get_next_task: function (data) {
	        var def = $.Deferred();

	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else
	            def = mode_api.get_next_task(data);
	        return def;
	    },
	    /**Cases_手动路由 - Agri_V3
	     * @param  {} data
	     */
	    route_manual: function (data) {
	        var def = $.Deferred();
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else if (!data.tas_uid)
	            def.reject({ msg: "tas_uid不能为空" });
	        else if (!data.usr_uid)
	            def.reject({ msg: "usr_uid不能为空" });
	        else
	            def = mode_api.route_manual(data);
	        return def;
	    },
	    /**Cases_自动路由 - Agri_V3
	     * @param  {} data
	     */
	    route_auto: function (data) {
	        var def = $.Deferred();
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else
	            def = mode_api.route_auto(data);
	        return def;
	    },
	    getDropdownList: function (url,data) {
	        var def = $.Deferred();
	        if (!url)
	            def.reject({ msg: "请求地址不能为空" });
	        else
	            def = mode_api.getDropdownList(url,data);
	        return def;
	    },
	    
	    getViewData: function (url,data) {
	        var def = $.Deferred();
	        if (!url)
	            def.reject({ msg: "请求地址不能为空" });
	        else
	            def = mode_api.getViewData(url,data);
	        return def;
	    },

	}

/***/ },

/***/ 418:
/***/ function(module, exports) {

	module.exports = {
	    newCase: function (data) {
	        return $.when({
	            "app_uid": "3179626465774c9820bc7d2098220576",
	            "app_number": 17
	        });
	    },
	    getFormHtml: function (data) {
	        return $.when('<div id="infoContract"><div class="weui_cells_title">{{' + variables.title + '}}</div></div>');
	    },
	    getVariables: function (data) {
	        return $.when({
	            "SYS_LANG": "en",
	            "SYS_SKIN": "neoclassic",
	            "SYS_SYS": "workflow",
	            "APPLICATION": "326660156577cce64c51d24049766695",
	            "PROCESS": "5364990235774d447ed91e0049846248",
	            "TASK": "4750671385774d472904c49022431559",
	            "INDEX": "1",
	            "USER_LOGGED": "00000000000000000000000000000001",
	            "USR_USERNAME": "liubo",
	            "customer_name": "2222",
	            "customer_name_label": "2222",
	            "description": "",
	            "description_label": "",
	            "radioVar": "bbb",
	            "radioVar_label": "ddd",
	            "checkgroupVar": [
	                "aaa"
	            ],
	            "checkgroupVar_label": "[\"bbb\"]",
	            "contract_img_label": "[]",
	            "submit0000000001": "",
	            "APP_NUMBER": "55",
	            "PIN": "QQX5"
	        });
	    },
	    sendForm: function (data) {
	        return $.when({});
	    },
	    get_next_task: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "tas_uid": -1,
	                "tas_title": "流程终结",
	                "tas_assign_type": "",
	                "tas_description": "",
	                "assignee": [{

	                    "aas_uid": "00000000000000000000000000000001",
	                    "aas_name": "Administrator skyweo",
	                    "aas_avatar": ""
	                }]
	            })
	        }, 1000);

	        return def;
	    },
	    route_manual: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "status": 200,
	                "message": "SUCCESS"
	            })
	        }, 1000);

	        return def;
	    },
	    route_auto: function (data) {
	        var def = $.Deferred();
	        var obj = {
	            "status": 300,
	            "msg": "fail"
	        };
	        setTimeout(function () {
	            if (obj.status == "200")
	                def.resolve(obj);
	                else
	                def.reject(obj);
	        }, 1000);

	        return def;
	    },
	    getDropdownList: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({});
	        }, 1000);

	        return def;
	    },
	    getViewData: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({});
	        }, 1000);

	        return def;
	    },
	}

/***/ },

/***/ 440:
/***/ function(module, exports, __webpack_require__) {

	var modeContrlller = __webpack_require__(417);
	Vue.component('window', {
	    template: __webpack_require__(441),
	    props: {
	        config:{
	            type:Object
	        },
	        label:{
	            type:String,
	            default:function(){
	                return "Label"
	            }
	        }
	    },
	    data: function () {
	        return {
	            currentWindow:{},
	            windowShow:false
	        }
	    },
	    created: function () {
	    },
	    watch: {
	    },
	    methods:{
	        openWindowFn:function(){
	            var _this = this;
	/*
	            _this.currentWindow = Xa.requireModule('/pm/test/test');
	*/
	                Xa.requireModule(_this.config.src.url);
	            _this.windowShow = true;

	        },
	        closeWindowFn:function(){
	            var _this = this;
	            _this.windowShow = false;

	        },
	    },
	    ready: function () {
	    }
	});






/***/ },

/***/ 441:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .windows-component-box{\r\n\r\n    }\r\n    .windows{\r\n        position: fixed;\r\n        top:0;\r\n        left:0;\r\n        height: -webkit-calc(100% - 64px);\r\n        padding-bottom: 64px;\r\n        width: 100%;\r\n        background: #fff;\r\n        z-index: 2;\r\n        overflow: hidden;\r\n        overflow-y: auto;\r\n    }\r\n\r\n</style>\r\n<div class=\"windows-component-box\">\r\n    <div class=\"weui_cells weui_cells_access\">\r\n        <div class=\"weui_cell\" @click=\"openWindowFn\">\r\n            <div class=\"weui_cell_hd\">\r\n                <label class=\"weui_label\">{{label}}</label>\r\n            </div>\r\n            <div class=\"weui_cell_bd weui_cell_primary\"></div>\r\n            <div class=\"weui_cell_ft\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"windows\" v-show=\"windowShow\">\r\n        <component :is=\"currentWindow\"></component>\r\n        <div class=\"weui_footer\" style=\"position: fixed;\">\r\n            <div class=\"weui_footer_inner\">\r\n                <a href=\"javascript:;\" class=\"weui_btn weui_btn_primary\" @click=\"closeWindowFn\">返回</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }

/******/ });