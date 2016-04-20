function $(selector) {
    return document.querySelectorAll(selector);
}

var Tool = {};

!function (nameSpace) {
    /**添加事件
 * @param  {any} obj
 * @param  {any} type
 * @param  {any} fn
 */
    function addEvent(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        }
    }

    /**
     * 设置或者取消className
     * @param  {any} obj - 设置对象
     * @param  {any} className - 类
     * @param  {any} flag - ture/任意值:设置或者取消className  false：仅仅取消className
     */
    function toggleClassName(obj, className, flag) {
        if (obj.className.indexOf(className) > -1) {
            obj.className.replace(className, "");
        }
    }
    nameSpace.addEvent = addEvent;
    nameSpace.toggleClassName = toggleClassName;
} (Tool);

window.onload = function (params) {
    var mInput = $("input[id*=input-]");
    Array.prototype.forEach.call(mInput, function (value) {

        Tool.addEvent(value, "focus", function (e) {
            e = e || event;
            var wrap = this.parentNode;
            var tip = wrap.getElementsByClassName("tip")[0];
            tip.style.display = "block";
        });
        Tool.addEvent(value, "blur", function (e) {
            e = e || event;
            var wrap = this.parentNode;
            var reV = {};
            if (this.id.indexOf("03") > -1) {
                if (this.value.length > 0) {
                    if (document.getElementById("input-02").value != this.value) {
                        reV.msg = "输入正确";
                        reV.class = "info-correct";
                    } else {
                        reV.msg = "输入错误，两次输入不一致！";
                        reV.class = "info-error";
                    }
                }
            } else {
                reV = Check_DLL.check(this.id, this.value);
            }

            wrap.className = "wrap " + (reV.class?reV.class:"");
            wrap.getElementsByClassName("tip")[0].value = reV.msg?reV.msg:"";
        });
    });
    var subBtn = $("#subBtn");
   
    Tool.addEvent(subBtn[0],"click",function(e) {
        var msg ="";
        var mTips =  $(".tip");
        Array.prototype.forEach.call(mTips,function(tip) {
            if(tip.value){
                msg+=tip.value+"\r\n";
            }
        });
        if(msg){
            alert(msg);
            return false;
        }
    });
}

var Check_DLL = {};

!function name(nameSpace) {
    function check(id, text) {
        var reV = {
            class: "",
            msg: ""
        };
        if (text.length == 0) {
            reV.msg = "";
            reV.class = "";
            return reV;
        }
        if (id.indexOf("01") > -1) {
            if (text.length >= 4 && text.length <= 6) {
                reV.msg = "名称可用";
                reV.class = "info-correct";
            }
            else {
                reV.msg = "输入错误";
                reV.class = "info-error";
            }
        } else if (id.indexOf("02") > -1) {
            if (text.length >= 6 && text.length <= 10 && (parseInt(text).toString().length != text.length)) {
                reV.msg = "输入正确";
                reV.class = "info-correct";
            } else {
                reV.msg = "输入错误";
                reV.class = "info-error";
            }
        } else if (id.indexOf("04") > -1) {
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (myreg.test(text)) {
                reV.msg = "输入正确";
                reV.class = "info-correct";
            } else {
                reV.msg = "请输入正确邮箱地址";
                reV.class = "info-error";
            }
        } else if (id.indexOf("05") > -1) {
            if (parseInt(text).toString().length == text.length && text.length == 11) {
                reV.msg = "输入正确";
                reV.class = "info-correct";
            } else {
                reV.msg = "输入错误";
                reV.class = "info-error";
            }
        }

        return reV;
    }
    nameSpace.check = check;
} (Check_DLL);

