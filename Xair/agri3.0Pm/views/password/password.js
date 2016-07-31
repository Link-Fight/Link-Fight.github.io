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

	module.exports = __webpack_require__(486);


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

/***/ 486:
/***/ function(module, exports, __webpack_require__) {

	var footerComponent = __webpack_require__(458);
	var settingController = __webpack_require__(487);
	Xa.defineModule('/password/password', function () {
	    return {
	        template: __webpack_require__(489),
	        data: function () {
	            var _this = this;
	            return {
	                valid: false,
	                password: "",
	                passwordAg: "",
	                loadingToastShow: false,
	                loadingToastText: '',
	                toastText:"",
	                toastShow: "",
	                btns: {
	                    save: {
	                        val: "确定",
	                        btnClass: 'weui_btn_disabled weui_btn_primary',
	                        hide: false,
	                        fun: function () {
	                            if (!_this.valid) return;
	                            _this.loadingToastText = "数据提交中";
	                            _this.loadingToastShow = true;
	                            settingController.change_password({
	                                "password": _this.password,
	                                "re_password": _this.passwordAg,
	                            }).done(function () {
	                                _this.toastText = "修改成功";
	                                _this.toastShow = true;
	                                setTimeout(function () {
	                                    _this.toastShow = false;
	                                    Router.go("/login");
	                                }, 1000);
	                            }).fail(function (data) {
	                                alert(data.msg);
	                            }).always(function () {
	                                _this.loadingToastShow = false;
	                            }
	                                );
	                        }
	                    }
	                }

	            }
	        },
	        computed: {
	            msg: function () {
	                if (!!this.password && !!this.passwordAg) {
	                    if (this.password !== this.passwordAg) {
	                        this.valid = false;
	                        this.btns.save.btnClass = "weui_btn_disabled weui_btn_primary";
	                        return "两次输出的密码有不同！";
	                    } else if (this.password == this.passwordAg && this.passwordAg.length >= 1) {
	                        this.valid = true;
	                        this.btns.save.btnClass = "weui_btn_primary";
	                    }
	                }
	                return "";
	            },
	        },
	        methods: {
	            gotoFn: function (key) {
	                console.log(key);

	            },
	        },
	        ready: function () {
	            this.$root.seoPageInfo.title = "修改密码";
	        },
	        components: {
	            footerComponent: footerComponent.footerComponent,
	        }
	    }
	})

/***/ },

/***/ 487:
/***/ function(module, exports, __webpack_require__) {

	var setting_api =  true ? __webpack_require__(488) : require("apis/setting");
	module.exports = {
	    /**User_Info用户信息
	     * @param  {} data
	     */
	    get_user_info: function (data) {
	        var def = $.Deferred();
	        def = setting_api.get_user_info(data);
	        return def;
	    },
	    /**User_Change Pass修改密码
	     * @param  {password,re_password} data
	     */
	    change_password: function (data) {
	        var def = $.Deferred();
	        if (!data["password"] || !data["re_password"]) {
	            def.reject({ msg: "请输入新密码！" });
	        } else if (data["password"] !== data["re_password"]) {
	            def.reject({ msg: "两次输入的密码不同！" });
	        }
	        else {
	            def = setting_api.change_password(data);
	        }
	        return def;
	    },
	    /**User_Upload_Avatar上传头像
	     * @param  {media_id:微信资源id} data
	     */
	    upload_avatar: function (data) {
	        var def = $.Deferred();
	        if (!data["phone"]) {
	            def.reject({ msg: "phone缺失！" });
	        } else {
	            def = setting_api.upload_avatar(data);
	        }
	        return def;
	    },
	}

/***/ },

/***/ 488:
/***/ function(module, exports) {

	module.exports = {
	    get_user_info: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "name": "Administrator admin",
	                "position": "Administrator",
	                "avatar":
	                {
	                    "thumb_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A=",
	                    "url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                },
	                "phone": "15915797485"
	            });
	        }, 4000);
	        return def;
	    },
	    change_password: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "status": 200,
	                "message": ""
	            });
	        }, 1000);
	        return def;
	    },
	    upload_avatar: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "status": 200,
	                "message": "",
	                "data": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	            });
	        }, 1000);
	        return def;
	    },
	}

/***/ },

/***/ 489:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .password {\r\n        background-color: #fff;\r\n        padding: 0 10px;\r\n    }\r\n    \r\n    .password input {\r\n        color: #999;\r\n        width: 100%;\r\n        outline: 0;\r\n        border-width: 0;\r\n        border-style: none;\r\n        padding: 15px 0px;\r\n    }\r\n    \r\n    .password input[name=\"password\"] {\r\n        border-bottom: 1px solid #e5e5e5;\r\n    }\r\n    \r\n    .msg {\r\n        text-align: center;\r\n        font-size: 14px;\r\n        line-height: 2.4;\r\n        color: red;\r\n    }\r\n</style>\r\n<div style=\"padding-top: 10px;\">\r\n    <div class=\"password\">\r\n        <input placeholder=\"请输入新密码\" type=\"password\" name=\"password\" v-model=\"password\">\r\n        <input placeholder=\"再次输入新密码\" type=\"password\" name=\"passwordAg\" v-model=\"passwordAg\">\r\n    </div>\r\n</div>\r\n<p class=\"msg\" v-show=\"msg.length>0\">{{msg}}</p>\r\n<toast v-show=\"toastShow\">{{ toastText }}</toast>\r\n<toast type=\"loading\" v-show=\"loadingToastShow\">{{ loadingToastText }}</toast>\r\n<footer-component :btns=\"btns\" :show=\"showFooter\"></footer-component>";

/***/ }

/******/ });