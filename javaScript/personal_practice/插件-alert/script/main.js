require.config({
    paths: {
        jquery: "jquery-1.9.1"
    }
});

require(["jquery", "window"], function($, W) {
    this.age = 20;
    console.info(this);
    $("#alert").click(function() {
        new W.Owindow().alert(null,
            { content:"Window", 
            handler4AlertBtn:function (params) {
              console.log("alert");  
            },
            handler4CloseBtn: function(params) {
            console.log("close");
        },  
        width: 300, height: 150, y: 50,
        hasCloseBtn:true,
        skinClassName:"skin_a"
     } ).on("clostBtn",function(params) {
         console.log(params);
     }).on("alertSure",function(params) {
         console.info(params);
     }).say();
    });
   window.onload
    // var ww = new W.Owindow();
    // this.Ww = ww;
});