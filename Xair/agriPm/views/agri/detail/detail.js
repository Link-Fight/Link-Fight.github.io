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

	module.exports = __webpack_require__(444);


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

/***/ 444:
/***/ function(module, exports, __webpack_require__) {

	var modeContrlller = __webpack_require__(417);

	Xa.defineModule('/agri/detail/detail',
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
	            template: __webpack_require__(445),
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
	                    tabCurr: 0,
	                    detailData: {},
	                    isLoading: false,
	                    isFocusing: false,
	                }
	            },
	            methods: {

	            },
	            computed: {
	                menuItemStyle: function () {
	                    if (this.detailData.tabs) {
	                        return {
	                            width: (100.0 / this.detailData.tabs.length) + "%",
	                        }
	                    }

	                }
	            },
	            filters: {

	            },
	            ready: function () {
	                this.$root.seoPageInfo.title = "作业需求";
	            },
	            route: {
	                data: function (transition) {
	                    var _this = this;
	                    var action = "getDropdownList";
	                    this.data.src = this.$route.query.src;
	                    console.info(this.$route.query.params);
	                    var data = JSON.parse(this.$route.query.params);
	                    console.info(JSON.stringify(data));
	                    controllerAction.call(_this, {
	                        action: action,
	                        src: _this.data.src,
	                        data: data,
	                        fn: {
	                            done: function (data) {
	                                transition.next({
	                                    detailData: data,
	                                });
	                                _this.$root.seoPageInfo.title = data.doc_title;
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

/***/ 445:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .head {\r\n        padding: 10px 0 10px 10px;\r\n        font-size: 14px;\r\n        line-height: 25px;\r\n        color: #333;\r\n        background: #fff;\r\n        margin-bottom: 1.17647059em;\r\n    }\r\n    \r\n    .title-block {\r\n        margin: 10px 0;\r\n        padding-left: 15px;\r\n    }\r\n    \r\n    .tabs_menu {\r\n        margin-top: 1.17647059em;\r\n    }\r\n    \r\n    .tabs_menu a {\r\n        display: inline-block;\r\n        font-size: 14px;\r\n        padding: 8px 0;\r\n        text-align: center;\r\n        background: #fff;\r\n        box-sizing: border-box;\r\n        border-right: 1px solid #ccc;\r\n    }\r\n    \r\n    .tabs_menu a:last-child {\r\n        border-right: none;\r\n    }\r\n    \r\n    .tabs_menu a.active {\r\n        padding-bottom: 6px;\r\n        background-color: #e2e2e2;\r\n        border-bottom: 3px solid #04be02;\r\n    }\r\n    \r\n    .textarea {\r\n        margin: 1.17647059em 0;\r\n        background-color: #fff;\r\n        padding-left: 15px;\r\n        color: #333;\r\n    }\r\n    \r\n    .textarea .title {\r\n        padding: 10px 0;\r\n    }\r\n    \r\n    .textarea .content {\r\n        padding: 10px 0;\r\n        line-height: 25px;\r\n    }\r\n    \r\n    .block {\r\n        position: relative;\r\n    }\r\n    \r\n    .block:before {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        color: #d9d9d9;\r\n        -webkit-transform: scaleY(.5);\r\n        transform: scaleY(.5);\r\n        border-top: 1px solid #d9d9d9;\r\n    }\r\n    \r\n    .block:after {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        color: #d9d9d9;\r\n        -webkit-transform: scaleY(.5);\r\n        transform: scaleY(.5);\r\n        border-bottom: 1px solid #d9d9d9;\r\n    }\r\n    \r\n    .weui_cells {\r\n        margin-top: 10px;\r\n    }\r\n    \r\n    .weui_cell_hd {\r\n        min-width: 6em;\r\n    }\r\n    \r\n    .event {\r\n        position: absolute;\r\n        width: 100%;\r\n        height: 100%;\r\n        top: 0;\r\n        left: 0;\r\n    }\r\n    \r\n    .event i.iconfont {\r\n        float: right;\r\n        padding: 8px;\r\n        color: #c8c8cd;\r\n        width: 28px;\r\n        padding-right: 0px;\r\n    }\r\n    \r\n    .fade-transition {\r\n        transition: all .5s ease;\r\n        position: relative;\r\n        left: 0;\r\n    }\r\n    \r\n    .fade-enter {\r\n        position: relative;\r\n        left: -100%;\r\n    }\r\n    \r\n    .fade-leave {\r\n        position: relative;\r\n        left: 100%;\r\n        opacity: 0;\r\n        display: none;\r\n    }\r\n    \r\n    #agriBOx {\r\n        overflow-x: hidden;\r\n    }\r\n</style>\r\n<template v-if='!!detailData.doc_title||!!detailData.document_title'>\r\n    <div class=\"head block\" v-if='detailData.header' transition=\"fade\"  style='transition-delay: 0.1s;'>\r\n        <p style='font-weight: 900;font-size:16px'>{{detailData.header.title}}</p>\r\n        <p>{{detailData.header.sub_title}}</p>\r\n    </div>\r\n\r\n    <div class=\"tabs block\">\r\n        <div class=\"tabs_menu block\"  v-if='detailData.tabs'   transition=\"fade\" style='font-size:0;transition-delay: 0.1s;'>\r\n            <a v-for='( $index, tab) in detailData.tabs' :style='menuItemStyle' :class=\"{active:$index==tabCurr}\" @click=\"tabCurr=$index\">\r\n               {{tab.title}}\r\n           </a>\r\n        </div>\r\n    </div>\r\n\r\n    <template v-for='( $index, tab) in detailData.tabs'>\r\n        <div v-if='$index==tabCurr' transition=\"fade\" style='transition-delay: 0.2s;'>\r\n            <template v-for='($mIndex,mTab) in tab.blocks'>\r\n                <template v-if='mTab.type == \"textarea\"'>\r\n                    <div class=\"textarea block\">\r\n                        <p class=\"title block\">\r\n                            {{mTab.title}}\r\n                        </p>\r\n                        <p class=\"content\">\r\n                            {{mTab.content}}\r\n                        </p>\r\n                    </div>\r\n                </template>\r\n                <template v-if='mTab.type == \"pairs\"'>\r\n                    <div class=\"weui_cells weui_cells_access\">\r\n                        <a class=\"weui_cell\" href=\"javascript:;\" v-for='mmTab in mTab.items'>\r\n                            <div class=\"weui_cell_hd\">{{mmTab.key}} </div>\r\n                            <div class=\"weui_cell_bd weui_cell_primary\">\r\n                                <p>{{mmTab.value}}</p>\r\n                            </div>\r\n                            <template v-if='mmTab.event'>\r\n                                <template v-if='mmTab.event.type==\"link\"'>\r\n                                    <a class=\"event\" :href=\"mmTab.event.value\">\r\n                                        <i class=\"iconfont icon-xiangyou\" style='font-size: 24px;padding: 3px 10px;'></i>\r\n                                    </a>\r\n                                </template>\r\n                                <template v-if='mmTab.event.type==\"telephone\"'>\r\n                                    <a class=\"event\" :href=\"'tel:'+mmTab.event.value\">\r\n                                        <i class=\"iconfont icon-dianhua\" style='color:#3cc51f'></i>\r\n                                    </a>\r\n                                </template>\r\n                            </template>\r\n                        </a>\r\n                    </div>\r\n                </template>\r\n\r\n                <template v-if='mTab.type == \"link_button\"'>\r\n                    <div class=\"weui_cells weui_cells_access\">\r\n                        <a class=\"weui_cell\" :href=\"mTab.params.url\">\r\n                            <div class=\"weui_cell_bd weui_cell_primary\">\r\n                                <p>{{mTab.title}}</p>\r\n                            </div>\r\n                            <div class=\"weui_cell_ft\">\r\n                            </div>\r\n                        </a>\r\n                    </div>\r\n                </template>\r\n                <template v-if='mTab.type == \"title\"'>\r\n                    <div class=\"title-block\">\r\n                        {{mTab.title}}\r\n                    </div>\r\n                </template>\r\n            </template>\r\n        </div>\r\n    </template>\r\n</template>\r\n<toast :type=\"msg.type \" v-show=\"msg.msgShow \">{{ msg.msgToastText }}</toast>";

/***/ }

/******/ });