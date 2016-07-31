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

	module.exports = __webpack_require__(514);


/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	var menusComponent = Vue.extend({
	    template: __webpack_require__(452),
	    props: {
	        menus: {
	            type: Array,
	            default: function () {
	                return [
	                    { text: "动态", iconfont: "icon-shenpi03", path: '/pm/dynamics' },
	                    { text: "工作", iconfont: "icon-gongzuo", path: '/pm/workTable' },
	                    { text: "报表", iconfont: "icon-baobiao", path: '/agri/report' },
	                    { text: "设置", iconfont: "icon-shezhi", path: '/setting' }
	                ];
	            },
	        }
	    },
	    computed: {
	        menuItemStyle: function () {
	            return {
	                width: (100.0 / this.menus.length) + "%",
	            }
	        }

	    },
	    ready: function () {
	        
	    },
	}
	);

	module.exports = {
	    menusComponent: menusComponent
	}

/***/ },

/***/ 452:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .footer_menu {\r\n        position: fixed;\r\n        bottom: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        border-top: 1px solid #cdcdcd;\r\n        margin: 0;\r\n        padding: 0;\r\n        font-size: 0;\r\n    }\r\n    \r\n    .footer_menu a {\r\n        text-align: center;\r\n        display: inline-block;\r\n        font-size: 16px;\r\n        background-color: #fff;\r\n        line-height: 1.2;\r\n        text-decoration: none;\r\n        padding-top: 2px;\r\n        padding-bottom: 5px;\r\n        color: #878787;\r\n    }\r\n    \r\n    .footer_menu p.iconfont {\r\n        font-size: 28px;\r\n    }\r\n    \r\n    .footer_menu a>span {\r\n        font-size: 12px;\r\n    }\r\n    \r\n    .footer_menu a.v-link-active {\r\n        color: #049a04;\r\n    }\r\n    \r\n    .footer_menu a {\r\n        text-decoration: none;\r\n    }\r\n    \r\n    .footer_menu a:hover {\r\n        text-decoration: none;\r\n        outline: none;\r\n    }\r\n    \r\n    .footer_menu a:focus {\r\n        text-decoration: none;\r\n        outline: none;\r\n    }\r\n    \r\n    :focus {\r\n        outline: 0;\r\n    }\r\n</style>\r\n\r\n\r\n<div class=\"footer_menu\">\r\n    <template v-for=\"menu of menus\">\r\n        <a v-link=\"menu.path\" :style=\"menuItemStyle\">\r\n            <p class=\"iconfont\" v-bind:class=\"menu.iconfont\"></p>\r\n            <span>{{menu.text}}</span>\r\n        </a>\r\n    </template>\r\n</div>";

/***/ },

/***/ 514:
/***/ function(module, exports, __webpack_require__) {

	var workController = __webpack_require__(515);
	var menusComponent = __webpack_require__(451);
	Xa.defineModule("/pm/workTable/workTable", function () {
	    return {
	        template: __webpack_require__(517),
	        data: function () {
	            var _this = this;
	            return {
	                dialogShow: false,
	                dialogTitle: '提示',
	                dialogContent: '',
	                data: {
	                    cases_counter: [],
	                    project_list: []
	                },
	                isLoading: true
	            }
	        },
	        route: {
	            data: function (transition) {
	                var _this = this;
	                this.$root.seoPageInfo.title = "运营管理系统V3";
	                workController.getworkTable({}).done(function (data) {
	                    transition.next({ data: data });
	                }).fail(function (data) {
	                    _this.dialogShow = true;
	                    _this.dialogContent = data.msg;
	                }).always(function () {
	                    _this.isLoading = false;
	                })
	            }
	        },

	        watch: {},
	        methods: {
	            gotoFn: function (item) {
	                switch (item) {
	                    case 'CASES_DRAFT':
	                        Router.go("/pm/draft");
	                        break;
	                    case 'CASES_INBOX':
	                        Router.go("/pm/inbox");
	                        break;
	                    case 'CASES_SENT':
	                        Router.go("/pm/participated");
	                        break;
	                }
	            },
	            gotoFormFn:function(pro_uid,tas_uid){
	                Router.go("/pm/createForm?pro_uid="+pro_uid+"&tas_uid="+tas_uid+"&formType=createForm");
	            }
	        },
	        events: {},
	        filters: {
	            iconFilter: function (item) {
	                switch (item) {
	                    case 'CASES_DRAFT':
	                        return 'icon-caogaoxiang';
	                    case 'CASES_INBOX':
	                        return 'icon-daiban2';
	                    case 'CASES_SENT':
	                        return 'icon-yiwancheng';
	                }
	            },
	            classFilter: function (item) {
	                if (item == 'CASES_INBOX') return 'bg-color-num'
	            }
	        },
	        ready: function () {
	        },
	        components: {
	            menusComponent: menusComponent.menusComponent,
	        }
	    }

	})




/***/ },

/***/ 515:
/***/ function(module, exports, __webpack_require__) {

	var work_api =  true ? __webpack_require__(516) : require("apis/workTable");
	module.exports ={
	    getworkTable: function (data) {
	        var def = $.Deferred();
	        def = work_api.getworkTable(data);
	        return def;
	    }
	}

/***/ },

/***/ 516:
/***/ function(module, exports) {

	/**
	 * Created by user on 2016/6/30.
	 */
	module.exports = {
	    getworkTable: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "cases_counter": [
	                    {
	                        "item": "CASES_DRAFT",
	                        "count": 10,
	                        "name": "我的草稿"
	                    },
	                    {
	                        "item": "CASES_INBOX",
	                        "count": 4,
	                        "name": "待办事项"
	                    },
	                    {
	                        "item": "CASES_SENT",
	                        "count": 16,
	                        "name": "我的审批"
	                    }
	                ],
	                "project_list": [
	                    {
	                        "pro_title": "作业需求",
	                        "pro_uid": "23590087857721cec16cdb9001203154",
	                        "tas_uid": "4204711915772232bc1d2d7039849179"
	                    },
	                    {
	                        "pro_title": "合同审核",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "tas_uid": "937835693576a4c6b487600054867705"
	                    }
	                ]
	            });
	        }, 4000);
	        return def;
	    }
	}

/***/ },

/***/ 517:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .workTable {\r\n       padding-top: 11px;\r\n       padding-bottom:80px;\r\n    }\r\n    \r\n    .weui_cell {\r\n\r\n        padding: 11px 15px\r\n    }\r\n    .weui_cells{\r\n        margin-top: 0px;\r\n    }\r\n    .workTable_access .bg-color-num {\r\n        display: inline-block;\r\n        padding: 0 5px;\r\n        border-radius: 50%;\r\n        color: #fff;\r\n        background-color: #f00;\r\n        line-height: 18px;\r\n    }\r\n    \r\n    .workTable_access .iconfont {\r\n        font-size: 22px;\r\n        margin-right: 10px;\r\n    }\r\n    \r\n    .workTable_access .weui_cell {\r\n        padding-top: 5px;\r\n        padding-bottom: 5px;\r\n    }\r\n    .weui_cells_access .weui_cell_ft:after{\r\n        top:0;\r\n        height:8px;\r\n        width:8px\r\n    }\r\n</style>\r\n<div class=\"workTable\">\r\n    <div :class=\"{'global-loading':isLoading}\">\r\n        <div v-show=\"!isLoading\">\r\n            <div class=\"weui_cells weui_cells_access workTable_access\">\r\n                <a class=\"weui_cell\" href=\"javascript:;\" v-for=\"item in data.cases_counter\" @click=\"gotoFn(item.item)\">\r\n                    <div class=\"weui_cell_hd\">\r\n                        <i class=\"iconfont\" :class=\"item.item | iconFilter\"></i>\r\n                    </div>\r\n                    <div class=\"weui_cell_bd weui_cell_primary\">\r\n                        <p>{{item.name}}</p>\r\n                    </div>\r\n                    <div class=\"weui_cell_ft\"><span v-show=\"1*item.count>0\" :class=\"item.item | classFilter\">{{item.count}}</span></div>\r\n                </a>\r\n            </div>\r\n            <div class=\"weui_cells_title\" v-show=\"data.project_list.length>0\">创建</div>\r\n            <div class=\"weui_cells weui_cells_access\" v-show=\"data.project_list.length>0\">\r\n                <a class=\"weui_cell\" href=\"javascript:;\" v-for=\"item in data.project_list\" @click=\"gotoFormFn(item.pro_uid,item.tas_uid)\">\r\n                    <div class=\"weui_cell_bd weui_cell_primary\">\r\n                        <p>{{item.pro_title}}</p>\r\n                    </div>\r\n                    <div class=\"weui_cell_ft\"></div>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<menus-component :menus='menus'></menus-component>";

/***/ }

/******/ });