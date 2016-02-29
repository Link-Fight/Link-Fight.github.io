        var kelinNameSpace = new Object();
         kelinNameSpace.init = function () {
            var btn = document.getElementById("click");
            click.onclick = function () {
                kelinNameSpace.myAjax("getQueryDate?date=2016-01&userid=66", function (response) {
                    var json = JSON.parse(response);
                    var obj = new Function("return" + json)();
                    console.log(obj);
                });
            }
        }
        
         kelinNameSpace.getStyle = function(obj,attr){
            return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
        }
         kelinNameSpace.getXHR = function () {
            var XHR;
            if (window["XMLHttpRequest"]) {
                XHR = new XMLHttpRequest();
            } else {
                var XmlHttpVersions = new Array("MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP");
                for (var i = 0; i < XmlHttpVersions.length; i++) {
                    try {
                        XHR = new ActiveXObject(XmlHttpVersions[i]);
                    }
                    catch (e) {
                    }
                }
            }
            return XHR;
        }
       
        var myModule={
            DayDate:function(){
                this.taday = new Date();
                this.firstMonthDay= function(){ return new Date(this.taday.getFullYear(),this.taday.getMonth(),1);};
                this.totalDay = function(){ return new Date(this.taday.getFullYear(),this.taday.getMonth()+1,0).getDate();};
                this.preTotalDay=function(){return new Date(this.taday.getFullYear(),this.taday.getMonth(),0).getDate();}; 
                this.nextTotalDay=function(){return new Date(this.taday.getFullYear(),this.taday.getMonth()+2,0).getDate();};
                this.setNextMonth=function(){
                    if(this.taday){
                        this.taday.setDate(1);
                        this.taday.setMonth(this.taday.getMonth()+1);
                    }
                }
                this.setPreMonth=function(){
                    if(this.taday){
                        this.taday.setDate(1);
                        this.taday.setMonth(this.taday.getMonth()-1);
                    }
                }
            }
        }
        
              
       
        function CreateCalendar(pNode,initDate){
            this.wrap = document.createElement("div");
            this.wrap.className ="calendar";
            this.init.apply(this,arguments);
            this.DayModel = new myModule.DayDate();
            this.initDayUL.call(this);
            this.initEvent.call(this);
            this.MOVE=initDate?(initDate["MOVE"]?initDate["MOVE"]:false):true;
        }
        
        
        CreateCalendar.prototype={
            init:function(pNode,initDate){
               if(pNode){
                    pNode.appendChild(this.wrap);
               }else{
                   document.body.appendChild(this.wrap);
               }
               this.wrap.innerHTML="<div class='title'><span class=title-text id=title-text>2016年2月</span><span class=title-pre id=title-pre>></span><span class=title-next id=title-next>></span></div>"; 
               var defaultDay =new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
               var arrDay =initDate?(initDate["headDay"]?initDate["headDay"]:defaultDay):defaultDay;
               var headerDay ="<div class=header>";
               for(var i=0;i<arrDay.length;i++){
                    headerDay+= "<div class=header-day>"+arrDay[i]+"</div>";
               }
               headerDay+="</div>";
               this.wrap.innerHTML+=headerDay;
               var mainDay ="<div class=main><ul id=calemdarDay class=calemdarDay data-height=''>";
               var bufferStr="";
               for(i=0;i<=6;i++){
                   if(i==0){
                       bufferStr+="<li>";
                   }
                   bufferStr+=" <div class=normal-day>"+i+"</div>"
                    if(i==6){
                       bufferStr+="</li>";
                   }
               }
               bufferStr=bufferStr+bufferStr+bufferStr+bufferStr+bufferStr+bufferStr;
               mainDay+=bufferStr+"</ul></div>";
               this.wrap.innerHTML+=mainDay;
              console.log(this.wrap);
            },
            getStyle : function(obj,attr){
                 return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
            },
            initDayUL : function(){
                var ul =  this.wrap.getElementsByTagName("ul")[0];//document.getElementById("ul");
                ul.dataHeight = this.getStyle(ul,"height");
                this.initDay();
                ul.innerHTML=ul.innerHTML+ul.innerHTML;
                this.Move(ul,-parseInt(ul.dataHeight));
            },
            
            initDay:function(type,diretert){
                if(!this.DayModel){
                     this.DayModel = new myModule.DayDate();
                }
                var dayDate = this.DayModel;
                var mUL = this.wrap.getElementsByClassName("calemdarDay")[0];
                var mLIs = mUL.getElementsByTagName("li");
                if(diretert=="up"){
                    mUL.style.top="-"+mUL.dataHeight;
                }else if(diretert=="down"){
                    mUL.style.top="0px";    
                }
                var firstInit = true;
                if(type=="move"){
                    firstInit = false;
                }
                var dayCount = 1;
                var preDayCount = dayDate.preTotalDay();
                var nextDayCount=1;
                var len = 6;
                for(var i =0;i<len;i++){
                    var mDIV = mLIs[i].getElementsByTagName("div");
                    if(!firstInit){
                        var mDIV1 = mLIs[i+6].getElementsByTagName("div");
                    }
                    if(i==0){
                        var startIndex = dayDate.firstMonthDay().getDay();
                        do{
                            mDIV[startIndex].innerHTML = dayCount;
                            mDIV[startIndex].className="active-day";
                            if(!firstInit){
                                    mDIV1[startIndex].innerHTML = dayCount;
                                    mDIV1[startIndex].className="active-day";   
                            }
                            startIndex++;
                            dayCount++
                        }
                    while(startIndex<mDIV.length)
                         startIndex = dayDate.firstMonthDay().getDay();
                    while(startIndex>0){
                        --startIndex;
                        mDIV[startIndex].innerHTML= preDayCount;
                        mDIV[startIndex].className="";
                        if(!firstInit){
                                mDIV1[startIndex].innerHTML= preDayCount;
                                mDIV1[startIndex].className="";   
                        }
                        preDayCount--;
                    }
                        
                    }else{
                        for(var j=0;j<mDIV.length;j++ ){
                            if(dayCount<=dayDate.totalDay()){
                                mDIV[j].innerHTML= dayCount;
                                mDIV[j].className="active-day";
                                if(!firstInit){
                                    mDIV1[j].innerHTML= dayCount;
                                    mDIV1[j].className="active-day";   
                                }
                                dayCount++;    
                            }else{
                                mDIV[j].innerHTML=nextDayCount;
                                mDIV[j].className="";
                                if(!firstInit){
                                    mDIV1[j].innerHTML=nextDayCount;
                                    mDIV1[j].className="";   
                                }
                                nextDayCount++;
                            }
                            
                        }
                    }
                }
                var titleText = this.wrap.getElementsByClassName("title-text")[0];
                titleText.innerHTML=dayDate.taday.getFullYear()+"年"+(dayDate.taday.getMonth()+1)+"月"
            },
            Move:function(obj,target,callback){
                clearInterval(obj.timer);   
                obj.timer = null;        
                obj.timer = setInterval(
                    function(){
                        var currentTop = parseInt( kelinNameSpace.getStyle(obj,"top"));
                        if(isNaN(currentTop)){
                            obj.style["top"]="0px"
                            top=0;
                        }
                        if(currentTop!=target){
                            var speed = (target - currentTop)/5;
                            speed = speed>0?Math.ceil(speed):Math.floor(speed);
                            obj.style["top"]= currentTop +speed+"px";
                        }else{
                            clearInterval(obj.timer);
                            obj.timer = null;
                            callback&&callback();
                        }
                    },"50"
                );
            },
            
            initEvent:function(){
                     var preBtn = this.wrap.getElementsByClassName("title-pre")[0];
                     var mUL = this.wrap.getElementsByClassName("calemdarDay")[0];
                     var that = this;
                    preBtn.onclick = function(){
                        if(that.DayModel&&!mUL.timer){
                            that.DayModel.setPreMonth();
                            that.initDay("move","up");
                            if(that.MOVE){
                                this.style.opacity='0.2';
                                that.Move(mUL,0,(function(ele){
                                     ele.style.opacity='1';
                                 })(this));  
                            }
                        }    
                    }
                    
                    var nextBtn = this.wrap.getElementsByClassName("title-next")[0];
                    nextBtn.onclick = function(){
                        if(that.DayModel&&!mUL.timer){
                            that.DayModel.setNextMonth();
                            that.initDay("move","down");
                            if(mUL.dataHeight){
                                if(that.MOVE){
                                    this.style.opacity='0.2';
                                    that.Move(mUL,-(parseInt(mUL.dataHeight)),(function(ele){
                                    ele.style.opacity='1';
                                     })(this));     
                                 }
                              }     
                        }    
                    }
            }
                
        }
  