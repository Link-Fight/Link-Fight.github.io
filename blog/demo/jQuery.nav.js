   ;(function($){
          $.extend({//插件定义在全局方法上
           "nav":function(color){
               $(".nav").css(
                   {"list-style":"none",
                    "margin":0,
                    "padding":0,
                    "display":"none",
                    "color":color//用户控制
                   }
               );
               $(".nav").parent().hover(//这里用到了.nav的父节点(就是hover到的元素)
            //    我们只能在插件的要求的范围内进行设定，就是根据现有的钩子找对象，如果使用了外部的选择器，就是违背这个原则
             function(){
                 console.info(1);
                 $(this).find(".nav").stop().slideDown("normal");//注意我们在这里使用了jquery的动画方法
             },
             function(){
                 console.info(2);
                 $(this).find(".nav").stop().slideUp("normal");//注意stop()的使用，不然会有类似手风琴效果的出现，但那并不是我们需要的
             }
                   
               );
           }    
          });
      })(jQuery);