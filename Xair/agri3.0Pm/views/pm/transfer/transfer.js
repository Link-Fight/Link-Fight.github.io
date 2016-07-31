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

	module.exports = __webpack_require__(512);


/***/ },

/***/ 394:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 395:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


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

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by user on 2016/3/9.
	 */
	__webpack_require__(459);
	var footerComponent = Vue.extend({
	    template: __webpack_require__(461),
	    props: {
	        show: true,
	        btns: {
	            type: Object,
	            default: function () {
	                return {
	                    close: {
	                        val: '确定',
	                        btnClass: 'weui_btn_primary',
	                        hide: false,
	                        fun: function () {
	                            // alert(1)
	                        }
	                    }
	                }
	            }
	        }
	    },
	    data: function () {
	        return {}
	    },
	    methods: {
	    }
	});
	module.exports = {
	    footerComponent: footerComponent
	}



/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(460);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(395)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./footer.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./footer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(394)();
	// imports


	// module
	exports.push([module.id, ".global-footer-btn{\r\n    padding:8px;\r\n    border-top:1px solid #eee;\r\n    width: -webkit-calc(100% - 16px);\r\n    width: -moz-calc(100% - 16px);\r\n    width: calc(100% - 16px);\r\n    background-color: #f2f2f2;\r\n}\r\n.global-fixed-bottom{\r\n    position: fixed;\r\n    bottom: 0;\r\n    left: 0;\r\n    z-index:1;\r\n}", ""]);

	// exports


/***/ },

/***/ 461:
/***/ function(module, exports) {

	module.exports = "<div style=\"height:63px;\"></div>\r\n<div class=\"global-footer-btn global-fixed-bottom\">\r\n\t<!-- v-show 改为 v-if（第一个按钮隐藏第二个按钮会有margin-top:15px;） -->\r\n    <a href=\"javascript:;\" class=\"weui_btn\" v-for=\"btn in btns\" v-if=\"!btn.hide\" :class=\"btn.btnClass\" @click=\"btn.fun\">{{btn.val}}</a>\r\n</div>";

/***/ },

/***/ 512:
/***/ function(module, exports, __webpack_require__) {

	var modeController = __webpack_require__(417);
	var footerComponent = __webpack_require__(458);
	Xa.defineModule("/pm/transfer/transfer", function () {
	    /**
	     * @param  {} config
	     */
	    // var config = {
	    //     action: "",
	    //     data: {},
	    //     fn: {
	    //         done: function (data) {

	    //         },
	    //         fail: function (data) {

	    //         },
	    //         always: function (data) {

	    //         }
	    //     },
	    //     msg: {
	    //         loading: function () {
	    //             return "正在加载数据！";
	    //         },
	    //         done: function (data) {
	    //             console.log("done" + JSON.parse(data));
	    //             return "加载成功"; 
	    //         },
	    //         fail: function (data) {
	    //             console.log("fail" + JSON.parse(data));
	    //             return "加载失败";
	    //         }
	    //     }
	    // }
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
	        console.log(this.app_uid);
	        modeController[config.action](config.data).done(function (data) {
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
	        template: __webpack_require__(513),
	        data: function () {
	            var _this = this;
	            return {
	                data: {

	                    "assignee": [

	                    ]
	                },
	                currentAssUid: "",
	                app_uid: this.$route.query.app_uid,
	                msg: {
	                    type: "msg",
	                    msgShow: false,
	                    msgToastText: "",
	                    duration: "2000",
	                },
	                btns: {
	                    save: {
	                        val: "确定",
	                        btnClass: 'weui_btn_disabled weui_btn_primary',
	                        hide: false,
	                        fun: function () {
	                            if (_this.data.tas_assign_type == "MANUAL" && !_this.currentAssUid) {
	                                _this.msg.type = "msg";
	                                _this.msg.msgToastText = "请选择下一阶段的负责人！";
	                                _this.msg.duration = 2000;
	                                _this.msg.msgShow = true;
	                                setTimeout(function () {
	                                    _this.msg.msgShow = false;
	                                }, 1500);
	                                return;
	                            }
	                            var action = "route_auto";
	                            var data = {
	                                app_uid: _this.app_uid,
	                            };
	                            //手动路由
	                            if (_this.data.tas_assign_type == "MANUAL") {
	                                action = "route_manual";
	                                data.tas_uid = _this.data.tas_uid;
	                                data.usr_uid = _this.currentAssUid;
	                            }
	                            controllerAction.call(_this, {
	                                action: action,
	                                data: data,
	                                fn: {
	                                    done: function (data) {
	                                        setTimeout(function () {
	                                            Router.go("/pm/workTable");
	                                        }, 1000);
	                                    }
	                                },
	                                msg: {
	                                    loading: function () {
	                                        return "正在提交数据";
	                                    },
	                                    done: function (data) {
	                                        return "提交数据成功";
	                                    }
	                                }
	                            });

	                        }
	                    }
	                }
	            }
	        },
	        created: function () {
	            var _this = this;
	            this.$root.seoPageInfo.title = "下一步";
	            controllerAction.call(this, {
	                action: "get_next_task",
	                data: {
	                    app_uid: _this.app_uid,
	                },
	                fn: {
	                    done: function (data) {
	                        this.data = data;
	                        if (data.tas_assign_type == "") {
	                            this.btns.save.btnClass = "weui_btn_primary";
	                        }
	                    }
	                }
	            });
	        },
	        watch: {},
	        methods: {
	            selectPerson: function (aas_uid) {
	                this.currentAssUid = aas_uid;
	                this.btns.save.btnClass = "weui_btn_primary";
	            }
	        },
	        events: {
	        },
	        route: {
	            data: function (transition) {
	            }
	        },
	        filters: {
	            getImageStr: function (obj) {
	                if (obj["backgroundImage"]) {
	                    obj["backgroundImage"] = "url(" + obj["backgroundImage"] + ")";
	                }
	                return obj;
	            }
	        },
	        ready: function () {

	        },
	        components: {
	            footerComponent: footerComponent.footerComponent,
	        }
	    }

	})




/***/ },

/***/ 513:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .nextTask {\r\n        padding-top: 11px;\r\n        color: #666;\r\n    }\r\n    \r\n    .nextTask .head {\r\n        padding: 0 8px;\r\n        border-top: 1px solid #cdcdcd;\r\n        border-bottom: 1px solid #cdcdcd;\r\n        background-color: #fff;\r\n        font-size: 14px;\r\n    }\r\n    \r\n    .nextTask .head .title {\r\n        color: #323232;\r\n        line-height: 44px;\r\n        font-size: 15px;\r\n        vertical-align: middle;\r\n    }\r\n    \r\n    .head .title b {\r\n        font-size: 18px;\r\n        vertical-align: middle;\r\n    }\r\n    \r\n    .head .desc {\r\n        padding: 12px 0;\r\n        border-top: 1px solid #e5e6e6;\r\n    }\r\n    \r\n    .assignee {\r\n        border-top: 1px solid #cbcbcb;\r\n    }\r\n    \r\n    .nextTask>p {\r\n        padding: 0 8px;\r\n        line-height: 36px;\r\n    }\r\n    \r\n    .assignee .img {\r\n        background-image: url(\"images/default_person.png\");\r\n        background-size: cover;\r\n        float: left;\r\n        height: 36px;\r\n        width: 36px;\r\n        margin-right: 10px;\r\n    }\r\n    \r\n    .assignee .person {\r\n        background-color: #fff;\r\n        padding: 10px 8px;\r\n        border-bottom: 1px solid #cbcbcb;\r\n    }\r\n    \r\n    .assignee .person p {\r\n        line-height: 36px;\r\n    }\r\n    \r\n    .assignee .person .right_txt {\r\n        float: right;\r\n        color: #049a04;\r\n        height: 36px;\r\n    }\r\n    \r\n    .assignee .person .iconfont {\r\n        font-size: 22px;\r\n        vertical-align: top;\r\n        margin-right: 6px;\r\n    }\r\n    \r\n    .toast_msg .weui_toast {\r\n        position: fixed;\r\n        z-index: 3;\r\n        width: 100%;\r\n        min-height: 0;\r\n        top: 50%;\r\n        left: 0;\r\n        margin-left: 0;\r\n        background: none;\r\n        text-align: center;\r\n        border-radius: 5px;\r\n        color: #fff;\r\n    }\r\n    \r\n    .toast_msg .weui_toast .weui_toast_content {\r\n        display: inline-block;\r\n        margin: 0 0 15px;\r\n        padding: 10px;\r\n        border-radius: 5px;\r\n        background: rgba(40, 40, 40, .75);\r\n    }\r\n</style>\r\n<div class=\"nextTask\">\r\n    <div class=\"head\" v-if=\"!!data.tas_uid\">\r\n        <p class=\"title\">下一步：<b>{{data.tas_title}}</b></p>\r\n        <template v-if=\"!!data.tas_description\">\r\n            <p class=\"desc\">{{data.tas_description}}</p>\r\n        </template>\r\n    </div>\r\n    <p v-if=\"data.assignee.length>0\">处理人员</p>\r\n    <div class=\"assignee\" v-if=\"data.assignee.length>0\">\r\n        <div class=\"person\" v-for=\"person of data.assignee\" @click=\"selectPerson(person.aas_uid)\">\r\n            <div class=\"img\" v-bind:style=\"{backgroundImage : person.aas_avatar  }|getImageStr\"></div>\r\n            <span v-if=\"data.tas_assign_type=='MANUAL'\" class=\" right_txt iconfont icon-danxuankuang \" :class=\"{ 'icon-danxuankuang1':currentAssUid===person.aas_uid} \">  </span>\r\n            <p>{{person.aas_name}}</p>\r\n        </div>\r\n    </div>\r\n</div>\r\n<toast :type=\"msg.type \" v-show=\"msg.msgShow \">{{ msg.msgToastText }}</toast>\r\n<footer-component :btns=\"btns\"  ></footer-component>";

/***/ }

/******/ });