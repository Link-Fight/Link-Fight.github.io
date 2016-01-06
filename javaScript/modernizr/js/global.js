function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof oldonload != "function"){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        var  newClassName = element.className;
        newClassName+=" "+value;
        element.className = newClassName;
    }
}

function hightlightPage(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    var headers = document.getElementsByTagName("header");
    if(headers.length==0) return false;
    var navs =headers[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl = window.location.href;
    var currentUrl;
    for(var i=0,len = links.length;i<len;i++){
        currentUrl =links[i].getAttribute("href");
       if(linkurl.indexOf(currentUrl)!=-1){
           links[i].className="here";
           currentUrl= currentUrl.replace(".html","");
           document.body.setAttribute("id",currentUrl);
           return;
       }
    }
}
addLoadEvent(hightlightPage);