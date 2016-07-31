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

	module.exports = __webpack_require__(504);


/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	var filterComponent = Vue.extend({
	    template:__webpack_require__(457),
	    props:{
	        filterList:{
	            type:Array,
	            default:function(){
	                return[{
	                    'pro_uid':'',
	                    'app_pro_title': '',
	                    'num': ''
	                }]
	            }
	        }

	    },
	    data:function(){
	        return{
	            show:false,
	            currentText:'',
	            currentUid:'',
	            currentIndex:''
	        }

	    },
	    watch:{
	        'filterList':{
	            handler:function(newVal,oldVal){
	                var obj = newVal.filter(function (item) {return item.pro_uid == 0});
	                console.info(JSON.stringify(obj));
	                this.filterEvent(obj[0])
	            },
	            deep:true
	            
	        }
	    },
	    methods:{
	        filterEvent:function(item){
	            this.show = false;
	            this.currentText = item.app_pro_title;
	            this.currentIndex = item.num;
	            this.currentUid = item.pro_uid;
	            this.$dispatch('filterEvent',{pro_uid:item.pro_uid})
	        }
	        
	    },
	    ready:function(){
	/*
	        var obj = this.filterList.filter(function (item) {return item.pro_uid == 0});
	        this.filterEvent(obj[0])
	*/
	    }
	});

	module.exports ={
	    filterComponent:filterComponent
	}


/***/ },

/***/ 457:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .filter-title {\r\n        height: 28px;\r\n        line-height: 28px;\r\n        padding: 10px 0;\r\n        text-align: center;\r\n        position: relative;\r\n        background-color: #fff;\r\n        z-index: 2;\r\n    }\r\n    \r\n    .filter-title:after {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: -1px;\r\n        width: 100%;\r\n        height: 1px;\r\n        border-top: 1px solid #cdcdcd;\r\n        color: #cdcdcd;\r\n        -webkit-transform-origin: 0 0;\r\n        transform-origin: 0 0;\r\n    }\r\n    \r\n    .filter-list {\r\n        position: fixed;\r\n        left: 0;\r\n        top: 0;\r\n        -webkit-transform: translate(0, -100%);\r\n        transform: translate(0, -100%);\r\n        -webkit-backface-visibility: hidden;\r\n        backface-visibility: hidden;\r\n        z-index: 2;\r\n        width: 100%;\r\n        background-color: #fff;\r\n        -webkit-transition: -webkit-transform .5s;\r\n        transition: -webkit-transform .5s;\r\n        transition: transform .5s;\r\n        transition: transform .5s, -webkit-transform .5s;\r\n    }\r\n    \r\n    .filter-list-toggle {\r\n        -webkit-transform: translate(0, 48px);\r\n        transform: translate(0, 48px);\r\n    }\r\n    \r\n    .filter_cell {\r\n        position: relative;\r\n        height: 28px;\r\n        line-height: 28px;\r\n        padding: 10px 0;\r\n        text-align: center;\r\n    }\r\n    \r\n    .filter_cell:before {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        border-top: 1px solid #D9D9D9;\r\n        color: #D9D9D9;\r\n        -webkit-transform-origin: 0 0;\r\n        transform-origin: 0 0;\r\n        -webkit-transform: scaleY(0.5);\r\n        transform: scaleY(0.5);\r\n    }\r\n    \r\n    .filter_cell:active {\r\n        background-color: #ECECEC;\r\n    }\r\n</style>\r\n<div class=\"global-mask\" v-show=\"!!filterList.length && filterList[0].app_pro_title != ''\">\r\n    <div class=\"global_mask_transition\" :class=\"{'global_fade_toggle':show}\" @click=\"show=false\"></div>\r\n    <div class=\"filter-box\">\r\n        <div class=\"filter-title\" @click=\"show = !show\">\r\n            <template v-if=\"!!currentIndex||currentIndex=='0'\">\r\n                {{currentText}}({{currentIndex}})\r\n            </template>\r\n            <template v-else>\r\n                {{currentText}}\r\n            </template>\r\n            <i class=\"iconfont\" :class=\"{'icon-xiangxia':!show,'icon-xiangxia-copy':show}\" style=\"display:inline-block;width:16px;height:16px;\"></i>\r\n        </div>\r\n        <div class=\"filter-list\" :class=\"{'filter-list-toggle':show}\">\r\n            <div v-for=\"item in filterList\" class=\"filter_cell\" @click=\"filterEvent(item)\">\r\n                <template v-if=\"!!item.num||item.num=='0'\">\r\n                    {{item.app_pro_title}}({{item.num}})\r\n                </template>\r\n                <template v-else>\r\n                    {{item.app_pro_title}}\r\n                </template>\r\n                <i class=\"iconfont icon-iconfontgouxuan global-color-green\" v-if=\"item.pro_uid == currentUid\"></i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

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

/***/ },

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

	var inbox_api =  true ? __webpack_require__(496) : require("apis/inbox");
	module.exports = {
	    getInboxList: function (data) {
	        var def = $.Deferred();
	        def = inbox_api.getInboxList(data);
	        return def;
	    },
	    draft_list: function (data) {
	        var def = $.Deferred();
	        def = inbox_api.draft_list(data);
	        return def;
	    },
	    participated_list: function (data) {
	        var def = $.Deferred();
	        def = inbox_api.participated_list(data);
	        return def;
	    },
	    participated_detail: function (data) {
	        var def = $.Deferred();
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else
	            def = inbox_api.participated_detail(data);
	        return def;
	    },
	    delete_case: function (data) {
	        var def = $.Deferred();
	        console.log(JSON.stringify(data));
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else
	            def = inbox_api.delete_case(data);
	        return def;
	    }
	}

/***/ },

/***/ 496:
/***/ function(module, exports) {

	module.exports = {
	    getInboxList: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "total": [
	                    {
	                        "pro_uid": "",
	                        "app_pro_title": "全部",
	                        "num": 3
	                    },
	                    {
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_pro_title": "合同审核",
	                        "num": 2
	                    },
	                    {
	                        "pro_uid": "404907226576a4c21afecf0085860988",
	                        "app_pro_title": "合同审核改",
	                        "num": 1
	                    }
	                ],
	                "data": [
	                    {
	                        "app_uid": "723602294577382de17aee4064715054",
	                        "app_number": "13",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-29 08:13:28",
	                        "del_init_date": null,
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "审核合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "",
	                    },
	                    {
	                        "app_uid": "979766845576b8e63ed7c36074379637",
	                        "app_number": "3",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-29 08:40:52",
	                        "del_init_date": null,
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "审核合同",
	                        "previous_usr_name": "Polaris Zheng",
	                        "previous_usr_photo_path": "",
	                    },
	                    {
	                        "app_uid": "817779541576a7ea3705628093580342",
	                        "app_number": "2",
	                        "pro_uid": "404907226576a4c21afecf0085860988",
	                        "app_update_date": "2016-06-27 07:58:22",
	                        "del_init_date": "2016-06-23 10:45:14",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "修改合同",
	                        "previous_usr_name": "Polaris Zheng",
	                        "previous_usr_photo_path": "",
	                    }
	                ]
	            });
	        }, 2000);
	        return def;
	    },
	    draft_list: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "total": [
	                    {
	                        "pro_uid": 0,
	                        "app_pro_title": "全部",
	                        "num": 11
	                    },
	                    {
	                        "pro_uid": "23590087857721cec16cdb9001203154",
	                        "app_pro_title": "作业需求",
	                        "num": 1
	                    },
	                    {
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_pro_title": "合同审核",
	                        "num": 0
	                    }
	                ],
	                "data": [
	                    {
	                        "app_uid": "3595275875774cd1f8bb1e7031243896",
	                        "app_number": "18",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-30 15:41:20",
	                        "del_init_date": "2016-06-30 15:41:19",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "1541442875774b51258a0a6088012663",
	                        "app_number": "16",
	                        "pro_uid": "23590087857721cec16cdb9001203154",
	                        "app_update_date": "2016-06-30 13:58:45",
	                        "del_init_date": "2016-06-30 13:58:42",
	                        "app_pro_title": "作业需求",
	                        "app_tas_title": "创建作业需求",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "150329589577230215a00f0088795720",
	                        "app_number": "12",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 09:36:16",
	                        "del_init_date": "2016-06-28 08:06:57",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "3359680175771d468ddd6a0005471282",
	                        "app_number": "11",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:35:46",
	                        "del_init_date": "2016-06-28 01:35:37",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "8545532225771d3fb583a89095933900",
	                        "app_number": "10",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:33:54",
	                        "del_init_date": "2016-06-28 01:33:47",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "3676452635771d3cfe24b46040147081",
	                        "app_number": "9",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:33:12",
	                        "del_init_date": "2016-06-28 01:33:04",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "2212524415771d347aed4d2073866424",
	                        "app_number": "8",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:30:57",
	                        "del_init_date": "2016-06-28 01:30:48",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "8275451665771d312d6dd73008810289",
	                        "app_number": "7",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:30:14",
	                        "del_init_date": "2016-06-28 01:29:55",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "79815673857708fa33a69d5081541160",
	                        "app_number": "6",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-27 02:29:56",
	                        "del_init_date": "2016-06-27 02:29:55",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "803283691576bbe1dafac23071943239",
	                        "app_number": "5",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-23 11:11:11",
	                        "del_init_date": "2016-06-23 10:46:54",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "901458740576ba7bf1a5ea1030880650",
	                        "app_number": "4",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-23 09:11:27",
	                        "del_init_date": "2016-06-23 09:11:27",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    }
	                ]
	            });
	        }, 2000);
	        return def;
	    },
	    participated_list: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve([
	                {
	                    "app_uid": "3595275875774cd1f8bb1e7031243896",
	                    "app_number": "18",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-30 15:41:20",
	                    "del_init_date": "2016-06-30 15:41:19",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "1541442875774b51258a0a6088012663",
	                    "app_number": "16",
	                    "pro_uid": "23590087857721cec16cdb9001203154",
	                    "app_update_date": "2016-06-30 13:58:45",
	                    "del_init_date": "2016-06-30 13:58:42",
	                    "app_pro_title": "作业需求",
	                    "app_tas_title": "创建作业需求",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "150329589577230215a00f0088795720",
	                    "app_number": "12",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 09:36:16",
	                    "del_init_date": "2016-06-28 08:06:57",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "3359680175771d468ddd6a0005471282",
	                    "app_number": "11",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:35:46",
	                    "del_init_date": "2016-06-28 01:35:37",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "8545532225771d3fb583a89095933900",
	                    "app_number": "10",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:33:54",
	                    "del_init_date": "2016-06-28 01:33:47",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "3676452635771d3cfe24b46040147081",
	                    "app_number": "9",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:33:12",
	                    "del_init_date": "2016-06-28 01:33:04",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "2212524415771d347aed4d2073866424",
	                    "app_number": "8",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:30:57",
	                    "del_init_date": "2016-06-28 01:30:48",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "8275451665771d312d6dd73008810289",
	                    "app_number": "7",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:30:14",
	                    "del_init_date": "2016-06-28 01:29:55",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "79815673857708fa33a69d5081541160",
	                    "app_number": "6",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-27 02:29:56",
	                    "del_init_date": "2016-06-27 02:29:55",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "803283691576bbe1dafac23071943239",
	                    "app_number": "5",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-23 11:11:11",
	                    "del_init_date": "2016-06-23 10:46:54",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "901458740576ba7bf1a5ea1030880650",
	                    "app_number": "4",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-23 09:11:27",
	                    "del_init_date": "2016-06-23 09:11:27",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                }
	            ]
	            );
	        }, 2000);
	        return def;
	    },
	    participated_detail: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "pro_name": "合同审核",
	                "app_name": "#17",
	                "app_init_usr_username": "Administrator admin",
	                "app_status": "TO_DO",
	                "app_create_date": "2016-06-30 15:25:54",
	                "app_update_date": "2016-07-13 19:49:30",
	                "history": [
	                    {
	                        "tas_title": "审核合同",
	                        "status": "TASK_COMPLETED",
	                        "delegations": [
	                            {
	                                "del_index": "#2",
	                                "del_finish_date": "2016-07-13 19:44:51",
	                                "usr_name": "Administrator admin",
	                                "avatar_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                            },
	                            {
	                                "del_index": "#4",
	                                "del_finish_date": "2016-07-13 19:49:29",
	                                "usr_name": "Administrator admin",
	                                "avatar_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                            }
	                        ]
	                    },
	                    {
	                        "tas_title": "修改合同",
	                        "status": "TASK_IN_PROGRESS",
	                        "delegations": [
	                            {
	                                "del_index": "#3",
	                                "del_finish_date": "2016-07-13 19:47:04",
	                                "usr_name": "Administrator admin",
	                                "avatar_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                            },
	                            {
	                                "del_index": "#5",
	                                "del_finish_date": "Not finished",
	                                "usr_name": "li si",
	                                "avatar_url": ""
	                            }
	                        ]
	                    },
	                    {
	                        "tas_title": "新增合同",
	                        "status": "TASK_COMPLETED",
	                        "delegations": [
	                            {
	                                "del_index": "#1",
	                                "del_finish_date": "2016-06-30 17:00:37",
	                                "usr_name": "Administrator admin",
	                                "avatar_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                            }
	                        ]
	                    }
	                ]
	            });
	        }, 2000);
	        return def;
	    },
	}


	//  

/***/ },

/***/ 504:
/***/ function(module, exports, __webpack_require__) {

	var inboxController = __webpack_require__(495);
	var inboxListComponent = __webpack_require__(462);
	var filterComponent = __webpack_require__(456);
	__webpack_require__(462);
	Xa.defineModule("/pm/inbox/inbox", function () {
	    return {
	        template: __webpack_require__(505),
	        data: function () {
	            var _this = this;
	            return {
	                dialogShow: false,
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
	        methods: {},
	        events: {
	            "filterEvent": function (data) {
	                var filterKey = data.pro_uid;
	                if (!!filterKey) {
	                    this.inboxItems = this.inboxItem.data.filter(function (item) {
	                        return item.pro_uid == filterKey;
	                    })
	                } else {
	                    this.inboxItems = this.inboxItem.data;
	                }
	            },
	            'gotoDetailEvent':function(obj){
	/*
	                Router.go("/pm/getForm?app_uid="+obj.app_uid);
	*/
	                Router.go("/pm/createForm?app_uid="+obj.app_uid+"&formType=getForm");

	            }
	        },
	        route: {
	            data: function (transition) {
	                var _this = this;
	                inboxController.getInboxList({}).done(function (data) {
	                    _this.inboxItems = data.data;
	                    transition.next({
	                        inboxItem: data
	                    });
	                }).fail(function (data) {
	                    alert(data.msg);
	                }).always(function (data) {
	                    _this.isLoading = false;
	                });
	            }
	        },
	        filters: {},
	        ready: function () {
	            this.$root.seoPageInfo.title = "待办事项";
	        },
	        components: {
	            tabFilter: filterComponent.filterComponent,
	            inboxlistComponent: inboxListComponent.inboxListComponent
	        }
	    }

	})




/***/ },

/***/ 505:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .inbox_Area {\r\n        height: -webkit-calc(100% - 58px);\r\n        overflow: hidden;\r\n        overflow-y: auto;\r\n    }\r\n</style>\r\n<div :class=\"{'global-loading':isLoading,'global-no-data':!isLoading && !inboxItems.length}\">\r\n    <tab-filter :filter-List=\"inboxItem.total\"></tab-filter>\r\n    <div class=\"inbox_Area\">\r\n        <inboxlist-component :datas.sync=\"inboxItems\" :display-Type=\"displayType\"></inboxlist-component>\r\n    </div>\r\n    <dialog v-show=\"dialogShow\" type=\"alert\" :title=\"dialogTitle\" @weui-dialog-confirm=\"dislogShow = !dialogShow\">\r\n        <div>{{dialogContent}}</div>\r\n    </dialog>\r\n</div>";

/***/ }

/******/ });