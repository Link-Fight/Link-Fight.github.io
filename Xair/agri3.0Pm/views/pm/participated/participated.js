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

	module.exports = __webpack_require__(506);


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

/***/ 466:
/***/ function(module, exports, __webpack_require__) {

	var searchBarComponent = Vue.extend(
	    {
	        template: __webpack_require__(467),
	        data: function () {
	            return {
	                config: {
	                    isShow: false,
	                    isFocusing: false,
	                    searchVal: "",
	                },
	                filterData: [//分类的自定义筛选
	                    {
	                        key: "classify",
	                        type: "select",//单选
	                        title: "分类",//显示的文本
	                        items: [
	                            { text: "全部分类", val: "0" },
	                            { text: "我负责的", val: "1" },
	                        ]
	                    },
	                    {
	                        key: "schedule",
	                        type: "multiselect",//多选
	                        title: "进度",//显示的文本
	                        items: [
	                            { text: "全部进度", val: 0 },
	                            { text: "未完成", val: 1 },
	                            { text: "已完成", val: 2 },
	                        ]
	                    },
	                ],
	                filterResult: {},//选择的结果集
	                filterConfig: {
	                    currItem: {},//当前展开下拉的筛选
	                },
	                currSelect: [],//当前选择项
	            }
	        },
	        props: {

	        },
	        methods: {
	            /**搜索 点击  “搜索”
	             * @param  {} type
	             */
	            'customSearchEvent': function (type) {
	                console.log("customSearchEvent:" + this.config.searchVal + "@" + JSON.stringify(arguments));
	            },
	            /**搜索 点击 "取消"
	             */
	            'searchCancelFn': function () {
	                console.log("searchCancelFn:" + JSON.stringify(arguments));
	                this.config.isFocusing = false;
	                this.searchVal = "";
	            },
	            'searchInputFn': function () {
	                this.config.isFocusing = true;
	            },
	            'searchClearFn': function () {
	                this.config.searchVal = "";
	            },
	            /**根据点选不同筛选主题 展开显示不同的筛选条件
	             * @param  {} item
	             */
	            "clickFilter": function (item) {
	                // console.log(JSON.stringify(arguments));
	                if (Xa.Tools.isEmpty(this.filterConfig.currItem)) {//当前筛选为空对象 着是展开
	                    this.filterConfig.currItem = item;
	                    if (!this.filterResult[this.filterConfig.currItem.key]) {
	                        this.$set("filterResult." + this.filterConfig.currItem.key, {});
	                    }
	                } else {
	                    this.filterConfig.currItem = {};
	                }
	                this.currSelect = this.filterResult[this.filterConfig.currItem.key];
	                if (!Array.isArray(this.currSelect)) {
	                    this.currSelect = [];
	                    this.currSelect.push(this.filterResult[this.filterConfig.currItem.key]);
	                }
	            },
	            /**在筛选下拉区域进行点选的触发事件
	             * 目前区分为单选和多选
	             * @param  {} item
	             * @param  {} action
	             */
	            "clickItem": function (item, action) {
	                if (!!item) {
	                    if (action == "select") {//单选的选择一次就结束了
	                        this.filterResult[this.filterConfig.currItem.key] = item;
	                        this.filterConfig.currItem = {};
	                        this.currSelect = [];
	                    }
	                    else if (action == "multiselect") {
	                        var list = this.filterResult[this.filterConfig.currItem.key];
	                        if (!Array.isArray(list)) {//初始化下 多选时候 需要使用数组
	                            this.filterResult[this.filterConfig.currItem.key] = [];
	                        }
	                        //尝试删除  如果成功 说明要进行的就是删除操作  如果失败 说明要进行的是添加操作
	                        var len = this.filterResult[this.filterConfig.currItem.key].length;
	                        this.filterResult[this.filterConfig.currItem.key].$remove(item);
	                        if (len == this.filterResult[this.filterConfig.currItem.key].length) {
	                            this.filterResult[this.filterConfig.currItem.key].push(item);
	                        }
	                        this.currSelect = this.filterResult[this.filterConfig.currItem.key];
	                    }
	                } else {//item === null 时  说明点选了空白的遮罩区域 此时让展开的下拉的筛选区域隐藏
	                    this.filterConfig.currItem = {};
	                    this.currSelect = [];
	                }

	            },

	        },
	        filters: {
	            "isEmptyObj": function (params) {
	                return Xa.Tools.isEmpty(params);
	            },

	            /** 主要是多选情况下 判断显示已经选择的条目
	             * @param  {} cls
	             * @param  {} mmItem
	             * @param  {} filterResult
	             */
	            "eventShow": function (cls, mmItem, type) {
	                // console.log(JSON.stringify(arguments));
	                if (type == 'filterItem') {
	                    return this.currSelect.indexOf(mmItem) > -1 ? cls : "";
	                } else if (type == 'filter') {
	                    console.count(JSON.stringify(arguments));
	                    var result = this.filterResult[mmItem.key];
	                    var flag = false;
	                    if (!!result) {
	                        if (Array.isArray(result)) {
	                            flag = !result.length == 0;
	                        } else {
	                            flag = !Xa.Tools.isEmpty(result);
	                        }
	                    }
	                    if(flag){
	                        cls.active = true;
	                    }
	                    return cls;
	                } else {
	                    return "";
	                }

	            },
	            "titleShow": function (def, item) {
	                // console.info(JSON.stringify(arguments));
	                var result = this.filterResult[item.key];
	                if (!!result) {
	                    if (item.type == "select") {
	                        return !!result.text ? result.text : def;
	                    }
	                }
	                return def;

	            }
	        }
	    }
	);

	module.exports = {
	    searchBarComponent: searchBarComponent
	}

/***/ },

/***/ 467:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    #search {\r\n        position: relative;\r\n        transition: all .5s ease;\r\n    }\r\n    \r\n    .weui_search_inner {\r\n        height: inherit;\r\n    }\r\n    \r\n    #search .filter-div {\r\n        position: fixed;\r\n        left: 0;\r\n        top: 44px;\r\n        width: 100%;\r\n        background: #fff;\r\n    }\r\n    \r\n    .filter-div {\r\n        font-size: 0;\r\n        width: 100%;\r\n        text-align: center;\r\n    }\r\n    \r\n    .filter-div a {\r\n        display: inline-block;\r\n        line-height: 30px;\r\n        vertical-align: top;\r\n        font-size: 12px;\r\n        width: 50%;\r\n        background-color: #fff;\r\n        color: #8b8b8b;\r\n        box-sizing: border-box;\r\n    }\r\n    \r\n    .block {\r\n        position: relative;\r\n        color:#8b8b8b;\r\n    }\r\n    \r\n    .block:before {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        top: 0;\r\n        width: 1px;\r\n        height: 100%;\r\n        color: #d9d9d9;\r\n        -webkit-transform: scaleX(.5);\r\n        transform: scaleX(.5);\r\n        border-left: 1px solid #d9d9d9;\r\n    }\r\n    \r\n    .block:after {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        color: #d9d9d9;\r\n        -webkit-transform: scaleY(.5);\r\n        transform: scaleY(.5);\r\n        border-bottom: 1px solid #d9d9d9;\r\n    }\r\n    \r\n    .filter-div a.upDiv {\r\n        color: green;\r\n    }\r\n    \r\n    .upDiv i {\r\n        transition: all .5s ease;\r\n        transform: rotate(180deg);\r\n        color: green;\r\n    }\r\n    \r\n    .fade-transition {\r\n        transition: all .5s ease;\r\n        position: relative;\r\n        left: 0;\r\n    }\r\n    \r\n    .fade-enter {\r\n        position: relative;\r\n        left: -100%;\r\n    }\r\n    \r\n    .fade-leave {\r\n        position: relative;\r\n        left: 100%;\r\n        opacity: 0;\r\n        display: none;\r\n    }\r\n    \r\n    .fadeDown-transition {\r\n        transition: all .5s ease;\r\n        position: relative;\r\n        left: 0;\r\n        top: 0;\r\n    }\r\n    \r\n    .fadeDown-enter {\r\n        position: relative;\r\n        top: -100px;\r\n    }\r\n    \r\n    .fadeDown-leave {\r\n        position: relative;\r\n        top: 100px;\r\n        opacity: 0;\r\n        display: none;\r\n    }\r\n    \r\n    #search.mask {\r\n        position: fixed;\r\n        top: 0;\r\n        left: 0;\r\n        height: 100%;\r\n        width: 100%;\r\n        background-color: rgba(0, 0, 0, 0.6);\r\n    }\r\n    \r\n    li.active {\r\n        color: green;\r\n    }\r\n    \r\n    li.active i.icon-iconfontgouxuan {\r\n        color: green;\r\n        display:block;\r\n    }\r\n    \r\n     li i.icon-iconfontgouxuan {\r\n        display: none;\r\n    }\r\n    a.active{\r\n        color:green;\r\n    }\r\n  \r\n</style>\r\n<div id=\"search\" :class=\"{'mask':!!filterConfig.currItem.key}\" @click.self=\"clickItem(null)\">\r\n    <div class=\"weui_search_bar\" :class=\"{'weui_search_focusing':config.isFocusing}\" style=\"position: fixed;top:0;left: 0;width:100%;z-index: 3\">\r\n        <div class=\"weui_search_outer\">\r\n            <div class=\"weui_search_inner\">\r\n                <i class=\"weui_icon_search\" style=\"top:7px\"></i>\r\n                <input type=\"search\" @keyup.enter=\"customSearchEvent('search')\" v-model=\"config.searchVal\" class=\"weui_search_input\" id=\"search_input\"\r\n                    placeholder=\"输入搜索内容\" />\r\n                <a href=\"javascript:\" v-show=\"!!config.searchVal\" class=\"weui_icon_clear\" @click=\"searchClearFn\" style=\"top:7px\"></a>\r\n            </div>\r\n            <label for=\"search_input\" @click=\"searchInputFn\" class=\"weui_search_text\" id=\"search_text\">\r\n                <i class=\"weui_icon_search\"></i>\r\n                <span>搜索</span>\r\n            </label>\r\n        </div>\r\n        <a href=\"javascript:\" v-show=\"!!config.searchVal\" @click=\"customSearchEvent('search')\" class=\"weui_search_cancel\">搜索</a>\r\n        <a href=\"javascript:\" v-show=\"!config.searchVal\" @click=\"searchCancelFn\" class=\"weui_search_cancel\" id=\"search_cancel\">取消</a>\r\n    </div>\r\n    <div class=\"filter-div\">\r\n\r\n        <a class=\"block\" v-for=\"(index,item) in filterData\" @click='clickFilter(item,\"clickFilter\")' :class=\"{upDiv:item.key==filterConfig.currItem.key} | eventShow item 'filter' \" \r\n        >\r\n           {{item.title | titleShow item }}   \r\n           <i class=\"iconfont icon-xiala\" style='font-size: 12px;float:right;margin-right:10px;'  ></i>\r\n       </a>\r\n        <template v-if='filterConfig.currItem'>\r\n            <template v-if='filterConfig.currItem.type==\"select\" || filterConfig.currItem.type==\"multiselect\"' >\r\n                <ul style='font-size:12px'>\r\n                    <li transition=\"fade\" class='block' style='padding:10px 10px;text-align:left;position:relative' v-for='mmItem in filterConfig.currItem.items'\r\n                        @click='clickItem(mmItem,filterConfig.currItem.type)' :class=\"'active'|eventShow mmItem 'filterItem'\">\r\n                        {{mmItem.text}}\r\n                        <i class=\"iconfont icon-iconfontgouxuan\" style='position:absolute;right:10px;top:2px;'></i>\r\n                        \r\n                    </li>\r\n                </ul>\r\n                {{currSelect | json}}\r\n                {{filterResult | json}}\r\n            </template>\r\n        </template>\r\n    </div>\r\n</div>";

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

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

	var inboxController = __webpack_require__(495);
	var inboxListComponent = __webpack_require__(462);
	var searchBarComponent = __webpack_require__(466);
	// var filterComponent = require("views/components/filter/filter");
	__webpack_require__(462);
	Xa.defineModule("/pm/participated/participated", function () {
	    var config = {
	        displayType: "participated",
	        participatedAppStatus: {
	            "TO_DO": "待办",
	            "DRAFT": "草稿",
	            "PAUSED": "暂停",
	            "CANCELLED": "取消",
	            "COMPLETED": "完成",
	        },
	    };
	    return {
	        template: __webpack_require__(507),
	        data: function () {
	            var _this = this;
	            return {
	                dialogShow: false,
	                dialogTitle: '提示',
	                dialogContent: '',
	                isLoading: true,
	                inboxItem: {},
	                inboxItems: [],
	                displayType: config.displayType,
	                mPaging: false,
	                inboxlistpaging: {//传递给子组件的
	                    "status": false,//inboxlist上是否显示  加载更多
	                    "text": "查看更多",//上面要显示的文本
	                },
	                ajaxPaging: {
	                    p_index: 0,
	                    p_limit: 20,
	                    curPro_uid: 0,
	                },
	                msg: {
	                    type: "msg",
	                    msgShow: false,
	                    msgToastText: "233"
	                },
	                participatedAppStatus: config.participatedAppStatus,
	            }
	        },

	        created: function () {
	        },
	        watch: {},
	        methods: {
	            handPaging: function (msg) {
	                console.log(msg);
	            }
	        },
	        events: {
	            "filterEvent": function (data) {
	                var filterKey = data.pro_uid;
	                if (!!filterKey) {
	                    this.ajaxPaging.curPro_uid = filterKey;
	                    this.inboxItems = this.inboxItem.data.filter(function (item) {
	                        return item.pro_uid == filterKey;
	                    })
	                } else {
	                    this.ajaxPaging.curPro_uid = 0;
	                    this.inboxItems = this.inboxItem.data;
	                }
	                //检查能否 加载更多
	                if (this.ajaxPaging.curPro_uid == 0) {
	                    this.inboxlistpaging.status = this.mPaging;
	                } else {
	                    this.inboxlistpaging.status = false;
	                }
	            },
	            'gotoDetailEvent': function (obj) {
	                Router.go("/pm/participated_detail?app_uid=" + obj.app_uid);
	            },
	            'inboxList-paging': function (msg) {
	                var _this = this;
	                _this.msg.type = "loading";
	                _this.msg.msgToastText = "正在加载";
	                _this.msg.msgShow = true;
	                inboxController.participated_list({
	                    "p_index": _this.ajaxPaging.p_index,
	                    "p_limit": _this.ajaxPaging.p_limit,
	                    // "pro_uid": _this.ajaxPaging.curPro_uid
	                }).done(function (data) {
	                    // 合并新旧数据
	                    // 判断能否继续加载
	                    data.forEach(function (item) {
	                        _this.inboxItems.push(item);
	                    });
	                    if (data.length >= _this.ajaxPaging.p_limit) {
	                        this.mPaging = _this.inboxlistpaging.status = true;
	                    } else {
	                        this.mPaging = _this.inboxlistpaging.status = false;
	                    }
	                    _this.ajaxPaging.p_index++;
	                    _this.msg.type = "msg";
	                    if (data.length == 0) {
	                        _this.msg.msgToastText = "没有更多数据了！"
	                    } else {
	                        _this.msg.msgToastText = "加载了 " + data.length + " 条数据！"
	                    }
	                    console.log("成功加载" + data.length + "TOTAL:" + JSON.stringify(_this.inboxItem.total));
	                }).fail(function (data) {
	                    // _this.inboxlistpaging.status = false;
	                    alert(data.msg);
	                }).always(function () {
	                    setTimeout(function () {
	                        _this.msg.msgShow = false;
	                    }, 2000);
	                });
	            }
	        },
	        route: {
	            data: function (transition) {
	                var _this = this;
	                console.log("Router");
	                inboxController.participated_list({
	                    "p_index": _this.ajaxPaging.p_index,
	                    "p_limit": _this.ajaxPaging.p_limit,
	                }).done(function (data) {
	                    _this.inboxItems = data;
	                    if (data.length >= _this.ajaxPaging.p_limit) {
	                        _this.inboxlistpaging.status = true;
	                    }
	                    transition.next({
	                        inboxItem: data
	                    });
	                    _this.ajaxPaging.p_index++;
	                }).fail(function (data) {
	                    alert(data.msg);
	                }).always(function (data) {
	                    _this.isLoading = false;
	                });
	            }
	        },
	        filters: {},
	        ready: function () {
	            this.$root.seoPageInfo.title = "我参与的";
	        },
	        components: {
	            // tabFilter: filterComponent.filterComponent,
	            inboxlistComponent: inboxListComponent.inboxListComponent,
	            searchbarComponent: searchBarComponent.searchBarComponent,
	        }
	    }

	})




/***/ },

/***/ 507:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .inbox_Area {\r\n        padding-top: 11px;\r\n        overflow: hidden;\r\n        overflow-y: auto;\r\n    }\r\n    \r\n    .toast_msg .weui_toast {\r\n        position: fixed;\r\n        z-index: 3;\r\n        width: 100%;\r\n        min-height: 0;\r\n        top: 50%;\r\n        left: 0;\r\n        margin-left: 0;\r\n        background: none;\r\n        text-align: center;\r\n        border-radius: 5px;\r\n        color: #fff;\r\n    }\r\n    \r\n    .toast_msg .weui_toast .weui_toast_content {\r\n        display: inline-block;\r\n        margin: 0 0 15px;\r\n        padding: 10px;\r\n        border-radius: 5px;\r\n        background: rgba(40, 40, 40, .75);\r\n    }\r\n</style>\r\n\r\n<div :class=\"{'global-loading':isLoading,'global-no-data':!isLoading && !inboxItems.length}\">\r\n    <!--<tab-filter :filter-List=\"inboxItem.total\"></tab-filter>-->\r\n    <div class=\"inbox_Area\">\r\n        <inboxlist-component v-ref:inboxlist :datas.sync=\"inboxItems\" :display-Type=\"displayType\" :map-Status=\"participatedAppStatus\"\r\n            :paging=\"inboxlistpaging\"></inboxlist-component>\r\n    </div>\r\n</div>\r\n<dialog v-show=\"dialogShow\" type=\"alert\" :title=\"dialogTitle\" @weui-dialog-confirm=\"dislogShow = !dialogShow\">\r\n    <div>{{dialogContent}}</div>\r\n</dialog>\r\n<!--<searchbar-component></searchbar-component>-->\r\n<toast :type=\"msg.type\" v-show=\"msg.msgShow\">{{ msg.msgToastText }}</toast>";

/***/ }

/******/ });