function initUi(data) {
    var lis = "";
    var listContents = "";
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            lis += "<li class='focus' data-index=0>" + data[i].name + "</li>";
        } else {
            lis += "<li data-index=" + i + ">" + data[i].name + "</li>";
        }

        if (i == 0) {
            var listContent = "<ul class='list' style='display:block' data-index=" + i + ">";
        } else {
            var listContent = "<ul class='list' style='display:none' data-index=" + i + ">";
        }
        data[i].list.forEach(function (v, index) {
            listContent += "<li ><a href='#' data-index=" + i + "-" + index + ">" + v.title + "</a></li>";
        });
        listContent += "</ul>";
        listContents += listContent;
    }
    var header = document.getElementById("header");
    var listContent = document.getElementById("listContent");

    header.innerHTML = lis;
    listContent.innerHTML = listContents;
}


function initEvent() {
    var header = document.getElementById("header");
    header.addEventListener("click", function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName == "LI") {
            document.querySelector("#header li.focus").className="";
            target.className ="focus";
            var index = target.getAttribute("data-index");
            var contentList = document.querySelectorAll("#listContent>ul");
            for (var i = 0, len = contentList.length; i < len; i++) {
                if (i == index) {
                    contentList[i].style.display = "block";
                } else {
                    contentList[i].style.display = "none";
                }
            }
        }
    }, false);
    var lis = document.querySelectorAll("#listContent li a ");
    for (var i = 0, len = lis.length; i < len; i++) {
        lis[i].addEventListener("mouseover", function (e) {
            e = e || window.event;
            var tips = document.getElementById("tips");
            tips.style.display = "block";
            console.count(1);
            var index = this.getAttribute("data-index");
            var data = getData(index);
            document.querySelector("#tipsContent").innerHTML = info_makup(data);
            setPositon(this, tips);
        }, false);
        lis[i].addEventListener("mouseout", function (e) {
            e = e || window.event;
            var tips = document.getElementById("tips");
            tips.style.display = "none";
            console.count(2);
        }, false);
    }


    function getData(index) {
        var indexArr = index.split("-");
        return data[indexArr[0]]["list"][indexArr[1]];
    }


    function setPositon(ele, target) {
        var clientRect = ele.getBoundingClientRect();
        var bodyRect = getBodyRect();
        var left = clientRect.left + ele.clientWidth + 20;
        var top = clientRect.top-40;
        var bottom = clientRect.bottom;
        target.style.left = left + "px";
        target.style.top = top + "px";
        var targetClientRect = target.getBoundingClientRect();
       console.count(targetClientRect.bottom);
        if (targetClientRect.bottom > bodyRect.H) {
            console.count(targetClientRect.bottom);
            target.style.top = bodyRect.H - targetClientRect.height+"px";
            targetClientRect = target.getBoundingClientRect();
        }
        var arrow = document.getElementById("arrow");
        arrow.style.top =Math.abs(targetClientRect.top-clientRect.top)+8+"px";
    }

    /**
     * 获取body的宽和高
     * return{H,W}
     */
    function getBodyRect() {
        return {
            H: window.innerHeight,
            W: window.innerWidth,
        }
    }
}

function info_makup(data) {
    var result = "";

    result = `<h3>${data.company}</h3><ul>
    <li class='col'><b>职位:</b>${data.position}</li class='col'>
        <li class='col'><b>招聘人数:</b> ${data.recruitingNumbers}</li class='col'>
        <li class='col'><b>工作地点:</b> ${data.workingLocation}</li>
        <li class='col'><b>工作经验:</b> ${data.workExperience}</li>
        <li class='col'><b>学历:</b> ${data.education}</li>
        <li class='col'><b>薪资:</b> ${data.wage}</li>
        <li class='right'><b>时间:</b> ${data.addDate}</li>
        </ul>`;

    return result;
}

initUi(data);
initEvent();