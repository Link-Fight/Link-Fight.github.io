


function CreateCalendar(pNode, initDate) {
    this.wrap = document.createElement("div");
    this.wrap.className = "calendar";
    this.init.apply(this, arguments);
    this.DayModel = new CreateCalendar.DayModule.DayDate();
    this.initDayUL.call(this);
    this.initEvent.call(this);
    this.MOVE = initDate ? (initDate["MOVE"] ? initDate["MOVE"] : false) : true;
    var that = this;
    this.EventList={};
    return {
        setDate: this.setDate.bind(that),
        addListner:this.listen.bind(that),
        clearListner:this.clear.bind(that),
        
    };
}

CreateCalendar.DayModule = {
    DayDate: function () {
        this.taday = new Date();
        this.firstMonthDay = function () { return new Date(this.taday.getFullYear(), this.taday.getMonth(), 1); };
        this.totalDay = function () { return new Date(this.taday.getFullYear(), this.taday.getMonth() + 1, 0).getDate(); };
        this.preTotalDay = function () { return new Date(this.taday.getFullYear(), this.taday.getMonth(), 0).getDate(); };
        this.nextTotalDay = function () { return new Date(this.taday.getFullYear(), this.taday.getMonth() + 2, 0).getDate(); };
        this.setNextMonth = function () {
            if (this.taday) {
                this.taday.setDate(1);
                this.taday.setMonth(this.taday.getMonth() + 1);
            }
        }
        this.setPreMonth = function () {
            if (this.taday) {
                this.taday.setDate(1);
                this.taday.setMonth(this.taday.getMonth() - 1);
            }
        }
    }
}
CreateCalendar.getStyle=function (obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
    }


CreateCalendar.prototype = {
    listen:function(key,eventFn) {
        var stack = this.EventList[key];
        stack=stack?stack:(stack=this.EventList[key]=[]);
        return stack.push(eventFn);
    },
    clear:function(key) {
      var stack = this.EventList[key];  
       stack&&(stack.length=0);
    },
    trigger:function(){
        var key = Array.prototype.shift.call(arguments);
        var _ags=arguments;
        if(this.EventList[key]){
            this.EventList[key].forEach(function(element) {
                element.apply(this,_ags);
            }, this);
        }
    },
    initDate: function (mDate) {
        var that = this;
        setTimeout(function () {
            CreateCalendar.setDate.apply(this, arguments);
        }, 0);
    },
    setDate: function (mDate) {
        var i, j, len, mUl, mLi, mDiv, mDiv1, mDay, mTday;
        if (mDate["days"]) {
            mUl = this.wrap.getElementsByClassName("calemdarDay")[0];
            mLi = mUl.getElementsByTagName("li");
            for (i = 0; i < 6; i++) {
                mDiv = mLi[i].getElementsByTagName("div");
                mDiv1 = mLi[i + 6].getElementsByTagName("div");
                for (j = 0, len = mDiv.length; j < len; j++) {
                    mTday = parseInt(mDiv[j].innerHTML.replace("<",""));
                    mDiv[j].innerHTML=mTday;
                    mDiv1[j].innerHTML=mTday;
                    mDiv[j].className=mDiv[j].className.replace(" content","");
                    mDiv1[j].className=mDiv1[j].className.replace(" content","");
                    if(!mDate["days"][0]){
                        continue;
                    }
                    var cTday = new Date(mDate["days"][0]["day"]);
                    if (mTday != cTday.getDate()) {
                        continue;
                    }
                    do {
                        mDiv[j].innerHTML += "<p>" +mDate["days"][0]["timeStr"]+ mDate["days"][0]["content"] + "</p>";
                        mDiv1[j].innerHTML += "<p>" + mDate["days"][0]["timeStr"]+mDate["days"][0]["content"] + "</p>";
                        mDate["days"].shift();
                        cTday =mDate["days"][0]? new Date(mDate["days"][0]["day"]):{getDate:function() { return -1;}};
                    } while (mTday == cTday.getDate());
                    mDiv[j].className+=" content";
                    mDiv1[j].className+=" content";
                }
            }
        }
    },
    // js生成基本dom结构
    init: function (pNode, initDate) {
        if (pNode) {
            pNode.appendChild(this.wrap);
        } else {
            document.body.appendChild(this.wrap);
        }
        this.wrap.innerHTML = "<div class='title'><span class=title-text id=title-text>2016年2月</span><span class=title-pre id=title-pre>></span><span class=title-next id=title-next>></span></div>";
        var defaultDay = new Array("日", "一", "二", "三", "四", "五", "六");
        var arrDay = initDate ? (initDate["headDay"] ? initDate["headDay"] : defaultDay) : defaultDay;
        var headerDay = "<div class=header>";
        for (var i = 0; i < arrDay.length; i++) {
            headerDay += "<div class=header-day>" + arrDay[i] + "</div>";
        }
        headerDay += "</div>";
        this.wrap.innerHTML += headerDay;
        var mainDay = "<div class=main><ul id=calemdarDay class=calemdarDay data-height=''>";
        var bufferStr = "";
        for (i = 0; i <= 6; i++) {
            if (i == 0) {
                bufferStr += "<li>";
            }
            bufferStr += " <div class=normal-day>" + i + "</div>"
            if (i == 6) {
                bufferStr += "</li>";
            }
        }
        bufferStr = bufferStr + bufferStr + bufferStr + bufferStr + bufferStr + bufferStr;
        mainDay += bufferStr + "</ul></div>";
        this.wrap.innerHTML += mainDay;
        console.log(this.wrap);
    },
    //对日历的动态部分进行设置
    initDayUL: function () {
        var ul = this.wrap.getElementsByTagName("ul")[0];//document.getElementById("ul");
        ul.dataHeight = CreateCalendar.getStyle(ul, "height");
        this.initDay();
        ul.innerHTML = ul.innerHTML + ul.innerHTML;
        this.Move(ul, -parseInt(ul.dataHeight));
    },
// 对7*6的日期网格根据每月不同而进行设置
    initDay: function (type, diretert) {
        if (!this.DayModel) {
            this.DayModel = new myModule.DayDate();
        }
        var dayDate = this.DayModel;
        var mUL = this.wrap.getElementsByClassName("calemdarDay")[0];
        var mLIs = mUL.getElementsByTagName("li");
        if (diretert == "up") {
            mUL.style.top = "-" + mUL.dataHeight;
        } else if (diretert == "down") {
            mUL.style.top = "0px";
        }
        var firstInit = true;
        if (type == "move") {
            firstInit = false;
        }
        var dayCount = 1;
        var preDayCount = dayDate.preTotalDay();
        var nextDayCount = 1;
        var len = 6;
        for (var i = 0; i < len; i++) {
            var mDIV = mLIs[i].getElementsByTagName("div");
            if (!firstInit) {
                var mDIV1 = mLIs[i + 6].getElementsByTagName("div");
            }
            if (i == 0) {
                var startIndex = dayDate.firstMonthDay().getDay();
                do {
                    mDIV[startIndex].innerHTML = dayCount;
                    mDIV[startIndex].className = "active-day";
                    if (!firstInit) {
                        mDIV1[startIndex].innerHTML = dayCount;
                        mDIV1[startIndex].className = "active-day";
                    }
                    startIndex++;
                    dayCount++
                }
                while (startIndex < mDIV.length)
                startIndex = dayDate.firstMonthDay().getDay();
                while (startIndex > 0) {
                    --startIndex;
                    mDIV[startIndex].innerHTML = preDayCount;
                    mDIV[startIndex].className = "";
                    if (!firstInit) {
                        mDIV1[startIndex].innerHTML = preDayCount;
                        mDIV1[startIndex].className = "";
                    }
                    preDayCount--;
                }

            } else {
                for (var j = 0; j < mDIV.length; j++) {
                    if (dayCount <= dayDate.totalDay()) {
                        mDIV[j].innerHTML = dayCount;
                        mDIV[j].className = "active-day";
                        if (!firstInit) {
                            mDIV1[j].innerHTML = dayCount;
                            mDIV1[j].className = "active-day";
                        }
                        dayCount++;
                    } else {
                        mDIV[j].innerHTML = nextDayCount;
                        mDIV[j].className = "";
                        if (!firstInit) {
                            mDIV1[j].innerHTML = nextDayCount;
                            mDIV1[j].className = "";
                        }
                        nextDayCount++;
                    }

                }
            }
        }
        var titleText = this.wrap.getElementsByClassName("title-text")[0];
        titleText.innerHTML = dayDate.taday.getFullYear() + "年" + (dayDate.taday.getMonth() + 1) + "月"
    },
    // 上下翻 的效果，可配置要不要该动画
    Move: function (obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = null;
        obj.timer = setInterval(
            function () {
                var currentTop = parseInt(CreateCalendar.getStyle(obj, "top"));
                if (isNaN(currentTop)) {
                    obj.style["top"] = "0px"
                    top = 0;
                }
                if (currentTop != target) {
                    var speed = (target - currentTop) / 5;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    obj.style["top"] = currentTop + speed + "px";
                } else {
                    clearInterval(obj.timer);
                    obj.timer = null;
                    callback && callback();
                }
            }, "50"
            );
    },
// 注册按钮事件
    initEvent: function () {
        var preBtn = this.wrap.getElementsByClassName("title-pre")[0];
        var mUL = this.wrap.getElementsByClassName("calemdarDay")[0];
        var that = this;
        preBtn.onclick = function () {
            if (that.DayModel && !mUL.timer) {
                that.DayModel.setPreMonth();
                that.initDay("move", "up");
                if (that.MOVE) {
                    this.style.opacity = '0.2';
                    that.Move(mUL, 0, (function (ele) {
                        ele.style.opacity = '1';
                        that.trigger("moveUp",that);
                    })(this));
                }
            }
        }

        var nextBtn = this.wrap.getElementsByClassName("title-next")[0];
        nextBtn.onclick = function () {
            if (that.DayModel && !mUL.timer) {
                that.DayModel.setNextMonth();
                that.initDay("move", "down");
                if (mUL.dataHeight) {
                    if (that.MOVE) {
                        this.style.opacity = '0.2';
                        that.Move(mUL, -(parseInt(mUL.dataHeight)), (function (ele) {
                            ele.style.opacity = '1';
                            that.trigger("moveDown",that);
                        })(this));
                    }
                }
            }
        }
    }

}