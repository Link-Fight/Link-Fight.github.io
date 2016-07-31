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

	module.exports = __webpack_require__(518);


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

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

	Vue.component("areaSelect", {
	    template: __webpack_require__(413),
	    props: {
	        show: {
	            type: Boolean,
	            default: false,
	            twoWay: true
	        },
	        selected: {
	            type: Object,
	            require: true,
	            default: function () {
	                return { name: '', id: '' }
	            },
	            // twoWay: true
	        },
	        dateKey: {
	            type: String,
	            required: true,
	        },
	        isShowCountry: {
	            type: Boolean,
	            default: false
	        }
	    },
	    data: function () {
	        return {
	            menus: [
	                {
	                    pid: 0,
	                    id: "",
	                    name: "请选择",
	                    level: 0,
	                }
	            ],
	            pathMenus: [],
	            currentLevel: 0,
	            currentId: 0,
	            store: {},//暂存数据
	            hasDate: false,
	            touch: {
	                time: 0,
	                X: 0,
	                Y: 0,
	                status: "",
	                direction: "",
	                radiusX: "",
	                start: {
	                    X: 0,
	                    Y: 0,
	                },
	                end: {
	                    X: 0,
	                    Y: 0,
	                }
	            },
	            touchConfig: {
	                lastTime: null,
	                oldX: 0,
	                oldY: 0,
	                sleepTime: 10,
	            },
	            horizontal: 0,
	        }
	    },
	    computed: {
	        curlevelActiveId: function () {
	            // console.log("curlevelActiveId");
	            return this.pathMenus.length > 0 && this.currentLevel <= this.pathMenus.length ? this.pathMenus[this.currentLevel - 1].id : "";
	        }
	    },
	    created: function () {
	    },
	    watch: {
	        'show': function (val, oldVal) {
	            if (val) {
	                this.init();
	            }
	        },
	        "selected": function (val, oldVal) {
	            if (val.id) {
	                this.init();
	            }
	            // console.log(JSON.stringify(val));
	            // console.log(JSON.stringify(oldVal));
	        },
	        'pathMenus': function (val, oldVal) {
	            // console.log("pathMenus");
	            if (!this.show) {
	                return;
	            }
	            var menus = [];
	            for (var level = 0; level < this.pathMenus.length; level++) {
	                menus.push({
	                    pid: level > 0 ? this.pathMenus[level - 1].id : 0,
	                    id: this.pathMenus[level].id,
	                    name: this.pathMenus[level].name,
	                    level: level,
	                });
	            }
	            var pid = this.pathMenus.length == 0 ? "0" : this.pathMenus[this.pathMenus.length - 1].id;
	            if (this.store["id" + pid] || this.hasDate) {
	                menus.push({
	                    pid: pid,
	                    id: "",
	                    name: "请选择",
	                    level: this.pathMenus.length == 0 ? 0 : level,
	                })
	                this.hasDate = false;
	            } else {
	                this.currentLevel = this.currentLevel == 0 ? 0 : this.currentLevel - 1;
	            }

	            this.menus = menus;
	        },
	        "touch.status": function (val, oldVal) {
	            if (val == "end") {
	                var _this = this;
	                clearInterval(_this.touch.time);
	                var target = 0;
	                _this.touch.time = setInterval(function () {
	                    var speed = (_this.horizontal) / 4;
	                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	                    console.info("speed" + speed);
	                    _this.horizontal -= speed;
	                    if (Math.abs(_this.horizontal) <= 0) {
	                        clearInterval(_this.touch.time);
	                        _this.horizontal = 0;
	                    }
	                }, 40);
	            } else if (val == "move") {
	                clearInterval(this.touch.time);
	            }
	        },
	        "horizontal": function (val, oldVal) {
	            var indexCurr = 0;
	            if (Math.abs(val) >= 32) {
	                if (val < 0) {//左边
	                    console.log(this.currentLevel);
	                    indexCurr = this.currentLevel - 1;
	                } else {
	                    console.info(this.currentLevel);
	                    indexCurr = this.currentLevel + 1;
	                }
	                var item = this.menus[indexCurr];
	                if (!!item) {
	                    this.currentLevel = indexCurr;
	                    this.menusClick(item);
	                    this.horizontal = -this.horizontal;
	                    clearInterval(this.touch.time);
	                    this.touch.status = "end";
	                }
	            }
	        }
	    },
	    methods: {
	        touchend: function (event) {
	            console.log("touchend")
	            this.touch.status = "end";
	            if (event.touches[0]) {
	                this.touch[this.touch.status].X = event.touches[0].clientX;
	                this.touch[this.touch.status].Y = event.touches[0].clientY;
	            }

	        },
	        touchcancel: function (event) {
	            console.warn("cancel");
	            this.touch.status = "end";
	        },
	        touchstart: function (event) {
	            console.log("touchstart")
	            clearInterval(this.touch.time);
	            this.touch.status = "start";
	            this.touch[this.touch.status].X = event.touches[0].clientX;
	            this.touch[this.touch.status].Y = event.touches[0].clientY;
	            var date = new Date();
	            this.touchConfig.lastTime = date;
	            this.touchConfig.oldX = event.touches[0].clientX;
	            this.touchConfig.oldY = event.touches[0].clientY;

	        },
	        touchMoveHorizontal: function (event) {
	            console.log("touchMoveHorizontal");
	            if (Math.abs(this.horizontal) >= 32) {
	                // this.horizontal = (this.horizontal / this.horizontal) * 102;
	                if (this.horizontal > 0) {
	                    this.horizontal = 32;
	                } else {
	                    this.horizontal = -32;
	                }
	            }
	            this.touch.radiusX = event.touches[0].radiusX;
	            this.touch.X = event.touches[0].clientX;
	            this.touch.Y = event.touches[0].clientY;
	            var date = new Date();
	            this.touch.status = "move";
	            if (date - this.touchConfig.lastTime > this.touchConfig.sleepTime) {
	                if (Math.abs(this.touch.X - this.touchConfig.oldX) > 4 && Math.abs(this.touch.Y - this.touchConfig.oldY) < 40) {
	                    if (this.touch.X < this.touchConfig.oldX) {
	                        this.horizontal -= 4;
	                        this.touch.direction = "L";
	                        console.info("L");
	                    } else {
	                        this.horizontal += 4;
	                        this.touch.direction = "R";
	                        console.log("R")
	                    }
	                    this.touchConfig.oldX = this.touch.X;
	                    this.touchConfig.lastTime = date;
	                }

	            }
	        },
	        init: function () {
	            var _this = this;
	            // console.log(JSON.stringify(this.selected));
	            if (!_this.selected) {
	                _this.selected = {
	                    name: '', id: '',
	                }
	            }
	            // console.log(_this.selected.id + "init#");
	            if (_this.selected.id) {
	                Xa.get('/common/area/up_areas', { id: _this.selected.id }, function (result) {
	                    if (result.status == 200) {
	                        if (result.data.length != 0) {
	                            var dataList = [];
	                            result.data.sort(function (r1, r2) {
	                                return r1.level - r2.level;
	                            });
	                            for (var i = 0; i < result.data.length; i++) {
	                                if (result.data[i].level == 1) {
	                                    if (!_this.store["id0"]) {
	                                        _this.$set("store.id" + "0", result.data[i].data);
	                                    }
	                                } else if (result.data[i].data.length > 0) {
	                                    if (!_this.store["id" + result.data[i - 1].id]) {
	                                        _this.$set("store.id" + result.data[i - 1].id, result.data[i].data);
	                                    }
	                                }
	                                dataList[result.data[i].level - 1] = {
	                                    id: result.data[i].id,
	                                    name: result.data[i].name,
	                                };
	                            }
	                            if (dataList.length > 0) {
	                                do {
	                                    _this.pathMenus.push(dataList.shift());
	                                } while (dataList.length > 0);
	                            }
	                            _this.currentLevel = _this.pathMenus.length;
	                            _this.currentId = _this.selected.id;
	                        }

	                    } else {
	                        alert(result.message);
	                    }
	                });
	            } else {
	                if (_this.store["id0"]) {
	                    _this.currentLevel = 0;
	                    return;
	                }
	                Xa.get('/common/area/areas', { upid: "0" }, function (result) {
	                    if (result.status == 200) {
	                        _this.currentLevel = 0;
	                        _this.$set("store.id0", result.data);
	                    } else {
	                        alert(result.message);
	                    }
	                });

	            }

	        },
	        selectEnd: function () {
	            var _this = this;
	            this.show = false;
	            this.$dispatch('selectEnd', this.current);
	            this.$dispatch('areaComponent-msg', {
	                key: this.dateKey,
	                val: {
	                    id: this.currentId,
	                    name: this.toString(),
	                }
	            });

	            this.pathMenus = [];

	        },
	        clickItem: function (item) {
	            // console.log("clickItem" + JSON.stringify(item));
	            this.hasDate = true;
	            if (!this.store["id" + item.id]) {
	                this.getNextLevelDate(item.id, item.name);
	            }
	            this.nextLevelTabs(item);
	        },
	        getNextLevelDate: function (id, name) {
	            var _this = this;
	            // console.log("getNextLevelDate");
	            Xa.get("/common/area/areas", { upid: id }, function (result) {
	                if (result.status == 200) {
	                    if (result.data.length > 0) {
	                        _this.$set("store.id" + id, result.data);
	                    } else {
	                        // _this.currentId = id;
	                        _this.selectEnd();
	                        return;
	                    }
	                } else {
	                    alert(result.message);
	                    return;
	                }

	            });
	        },
	        menusClick: function (item) {
	            if (!!item) {
	                this.currentLevel = item.level;
	                if (!this.store["id" + item.pid]) {
	                    this.getNextLevelDate(item.pid);
	                }
	            }

	        },
	        nextLevelTabs: function (item) {
	            // console.log("nextLevelTabs");
	            if (this.currentLevel < this.pathMenus.length) {
	                do {
	                    this.pathMenus.pop();
	                } while (this.currentLevel < this.pathMenus.length);
	            }
	            this.currentId = item.id;
	            this.currentLevel++;
	            this.currentShowId = item.id;
	            this.pathMenus.push({
	                id: item.id,
	                name: item.name,
	            });
	        },
	        toString: function () {
	            var str = "";
	            this.pathMenus.forEach(function (element) {
	                str += element.name;
	            });
	            return str;
	        }
	    },
	    filters: {
	        getJsonObj: function (param) {
	            return JSON.stringify(param);
	        }
	    },
	    ready: function () { }
	});



/***/ },

/***/ 413:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .expand-transition {\r\n        position: relative;\r\n        transition: all 0.3s ease;\r\n        left: 0;\r\n    }\r\n    \r\n    .expand-up-transition {\r\n        transition: all 1.3s ease;\r\n        top: 50%;\r\n    }\r\n    \r\n    .expand-enter {\r\n        position: relative;\r\n        opacity: 0;\r\n        left: 100%;\r\n    }\r\n    \r\n    .expand-up-enter {\r\n        top: 100%;\r\n    }\r\n    \r\n    .expand-leave {\r\n        position: relative;\r\n        display: none;\r\n        opacity: 0;\r\n        left: -100%;\r\n    }\r\n    \r\n    .expand-up-leave {\r\n        top: 100%;\r\n    }\r\n    \r\n    .expand-mask-transition {\r\n        transition: all 0.3s ease-in-out;\r\n        right: 0;\r\n    }\r\n    \r\n    .expand-mask-enter .area-tab {\r\n        transition: all 2.3s ease;\r\n        top: 100%;\r\n    }\r\n    \r\n    .expand-mask-leave .area-tab {\r\n        transition: all 2.3s ease;\r\n        top: 100%;\r\n    }\r\n    \r\n    .expand-mask-enter {\r\n        opacity: 0;\r\n        right: -100%;\r\n    }\r\n    \r\n    .expand-mask-leave {\r\n        transition: all .3s ease-in-out;\r\n        opacity: 0。5;\r\n        right: 100%;\r\n    }\r\n    \r\n    #chooseArea .area-tab-menu {\r\n        text-align: left;\r\n    }\r\n    \r\n    #chooseArea .area-tab-menu li {\r\n        display: inline-block;\r\n        padding: 0 5px;\r\n        border-size: content-box;\r\n    }\r\n    \r\n    #chooseArea ..area-tab-con ul {\r\n        padding-bottom: 40px;\r\n    }\r\n    \r\n    #chooseArea .area-menu-item {\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n        white-space: nowrap;\r\n        max-width: 5em;\r\n        display: block;\r\n    }\r\n    \r\n    #chooseArea .area-tab-con {\r\n        overflow: auto;\r\n    }\r\n</style>\r\n<div id=\"chooseArea\" v-show=\"show\" transition=\"expand-mask\" >\r\n    <div class=\"area-mark\" @click=\"selectEnd\"></div>\r\n    <div class=\"area-tab\" v-show=\"show\" transition=\"expand-up\">\r\n        <ul class=\"area-tab-menu\">\r\n            <li v-for=\"item in menus\" :class=\"{active:item.level==currentLevel}\" @click.stop='menusClick(item)'> <span class=\"area-menu-item\"> {{item.name}}</span>\r\n            </li>\r\n        </ul>\r\n        <div class=\"area-tab-con\" >\r\n            <template v-for=\"me in menus\">\r\n                <ul v-show=\"me.level==currentLevel\" style='position:relative' :style=\"{'left':horizontal+'%'}\">\r\n                    <li v-for=\"item in store['id'+me.pid]\" transition=\"expand\" :class=\"{active:item.id == me.id}\" @click.stop=\"clickItem(item)\">\r\n                        {{item.name}}\r\n                    </li>\r\n                </ul>\r\n            </template>\r\n        </div>\r\n    </div>";

/***/ },

/***/ 420:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(421);
	Vue.component("expandDate", {
	    template: __webpack_require__(423),
	    data: function () {
	        return {
	            dateTab: -1,
	            touchConfight: {},
	            format: "",
	            date: {
	                YYYY: "2010",
	                MM: "10",
	                DD: '1',
	                day: '1',
	                HH: "12",
	                mm: "30",
	            }
	        }
	    },
	    props: {
	        showDate: {
	            type: Boolean,
	            required: true,
	            twoWay: true
	        },
	        viewMode: {
	            type: String,
	            required: true,
	            default: "hour",
	        },
	        dateKey: {
	            type: String,
	            required: true,
	        },
	        dateValue: {
	            type: String,
	            default: function () {
	                return ""
	            },
	        }
	    },
	    computed: {
	        weekText: function () {
	            var data = new Date(this.date.YYYY, this.date.MM - 1, this.date.DD);
	            if (data.toString().indexOf('Invalid') == -1) {
	                return this.getWeekText(data.getDay());
	            } else {
	                return "";
	            }
	        },
	        chooseText: function () {
	            console.info(this.viewMode + " " + this.dateValue);
	            if (this.dateTab == -1) {

	                try {
	                    var dateConfig = {
	                        "year": "YYYY",
	                        "month": "YYYY-MM",
	                        "day": "YYYY-MM-DD",
	                        "hour": "YYYY-MM-DD HH:00",
	                        "minute": "YYYY-MM-DD HH:mm",
	                    }
	                    this.viewMode = this.viewMode.toLowerCase();
	                    if(!!dateConfig[this.viewMode]){
	                        this.format = dateConfig[this.viewMode];
	                    }else{
	                        this.viewMode='minute';
	                        this.format='YYYY-MM-DD HH:mm';
	                    }
	                    if (this.dateValue != "undefined") {
	                        var date = new Date(this.dateValue);
	                        if (date.toString().indexOf("Invalid") == -1) {
	                            this.date.YYYY = date.getFullYear();
	                            this.date.MM = date.getMonth() + 1;
	                            this.date.DD = date.getDate();
	                            this.date.day = date.getDay();
	                            this.date.HH = date.getHours();
	                            this.date.mm = date.getMinutes();
	                        }
	                    }

	                } catch (e) {

	                }
	                this.dateTab = 0;
	            }
	            if (this.dateTab == 0) {
	                return '选择';
	            }
	            if (this.dateTab == 1) {
	                return '选择年';
	            }
	            if (this.dateTab == 2) {
	                return !!this.date.YYYY ? this.date.YYYY + '年' : "选择月";
	            }
	            if (this.dateTab == 3) {
	                return !!this.date.DD ? this.date.YYYY + "年" + this.date.MM + '月' : "选择日";
	            }
	        }
	    },
	    watch: {
	    },
	    methods: {
	        touchFun: function (key, event) {
	            var _this = this;
	            if (event.type == 'touchmove') {
	                var date = new Date();
	                var touchY = event.touches[0].clientY;
	                var touchConfight = _this.$data.touchConfight[key];
	                if (!touchConfight) {
	                    var clientRects = event.currentTarget.getBoundingClientRect()
	                    var sleepTime = 50;
	                    if (key == "HH") {
	                        sleepTime = 120;
	                    }
	                    _this.$data.touchConfight[key] = touchConfight = {
	                        lastTime: date,
	                        oldY: touchY,
	                        sleepTime: sleepTime,
	                    }
	                }
	                if (date - touchConfight.lastTime > touchConfight.sleepTime) {
	                    touchConfight.lastTime = date;
	                    if (touchY < touchConfight.oldY) {
	                        _this.mHandleNum(key, 'UP', event);
	                    } else {
	                        _this.mHandleNum(key, 'DOWN', event);
	                    }
	                    touchConfight.oldY = touchY;
	                }
	            }
	        },
	        mHandleNum: function (key, action, event) {
	            var num = +this.date[key];
	            if (action == "UP") {
	                num++;
	            } else if (action == "DOWN") {
	                num--;
	            }
	            if (key == "HH") {
	                num = (num + 24) % 24;
	            } else if (key == 'mm') {
	                num = (num + 60) % 60;
	            } else if (key == 'MM') {
	                num = (num + 12) % 12;
	                if (num == 0)
	                    num = 12;
	            } else if (key == "DD") {
	                var days = new Date(this.date.YYYY, this.date.MM, 0).getDate();
	                num = (num + days) % days;
	                if (num == 0) {
	                    num = days;
	                }
	            }
	            if (num <= 9) {
	                num = "0" + "" + num;
	            }
	            this.date[key] = num;
	        },
	        clickFn: function (key, action, event) {
	            this.mHandleNum.apply(this, arguments);
	        },
	        changeTab: function (num) {
	            if (num == 2 && !this.date.YYYY) return;
	            if (num == 3 && !this.date.MM) return;
	            this.dateTab = num;
	        },
	        goHome: function () {
	            this.dateTab = 0;
	        },
	        finishDate: function () {
	            if (this.dateTab == 0) {
	                this.dateTab = -1;
	                this.showDate = false;
	                console.info(this.toString());
	                this.$dispatch('dateComponent-msg', {
	                    key: this.dateKey,
	                    val: this.toString(),
	                });
	            }
	            this.goHome();
	        },
	        cancelDate: function () {
	            this.showDate = false;
	        },
	        toString: function () {
	            var result = this.format;
	            result = result.replace("YYYY", this.date.YYYY);
	            if ((this.date.MM + "").length == 1) {
	                this.date.MM = "0" + this.date.MM;
	            }
	            if ((this.date.DD + "").length == 1) {
	                this.date.DD = "0" + this.date.DD;
	            }
	            if ((this.date.HH + "").length == 1) {
	                this.date.HH = "0" + this.date.HH;
	            }
	            if ((this.date.mm + "").length == 1) {
	                this.date.mm = "0" + this.date.mm;
	            }
	            result = result.replace("MM", this.date.MM);
	            result = result.replace("DD", this.date.DD);
	            result = result.replace("HH", this.date.HH);
	            result = result.replace("mm", this.date.mm);
	            return result;
	        },
	        getWeekText: function (num) {
	            if (num == 1) return '星期一';
	            if (num == 2) return '星期二';
	            if (num == 3) return '星期三';
	            if (num == 4) return '星期四';
	            if (num == 5) return '星期五';
	            if (num == 6) return '星期六';
	            if (num == 0) return '星期天';
	        },
	        initDate: function () {
	            var mDate = new Date();
	            this.date.YYYY = mDate.getFullYear();
	            this.date.MM = mDate.getMonth() + 1;
	            this.date.DD = mDate.getDate();
	            this.date.day = mDate.getDay();
	            this.date.HH = "12";
	            this.date.mm = "30";
	        },
	    },
	    filters: {
	        filNum: function (num, key, action) {
	            num = parseInt(num);
	            var addVar = "";
	            if (num == -1) {
	                if (key == 'HH') {
	                    num += 24;
	                } else if (key == 'mm') {
	                    num += 60;
	                }
	            }
	            if (key == 'YYYY') {
	                addVar = '年';
	            }
	            if (key == 'HH' && num == 24) {
	                num = '00';
	            }
	            if (key == 'mm' && num == 60) {
	                num = '00';
	            }
	            if (key == 'MM') {
	                addVar = '月';
	                if (num != 12) {
	                    num = (num + 12) % 12;
	                }
	                if (num == 0) {
	                    num = 12;
	                }
	            }
	            if (key == 'DD') {
	                addVar = '日';
	                var days = new Date(this.date.YYYY, this.date.MM, 0).getDate();
	                if (num != days) {
	                    num = (num + days) % days;

	                }
	                if (num == 0) {
	                    num = days;
	                }
	            }
	            if ((num + '').length < 2) {
	                num = "0" + "" + num;
	            }
	            return num + addVar;
	        }
	    },
	    created: function () {
	        this.initDate();
	    },
	    ready: function () {
	        var _this = this;
	        this.$el.addEventListener('touchmove', function (e) {
	            e.preventDefault();
	        }, false);
	    }
	});


/***/ },

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(422);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(395)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 422:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(394)();
	// imports


	// module
	exports.push([module.id, ".date-choose{position:fixed;top:0;right:0;width:100%;height:100%;overflow:hidden;z-index:100;}\r\n.date-cover{width:100%;height:100%;background:rgba(0,0,0,.5);position:absolute;top:0;left:0;}\r\n.date-main{position:fixed;right:0;top:0;width: 100%; max-width:280px;height:100%;background:#F2F2F2;text-align:center;}\r\n.date-header{position:fixed;top:0;right:0;width: 100%; max-width:280px;background:white;line-height:40px;height:40px;border-bottom:1px solid #ddd;box-shadow: 0 0 8px #ccc;z-index:1;}\r\n.date-header>div{margin:7px 10px !important;}\r\n.date-header>div:first-child{color:black;}\r\n.date-home{text-align:left;}\r\n.date-container{height:100%;background:white;overflow-x: hidden;overflow-y: auto;}\r\n.date-container a{color:black;}\r\n.date-clear{position:absolute;bottom:0;width:92%;margin:10px 0;border:1px solid #ccc;line-height:36px;background:white;-webkit-transform:translate(4%,0);}\r\n\r\n.data-cancel {\r\n            position: absolute;\r\n            left: 0;\r\n}\r\n .date-save {\r\n            position: absolute;\r\n            bottom: 0;\r\n            width: 92%;\r\n            margin: 10px 0;\r\n            border: 1px solid #ccc;\r\n            color: #fff;\r\n            line-height: 36px;\r\n            background: #04be02;\r\n            border-radius:5px;\r\n            -webkit-transform: translate(4%, 0);\r\n}\r\n\r\n.date-container .date_select_container {\r\n            font-size: 14px;\r\n            display: inline-block;\r\n            width: 50%;\r\n}\r\n.date-container .date_select_container.onlyHour{\r\n      display:block;\r\n      width: 100%;\r\n}\r\n\r\n .date_select_container.onlyHour .select_HH{\r\n        padding: 10px 40px 10px 40px;\r\n }\r\n.date-container li {\r\n            list-style: none;\r\n            color: #666;\r\n            text-align: center;\r\n            padding:5px 0;\r\n        }\r\n\r\n.select_item_center {\r\n            font-size: 17px;\r\n            font-weight: bold;\r\n            padding: 5px 0;\r\n            color: #000;\r\n            border-top: 3px solid #04be02;\r\n            border-bottom: 3px solid #04be02;\r\n        }\r\n\r\n  .date_select_containers {\r\n            padding: 0 10px;\r\n        }\r\n        \r\n        .date_select_container .select_HH {\r\n            padding: 10px 10px 10px 40px;\r\n        }\r\n        \r\n        .date_select_container .select_mm {\r\n            padding: 10px 40px 10px 10px;\r\n        }\r\n          .date_select_containers .selects .select_item_center {\r\n            font-size: 20px;\r\n        }\r\n        \r\n        .date_select_containers .selects .select_item_next {\r\n            font-size: 16px;\r\n            padding: 4px 0;\r\n        }\r\n        \r\n        .date_select_containers .selects li {\r\n            font-size: 14px;\r\n            padding: 8px 0;\r\n        }\r\n        ", ""]);

	// exports


/***/ },

/***/ 423:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .expand-transition {\r\n        transition: all 0.3s ease;\r\n        left: 0;\r\n    }\r\n    \r\n    .expand-enter {\r\n        opacity: 0;\r\n        left: 100%;\r\n    }\r\n    \r\n    .expand-leave {\r\n        display:none;\r\n        opacity: 0;\r\n        left: -100%;\r\n    }\r\n    \r\n    .expand-mask-transition {\r\n        transition: all 0.3s ease-in-out;\r\n        right: 0;\r\n    }\r\n    \r\n    .expand-mask-enter {\r\n        opacity: 0;\r\n        right: -100%;\r\n    }\r\n    \r\n    .expand-mask-leave {\r\n        transition: all .3s ease-in-out;\r\n        background-color: blue;\r\n        opacity: 0。5;\r\n        right: 100%;\r\n    }\r\n</style>\r\n<div class=\"date-choose\"  v-if=\"showDate\"  transition=\"expand-mask\">\r\n    <div class=\"date-cover\" @click.self.stop=\"cancelDate\"></div>\r\n    <div class=\"date-main\">\r\n        <div class=\"date-header clearfix\">\r\n            <div @click=\"cancelDate\" class=\"data-cancel weui_btn weui_btn_mini\">取消</div>\r\n            <span>{{ chooseText }}</span>\r\n        </div>\r\n        <div class=\"date-container\">\r\n            <div style=\"height:40px;\"></div>\r\n            <div v-show=\"dateTab==0\" transition=\"expand\" class=\"date-home weui_cells weui_cells_access\">\r\n                <a @click=\"changeTab(1)\" class=\"weui_cell\" href=\"javascript:;\">\r\n                    <div class=\"weui_cell_bd weui_cell_primary\">\r\n                        <p>年</p>\r\n                    </div>\r\n                    <div class=\"weui_cell_ft\">{{ date.YYYY ? date.YYYY : '' |filNum 'YYYY'}}</div>\r\n                </a>\r\n                <template v-if=\"viewMode!='year'\">\r\n                    <a @click=\"changeTab(2)\" class=\"weui_cell\" href=\"javascript:;\">\r\n                        <div class=\"weui_cell_bd weui_cell_primary\">\r\n                            <p>月</p>\r\n                        </div>\r\n                        <div class=\"weui_cell_ft\">{{ date.MM?date.MM:''|filNum 'MM'}}</div>\r\n                    </a>\r\n                </template>\r\n                <template v-if=\"viewMode!='year'&&viewMode!='month'\">\r\n                    <a @click=\"changeTab(3)\" class=\"weui_cell\" href=\"javascript:;\">\r\n                        <div class=\"weui_cell_bd weui_cell_primary\">\r\n                            <p>日</p>\r\n                        </div>\r\n                        <div class=\"weui_cell_ft\">{{ date.DD?date.DD:''|filNum 'DD'}}</div>\r\n                    </a>\r\n                    <div class=\"weui_cell\">\r\n                        <div class=\"weui_cell_bd weui_cell_primary\" style=\"color:green;text-align:center;\">\r\n                            {{weekText }}\r\n                        </div>\r\n                    </div>\r\n                </template>\r\n                <template v-if=\"viewMode!='year'&&viewMode!='month'&&viewMode!='day'\">\r\n                    <div class=\"weui_cell \">\r\n                        <div class=\"weui_cell_bd weui_cell_primary\" style=\"color:green;text-align:center;\">\r\n                            <span>{{date.HH}}</span>\r\n                            <span style='color:#666;'>   \r\n                                时\r\n                               <template v-if=\"viewMode=='minute'\">\r\n                                 </span><span style=\"color:green;\"> {{date.mm}}</span>\r\n                            <span style='color:#666;'>\r\n                            分\r\n                            </template>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div style=\"font-size:0;\">\r\n                        <div class=\"date_select_container\" :class=\"{'onlyHour':viewMode=='hour'?true:false}\" @touchmove.stop.prevent=\"touchFun('HH',$event)\">\r\n                            <ul class=\"select_HH\">\r\n                                <li @click=\"clickFn('HH','DOWN',$event)\">\r\n                                    {{+date.HH-1|filNum 'HH'}}\r\n                                </li>\r\n                                <li class=\"select_item_center\">\r\n                                    {{+date.HH |filNum 'HH'}}\r\n                                </li>\r\n                                <li @click=\"clickFn('HH','UP',$event)\">\r\n                                    {{+date.HH+1|filNum 'HH'}}\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <template v-if=\"viewMode=='minute'\">\r\n                            <div class=\"date_select_container\">\r\n                                <ul class=\"select_mm\" @touchmove.stop.prevent=\"touchFun('mm',$event)\">\r\n                                    <li @click=\"clickFn('mm','DOWN',$event)\">\r\n                                        {{+date.mm-1 |filNum 'mm'}}\r\n                                    </li>\r\n                                    <li class=\"select_item_center\">\r\n                                        {{+date.mm |filNum 'mm'}}\r\n                                    </li>\r\n                                    <li @click=\"clickFn('mm','UP',$event)\">\r\n                                        {{+date.mm+1 |filNum 'mm'}}\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </template>\r\n                    </div>\r\n                </template>\r\n            </div>\r\n            <div v-show=\"dateTab==1\" transition=\"expand\" class=\"date-year weui_cells weui_cells_access\">\r\n                <div class=\"date_select_containers\" @touchmove.stop.prevent=\"touchFun('YYYY',$event)\">\r\n                    <ul class=\"selects\">\r\n                        <li @click=\"clickFn('YYYY','DOWN',$event)\">\r\n                            {{+date.YYYY-2 |filNum 'YYYY'}}\r\n                        </li>\r\n                        <li class=\"select_item_next\" @click=\"clickFn('YYYY','DOWN',$event)\">\r\n                            {{+date.YYYY-1 |filNum 'YYYY'}}\r\n                        </li>\r\n                        <li class=\"select_item_center\" @click='finishDate'>\r\n                            {{date.YYYY |filNum 'YYYY'}}\r\n                        </li>\r\n                        <li class=\"select_item_next\" @click=\"clickFn('YYYY','UP',$event)\">\r\n                            {{date.YYYY+1 |filNum 'YYYY'}}\r\n                        </li>\r\n                        <li @click=\"clickFn('YYYY','UP',$event)\" \">\r\n                                {{+date.YYYY+2 |filNum 'YYYY'}}\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n                <div v-show=\"dateTab==2\" transition=\"expand\" class=\"date-month weui_cells weui_cells_access \">\r\n                    <div class=\"date_select_containers \" @touchmove.stop.prevent=\"touchFun( 'MM',$event) \">\r\n                        <ul class=\"selects \">\r\n                            <li @click=\"clickFn( 'MM', 'DOWN',$event) \">\r\n                                {{+date.MM-2|filNum 'MM'}}\r\n                            </li>\r\n                            <li class=\"select_item_next \" @click=\"clickFn( 'MM', 'DOWN',$event) \">\r\n                                {{+date.MM-1 |filNum 'MM'}}\r\n                            </li>\r\n                            <li class=\"select_item_center \" @click='finishDate'>\r\n                                {{+date.MM |filNum 'MM'}}\r\n                            </li>\r\n                            <li class=\"select_item_next \" @click=\"clickFn( 'MM', 'UP',$event) \">\r\n                                {{+date.MM+1 |filNum 'MM'}}\r\n                            </li>\r\n                            <li @click=\"clickFn( 'MM', 'UP',$event) \">\r\n                                {{+date.MM+2 |filNum 'MM'}}\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n                <div v-show=\"dateTab==3\" transition=\"expand\" class=\"date-day weui_cells weui_cells_access \">\r\n                    <div class=\"date_select_containers \" @touchmove.stop.prevent=\"touchFun( 'DD',$event) \">\r\n                        <ul class=\"selects \">\r\n                            <li @click=\"clickFn( 'DD', 'DOWN',$event) \" style='font-size:12px'>\r\n                                {{+date.DD-3|filNum 'DD'}}\r\n                            </li>\r\n                            <li @click=\"clickFn( 'DD', 'DOWN',$event) \">\r\n                                {{+date.DD-2|filNum 'DD'}}\r\n                            </li>\r\n                            <li class=\"select_item_next \" @click=\"clickFn( 'DD', 'DOWN',$event) \">\r\n                                {{+date.DD-1 |filNum 'DD'}}\r\n                            </li>\r\n                            <li class=\"select_item_center \" @click='finishDate'>\r\n                                {{+date.DD |filNum 'DD' 'ANUM'}}\r\n                            </li>\r\n                            <li class=\"select_item_next \" @click=\"clickFn( 'DD', 'UP',$event) \">\r\n                                {{+date.DD+1 |filNum 'DD'}}\r\n                            </li>\r\n                            <li @click=\"clickFn( 'DD', 'UP',$event) \">\r\n                                {{+date.DD+2 |filNum 'DD'}}\r\n                            </li>\r\n                            <li @click=\"clickFn( 'DD', 'UP',$event) \" style='font-size:12px'>\r\n                                {{+date.DD+3 |filNum 'DD'}}\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                    <div class=\"weui_cell \">\r\n                            <div class=\"weui_cell_bd weui_cell_primary \" style=\"color:green;text-align:center; \">\r\n                                {{weekText }}\r\n                            </div>\r\n                        </div>\r\n                </div>\r\n                <div @click=\"finishDate \" class=\"date-save \">\r\n                    确定\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>";

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

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

	var menusComponent = __webpack_require__(451);
	var settingController = __webpack_require__(487);
	var wxContrlller = __webpack_require__(433);
	__webpack_require__(420);
	__webpack_require__(412);
	Xa.defineModule('/setting/setting', function () {
	    var RouterMap = {
	        "person": function (data) {
	            return "/person" + "?avatar=" + encodeURIComponent(data.avatar.thumb_url) + "&phone=" + data.phone
	        },
	        "password": function () {
	            return "/password";
	        }
	    };
	    return {
	        template: __webpack_require__(519),
	        data: function () {
	            return {
	                displayLoading: true,
	                person: {
	                    "avatar": ""
	                },
	                toDoList: [
	                    {
	                        text: "修改密码",
	                        value: "password",
	                        icon: "icon-xiugaimima",
	                    },

	                ],
	                dateComponent: {
	                    status: false,
	                    key: "",
	                    val: "",
	                    viewMode: "hour",
	                },
	                variables: {
	                    day: "2010-09-01"
	                },
	                areaComponent: {
	                    show: false,
	                    key: "",
	                    current: {
	                        name: "",
	                        id: ""
	                    }
	                },
	                barChartLoading:true,
	                barChartOption: {

	                }
	            }
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
	        methods: {
	            gotoFn: function (key) {
	                Router.go(RouterMap[key](this.person));
	            },
	            previewImage: function (url) {
	                if (!url) {
	                    return;
	                }
	                var urls = [];
	                // urls.push("https://m.baidu.com/static/index/plus/plus_logo.png");
	                // console.log(url);
	                // alert(url);
	                urls.push(url)
	                wxContrlller.previewImage(url, urls);
	            },
	            showDateFn: function (key, val, viewMode) {
	                this.dateComponent.key = key;
	                this.dateComponent.val = val;
	                this.dateComponent.viewMode = viewMode;
	                this.dateComponent.status = true;
	            },
	            showAreaFu: function (key, val) {
	                console.log("showAreaFu@" + key + " " + val + " ");
	                if (!!val) {
	                    this.areaComponent.current.name = val.name;
	                    this.areaComponent.current.id = val.id;
	                }
	                this.areaComponent.key = key;
	                this.areaComponent.show = true;
	            },
	        },
	        events: {
	            'dateComponent-msg': function (params) {
	                this.$set(params.key, params.val);
	            },
	            'areaComponent-msg': function (params) {
	                console.log('areaComponent-msg', JSON.stringify(params));
	                this.$set(params.key, params.val);
	            },
	        },
	        created: function () {
	            var _this = this;
	            settingController.get_user_info({}).done(function (data) {
	                _this.person = data;
	                console.log(JSON.stringify(_this.person.avatar));
	            }).fail(function (data) {
	                alert(data.msg);
	            }).always(function (data) {
	                _this.displayLoading = false;
	            });
	            setTimeout(function () {
	                _this.barChartLoading = false;
	                _this.barChartOption = {
	                    tooltip: {
	                        trigger: 'item',
	                        formatter: "{a} <br/>{b}: {c} ({d}%)"
	                    },
	                    legend: {
	                        orient: 'vertical',
	                        x: 'left',
	                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', ' ']
	                    },
	                    series: [
	                        {
	                            name: '访问来源',
	                            type: 'pie',
	                            radius: ['50%', '70%'],
	                            avoidLabelOverlap: false,
	                            label: {
	                                normal: {
	                                    show: false,
	                                    position: 'center'
	                                },
	                                emphasis: {
	                                    show: true,
	                                    textStyle: {
	                                        fontSize: '30',
	                                        fontWeight: 'bold'
	                                    }
	                                }
	                            },
	                            labelLine: {
	                                normal: {
	                                    show: false
	                                }
	                            },
	                            data: [
	                                { value: 335, name: '直接访问' },
	                                { value: 310, name: '邮件营销' },
	                                { value: 234, name: '联盟广告' },
	                                { value: 135, name: '视频广告' },
	                                { value: 1548, name: '搜索引擎' }
	                            ]
	                        }
	                    ]
	                };

	            }, 10000);
	        },
	        ready: function () {
	            this.$root.seoPageInfo.title = "设置";
	        },
	        components: {
	            menusComponent: menusComponent.menusComponent,
	        }
	    }
	})

/***/ },

/***/ 519:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .setting {\r\n        padding-top: 11px;\r\n        margin-bottom: 80px;\r\n    }\r\n    \r\n    .setting .head {\r\n        position: relative;\r\n        padding: 12px;\r\n        padding-right: 0;\r\n        border-top: 1px solid #cdcdcd;\r\n        border-bottom: 1px solid #cdcdcd;\r\n        background-color: #fff;\r\n        height: 54px;\r\n        clear: both;\r\n    }\r\n    \r\n    .setting .head .img {\r\n        width: 54px;\r\n        height: 54px;\r\n        float: left;\r\n        margin-right: 14px;\r\n        background-repeat: no-repeat;\r\n        background-image: url(\"images/default_person.png\");\r\n        background-size: cover;\r\n    }\r\n    \r\n    .setting .head .name {\r\n        color: #323232;\r\n        font-size: 16px;\r\n        line-height: 32px;\r\n        vertical-align: middle;\r\n    }\r\n    \r\n    .setting .head .title {\r\n        color: #656565;\r\n        line-height: 18px;\r\n    }\r\n    \r\n    .setting a.weui_cells {\r\n        padding: 5px 15px;\r\n        margin-top: 10px;\r\n    }\r\n    \r\n    .setting .iconfont {\r\n        font-size: 22px;\r\n        line-height: 32px;\r\n        margin-right: 10px;\r\n    }\r\n    \r\n    .setting .head .icon-xiangyou {\r\n        position: absolute;\r\n        right: 0;\r\n        top: 25px;\r\n        width: 30px;\r\n        font-size: 26px;\r\n        color: #c8c8cc;\r\n    }\r\n    \r\n    .chart {\r\n        width: 100%;\r\n        height: 400px;\r\n    }\r\n</style>\r\n<div class=\"setting\" :class=\"{'global-loading':displayLoading,'global-no-data':!displayLoading&&!!!person.name}\">\r\n    <div v-show=\"!displayLoading&&!!person.name\">\r\n        <div class=\"head\" @click=\"gotoFn('person')\">\r\n            <div class=\"img\" :style=\"{backgroundImage:person.avatar.thumb_url}|getImageStr\" @click.stop=\"previewImage(person.avatar.url)\"></div>\r\n            <p class=\"name\">\r\n                {{person.name}}\r\n            </p>\r\n            <p class=\"title\">\r\n                {{person.position}}\r\n            </p>\r\n            <i class=\"iconfont icon-xiangyou\"></i>\r\n        </div>\r\n        <div class=\"weui_cells weui_cells_access \">\r\n            <a class=\"weui_cell\" href=\"javascript:;\" v-for=\"item in toDoList\" @click=\"gotoFn(item.value)\">\r\n                <div class=\"weui_cell_hd\">\r\n                    <i class=\"iconfont\" :class=\"item.icon\"></i>\r\n                </div>\r\n                <div class=\"weui_cell_bd weui_cell_primary\">\r\n                    <p>{{item.text}}</p>\r\n                </div>\r\n                <div class=\"weui_cell_ft\"></div>\r\n\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"chart\" v-echarts=\"barChartOption\" :loading=\"barChartLoading\"></div>\r\n\r\n<expand-date :show-Date.sync='dateComponent.status' v-if=\"dateComponent.status\" :date-key='dateComponent.key' :date-value=\"dateComponent.val\"\r\n    :view-Mode='dateComponent.viewMode'></expand-date>\r\n<menus-component></menus-component>";

/***/ }

/******/ });