!(function (win) {

    // JavaScript Document

    var startMove = function startMove(obj, json, endFn) {

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

        }, 30);

    }


    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        else {
            return getComputedStyle(obj, false)[attr];
        }
    }



    var addEvent = function (obj, type, fn) {
        if (obj.addEventListener)
            obj.addEventListener(type, fn, false);
        else if (obj.attachEvent) {
            obj["e" + type + fn] = fn;
            obj.attachEvent("on" + type, function () {
                obj["e" + type + fn]();
            });
        }
    };
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


    win.addEvent = addEvent;
    win.$$all = $$all;
    win.toggleClass = toggleClass;
    win.addClass = addClass;
    win.removeClass = removeClass;
    win.startMove = startMove;
})(window);


window.onload = main;

function main() {
    var mBtns = $$all(".toggle-nav-btn");
    for (var i = 0, len = mBtns.length; i < len; i++) {
        addEvent(mBtns[i], "click", btnClick);
    }
    var mInputs = $$all(".moveInput");
    for (var i = 0, len = mInputs.length; i < len; i++) {
        addEvent(mInputs[i], "input", inputChange);
        addEvent(mInputs[i], "focus", inputFocus);
        addEvent(mInputs[i], "blur", inputBlur);
    }
    var num = 0;
    window.addEventListener("scroll", function () {
        // console.log("A：" + num++);
        // console.log(document.body.scrollTop);
    })
    var mNum = 0;
    window.addEventListener("scroll", debounce(function () {
        // console.log(mNum++);
        console.log(document.body.scrollTop);
    }, 100));


    mAs = $$all("#navbar a");
    mAs_top = [];
    for (var i = 0, len = mAs.length; i < len; i++) {
        mAs_top[i] = $$all(mAs[i].getAttribute("data-target"))[0].offsetTop;
    }
    console.log(mAs_top);
    window.addEventListener("scroll", function () {
        var index = 0;
        for (var i = 0, len = mAs_top.length; i < len; i++) {
            if (document.body.scrollTop < mAs_top[i] - 10) {
                index = i - 1;
                break;
            }
        }
        if (i == len)
            index = len - 1;
        if (index < 0)
            index = 0;
        removeClass($$all("#navbar .active"), "active");
        addClass(mAs[index], "active");
    });

    var navBar = document.getElementById("navbar");
    navBar.addEventListener("click", function (e) {
        e = e || window.event;
        if (e.target.nodeName == "A") {
            for (var i = 0, len = mAs.length; i < len; i++) {
                if (mAs[i] == e.target) {
                    startMove(document.body, { scrollTop: mAs_top[i] - 10 });
                    return;
                }

            }

        }
    });
}



/**
 * 简单的防抖函数
 * 就是在一定时间内，事件被触发的次数
 */
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

function inputBlur(e) {
    e = e || window.event;
    removeClass(this.parentNode, "focusTip");
}
function inputFocus(e) {
    e = e || window.event;
    addClass(this.parentNode, "focusTip");
}

function inputChange(e) {
    var span;
    e = e || window.event;
    if (this.value.length > 0) {
        addClass(this.parentNode, "activeTip");
    } else {
        removeClass(this.parentNode, "activeTip");
    }
}

function btnClick(e) {
    var target, targetClass;
    e = e || window.event;
    document.body.getAttribute("data-hi");
    target = this.getAttribute("data-target");
    targetClass = this.getAttribute("data-toggle-class");
    target = $$all(target);
    for (var i = 0, len = target.length; i < len; i++) {
        toggleClass(target[i], targetClass);
    }
}
