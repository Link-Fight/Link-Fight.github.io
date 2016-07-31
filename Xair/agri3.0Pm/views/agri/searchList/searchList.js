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

	module.exports = __webpack_require__(454);


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

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	var modeContrlller = __webpack_require__(417);

	Xa.defineModule('/agri/searchList/searchList',
	    function () {
	        function controllerAction(config) {
	            if (!config.msg) {
	                config.msg = {};
	            }
	            if (!config.fn) {
	                config.fn = {};
	            }
	            var _this = this;
	            this.msg.type = "loading";
	            this.msg.msgToastText = !!config.msg.loading ? config.msg.loading() : "请求服务器...";
	            this.msg.msgShow = true;
	            modeContrlller[config.action](config.src, config.data).done(function (data) {
	                _this.msg.type = "";
	                _this.msg.msgToastText = !!config.msg.done ? config.msg.done.call(_this, data) : "数据加载成功";
	                _this.msg.duration = 1000;
	                config.fn.done && config.fn.done.call(_this, data);
	            }).fail(function (data) {
	                _this.msg.type = "msg";
	                _this.msg.msgToastText = !!config.msg.fail ? config.msg.fail.call(_this, data) : data.msg;
	                _this.msg.duration = 3000;
	                config.fn.fail && config.fn.fail.call(_this, data);
	            }).always(function (data) {
	                setTimeout(function () {
	                    _this.msg.msgShow = false;
	                }, _this.msg.duration);
	                config.fn.always && config.fn.always.call(_this, data);
	            });
	        }
	        return {
	            template: __webpack_require__(455),
	            data: function () {
	                return {
	                    msg: {
	                        type: "msg",
	                        msgShow: false,
	                        msgToastText: "",
	                        duration: "2000",
	                    },
	                    data: {
	                        src: "",
	                        keyword: "",
	                        page_index: "",
	                        page_size: "",
	                    },
	                    paging: {//传递给子组件的
	                        "status": false,//inboxlist上是否显示  加载更多
	                        "text": "查看更多",//上面要显示的文本
	                    },
	                    selectList: [],//选中的项
	                    dataList: [],
	                    dataBackList: [],//备份的
	                    isLoading: false,
	                    isFocusing: false,
	                    searchVal: '',
	                }
	            },
	            methods: {
	                // 加载更多
	                pagingClick: function () {
	                    console.log("pagingClick");
	                    var _this = this;
	                    var action = "getDropdownList";
	                    var data = {
	                        keyword: this.data.keyword,
	                        page_index: ++this.data.page_index,
	                        page_size: this.data.page_siz,
	                    };
	                    controllerAction.call(_this, {
	                        action: action,
	                        src: _this.data.src,
	                        data: data,
	                        fn: {
	                            done: function (data) {
	                                _this.dataList = data.items
	                                if (data.items.length == _this.data.page_siz) {
	                                    _this.paging.status = true;
	                                } else {
	                                    _this.paging.status = false;
	                                }
	                            }
	                        },
	                        msg: {
	                            loading: function () {
	                                return "正在加载数据";
	                            },
	                            done: function (data) {
	                                return "加载数据" + data.items.length + "条";
	                            }
	                        }
	                    });
	                },
	                searchCancelFn: function () {
	                    this.isFocusing = false;
	                    this.searchResultShow = false;
	                    this.searchVal = "";
	                    this.complexDropdownList = this.complexDropdownBackList;
	                    this.$dispatch("isSelectShow");
	                },
	                customSearchEvent: function (type) {
	                    var _this = this;
	                    var action = "getDropdownList";
	                    var data = {
	                        keyword: this.data.keyword = this.searchVal,
	                        page_index: this.data.page_index = 0,
	                        page_size: this.data.page_siz,
	                    };
	                    controllerAction.call(_this, {
	                        action: action,
	                        src: _this.data.src,
	                        data: data,
	                        fn: {
	                            done: function (data) {
	                                _this.dataList = data.items
	                                if (data.items.length == _this.data.page_siz) {
	                                    _this.paging.status = true;
	                                } else {
	                                    _this.paging.status = false;
	                                }
	                            }
	                        },
	                        msg: {
	                            loading: function () {
	                                return "正在加载数据";
	                            },
	                            done: function (data) {
	                                return "加载数据" + data.items.length + "条";
	                            }
	                        }
	                    });

	                },
	                searchClearFn: function () {
	                    this.searchResultShow = false;
	                    this.searchVal = "";
	                },
	                searchInputFn: function () {
	                    this.isFocusing = true;
	                },
	                clickItem: function (item) {
	                    Router.go(item.url);
	                },
	            },
	            events: {

	            },
	            filters: {

	            },
	            ready: function () {
	                this.$root.seoPageInfo.title = "作业需求";
	                var _this = this;

	            },
	            route: {
	                data: function (transition) {
	                    var _this = this;
	                    var action = "getDropdownList";
	                    this.data.src = this.$route.query.src;
	                    var data = {
	                        keyword: this.data.keyword = this.$route.query.keyword,
	                        page_index: this.data.page_index = this.$route.query.page_index,
	                        page_size: this.data.page_siz = this.$route.query.page_size,
	                    };
	                    console.info(this.data.src);
	                    controllerAction.call(_this, {
	                        action: action,
	                        src: _this.data.src,
	                        data: data,
	                        fn: {
	                            done: function (data) {
	                                !!data.doc_title && (this.$root.seoPageInfo.title = data.doc_title);
	                                transition.next({
	                                    dataList: data.items
	                                });
	                                if (data.items.length == _this.data.page_siz) {
	                                    _this.paging.status = true;
	                                }
	                            },
	                            fail: function (data) {
	                                console.log("fail")
	                                _this.$root.seoPageInfo.title = "本地测试数据";
	                                setTimeout(function () {
	                                    _this.dataList = [
	                                        {
	                                            "value": "fd68b7310efc6669709bc969ccd18014",
	                                            "title": "李保成",
	                                            "items": [
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                            ],
	                                            "url": '../detail?src=/wechat/report/contract/detail&params={"uid":"fd68b7310efc6669709bc969ccd18014"}'
	                                        },
	                                        {
	                                            "value": "2fd68b7310efc6669709bc969ccd18014",
	                                            "title": "李保成",
	                                            "items": [
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                            ],
	                                            "url": "agri/detail?src=/wechat/report/contract/detail&params={'uid':'fd68b7310efc6669709bc969ccd18014'}"
	                                        },
	                                        {
	                                            "value": "3fd68b7310efc6669709bc969ccd18014",
	                                            "title": "李保成",
	                                            "items": [
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                                {
	                                                    "key": "AA",
	                                                    "value": "BB"
	                                                },
	                                            ],
	                                            "url": "agri/detail?src=/wechat/report/contract/detail&params={'uid':'fd68b7310efc6669709bc969ccd18014'}"
	                                        },
	                                    ];
	                                }, 4000);
	                            }
	                        },
	                        msg: {
	                            loading: function () {
	                                return "正在加载数据";
	                            },
	                            done: function (data) {
	                                return "加载数据成功";
	                            }
	                        }
	                    });
	                }
	            },
	        }
	    });








/***/ },

/***/ 455:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .items-wrap {\r\n        background: #fff;\r\n        position: relative;\r\n        margin-bottom: 10;\r\n    }\r\n    \r\n    .items-wrap::after {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        border-bottom: 1px solid #D9D9D9;\r\n        color: #D9D9D9;\r\n        -webkit-transform-origin: 0 100%;\r\n        transform-origin: 0 100%;\r\n        -webkit-transform: scaleY(0.5);\r\n        transform: scaleY(0.5);\r\n    }\r\n    \r\n    .items-wrap .items {\r\n        padding-left: 15px;\r\n    }\r\n    \r\n    .block {\r\n        position: relative;\r\n    }\r\n    \r\n    .block:before {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        color: #d9d9d9;\r\n        -webkit-transform: scaleY(.5);\r\n        transform: scaleY(.5);\r\n        border-top: 1px solid #d9d9d9;\r\n    }\r\n    \r\n    .block:after {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        color: #d9d9d9;\r\n        -webkit-transform: scaleY(.5);\r\n        transform: scaleY(.5);\r\n        border-bottom: 1px solid #d9d9d9;\r\n    }\r\n    \r\n    .fade-transition {\r\n        transition: all .5s ease;\r\n        position: relative;\r\n        left: 0;\r\n    }\r\n    \r\n    .fade-enter {\r\n        position: relative;\r\n        left: -100%;\r\n    }\r\n    \r\n    .fade-leave {\r\n        position: relative;\r\n        left: 100%;\r\n        opacity: 0;\r\n    }\r\n</style>\r\n<div class=\"global-pop-select\">\r\n    <!--搜索 -->\r\n    <div class=\"weui_search_bar\" :class=\"{'weui_search_focusing':isFocusing}\" style=\"position: fixed;top:0;left: 0;width:100%;z-index: 3\">\r\n        <div class=\"weui_search_outer\">\r\n            <div class=\"weui_search_inner\">\r\n                <i class=\"weui_icon_search\" style=\"top:7px\"></i>\r\n                <input type=\"search\" @keyup.enter=\"customSearchEvent('search')\" v-model=\"searchVal\" class=\"weui_search_input\" id=\"search_input\"\r\n                    placeholder=\"输入搜索内容\" />\r\n                <a href=\"javascript:\" v-show=\"!!searchVal\" class=\"weui_icon_clear\" @click=\"searchClearFn\" style=\"top:7px\"></a>\r\n            </div>\r\n            <label for=\"search_input\" @click=\"searchInputFn\" class=\"weui_search_text\" id=\"search_text\">\r\n                <i class=\"weui_icon_search\"></i>\r\n                <span>搜索</span>\r\n            </label>\r\n        </div>\r\n        <a href=\"javascript:\" v-show=\"!!searchVal\" @click=\"customSearchEvent('search')\" class=\"weui_search_cancel\">搜索</a>\r\n        <a href=\"javascript:\" v-show=\"!searchVal\" @click=\"searchCancelFn\" class=\"weui_search_cancel\" id=\"search_cancel\">取消</a>\r\n    </div>\r\n    <!--列表-->\r\n    <div :class=\"{'global-loading':isLoading,'global-no-data':!isLoading && !dataList.length}\" style=\"padding-bottom: 40px;\">\r\n        <div style=\"padding:54px 0 36px 0\">\r\n            <div class=\"items-wrap block\" v-for=\"item in dataList\"  transition=\"fade\" :style=\"{paddingBottom:item.items.length>0?'10px':0}\" @click=\"clickItem(item)\"\r\n                track-by='value'>\r\n                <div class=\"weui_cell\" style=\"font-size:16px;font-weight:900; position:relative;\">\r\n                    {{item.title}}\r\n                </div>\r\n                <p class=\"items\" v-for='mItem in item.items'  transition=\"fade\"  style=\"font-size:14px;line-height:28px;color:#666;position:relative;transition-delay: 0.3s;\">\r\n                    <span>{{mItem.key}}</span>：<span>{{mItem.value}}</span>\r\n                </p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <template v-if=\"paging.status\">\r\n        <div class=\"paging\">\r\n            <p @click=\"pagingClick\"> {{paging.text}} </p>\r\n        </div>\r\n    </template>\r\n</div>\r\n<toast :type=\"msg.type \" v-show=\"msg.msgShow \">{{ msg.msgToastText }}</toast>";

/***/ }

/******/ });