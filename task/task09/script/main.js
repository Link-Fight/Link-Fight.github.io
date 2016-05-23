!function () {
    /**
     * 要求点击那个droplist的li后，获取正确的值
     * obj{WRAP,}
     */
    function linkDropDownList(obj) {
        this.wrap = obj["WRAP"];
        this.valueInput =  this.wrap.getElementsByTagName("input")[0];
        this.ul =   this.wrap.getElementsByTagName("ul")[0];
        this.iniEvent();
    }
    
    linkDropDownList.prototype={
       constructor:linkDropDownList,
       iniEvent:function() {
           var that = this;
           this.ul&&this.ul.addEventListener("click",function(event) {
              event = event||window.event;
              if(event.target.nodeName=="LI"){
                  that.valueInput.value = event.target.innerText;
              } 
           });
       }
    }
    
    function linkDropDownListFactory(selector) {
        var eles = document.querySelectorAll(selector);
        Array.prototype.forEach.call(eles,function(value){
          new linkDropDownList({WRAP:value});    
        });
    } 
    window.linkDropDownListFactory = linkDropDownListFactory;
}(window,undefined);