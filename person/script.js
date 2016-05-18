!(function (win) {
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
