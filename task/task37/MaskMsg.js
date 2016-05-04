

function MaskMsg(obj) {
    this.parent = obj["parentNode"] || document.body;
    this.baseClass = obj["baseClass"] || "mask_msg";
    this.mask = document.createElement("div");
    this.content = "Hello";
    this.titleContent = " <div class=title>消息</div>";
    this.controlContent = "<div class=control><span class=button>确定</span><span class=button>取消</span></div>";
    var that = this;
    return {
        render: this.render.bind(that),
    }
}

MaskMsg.prototype.initEvent = function () {
    var that = this;
    this.mask.addEventListener("click", function (e) {
        e = e || window.event;
        if (e.target == that.mask) {
            that.destroy();
        } else if (e.target.className == "button" && e.target.nodeName == "SPAN") {
            that.destroy();
        }
    });
    
}

MaskMsg.prototype.show = function () {
    this.mask.className = this.baseClass;
    this.parent.appendChild(this.mask);
    this.mask.innerHTML = "<div class=wrap>" + this.titleContent + "<div>" + this.content + "</div>" + this.controlContent + "</div>";
}

MaskMsg.prototype.destroy = function () {
    this.mask.parentNode.removeChild(this.mask);
}

MaskMsg.prototype.render = function () {
    this.show();
    this.initEvent();
};