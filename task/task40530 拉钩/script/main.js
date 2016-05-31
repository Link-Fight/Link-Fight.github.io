
!(function (win) {
    "use strict";
    // JavaScript Document

    var startMove = function startMove(obj, json, endFn, speed) {

        clearInterval(obj.timer);
        // console.log(obj+"#"+obj.timer)
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
    var readyEvent = function (fn) {
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



    win.addEvent = addEvent;
    win.$$all = $$all;
    win.toggleClass = toggleClass;
    win.addClass = addClass;
    win.removeClass = removeClass;
    win.startMove = startMove;
    win.saveCanvas = saveCanvas;
})(window);



window.onload = function () {
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


    var showCompanyView = document.querySelector(".showCompany>ul")

    showCompanyView.addEventListener("mouseover", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName == "LI") {
            var dirctionModel = new DirctionModel(0, 0, 130);
            var info = target.getElementsByClassName("info")[0];
            if (!!!info) return false;
            dirctionModel.x = e.offsetX;
            dirctionModel.y = e.offsetY;
            var dirctionViewState = dirctionModel.getDirction();
            info.style.top = dirctionViewState.top + "px";
            info.style.left = dirctionViewState.left + "px";
            startMove(info, { top: 0, left: 0 }, null, 20);

        }
    }, false);
    showCompanyView.addEventListener("mouseout", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName == "DIV") {
            var dirctionModel = new DirctionModel(0, 0, 130);
            var info = target.getElementsByClassName("info")[0];
            // if (!!!info) return false;
            dirctionModel.x = e.offsetX;
            dirctionModel.y = e.offsetY;
            var dirctionViewState = dirctionModel.getDirction();
            startMove(info, dirctionViewState, null, 20);
        }
    }, false)
}


var DirctionModel = function (x, y, distance) {
    this.x = x;
    this.y = y;
    this.getDirction = function () {
        console.log(this.x+" "+ this.y);
        if (this.x > this.y && this.x > distance / 2) {
            // right
            return {
                top: 0,
                left: distance,
            }
        }
        else if (this.x > this.y && this.y < distance / 2) {
            // top
            return {
                top: -distance,
                left: 0,

            }

        } else if (this.x < this.y && this.x < distance / 2) {
            // x < y && x < distance / 2
            // left
            return {
                top: 0,
                left: -distance
            }
        } else if (this.x < this.y && this.y > distance / 2) {
            // bottom
            return {
                top: distance,
                left: 0,
            }
        }
    }
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
    setInterval(function () {
        // view.style.top = bll.next().distance+"px";
        if (bll.flag) {
            moveView();
        }
    }, 1500)

    var moveView = function () {
        var viewState = bll.next();
        startMove(bgView, { top: viewState.bgDistance }, null, 20);
        startMove(conView, { top: viewState.conDistance }, null, 20);
    }

    bgView.addEventListener("mouseenter", function () {
        bll.flag = false;
    }, false);
    bgView.addEventListener("mouseleave", function () {
        bll.flag = true;
    }, false);
    conItemView.addEventListener("mouseover", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName == "LI") {
            bll.flag = false;
            var lis = this.getElementsByTagName("li");
            bll.model.index = Array.prototype.indexOf.call(lis, target);
            moveView();
        }
    }, false);
    conItemView.parentNode.addEventListener("mouseleave", function () {
        bll.flag = true;
    }, false);
}
