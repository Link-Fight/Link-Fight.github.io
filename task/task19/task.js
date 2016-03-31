window.onload = function() {
    var btnS = document.getElementById("controller");
    btnS.onclick = handlerBtn;
    var contentDiv = document.getElementById("content");
    contentDiv.onclick = handlerClick;
    var chartBtn = document.getElementById("chartBtn");
    chartBtn.onclick = handlerchartBtnClick;
    init();
}
var chartData = { max: -1, nodes: [] };
function handlerBtn(event) {//处理按钮点击事件，根据不同的按钮做相应的操作
    event = event || window.event;
    if (event.target.nodeName == "BUTTON") {
        var text = event.target.innerText;
        var contentDiv = document.getElementById("content");
        var contentChildDiv = contentDiv.getElementsByTagName("div");
        if (text == "左侧入") {
            var input = document.getElementById("input").value;
            if (input.length == 0) {
                return;
            }
            if (input > 100 || input < 10) {
                alert("10~100！");
                return;
            }
            if (contentChildDiv.length >= 60) {
                alert("最多60个");
                return;
            }
            contentDiv.innerHTML = "<div>" + input + "</div>" + contentDiv.innerHTML;
            chartData.nodes.unshift(parseFloat(input));
        } else if (text == "右侧入") {
            var input = document.getElementById("input").value;
            if (input.length == 0) {
                return;
            }
            if (input > 100 || input < 10) {
                alert("10~100！");
                return;
            }
            if (contentChildDiv.length >= 60) {
                alert("最多60个")
                return;
            }
            contentDiv.innerHTML += "<div>" + input + "</div>";
            chartData.nodes.push(parseFloat(input));
        } else if (text == "左侧出") {
            contentDiv.removeChild(contentDiv.getElementsByTagName("div")[0]);
            chartData.nodes.shift();
        } else if (text == "右侧出") {
            var cDiv = contentDiv.getElementsByTagName("div");
            contentDiv.removeChild(cDiv[cDiv.length - 1]);
            chartData.nodes.pop();
        }
        initChartDate();
    }
}

function handlerClick(event) {//点击数字删除
    event = event || window.event;
    if (event.target.id == "") {
        event.target.parentElement.removeChild(event.target);
    }
}

function handlerchartBtnClick(event) {//点击图表的操作按钮
    event = event || window.event;
    if (event.target.nodeName == "BUTTON") {
        var text = event.target.innerText;
        var contentDiv = document.getElementById("content");
        var contentChildDiv = contentDiv.getElementsByTagName("div");
        if (text == "生成") {
            renderChart(chartData);
        } else if (text = "排序") {
            var sortRaido = document.getElementsByName("sort");
            var radioValue = "";
            for (var i = 0, len = sortRaido.length; i < len; i++) {
                if (sortRaido[i].checked) {
                    radioValue = sortRaido[i].value;
                    break;
                }
            }
            var sortBtn = document.getElementById("sort");
            sortBtn.disabled = true
            sortData = { max: chartData.max, nodes: chartData.nodes.slice() }
            document.getElementsByName("sort");
            // var list = bubbleSort(sortData);
            var list = sortMenth[radioValue](sortData);
            setTimeout(function() {
                sortChart(list);
            }, 200);
        }
    }
}

var sortMenth = {
    selectionSort: selectionSort,
    bubbleSort: bubbleSort
}

function sortChart(list) {
    if (list.length > 0) {
        var data = list.shift();
        renderChart(data);
        setTimeout(function() {
            sortChart(list);
        }, 400);
    } else {
        var sortBtn = document.getElementById("sort");
        sortBtn.disabled = false;
    }
}

function selectionSort(chartData) {
    list = [];
    var j = chartData.nodes.length;
    while (j > 1) {
        var tempIndext = 0;
        for (var i = 0; i < j; i++) {
            if (chartData.nodes[tempIndext] < chartData.nodes[i]) {
                tempIndext = i;
            }
        }
        var temp = chartData.nodes[j - 1];
        chartData.nodes[j - 1] = chartData.nodes[tempIndext];
        chartData.nodes[tempIndext] = temp;
        list.push({ max: chartData.max, nodes: chartData.nodes.slice() });
        j--;
    }
    return list;
}

function bubbleSort(chartData) {
    var list = [];
    var j = chartData.nodes.length;
    do {
        for (var i = 0; i < j - 1; i++) {
            list.push({ max: chartData.max, nodes: chartData.nodes.slice() });
            if (chartData.nodes[i] > chartData.nodes[i + 1]) {
                var temp = chartData.nodes[i];
                chartData.nodes[i] = chartData.nodes[i + 1];
                chartData.nodes[i + 1] = temp;
            }
        }
        j--;
    } while (j > 1)
    return list;
}

function renderChart(chartData) {
    var chartDiv = document.getElementById("chart");
    var width = chartDiv.offsetWidth;
    var height = chartData.max+20;
    var templeStr = "";
    for (var i = 0; i < chartData.nodes.length; i++) {
        templeStr += "<div class=chartDiv   style='height:" + height + "px'>"+chartData.nodes[i]+" <div style='height:" + chartData.nodes[i] + "px; background-color: red;'></div> </div>";//#004466"
    }
    chartDiv.innerHTML = templeStr;
}

function initChartDate() {
    chartData.max = -1;
    chartData.nodes.forEach(function(value) {
        if (value > chartData.max) {
            chartData.max = value;
        }
    });
}

function init() {
    var contentDiv = document.getElementById("content");
    var contentChildDiv = contentDiv.getElementsByTagName("div");
    for (var i = 0; i < contentChildDiv.length; i++) {
        var value = parseFloat(contentChildDiv[i].innerText);
        chartData.nodes.push(value);
    }
    initChartDate();
}