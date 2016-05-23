window.onload = function() {
    var btnS = document.getElementById("controller");
    btnS.onclick = handlerBtn;
    var contentDiv = document.getElementById("content");
    contentDiv.onclick = handlerClick;
}

function handlerBtn(event) {


    event = event || window.event;
    if (event.target.nodeName == "BUTTON") {
        var text = event.target.innerText;
        var contentDiv = document.getElementById("content");
        if (text == "左侧入") {
            var input = document.getElementById("input").value;
            if (input.length == 0) {
                return;
            }
            contentDiv.innerHTML = "<div>" + input + "</div>" + contentDiv.innerHTML;
        } else if (text == "右侧入") {
            var input = document.getElementById("input").value;
            if (input.length == 0) {
                return;
            }
            contentDiv.innerHTML += "<div>" + input + "</div>";
        } else if (text == "左侧出") {
            contentDiv.removeChild(contentDiv.getElementsByTagName("div")[0]);
        } else if (text == "右侧出") {
            var cDiv = contentDiv.getElementsByTagName("div");
            contentDiv.removeChild(cDiv[cDiv.length - 1]);
        }

    }
}

function handlerClick(event) {
    event = event || window.event;
    if (event.target.id == "") {
        event.target.parentElement.removeChild(event.target);
    }
}