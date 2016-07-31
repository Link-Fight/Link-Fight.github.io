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

	module.exports = __webpack_require__(466);


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

/***/ }

/******/ });