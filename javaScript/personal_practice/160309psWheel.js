function psWheel(obj, option) {
    this.wrap = obj;
    this.scoll = null;
    this.scale = null;
    this.scollShift = null;
    this.scollSpeed =10;
    this.option = option;
    this.init();

    this.wrap.onmousewheel = psWheel.listenMouseWheel.bind(this);

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
    var top = parseInt(this.scoll.style.top);
    if (value < 0) {  //向下
        this.scoll.style.top = top + ( this.scollSpeed) + "px";
    } else if (value > 0) { //向上
        this.scoll.style.top = top + (- this.scollSpeed) + "px";
    }
    top = parseInt(this.scoll.style.top);
    if (top < 0){//临界范围
        this.scoll.style.top = 0;
        top=0;
    }
    else if (top > this.scollShift) {
        this.scoll.style.top = this.scollShift + "px";
          top=this.scollShift;
    }
    
    this.wrap.style.top = -Math.ceil((top/this.scale))+"px";
    
    console.log(this.scoll.style.top + " " + this.scoll.style.button);
    return false;
}

psWheel.prototype = {
    init: function() {
        var div = document.createElement("div");
        div.className = "psWheel_Wrap";
        var height = getComputedStyle(this.wrap.parentNode)["height"];//容器的高度
        var mHeight = getComputedStyle(this.wrap)["height"];//内容的高度
        this.scale = parseInt(height) / parseInt(mHeight);//两者比例
        this.scollShift = parseInt(height) - parseInt(mHeight);//滑块能滚动的位移
        if (this.scollShift == 0)
            return;
        div.style.position = "absolute"
        div.style.right = 0;
        div.style.top = 0;
        div.style.height = height;
        div.style.background = "yellow";
        div.style.width = "15px";

        mDiv = document.createElement("div");
        mDiv.style.position = "absolute"
        mDiv.style.right = 0;
        mDiv.style.top = 0;
        mDiv.style.height = parseInt(height) / parseInt(mHeight) * parseInt(height) + "px";
        mDiv.style.background = "red";
        mDiv.style.width = "15px";

        this.scollShift = parseInt(height) - parseInt(mDiv.style.height);//滑块能滚动的位移
        if (this.scollShift == 0)
            return;
        this.wrap.parentNode.appendChild(div);
        div.appendChild(mDiv);
        this.scoll = mDiv;//滚动滑块
        return this;
    },

}
