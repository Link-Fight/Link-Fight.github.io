// define(function() {
//     'use strict';
//     function Owindow(params) {
//         this.cfg = {
//             content: "",
//             title: "消息",
//             handler: null,
//             width: 500,
//             height: 300,
//             hasCloseBtn:false,
//             handler4AlertBtn:null,
//             handler4CloseBtn:null,
//             skinClassName:"",
//         }
        
//     }
//     // document.body.removeChild
//     Owindow.prototype = {
//         alert: function(cfg) {
//             var CFG = $.extend(this.cfg, cfg);
//             var boundingBox = $("<div class='windows_boundingBox'>" +
//                 "<div class =window_header>" + CFG.title + "</div>" +
//                 "<div class =window_body>" + CFG.content + "</div>" +
//                 "<div class =window_footer><button id=alertSure>确定</button></div>" +
//                 +"</div>");
//             boundingBox.appendTo("body");
//             var btn = boundingBox.find("#alertSure");
//             btn.appendTo(boundingBox);
//             btn.click(function() {
//                 CFG.handler4AlertBtn && CFG.handler4AlertBtn();
//                 boundingBox.remove();
//             });

//             boundingBox.css({
//                 width: this.cfg.width + "px",
//                 height: this.cfg.height + "px",
//                 left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + "px",
//                 top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + "px"
//             });
            
//             if(CFG.hasCloseBtn){
//                 var closeBtn = $("<span class=window_closeBtn>X</span>")
//                 closeBtn.appendTo(boundingBox);
//                 closeBtn.click(function(){ 
//                     CFG.handler4CloseBtn && CFG.handler4CloseBtn();
//                     boundingBox.remove()}
//                     );
                    
//             }
//             if(CFG.skinClassName){
//                 boundingBox.addClass(CFG.skinClassName);
//             }
//             return {
//                 remove: function() { boundingBox[0].parentElement.removeChild(boundingBox[0]); }
//             }
//         },
//         confirm: function() {

//         },
//         prompt: function() {

//         }
//     }

//     return {
//         Owindow: Owindow
//     }
// });
(function(window,undefined){
    
    console.log("hi")
       function Owindow(params) {
        this.cfg = {
            content: "",
            title: "消息",
            handler: null,
            width: 500,
            height: 300,
            hasCloseBtn:false,
            handler4AlertBtn:null,
            handler4CloseBtn:null,
            skinClassName:"",
        }
        
    }
    Owindow.prototype = {
        alert: function(cfg) {
            var CFG = $.extend(this.cfg, cfg);
            var boundingBox = $("<div class='windows_boundingBox'>" +
                "<div class =window_header>" + CFG.title + "</div>" +
                "<div class =window_body>" + CFG.content + "</div>" +
                "<div class =window_footer><button id=alertSure>确定</button></div>" +
                +"</div>");
            boundingBox.appendTo("body");
            var btn = boundingBox.find("#alertSure");
            btn.appendTo(boundingBox);
            btn.click(function() {
                CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundingBox.remove();
            });

            boundingBox.css({
                width: this.cfg.width + "px",
                height: this.cfg.height + "px",
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + "px",
                top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + "px"
            });
            
            if(CFG.hasCloseBtn){
                var closeBtn = $("<span class=window_closeBtn>X</span>")
                closeBtn.appendTo(boundingBox);
                closeBtn.click(function(){ 
                    CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    boundingBox.remove()}
                    );
                    
            }
            if(CFG.skinClassName){
                boundingBox.addClass(CFG.skinClassName);
            }
            return {
                remove: function() { boundingBox[0].parentElement.removeChild(boundingBox[0]); }
            }
        },
        confirm: function() {

        },
        prompt: function() {

        }
    }
    
       
    if ( typeof define === "function" && define.amd && !(define.amd.Owindow) ) {//既能符合require.js的要求 又能独立工作
        define(function () {
                return {Owindow}; 
                } 
            );
    }else{
        window.Owindow = Owindow;
    }

})(window);