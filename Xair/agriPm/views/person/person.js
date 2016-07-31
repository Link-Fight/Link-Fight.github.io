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

	module.exports = __webpack_require__(490);


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

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	Vue.component('toast', {
	  template: __webpack_require__(408),
	  props: {
	    /**
	     * toast类型
	     * icon: 包含图标的提示框（默认）
	     * msg: 不含图标的提示框
	     * loading: 包含loading动画的提示框
	     */
	    type: {
	      type: String,
	      required: false,
	      default: 'icon'
	    }
	  },
	  filters: {
	    getClassName: function (params) {
	      var attrClass = "toast_" + this.type;
	      params[attrClass] = true;
	      return params;
	    },
	  }

	});





/***/ },

/***/ 408:
/***/ function(module, exports) {

	module.exports = "<div :class=\"{'weui_loading_toast': type === 'loading'}|getClassName\">\r\n  <div class=\"weui_mask_transparent\"></div>\r\n  <div class=\"weui_toast\">\r\n    <div class=\"weui_loading\" v-if=\"type === 'loading'\">\r\n      <div v-for=\"n in 12\" class=\"weui_loading_leaf\" :class=\"'weui_loading_leaf_' + n\"></div>\r\n    </div>\r\n    <i class=\"weui_icon_toast\" v-if=\"type !='loading'&&type!='msg'\"></i>\r\n    <div class=\"weui_toast_content\">\r\n      <slot></slot>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(407);
	var wxContrlller = __webpack_require__(433);
	Vue.component('personWxUpload', {
	    template: __webpack_require__(435),
	    props: {
	        serverIDs: {
	            type: Array,
	            default: function () {
	                return [];
	            },
	            twoWay: true
	        },
	        imgs: {
	            type: Array,
	            default: function () {
	                return [];
	            },
	            twoWay: true
	        },

	    },
	    data: function () {
	        return {
	            loadingToastShow: false,
	            selectImg: "",
	        }
	    },
	    methods: {
	        chooseImage: function () {
	            var _this = this;
	            wxContrlller.ready(function () {
	                wxContrlller.chooseImage({
	                    count: 1
	                }).done(function (localIds) {
	                    var uploadIds;
	                    _this.imgs = localIds;
	                    _this.selectImg = _this.imgs;
	                    uploadIds = localIds
	                    if (uploadIds.length > 0) {
	                        _this.loadingToastShow = true;
	                        wxContrlller.upload(uploadIds).done(function (serverIds) {
	                            _this.loadingToastShow = false;
	                            _this.serverIDs = _this.serverIDs.concat(serverIds);
	                        });
	                    }
	                });
	            });

	        },
	        delFn: function () {
	            var _this = this;
	            _this.imgs.pop();
	            _this.serverIDs.pop();
	        }
	    },
	    events: {

	    },
	    created: function () {
	        wxContrlller.config();
	        wxContrlller.error(function (msg) {
	            console.log(msg);
	        })
	    },
	    filters: {
	        getImageStr: function (obj) {
	            if (obj["backgroundImage"]) {
	                obj["backgroundImage"] = "url(" + obj["backgroundImage"] + ")";
	                obj["backgroundImage"];
	            }
	            return obj;
	        }
	    },
	});





/***/ },

/***/ 433:
/***/ function(module, exports, __webpack_require__) {

	var wx_api =  true ? __webpack_require__(434) : require("apis/wx");
	module.exports = {
	    config: function () {
	        wx_api.config().done(function(data){
	            wx.config({
	                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	                appId: data.appId, // 必填，公众号的唯一标识
	                timestamp: data.timestamp, // 必填，生成签名的时间戳
	                nonceStr: data.nonceStr, // 必填，生成签名的随机串
	                signature: data.signature,// 必填，签名，见附录1
	                jsApiList: ["chooseImage","previewImage","uploadImage","hideMenuItems","showMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	            });
	        }).fail(function(data){
	            alert(data.msg);
	        });
	    },
	    ready:function(fun){
	        wx.ready(function(res){
	            fun && fun(res);
	        })
	    },
	    error:function(fun){
	    wx.error(function(res){
	        fun && fun(res)
	    })},
	    chooseImage:function(options){
	        var localIds = [];
	        var count = (options && options.count) ? options.count:9;
	        var sizeType = (options && options.sizeType) ? options.sizeType:['original', 'compressed'];
	        var sourceType = (options && options.sourceType) ? options.sourceType:['album', 'camera'];
	        var def = $.Deferred();

	        wx.chooseImage({
	            count:count, //默认9张
	            sizeType:sizeType, // 可以指定是原图还是压缩图，默认二者都有
	            sourceType:sourceType, // 可以指定来源是相册还是相机，默认二者都有
	            success: function (res) {
	                for(var i=0;i<res.localIds.length;i++){
	                    localIds.push(res.localIds[i]);
	                }
	                def.resolve(localIds);
	            },
	            fail:function(res){
	                alert(JSON.stringify(res))
	            }
	        });
	        return def;
	    },
	    upload:function(localIds){
	        var i = 0,length = localIds.length,serverIds=[];
	        var def = $.Deferred();
	        function upload(){
	            wx.uploadImage({
	                isShowProgressTips:0,
	                localId: localIds[i],
	                success: function (res) {
	                    i++;
	                    serverIds.push(res.serverId);
	                    if (i < length) {
	                        upload();
	                    }else{
	                        def.resolve(serverIds);
	                    }
	                },
	                fail: function (res) {
	                    def.reject(JSON.stringify(res));
	                }
	            });
	        }
	        upload();
	        return def;
	    },
	    previewImage:function(current,urls){
	        wx.previewImage({
	            current:current, // 当前显示图片的http链接
	            urls:urls // 需要预览的图片http链接列表
	        });
	    },
	    getImageUrl:function(res_uids){
	        var def = $.Deferred();
	        def = wx_api.getImageUrl(JSON.stringify(res_uids));
	        return def;
	        
	    }
	}

/***/ },

/***/ 434:
/***/ function(module, exports) {

	module.exports={
	    config:function(options){
	        var def = $.Deferred();
	        var url = window.location.href.toString();
	        Xa.get("/wechat/wechat/wechat_signature_info/?url="+url,{},function(result){
	            if(result.status == 200){
	                def.resolve(result.data);
	            }else{
	                def.reject({msg:result.message});
	            }
	        });
	        return def;
	    },
	    getImageUrl:function(res_uids){
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve([
	                {
	                    "uid": "43D3CBAA-1EA0-B134-A28C-0A09D25DF66C",
	                    "url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/544bf4e8050d88324715f82e6ab97300.jpg?e=1468234564&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:XNbCJ4tgWA10ZOtt5gFG2zhTwzs=",
	                    "thumb_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/544bf4e8050d88324715f82e6ab97300.jpg?imageView2/0/w/100/h/100&e=1468234564&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:QWegX_H3OMJnF_1pS3gcrBL0lo0=",
	                    "uri": "v3/user/avatar/544bf4e8050d88324715f82e6ab97300.jpg"
	                },
	                {
	                    "uid": "7F146067-3ED5-B40B-0BF5-F409BAEB8BAE",
	                    "url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/0952c673476da94db1c72f4478f45165.jpg?e=1468234564&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:KmsXDYuAZbW1OyooXF95z8_yNqw=",
	                    "thumb_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/0952c673476da94db1c72f4478f45165.jpg?imageView2/0/w/100/h/100&e=1468234564&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:vnGsb3dAPsE6mHF-MkLpyqMAb78=",
	                    "uri": "v3/user/avatar/0952c673476da94db1c72f4478f45165.jpg"
	                }
	            ]);
	        }, 1000);
	        return def;
	    }
	}

/***/ },

/***/ 435:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .upload_photo {\r\n        position: relative;\r\n        left: 0;\r\n        top: 0;\r\n        width: 54px;\r\n        height: 54px;\r\n    }\r\n    \r\n\r\n    .upload_photo .delDiv,\r\n    .upload_photo .chooseDiv {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        background-repeat: no-repeat;\r\n        background-size: cover;\r\n        /*background-size: 100%;*/\r\n        /*background-color: red;*/\r\n    }\r\n</style>\r\n<div class=\"upload_photo\">\r\n    <div class=\"delDiv\" v-show=\"imgs.length>0\" :style=\"{backgroundImage:selectImg}|getImageStr\">\r\n\r\n        <div style=\" position: absolute;top:-6px;right: -6px; \">\r\n            <i class=\"weui_icon_clear \" style=\"display: block;color:red;font-size: 16px \" @click=\"delFn() \"></i>\r\n        </div>\r\n    </div>\r\n    <div v-show=\"!imgs.length>0\" class=\"chooseDiv \" @click=\"chooseImage \">\r\n    </div>\r\n    <toast type=\"loading\" v-show=\"loadingToastShow \">上传中...</toast>\r\n</div>";

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

/***/ 490:
/***/ function(module, exports, __webpack_require__) {

	var footerComponent = __webpack_require__(458);
	var settingController = __webpack_require__(487);
	__webpack_require__(432);
	Xa.defineModule('/person/person', function () {
	    return {
	        template: __webpack_require__(491),
	        data: function () {
	            var _this = this;
	            return {
	                photo: "images/default_person.png",//绑定显示的头像
	                phone: "",//绑定显示的电话号码
	                ImgServerIDs: [],//上传的图像
	                loadingToastShow: false,
	                loadingToastText: '',
	                toastText: "没有修改东西",
	                toastShow: false,
	                toastType:"",
	                btns: {
	                    save: {
	                        val: "确定",
	                        btnClass: "weui_btn_disabled weui_btn_primary",
	                        hide: false,
	                        fun: function () {
	                            if (!_this.valid) {
	                                _this.toastType="msg";
	                                _this.toastShow = true;
	                                setTimeout(function () {
	                                    _this.toastShow = false;
	                                }, 1000);
	                                return;
	                            }
	                            _this.loadingToastText = "数据提交中";
	                            _this.loadingToastShow = true;
	                            settingController.upload_avatar({
	                                "media_id": _this.ImgServerIDs[0],
	                                "phone": _this.phone,
	                            }).done(function () {
	                                _this.toastType="",
	                                _this.toastText = "修改成功";
	                                _this.toastShow = true;
	                                setTimeout(function () {
	                                    _this.toastShow = false;
	                                    Router.go("/setting");
	                                }, 1000);
	                            }).fail(function (data) {
	                                alert(data.msg);
	                            }).always(function () {
	                                _this.loadingToastShow = false;
	                            });
	                        }
	                    }
	                }
	            }
	        },
	        computed: {
	            valid: function () {
	                console.count("valid");
	                if (this.phone.length > 8) {
	                    if (this.ImgServerIDs.length > 0 || this.phone !== this.$route.query.phone) {
	                        this.btns.save.btnClass = "weui_btn_primary";
	                        this.toastText = "";
	                        return true;
	                    } else {
	                        this.toastText = "没有修改东西";
	                        this.btns.save.btnClass = "weui_btn_disabled weui_btn_primary";
	                        return false;
	                    }
	                } else {
	                    this.toastText = "手机号码:必填";
	                    this.btns.save.btnClass = "weui_btn_disabled weui_btn_primary";
	                }
	                return false;
	            }
	        },
	        watch: {

	        },
	        methods: {
	        },
	        filters: {
	            getImageStr: function (obj) {
	                if (obj["backgroundImage"]) {
	                    if (!obj["backgroundImage"]) obj["backgroundImage"] = "images/default_person.png";
	                    obj["backgroundImage"] = "url(" + obj["backgroundImage"] + ")";
	                    obj["backgroundImage"];
	                }
	                return obj;
	            }
	        },
	        ready: function () {
	            this.$root.seoPageInfo.title = "个人信息";
	            this.photo = decodeURIComponent(this.$route.query.avatar);
	            this.phone = this.$route.query.phone;
	        },
	        components: {
	            footerComponent: footerComponent.footerComponent,
	        }
	    }
	})

/***/ },

/***/ 491:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .person {\r\n        background-color: #fff;\r\n        padding: 0 10px;\r\n        border-top: 1px solid #cdcdcd;\r\n        border-bottom: 1px solid #cdcdcd;\r\n    }\r\n    \r\n    .person input {\r\n        color: #656565;\r\n        outline: 0;\r\n        border-width: 0;\r\n        border-style: none;\r\n        font-size: 14px;\r\n    }\r\n    \r\n    .person label {\r\n        color: #323232;\r\n        display: inline-block;\r\n        width: 80px;\r\n    }\r\n    \r\n    .msg {\r\n        text-align: center;\r\n        font-size: 14px;\r\n        line-height: 2.4;\r\n        color: red;\r\n    }\r\n    \r\n    .photo_area {\r\n        height: 54px;\r\n        padding: 12px 0;\r\n        border-bottom: 1px solid #e5e5e5;\r\n    }\r\n    \r\n    .photo_area label {\r\n        vertical-align: top;\r\n        /*height: 54px;*/\r\n        line-height: 54px;\r\n    }\r\n    \r\n    .photo_area .photo {\r\n        width: 54px;\r\n        height: 54px;\r\n        display: inline-block;\r\n        background-image: url(\"images/default_person.png\");\r\n        background-repeat: no-repeat;\r\n        background-size: cover;\r\n    }\r\n    \r\n    .person .item {\r\n        padding: 12px 0;\r\n    }\r\n    \r\n    p.valid {\r\n        visibility: hidden;\r\n        color: transparent;\r\n    }\r\n    \r\n    .toast_msg .weui_toast {\r\n        position: fixed;\r\n        z-index: 3;\r\n        width: 100%;\r\n        min-height: 0;\r\n        top: 50%;\r\n        left: 0;\r\n        margin-left: 0;\r\n        background: none;\r\n        text-align: center;\r\n        border-radius: 5px;\r\n        color: #fff;\r\n    }\r\n    \r\n    .toast_msg .weui_toast .weui_toast_content {\r\n        display: inline-block;\r\n        margin: 0 0 15px;\r\n        padding: 10px;\r\n        border-radius: 5px;\r\n        background: rgba(40, 40, 40, .75);\r\n    }\r\n</style>\r\n<div style=\"padding-top: 10px;\">\r\n    <div class=\"person\">\r\n        <div class=\"photo_area\" slot='imgDisplay'>\r\n            <label for=\"photo\">头像</label>\r\n            <div class=\"photo\" :style=\"{backgroundImage:photo}|getImageStr\">\r\n                <person-wx-upload :server-ids.sync=\"ImgServerIDs\"></person-wx-upload>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"item\">\r\n            <label for=\"phone\">手机号码</label>\r\n            <input placeholder=\"\" type=\"tel\" name=\"phone\" v-model=\"phone\">\r\n        </div>\r\n    </div>\r\n</div>\r\n<p class=\"valid\">{{valid}}</p>\r\n<toast :type=\"toastType\" v-show=\"toastShow\">{{ toastText }}</toast>\r\n<toast type=\"loading\" v-show=\"loadingToastShow\">{{ loadingToastText }}</toast>\r\n<footer-component :btns=\"btns\"></footer-component>";

/***/ }

/******/ });