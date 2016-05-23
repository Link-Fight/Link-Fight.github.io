function $(selector) {
    return document.querySelectorAll(selector);
}

var Tool = {};

!function (nameSpace) {
    /**添加事件
 * @param  {any} obj
 * @param  {any} type
 * @param  {any} fn
 */
    function addEvent(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        }
    }

    /**
     * 设置或者取消className
     * @param  {any} obj - 设置对象
     * @param  {any} className - 类
     * @param  {any} flag - ture/任意值:设置或者取消className  false：仅仅取消className
     */
    function toggleClassName(obj, className, flag) {
        if (obj.className.indexOf(className) > -1) {
            obj.className.replace(className, "");
        }
    }
    nameSpace.addEvent = addEvent;
    nameSpace.toggleClassName = toggleClassName;
} (Tool);

window.onload = function (params) {
   var obj = $(".tap-control")[0];
   Tool.addEvent(obj,"click",function (e) {
       e = e||window.event;
       if(e.target.nodeName=="INPUT"&&e.target.type=="radio"){
           var oobj = $(".tap-context li");
           if(e.target.value=="0"){
               oobj[0].className="show";
               oobj[1].className="";
           }else if(e.target.value=="1"){
               oobj[1].className="show";
               oobj[0].className="";
           }
       }
   });
   
   var selectAreat  = $("#area")[0];
   Tool.addEvent(selectAreat,"change",function (e) {
      e = e || window.event; 
      var data = db[this.value];
      var tempHtml ="";
      for(var i = 0;i < data.length;i++){
          tempHtml += " <option >+data[i]+</option>";
      }
      this.innerHTML = tempHtml;
   });
};



var db = {
    "beiJing":["北京大学","清华大学","北京理工大学"],
    "shangHai":["上海师大","上海大学","上海交大"],
    "guangDong":["中山大学","华南理工","华南师范大学","华南农业大学"]
}