function psWheel(obj, option) {
    this.wrap = obj;
    this.scoll = null;
    this.scale = null;
    this.scollShift = null;
    this.scollSpeed = 3;
    this.option = option;
    psWheel.say(1);
    this.init();
    psWheel.say(2);
    this.wrap.parentNode.onmousewheel = psWheel.listenMouseWheel.bind(this);
    this.scoll.addEventListener("mousedown", psWheel.listenmousedown.bind(this))
    // this.scoll.parentNode.addEventListener("mousedown",psWheel.listenmousedown.bind(this))
}
psWheel.say = function(params) {
    console.info("hi" + params);
}

psWheel.listenmousedown = function(event) {
    // console.log(event.offsetX + " @ " + event.offsetY);
    var data_moveY = event.offsetY;
    var that = this;
    this.scoll.style.top + this.scoll.data_moveY;
    event.target.onmousemove = function(event) {
        var shift = parseInt(data_moveY) - parseInt(event.offsetY);
        that.scoll.style.top = parseInt(that.scoll.style.top) - shift + "px";
        psWheel.scollMove.call(that, that.scoll.style.top, 0);
        return false;
    }

    event.target.onmouseup = function(event) {
        event.target.onmousemove = null;
    }
}

psWheel.listenMouseMove = function(event) {

}

psWheel.listenMouseWheel = function(event) {
    event = event || window.event;
    var t1 = document.getElementById("wheelDelta");
    var t2 = document.getElementById("detail");
    var value = event.wheelDelta;
    if (event.wheelDelta) {//IE/Opera/Chrome
        t1.value = event.wheelDelta;
    } else if (event.detail) {//Firefox
        t2.value = event.detail;
        var value = event.detail;
    }
    psWheel.scollMove.call(this, this.scoll.style.top, value);
    return false;
}

psWheel.scollMove = function(position, direction) {
    var top = parseInt(position);
    if (direction < 0) {  //向下
        this.scoll.style.top = top + (this.scollSpeed) + "px";
    } else if (direction > 0) { //向上
        this.scoll.style.top = top + (- this.scollSpeed) + "px";
    }
    top = parseInt(this.scoll.style.top);
    if (top < 0) {//临界范围
        this.scoll.style.top = 0;
        top = 0;
    }
    else if (top > this.scollShift) {
        this.scoll.style.top = this.scollShift + "px";
        top = this.scollShift;
    }
    this.wrap.style.top = -Math.ceil((top / this.scale)) + "px";
}

psWheel.prototype = {
    init: function() {
        var style = getComputedStyle(this.wrap.parentNode);//容器的高度
        var height = parseInt(style["height"]);
        if (style.boxSizing == "border-box") {
            height =height- parseInt(style["paddingBottom"]) - parseInt(style["paddingTop"]) - parseInt(style["borderTopWidth"]) - parseInt(style["borderBottomWidth"]);
        }
        var mStyle = getComputedStyle(this.wrap);//内容的高度
        var mHeight = parseInt(mStyle["height"]);
        this.scale = height / mHeight;//两者比例
        this.scollShift = height - mHeight;//滑块能滚动的位移
        if (this.scollShift == 0)
            return;
        var div = document.createElement("div");//滑块的容器
        div.className = "psWheel_Wrap";
        div.style.position = "absolute"
        div.style.right = 0;
        div.style.top = 0;
        div.style.height = height+"px";
        div.style.background = "yellow";
        div.style.width = "15px";

        mDiv = document.createElement("div");//滑块
        mDiv.style.position = "absolute"
        mDiv.style.right = 0;
        mDiv.style.top = 0;
        mDiv.style.height = (height / mHeight) * height + "px";
        mDiv.style.background = "red";
        mDiv.style.width = "15px";

        this.scollShift = height - parseInt(mDiv.style.height);//滑块能滚动的位移
        if (this.scollShift == 0)
            return;
        this.wrap.parentNode.appendChild(div);
        div.appendChild(mDiv);
        this.scoll = mDiv;//滚动滑块
        return this;
    },

}
