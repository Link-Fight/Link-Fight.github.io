var h=window.innerHeight
			|| document.documentElement.clientHeight
|| document.body.clientHeight;
var nowIndex = 0;
var preScroll = 0;
var dis_Scroll=0;
var isDown =true;
        window.onscroll=function(){
            // console.log(h);            
            var scrollTop = window.document.body.scrollTop||document.documentElement.scrollTop;
            // console.log(scrollTop); 
            var mInput = document.getElementsByTagName("input");
            for(var i = 0,len = mInput.length;i<len;i++){
                if(mInput[i].checked){
                    nowIndex ==i;
                    console.log(i+" #");
                    break;
                }
            }
           dis_Scroll = scrollTop - preScroll;
           preScroll = scrollTop;
           
           if(dis_Scroll>0){
               isDown=true;
           }else{
               isDown = false;
           }
           console.log("Now:"+ dis_Scroll);
           
        }
        window.onload=function(){
            Move();
        }
        function Move(){
            var roll = document.getElementsByClassName("roll")[0];
            var ul = roll.getElementsByTagName("ul")[0];
            ul.innerHTML += ul.innerHTML;
            var li = ul.getElementsByTagName("li");
            ul.style.width = li.length*(5+li[0].offsetWidth)+"px";
            var speed =2;
            setInterval(function(){
                if(ul.offsetLeft<-(ul.offsetWidth/2))
                {
                    
                    ul.style.left = "0px"
                }else{
                    ul.style.left = ul.offsetLeft - speed +"px";
                }
                // console.log(ul.offsetLeft);
            },20);
        }
        
      