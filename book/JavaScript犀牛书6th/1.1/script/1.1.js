

!(function (win) {
    "use strict";
    // JavaScript Document

    var a = [
        { id: 0, pid: 0, name: 'text0' },

        { id: 2, pid: 1, name: 'text2' },
        { id: 1, pid: 0, name: 'text1' },
        { id: 3, pid: 0, name: 'text3' },
        { id: 4, pid: -2, name: 'text4' },
    ];

    function transfer() {
        var result = [];
        this.forEach(function (node) {
            var flag = { flag: true }
            insert(node, result, flag);

            if (flag.flag) {
                result.push(node);
            }
        });
        // return result;
        return JSON.parse(JSON.stringify(result).replace("{}", "").replace(",,", ","))
    }

    function insert(node, result, flag) {

        if (Array.isArray(result)) {
            result.forEach(function (val) { insert(node, val, flag); })
        } else {
            //查找到其父节点  加入 children中
            if (node.pid === result.id) {
                if (result.hasOwnProperty("children")) {
                    result["children"].push(node);
                } else {
                    result["children"] = [node,];
                }
                flag.flag = false;
                //查找到的是其子节点
            } else if (node.id === result.pid) {
                // if (flag.flag) {//没有找到过到其父节点
                //     node["children"] = JSON.parse(JSON.stringify(result));
                //     flag.flag = false;
                // } else {//已经找到过到其父节点
                node["children"] = JSON.parse(JSON.stringify(result));
                flag.flag = false;
                // }
                deleteAll(result);
            } else {
                if (result.hasOwnProperty("children")) {
                    insert(node, result["children"], flag);
                }

            }
        }
    }

    function deleteAll(obj) {
        for (var key in obj) {
            delete obj[key];
        }
    }
    function mix(t, s) {
        for (item in s) {
            t[item] = s[item]
        }
        return t;
    }

    a.transfer = transfer;
    console.log(a.transfer());

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



function calculate(params) {
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    // var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");

    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;

    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest) / (x - 1);


    if (isFinite(monthly)) {
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

        save(amount.value, apr.value, years.value);

        try {
            getLenders(amount.value, apr.value, years.value);
        } catch (e) { }

        chart(principal, interest, monthly, payments);
    } else {

        payment.innerHTML = "";
        toolbar.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();
    }
}



/**
 * @param  {any} amount
 * @param  {any} apr
 * @param  {any} years
 */
function save(amount, apr, years) {
    if (window.localStorage) {
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
    }

}

function init() {
    if (window.localStorage && window.localStorage.loan_amount) {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
    }
    var mInputs = $$all(".moveInput");
    for (var i = 0, len = mInputs.length; i < len; i++) {
        addEvent(mInputs[i], "input", inputChange);
        addEvent(mInputs[i], "focus", inputFocus);
        addEvent(mInputs[i], "blur", inputBlur);
        mInputs[i]["__input"] = inputChange;
        mInputs[i]["__input"]();
        delete mInputs[i]["__input"];
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
    function inputBlur(e) {
        e = e || window.event;
        removeClass(this.parentNode, "focusTip");
    }
    function inputFocus(e) {
        e = e || window.event;
        addClass(this.parentNode, "focusTip");
        calculate();
    }
    var downloadBtn = document.getElementById("downGraph");
    downloadBtn.onclick = function () {
        saveCanvas(document.getElementById("graph"), "png", "贷款计算" + (new Date()).getTime());
    };

}

window.onload = function name(params) {
    init();
}

function getLenders(amount, apr, years) {
    if (!window.XMLHttpRequest) return;
    var ad = document.getElementById("lenders") || document.createElement("div");
    if (!ad) return;

    var url = "getLenders.php" +
        "?amt=" + encodeURIComponent(amount) +
        "&apr" + encodeURIComponent(apr) +
        "&years" + encodeURIComponent(years);


    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.send(null);

    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var response = req.responseText;
            var lenders = JSON.parse(response);

            var list = "";
            for (var i = 0; i < lenders.length; i++) {
                list += "<li><a href='" + lenders[i].url + "'>" + lenders[i].name + "</a>";
            }
            ad.innerHTML = "<ul>" + list + "</ul>";
            ad.parentNode || console.log(ad);
        }
    };
}

/**
 * @param  {any} principal
 * @param  {any} interest
 * @param  {any} monthly
 * @param  {any} payments
 */
function chart(principal, interest, monthly, payments) {
    var graph = document.getElementById("graph");
    removeClass(graph.parentNode, "show");
    graph.width = graph.width;

    if (arguments.length == 0 || !graph.getContext) return;


    var g = graph.getContext("2d");
    var width = graph.width, height = graph.height;
    function paymentToX(n) {
        return n * width / payments;
    }
    function amountToY(a) {
        return height - (a * height / (monthly * payments * 1.05));
    }
    g.fillStyle = "#fff";
    g.fillRect(0, 0, graph.width, graph.height);

    g.moveTo(paymentToX(0), amountToY(0));
    g.lineTo(paymentToX(payments), amountToY(monthly * payments));
    g.lineTo(paymentToX(payments), amountToY(0));
    g.closePath();
    g.fillStyle = "#f88";
    g.fill();
    g.font = "bold 12px sans-serif";
    g.fillText("一共支付", 20, 20);

    var equity = 0;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(0));
    for (var p = 1; p <= payments; p++) {
        var thisMonthsInterest = (principal - equity) * interest;
        equity += (monthly - thisMonthsInterest);
        g.lineTo(paymentToX(p), amountToY(equity));
    }

    g.lineTo(paymentToX(payments), amountToY(0));
    g.closePath();
    g.fillStyle = "green";
    g.fill();
    g.fillText("一共利息", 20, 35)

    var bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(bal));
    g.fillStyle = "#000";
    for (var p = 1; p < payments; p++) {
        var thisMonthsInterest = bal * interest;
        bal -= (monthly - thisMonthsInterest);
        g.lineTo(paymentToX(p), amountToY(bal));
    }

    g.lineWidth = 3;
    g.stroke();

    g.fillText("贷款余额", 20, 50);

    g.fillStyle = "blue";
    g.textAlign = "center";
    var y = amountToY(0);
    for (var year = 1; year * 12 <= payments; year++) {
        var x = paymentToX(year * 12);
        g.fillRect(x - 0.5, y - 3, 1, 3);
        if (year == 1) g.fillText("年", x, y - 5);
        if (year % 5 === 0 && year * 12 !== payments) {
            g.fillText(String(year), x, y - 5);
        }
    }

    g.textAlign = "right";
    g.textBaseline = "middle";

    var ticks = [monthly * payments, principal];
    var rightEdge = paymentToX(payments);
    for (var i = 0; i < ticks.length; i++) {
        var y = amountToY(ticks[i]);
        g.fillRect(rightEdge - 3, y - 0.5, 3, 1);
        g.fillText(String(ticks[i].toFixed(0)), rightEdge - 5, y);
    }
    addClass(graph.parentNode, "show");
}

(function () {
    var a = [
        { id: 0, pid: 0, name: 'text0' },
        { id: 2, pid: 1, name: 'text2' },
        { id: 1, pid: 0, name: 'text1' },
        { id: 3, pid: 0, name: 'text3' },
        { id: 4, pid: -2, name: 'text4' },
    ];

    function transfer() {
        var result = [];
        this.forEach(function (node) {
            var flag = { flag: true }
            insert(node, result, flag);
            if (flag.flag) {
                result.push(node);
            }
        });
        return JSON.parse(JSON.stringify(result).replace("{}", "").replace(",,", ","))
    }

    function insert(node, result, flag) {
        if (Array.isArray(result)) {
            result.forEach(function (val) { insert(node, val, flag); })
        } else {
            if (node.pid === result.id) {
                if (result.hasOwnProperty("children")) {
                    result["children"].push(node);
                } else {
                    result["children"] = [node,];
                }
                flag.flag = false;
            } else if (node.id === result.pid) {
                node["children"] = JSON.parse(JSON.stringify(result));
                flag.flag = false;
                deleteAll(result);
            } else {
                if (result.hasOwnProperty("children")) {
                    insert(node, result["children"], flag);
                }
            }
        }
    }

    function deleteAll(obj) {
        for (var key in obj) {
            delete obj[key];
        }
    }
    a.transfer = transfer;
    console.log(a.transfer());

})();
