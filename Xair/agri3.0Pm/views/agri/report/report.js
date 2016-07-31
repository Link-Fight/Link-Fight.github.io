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

	module.exports = __webpack_require__(448);


/***/ },

/***/ 448:
/***/ function(module, exports, __webpack_require__) {

	
	var reportController = __webpack_require__(449);
	var menusComponent = __webpack_require__(451);
	Xa.defineModule('/agri/report/report', function () {
	    var dic = {
	        "01": "icon-xuqiu",
	        "02": "icon-renwu",
	        "03": "icon-huikuan",
	        "04": "icon-tousu",
	        "05": "icon-ditu",
	        "06": "icon-tongji",
	        "11": "icon-hetong",
	        "12": "icon-kehu",
	        "13": "icon-kytiandi",
	        "21": "icon-truck",
	        "22": "icon-wurenji",
	        "23": "icon-cubelifangti"

	    };
	    return {
	        template: __webpack_require__(453),
	        data: function () {
	            return {
	                title: "报表",
	                reportItems: [],
	                displayLoading: true,
	            }
	        },
	        created: function () {
	            var _this = this;
	            console.log("created");
	            reportController.getReportList({}).done(function (data) {
	                _this.handleReportItem(data);
	                console.log(JSON.stringify(data));
	                _this.reportItems = data;
	                _this.displayLoading = false;
	            }).fail(function (data) {
	                alert(data.msg);
	            });
	        },
	        methods: {
	            goToUrl: function (url) {
	                if (!!url)
	                    Router.go(url);
	            },
	            handleReportItem: function (array) {
	                var _this = this;
	                array.forEach(function (params, index) {                 
	                    _this.pluralizeArray(params.items, 3, {
	                        text: " ",
	                        value: "",
	                        url: "",
	                    });
	                });
	            },
	            /**补充数组，保持一定整数倍的长度
	             * @param  {} array
	             * @param  {} len
	             * @param  {} oArr
	             */
	            pluralizeArray: function (array, len, oArr) {
	                var num = array.length % len;
	                if (!!num) {
	                    num = len - num;
	                    do {
	                        oArr.value = "NO" + num;
	                        array.push(JSON.parse(JSON.stringify(oArr)));
	                        num--;
	                    } while (num > 0);
	                }
	            }
	        },
	        ready: function () {
	            this.$root.seoPageInfo.title = "报表";
	            this.$dispatch('change-title', this.title);
	        },
	        filters: {
	            getIconFilter: function (itemCode) {
	                return dic[itemCode];
	            }
	        },
	        components: {
	            menusComponent: menusComponent.menusComponent,
	        }
	    }
	});

/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

	var report_api = __webpack_require__(450);
	module.exports = {
	    getReportList: function (data) {
	        var def = $.Deferred();
	        def = report_api.getReportList(data);
	        return def;
	    }
	}

/***/ },

/***/ 450:
/***/ function(module, exports) {

	module.exports = {
	    getReportList: function (data) {
	        var def = $.Deferred();
	        Xa.get('/wechat/report/home/index', data, function (data) {
	            if (data.status == 200) {
	                def.resolve(data.data);
	            } else {
	                def.reject({ msg: data.message });
	            }
	        });
	        return def;
	    }
	}

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

/***/ 453:
/***/ function(module, exports) {

	module.exports = "<style>\r\n \r\n    \r\n    .report {\r\n        width: 100%;\r\n        font-size: 0;\r\n        margin-bottom: 80px;\r\n    }\r\n    \r\n    .report_group {\r\n        border-top: 1px solid #cdcdcd;\r\n        margin-bottom: 11px;\r\n        margin-top:10px;\r\n    }\r\n    \r\n    .report_group a {\r\n        display: inline-block;\r\n        height: 88px;\r\n        text-align: center;\r\n        vertical-align: top;\r\n        font-size: 12px;\r\n        width: 33.33%;\r\n        background-color: #fff;\r\n        color: #8b8b8b;\r\n        box-sizing: border-box;\r\n        border-bottom: 1px solid #cdcdcd;\r\n        border-right: 1px solid #cdcdcd;\r\n    }\r\n    \r\n    .report_group a p {\r\n        margin-top: 16px;\r\n    }\r\n    \r\n    .report_group .iconfont {\r\n        font-size: 24px;\r\n    }\r\n    .report .title{\r\n        font-size:14px;\r\n        padding-left:10px;\r\n        margin:10px 0;\r\n        line-height:18px;\r\n        color:#8b8b8b;\r\n    }\r\n</style>\r\n<div class=\"report\" :class=\"{'global-loading':displayLoading}\">\r\n    <template v-for=\"(index,report) of reportItems\">\r\n        <div class=\"title\">{{report.title}}</div>\r\n        <div class=\"report_group\">\r\n            <a v-for=\"(mIndex,mReport) of report.items\" @click=\"goToUrl(mReport.url)\">\r\n                <p class=\"iconfont\" :class=\"mReport.value|getIconFilter\"></p>\r\n                <span>{{mReport.text}}</span>\r\n            </a>\r\n        </div>\r\n    </template>\r\n</div>\r\n<menus-component></menus-component>";

/***/ }

/******/ });