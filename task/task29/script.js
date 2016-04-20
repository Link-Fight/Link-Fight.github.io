function $(selector) {
    return document.querySelectorAll(selector);
}



window.onload = function (params) {
    var btns = $("input[type=button]");
    Array.prototype.forEach.call(btns, function (value) {
        value.addEventListener("click", function (e) {
            var input = $("#" + this.id.replace("check", "input"))[0];
            var reV = check(this.id, input.value);
            var wrap = input.parentNode;
            wrap.className =  reV.class;
            wrap.getElementsByTagName("span")[0].innerText = reV.msg;
        });
    });
}


function check(id, text) {
    var reV = {
        class: "",
        msg: ""
    };

    if (id.indexOf("01") > -1) {
        if (text.length >= 4 && text.length <= 6) {
            reV.msg = "输入正确";
            reV.class = "correct";
        } else {
            reV.msg = "输入错误";
            reV.class = "error";
        }
    } else if (id.indexOf("02") > -1) {
        if (text.length >= 0) {
            reV.msg = "输入正确";
            reV.class = "correct";
        } else {
            reV.msg = "输入错误";
            reV.class = "error";
        }
    } else if (id.indexOf("03") > -1) {
        if (parseInt(text).toString().length == text.length) {
            reV.msg = "输入正确";
            reV.class = "correct";
        } else {
            reV.msg = "输入错误";
            reV.class = "error";
        }
    }
    return reV;
}