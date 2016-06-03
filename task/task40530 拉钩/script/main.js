
!(function (win) {
    // "use strict";
    // JavaScript Document

    var startMove = function startMove(obj, json, endFn, speed) {

        clearInterval(obj.timer);
        obj.timer = setInterval(function () {

            var bBtn = true;

            for (var attr in json) {

                var iCur = 0;

                if (attr == 'opacity') {
                    if (Math.round(parseFloat(getStyle(obj, attr)) * 100) == 0) {
                        iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);

                    }
                    else {
                        iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100) || 100;
                    }
                } else if (attr.indexOf('scroll') > -1) {
                    iCur = obj[attr];
                }
                else {
                    iCur = parseInt(getStyle(obj, attr)) || 0;
                }

                var iSpeed = (json[attr] - iCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != json[attr]) {
                    bBtn = false;
                }

                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                    obj.style.opacity = (iCur + iSpeed) / 100;

                }
                else if (attr.indexOf("scroll") > -1) {
                    obj[attr] = iCur + iSpeed;
                }
                else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }


            }

            if (bBtn) {
                clearInterval(obj.timer);

                if (endFn) {
                    endFn.call(obj);
                }
            }

        }, speed || 30);

    }


    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        else {
            return getComputedStyle(obj, false)[attr];
        }
    }



    /**
     * @param  {any} function(
     * 获得的添加事件处理代码
     */
    var addEvent = (function () {
        if (document.addEventListener) {
            return function (el, type, fn) {
                el.addEventListener(type, fn, false);
            };
        } else {
            return function (el, type, fn) {
                el.attachEvent('on' + type, function () {
                    return fn.call(el, window.event);
                });
            }
        }
    })();

    /**
     * @param  {any} function
     * 获得移除事件的代码
     */
    var removeEvent = (function () {
        if (document.removeEventListener) {
            return function (el, type, fn) {
                el.removeEventListener(type, fn, false);
            };
        } else {
            return function (el, type, fn) {
                el.detachEvent("on" + type, fn);
            }
        }
    })();



    /**
     * @param  {any} event 阻止事件冒泡
     */
    var stopPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    };

    /**
     * @param  {any} event 阻止默认行为
     */
    var preventDefault = function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    /**
    * @param  {function} fn 
    */
    var onloadEvent = function (fn) {
        if (typeof fn !== "function") {
            return null;
        }
        var oldEvent = window.onload;
        if (typeof oldEvent !== "function") {
            window.onload = fn;
        } else {
            window.onload = function () {
                oldEvent();
                fn();
            }
        }
    }


    /**
     * @param  {any} fn
     * 简单模仿jquery的ready时间
     */
    var readyEvent = function (fn) {
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function () {
                //注销事件, 避免反复触发
                // console.count("2");
                document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                fn();            //执行函数
            }, false);
        } else if (document.attachEvent) {        //IE
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState == 'complete') {
                    document.detachEvent('onreadystatechange', arguments.callee);
                    fn();        //函数执行
                }
            });
        }
    };
    /**
     * @param  {any} function
     * ready事件是在DOM模型构造完毕时触发
     * load事件是在页面加载完毕后触发
     */
    var whenReady = (function () {
        var funcs = [];
        var ready = false;

        function handler(e) {
            if (ready) return;

            if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
                return;
            }

            for (var i = 0; i < funcs.length; i++) {
                funcs[i].call(document);
            }

            ready = true;
            funcs = null;

        }

        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", handler, false);
            document.addEventListener("readystatechange", handler, false);
            window.addEventListener("load", handler, false);
        } else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", handler);
            window.attachEvent("onload", handler);
        }

        return function (fn) {
            if (ready) { fn.call(document); }
            else {
                funcs.push(fn);
            }
        }
    })();

    var $$all = function (sector) {
        return document.querySelectorAll(sector);
    };
    var toggleClass = function (ele, cls) {
        var mEle = Array.prototype.slice.call(ele, 0);
        mEle.length == 0 && (mEle = [ele]);
        mEle.forEach(function (ele) {
            var mClass = ele.className.split(" ");
            var newClass = mClass.filter(function (value, index, arr) {
                return value !== cls;
            });
            if (mClass.length == newClass.length) {
                newClass[newClass.length] = cls;
            }
            ele.className = newClass.join(" ");
        });

    };
    var addClass = function (ele, cls) {
        var mEle = Array.prototype.slice.call(ele, 0);
        mEle.length == 0 && (mEle = [ele]);
        mEle.forEach(function (ele) {
            var mClass = ele.className.split(" ");
            var newClass = mClass.filter(function (value, index, arr) {
                return value !== cls;
            });
            if (mClass.length == newClass.length) {
                mClass[mClass.length] = cls;
            }
            ele.className = mClass.join(" ");
        });

    };
    var removeClass = function (ele, cls) {
        var mEle = Array.prototype.slice.call(ele, 0);
        mEle.length == 0 && (mEle = [ele]);
        mEle.forEach(function (ele) {
            var mClass = ele.className.split(" ");
            var newClass = mClass.filter(function (value, index, arr) {
                return value !== cls;
            });
            ele.className = newClass.join(" ");
        });
    };

    /**
     * @param {canvas} canvas 要保存的canvas对象
     * @param {string} type 保存成图片的格式
     * @param {string} filename 文件名 
     * 
     */
    var saveCanvas = function (canvas, type, filename) {
        type = type || "png";
        filename = filename ? filename + (new Date().toLocaleString()) + "." + type : (new Date().toLocaleString()) + "." + type;
        /**
         *  得到的数据格式是：data:image/png;base64,...
         */
        var imgData = canvas.toDataURL(type);

        /**
         * @param  {any} type
         * @return 
         */
        var _fixType = function (type) {
            type = type.toLowerCase().replace(/jpg/i, 'jpeg');
            var r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
        };
        /**
         * 将mime-type改为image/octet-stream，强制让浏览器直接download;
         */
        imgData = imgData.replace(_fixType(type), "image/octet-stream");


        var saveFile = function (data, filename) {
            var save_link = document.createElement("a");
            save_link.href = data;
            save_link.download = filename;

            var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
        };
        saveFile(imgData, filename);
    }

    /**
    * 简单的防抖函数
    * 就是时间触发后wait 毫秒后，callback事件才被执行
    */
    var debounce = function (callBackFunc, wait) {
        var timeout;
        wait = wait || 0;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(callBackFunc.bind(this), wait);
        };
    }
    /**函数节流
     * @param  {any} callBackFunc
     * @param  {any} wait
     * 事件会每隔wait毫秒就会触发一次
     */
    var throttle = function (callBackFunc, wait) {
        var timeout;
        wait = wait || 0;
        return function () {
            if (!!!timeout) {
                timeout = setTimeout(function () {
                    callBackFunc();
                    timeout = null;
                }.bind(this), wait);
            }
        };
    }

    win.addEvent = addEvent;
    win.$$all = $$all;
    win.toggleClass = toggleClass;
    win.addClass = addClass;
    win.removeClass = removeClass;
    win.startMove = startMove;
    win.saveCanvas = saveCanvas;
    win.readyEvent = readyEvent;
    win.whenReady = whenReady;
    win.debounce = debounce;
    win.throttle = throttle;
})(window);

readyEvent(function () {
    // 为公司列 提供鼠标移入移出效果
    console.trace(window.event.type);
    console.log("readyEvent");
    var showCompanyLiView = document.querySelectorAll(".showCompany>ul>li")
    for (var i = 0, len = showCompanyLiView.length; i < len; i++) {
        addEvent(showCompanyLiView[i], "mouseenter", showLiViewMouseenter);
        addEvent(showCompanyLiView[i], "mouseleave", showLiViewMouseleave);
    }
    function showLiViewMouseenter(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName == "LI") {
            // console.log(target);
            var dirctionModel = new DirctionModel(0, 0, 113);
            var info = target.getElementsByClassName("info")[0];
            if (!!!info) return false;
            dirctionModel.x = e.offsetX;
            dirctionModel.y = e.offsetY;
            // console.log(dirctionModel.getDirc());
            var dirctionViewState = dirctionModel.getDirction();
            info.style.top = dirctionViewState.top + "px";
            info.style.left = dirctionViewState.left + "px";
            startMove(info, { top: 0, left: 0 }, null, 16);
        }
    }
    function showLiViewMouseleave(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        // console.info(target);
        if (target.nodeName == "LI") {
            var dirctionModel = new DirctionModel(0, 0, 113);
            var info = target.getElementsByClassName("info")[0];
            if (!!!info) return false;
            dirctionModel.x = e.offsetX;
            dirctionModel.y = e.offsetY;
            var dirctionViewState = dirctionModel.getDirction();
            startMove(info, dirctionViewState, null, 16);
        }
    }
});

whenReady(function () {
    console.trace(window.event.type);
    console.log("whenReady");
    window.addEventListener("scroll", throttle(function () {
        var fixDiv = document.getElementById("fixed");
        if (fixDiv["data-offsetTop"] === undefined) {
            fixDiv["data-offsetTop"] = fixDiv.offsetTop;
            fixDiv["data-top"] = fixDiv.style.top;
        }
        if (fixDiv["data-offsetTop"] < document.body.scrollTop) {
            fixDiv.style.position = "fixed";
            fixDiv.style.top = "0";
        } else {
            fixDiv.style.position = "relative";
            fixDiv.style.top = fixDiv["data-top"] + "px";
        }
    }, 20), false);
});

window.onload = function () {
    console.trace(window.event.type);
    console.log("onload");
    //为搜索输入 切换placeholder 以及dropDownList
    var searchInpt = document.getElementById("search_input");
    addEvent(searchInpt, "blur", function () {
        var guessDiv = document.getElementsByClassName("guess_search")[0];
        guessDiv.style.display = "none";
        var temp = this.placeholder;
        this.placeholder = this.getAttribute("data-tg-ph")
        this.setAttribute("data-tg-ph", temp);
    });
    addEvent(searchInpt, "focus", function () {
        var guessDiv = document.getElementsByClassName("guess_search")[0];
        guessDiv.style.display = "block";
        var temp = this.placeholder;
        this.placeholder = this.getAttribute("data-tg-ph")
        this.setAttribute("data-tg-ph", temp);
    });

    bannerControll();
    tapControll();
    setPosition();
}


var DirctionModel = function (x, y, distance) {
    this.x = x;
    this.y = y;
    this.getDirc = function () {
        if (this.x >= this.y && (this.x + this.y) <= distance) {
            return "TOP";
        } else if (this.x <= this.y && (this.x + this.y) <= distance) {
            return "LEFT";
        } else if (this.x <= this.y && (this.x + this.y) >= distance) {
            return "BOTTOM";
        } else if (this.x >= this.y && (this.x + this.y) >= distance) {
            return "RIGHT";
        }
    };
    this.getDirction = function () {
        switch (this.getDirc()) {
            case "TOP":
                return {
                    top: -distance,
                    left: 0,
                };
            case "LEFT":
                return {
                    top: 0,
                    left: -distance
                };
            case "BOTTOM":
                return {
                    top: distance,
                    left: 0,
                };
            case "RIGHT":
                return {
                    top: 0,
                    left: distance,
                };

        }
    }
}


var tapControll = function () {
    var tapView = document.getElementById("js_tap_control");
    addEvent(tapView, "click", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName == "LI") {
            var index = Array.prototype.indexOf.call(this.children, target);

            Array.prototype.forEach.call(this.children, function (v, i) {

                if (index === i) {
                    addClass(v, "curr");
                } else {
                    removeClass(v, "curr");
                }
                return true;
            });

            var tap_content = document.getElementsByClassName("tap_content")[0].children;
            Array.prototype.forEach.call(tap_content, function (v, i) {
                v.style.display = "none";
                if (i == index) {
                    v.style.display = "block";
                }
                return true;
            });
        }
    });
}
// banner图 
// 需要知道的状态有  
//     当前显示哪张图，对应的control是那个
//     下一张图是在哪
var bannerBgModel = {
    count: 3,
    index: 0,
    distance: 160,
    controlDistance: 55
}

var BannerBgBLL = function (model) {
    if (!(this instanceof BannerBgBLL)) {
        return new BannerBgBLL(model);
    }
    this.model = JSON.parse(JSON.stringify(model));
    this.flag = true;
    this.next = function () {
        if (this.flag) {
            this.model.index++;
            if (this.model.index == this.model.count)
                this.model.index = 0;
        }
        return {
            bgDistance: -this.model.index * this.model.distance,
            conDistance: this.model.index * this.model.controlDistance,
        }
    };
    this.currentDistance = function () {
        return {
            bgDistance: this.model.index * this.model.distance,
            conDistance: this.model.index * this.model.controlDistance
        }
    }

}

var bannerControll = function () {

    var bll = new BannerBgBLL(bannerBgModel);
    var bgView = document.getElementsByClassName("banner_bg")[0];
    var conView = document.getElementById("baner_index");
    var conItemView = document.getElementsByClassName("control")[0]
    var lis = conItemView.getElementsByTagName("li");
    function bannerAction(fn, wait) {
        var timeOut;
        wait = wait || 1500;
        return {
            start: function () {
                timeOut = setInterval(function () {
                    fn();
                }, wait);
            },
            stop: function () {
                clearTimeout(timeOut);
            }
        }
    }
    var banneAct = bannerAction(moveView, 2000);
    banneAct.start();
    function moveView() {
        var viewState = bll.next();
        startMove(bgView, { top: viewState.bgDistance }, null, 16);
        startMove(conView, { top: viewState.conDistance }, null, 16);
    }

    bgView.addEventListener("mouseenter", function () {
        bll.flag = false;
        banneAct.stop();
        console.log("bgView");
    }, false);
    bgView.addEventListener("mouseleave", function () {
        bll.flag = true;
        banneAct.start();
    }, false);

    Array.prototype.forEach.call(lis, function (item) {
        addEvent(item, "mouseenter", function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            // console.count();
            if (target.nodeName == "LI") {
                // console.count("mouseover");
                bll.flag = false;
                banneAct.stop();
                bll.model.index = Array.prototype.indexOf.call(lis, target);
                console.count("bll.model.index" + bll.model.index + " ");
                moveView();
            }
        });
    });
    conItemView.parentNode.addEventListener("mouseleave", function () {
        setTimeout(function () {
            bll.flag = true;
            banneAct.start();
        }, 500);
    }, false);
}


function setPosition() {
    var menu_boxs = document.querySelectorAll(".menu_box");
    Array.prototype.forEach.call(menu_boxs, function (item) {
        item.addEventListener("mouseenter", function () {
            console.count("menu_box");
            var side_item = this.getElementsByClassName("side_item")[0];
            var clientRect = side_item.getBoundingClientRect();
            if (clientRect.bottom > window.innerHeight) {
                side_item.style.top = -(clientRect.bottom - window.innerHeight + 10) + "px";
            }
        }, false);
    });
}