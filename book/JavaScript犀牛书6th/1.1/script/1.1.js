"use strict";

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


function chart(principal, interest, monthly, payments) {
    var graph = document.getElementById("graph");
    removeClass(graph.parentNode,"show");
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
    addClass(graph.parentNode,"show");
}