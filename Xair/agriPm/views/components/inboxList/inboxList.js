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

	module.exports = __webpack_require__(462);


/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

	var inboxListComponent = Vue.extend(
	    {
	        template: __webpack_require__(463),
	        props: {
	            datas: {
	                type: Array,
	                require: true,
	            },
	            displayType: {
	                type: String,
	                default: "simple"
	            },
	            mapStatus: {
	                type: Object,
	                default: function () {
	                    return {};
	                }
	            },
	            paging: {
	                type: Object,
	                default: function () {
	                    return {
	                        status: false,
	                        text: "点击加载更多~!",
	                    };
	                }
	            },
	        },
	        computed: {

	        },
	        data: function () {
	            return {
	            }
	        },
	        filters: {
	            getImageStr: function (obj) {
	                if (obj["backgroundImage"]) {
	                    // console.log(JSON.stringify(obj));
	                    if (!obj["backgroundImage"]) obj["backgroundImage"] = "images/default_person.png";
	                    obj["backgroundImage"] = "url(" + obj["backgroundImage"] + ")";
	                    obj["backgroundImage"];
	                }
	                // console.log(obj);
	                return obj;
	            },
	            getMapStatus: function (val) {
	                if (!!this.mapStatus[val]) {
	                    return this.mapStatus[val];
	                }

	                return val;
	            }
	        },

	        ready: function () {
	            // console.log(JSON.stringify(this.list))
	        },
	        methods: {
	            dispathEventAndClose: function (event,data) {
	                console.log("dispathEventAndClose"+event);
	                this.$dispatch(event,data);
	            },
	            pagingClick: function () {
	                console.log("pagingClick" + this.datas.length);
	                this.$dispatch('inboxList-paging', this.datas.length);
	            },
	            gotoDetailEvent: function (app_uid) {
	                this.$dispatch('gotoDetailEvent', { app_uid: app_uid });
	            },
	            dispathEvent: function (event, item) {
	                console.log(event + "@" + JSON.stringify(item));
	                this.$dispatch(event, item);
	            }

	        }
	    }
	);

	module.exports = {
	    inboxListComponent: inboxListComponent
	}

/***/ },

/***/ 463:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .inbox_wrap {\r\n        padding: 0 8px;\r\n        font-size: 14px;\r\n        background-color: #fff;\r\n        color: rgb(102, 102, 102);\r\n        margin-bottom: 10px;\r\n        border-top: 1px solid #cdcdcd;\r\n        border-bottom: 1px solid #cdcdcd;\r\n        padding-bottom: 10px;\r\n    }\r\n    \r\n    .inbox_wrap .img {\r\n        /*background-position: center center;*/\r\n        background-image: url(\"images/default_person.png\");\r\n        background-size: cover;\r\n        float: left;\r\n        height: 36px;\r\n        width: 36px;\r\n        margin-right: 10px;\r\n    }\r\n    \r\n    .inbox_wrap.draft p,\r\n    .inbox_wrap.participated p,\r\n    .inbox_wrap.simple p {\r\n        line-height: 38px;\r\n        color: #999;\r\n    }\r\n    \r\n    .inbox_wrap .right_txt {\r\n        float: right;\r\n    }\r\n    \r\n    .inbox_wrap .head {\r\n        color: #6f6f6f;\r\n        margin-top: 10px;\r\n    }\r\n    \r\n    .inbox_wrap.draft .tip,\r\n    .inbox_wrap.participated .tip,\r\n    .inbox_wrap.simple .tip {\r\n        line-height: 20px;\r\n    }\r\n    \r\n    .inbox_wrap b {\r\n        font-weight: 800;\r\n        color: #323232;\r\n    }\r\n    \r\n    .inbox_wrap .head {\r\n        margin-top: 0;\r\n        min-height: 36px;\r\n        padding: 10px 0;\r\n        border-bottom: 1px #e1e5e2 solid;\r\n    }\r\n    \r\n    .inbox_wrap .head p {\r\n        line-height: 36px;        \r\n        color: #606060;\r\n        vertical-align: middle;\r\n    }\r\n    \r\n    .paging {\r\n        background-color: #fff;\r\n        font-size: 14px;\r\n        line-height: 38px;\r\n        text-align: center;\r\n        margin-bottom: 10px;\r\n        color: #999;\r\n        border-top: 1px solid #cdcdcd;\r\n        border-bottom: 1px solid #cfcfcf;\r\n    }\r\n    \r\n    .fade-transition {\r\n        transition: all .5s ease;\r\n        position: relative;\r\n        left: 0;\r\n    }\r\n    \r\n    .fade-enter {\r\n        position: relative;\r\n        left: -100%;\r\n    }\r\n    \r\n    .fade-leave {\r\n        position: relative;\r\n        left: 100%;\r\n        opacity: 0;\r\n    }\r\n</style>\r\n<template v-for=\"inbox of datas\" v-if=\"displayType=='simple'||displayType=='participated'||displayType=='draft'\">\r\n    <div class=\"inbox_wrap\" :class=\"displayType\" transition=\"fade\" @click=\"gotoDetailEvent(inbox.app_uid)\">\r\n        <div class=\"head\">\r\n            <div class=\"img\" v-bind:style=\"{backgroundImage : inbox.previous_usr_photo_path  }|getImageStr\"></div>\r\n            <!--{{color}}-->\r\n            <span class=\"right_txt\">#{{inbox.app_number}}</span>\r\n            <p>{{inbox.previous_usr_name}}</p>\r\n        </div>\r\n\r\n        <p> <b>{{inbox.app_pro_title}}</b> - {{inbox.app_tas_title}}</p>\r\n        <template v-if=\"displayType=='simple'\">\r\n            <p class=\"tip\"> <span>{{inbox.app_update_date}}</span> <span class=\"right_txt\" >\r\n                <i v-if=\"inbox.del_init_date==null\" class=\"iconfont icon-zhanneixin\"  style='color:#df9800'></i>\r\n                <i v-else  class=\"iconfont icon-xinfengdakai\"></i>\r\n                </span></p>\r\n        </template>\r\n        <template v-if=\"displayType=='participated'\">\r\n            <p class=\"tip\"> <span>{{inbox.app_update_date}}</span> <span class=\"right_txt\">{{inbox.app_status|getMapStatus}}</span></p>\r\n        </template>\r\n        <template v-if=\"displayType=='draft'\">\r\n            <p class=\"tip\"> <span>{{inbox.app_update_date}}</span> <span class=\"right_txt\" style='color:#3299ff' @click.stop=\"dispathEventAndClose('inboxlist-delete',inbox)\">删除</span></p>\r\n        </template>\r\n    </div>\r\n</template>\r\n<template v-if=\"paging.status\">\r\n    <div class=\"paging\">\r\n        <p @click=\"pagingClick\"> {{paging.text}} </p>\r\n    </div>\r\n</template>\r\n\r\n<template v-for=\"inbox of list\" v-if=\"displayType=='complex'\">\r\n    <div class=\"inbox_wrap\" :class=\"displayType\">\r\n        <img v-bind:src=\"inbox.img\">\r\n        <span class=\"right_txt\">{{inbox.indexId}}</span>\r\n        <div class=\"head\">\r\n            <p>{{inbox.operator}} </p>\r\n        </div>\r\n        <hr>\r\n        <p v-for='dataset of inbox.dataSet'>\r\n            {{dataset.text}}：{{dataset.value}}\r\n        </p>\r\n        <hr>\r\n        <p> <b>{{inbox.type}}</b> - {{inbox.typeAction}}</p>\r\n        <p class=\"tip\"> <span>{{inbox.dataTime}}</span> <span class=\"right_txt\">{{inbox.caseState}}</span></p>\r\n    </div>\r\n</template>";

/***/ }

/******/ });