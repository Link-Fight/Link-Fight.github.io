        function CreateList(pNode,mDate){
            this.wrap = document.createElement("div");
            this.wrap.className="kelin_listwrap";
            this.init.apply(this,arguments);
            this.addEvet.call(this);
        }
        
        CreateList.prototype={
            init:function(pNode,mDate){
                 if(!mDate["data"])
                    return;
                  for(var i=0,len = mDate.data.length;i<len;i++){
                      var curDate = mDate.data[i];
                      var mDl = document.createElement("dl");                   
                      mDl.innerHTML="<dt>"+curDate["pNode"]+"<span>"+curDate.cNode.length+"</span></dt>";
                      for(var j=0,mLen = curDate.cNode.length;j<mLen;j++){
                          mDl.innerHTML+="<dd> "+(j+1)+")<a href="+curDate.cNode[j].href+" target='_blank'>"+curDate.cNode[j].text+"</a></dd>";
                      }
                      this.wrap.appendChild(mDl);
                  }
                  if(pNode)
                  {
                       pNode.appendChild(this.wrap);
                  }
                  else{
                      document.body.appendChild(this.wrap);
                  }
                  mDate = null;
            },
            
           
            
            addEvet:function(){
                var that = this;
                that.Flag =false;
                var mDt = document.getElementsByTagName("dt");
                for(var i=0;i<mDt.length;i++){
                    mDt[i].onclick =  function(event){ 
                        var activeDt = document.getElementsByClassName("active")[0];
                        if(that.Flag){
                            return;
                        }
                         if(activeDt==this){
                                that.Flag=true;
                                this.className="";
                                that.move(this.parentElement||this.parentNode,"list_MinH");   
                                return;}
                            if(activeDt){
                                 that.Flag=true;
                                activeDt.className="";
                                that.move(activeDt.parentElement||activeDt.parentNode,"list_MinH",
                                (function(o,t){
                                    var obj = o.parentElement||o.parentNode;
                                    return function(){
                                        o.className="active";
                                        t.move(obj,"list_MaxH");
                                    };
                                })(this,that));
                            }else{
                                 that.Flag=true;
                                this.className="active";
                                that.move(this.parentElement||this.parentNode,"list_MaxH");   
                            }
                        };
                   var mDl = mDt[i].parentElement||mDt[i].parentNode;
                   mDl["list_MinH"] = getComputedStyle(mDt[i])["height"];
                   mDl["list_MinH"] = parseInt(getComputedStyle(mDt[i])["border-bottom"])+parseInt(mDl["list_MinH"])+"px";
                   mDl["list_MaxH"] = getComputedStyle(mDl)["height"];
                   mDl.style.height=mDl["list_MinH"];
                }
            },
            
            move:function(target,type,callback){
                clearTimeout(target.timer);
                var that = this;
                target.timer=setTimeout(function(){
                    var height = parseInt(getComputedStyle(target)["height"]);
                    if(height==parseInt(target[type])){
                        target.timer=null;
                        
                        if(callback){
                            callback();
                        }else{
                            that.Flag=false;
                        }
                    }else{
                        var speed =( parseInt(target[type])-height )/5;
                        speed=speed>0?Math.ceil(speed):Math.floor(speed);
                        target.style.height=(height + speed)+"px";
                        that.move(target,type,callback);
                    }
                },25);
            }
        }
