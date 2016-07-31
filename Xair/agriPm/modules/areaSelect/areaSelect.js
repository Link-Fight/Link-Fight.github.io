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

	module.exports = __webpack_require__(412);


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

/***/ }

/******/ });