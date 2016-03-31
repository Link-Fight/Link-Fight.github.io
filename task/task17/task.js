/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

function randomColor() {
    var rColor = "#";
    for (var i = 0; i < 3; i++) {
        var color = (Math.ceil(Math.random() * 255)).toString(16);
        if (color.length == 1) {
            color = "0" + color;
        }
        rColor += color;
    }
    return rColor;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(data) {
    // data = {max:0,nodes:[]};
    if (!data) {
        return;
    }
    var chartDiv = document.getElementsByClassName("aqi-chart-wrap")[0];
    var width = chartDiv.offsetWidth;
    var preWidth = Math.floor(width / data.nodes.length);
    var height = 510;//data.max + 10;
    var templeStr = "";
    for (var i = 0; i < data.nodes.length; i++) {
        templeStr += "<div class=chartDiv title=" + data.nodes[i][0] + ":" + data.nodes[i][1] + " style='height:" + height + "px;width:" + preWidth + "px'> <div style='height:" + data.nodes[i][1] + "px;width:" + preWidth + "px;background-color: " + randomColor() + ";'></div> </div>";//#004466"
    }
    chartDiv.innerHTML = templeStr;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
    // 确定是否选项发生了变化 
    if (pageState.nowGraTime == value) {
        return;
    }

    // 设置对应数据
    pageState.nowGraTime = value;
    // 调用图表渲染函数
    renderChart(chartData[pageState.nowGraTime][pageState.nowSelectCity]);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value) {
    // 确定是否选项发生了变化 
    if (pageState.nowSelectCity == value) {
        return;
    }

    // 设置对应数据
    pageState.nowSelectCity = value;
    // 调用图表渲染函数
    renderChart(chartData[pageState.nowGraTime][pageState.nowSelectCity]);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var graTimeFiel = document.getElementById("form-gra-time");
    graTimeFiel.onclick = function(event) {
        event = event || window.event;
        if (event.target.type == "radio") {
            graTimeChange(event.target.value);
        }
    };
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var templeStr = "";
    for (city in aqiSourceData) {
        if (pageState.nowSelectCity == -1) {
            pageState.nowSelectCity = city;
        }
        templeStr += "<option>" + city + "</option>";

    }
    var select = document.getElementById("city-select");
    select.innerHTML = templeStr;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.onchange = function() {
        console.log(this.value);

        citySelectChange(this.value);
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData.day = {};
    chartData.week = {};//在Date的getDay()的返回结果里 0~6 表示星期日~星期六
    chartData.month = {};
    var maxDay = 0;
    var maxWeek = 0;
    var maxMonth = 0;
    for (city in aqiSourceData) {
        chartData.day[city] = { max: 0, nodes: [] };
        chartData.week[city] = { max: 0, nodes: [] };
        chartData.month[city] = { max: 0, nodes: [] };
        var week = { month: -1, start: -1, nodes: 0 };
        var week_count = 0;
        var month = { month: -1, start: -1, nodes: 0 };
        var month_count = 0;
        for (keyDay in aqiSourceData[city]) {
            var value = aqiSourceData[city][keyDay];
            if (value > maxDay) {
                maxDay = value;
            }
            chartData.day[city].nodes.push([keyDay, value]);//整理Day的数据
            var day = new Date(keyDay);//1234560  整理周的数据
            if (week.month == -1) {
                week.month = day.getMonth();
                week.start = keyDay;
            }
            if (day.getDay() == 0 || day.getMonth() != week.month) {
                value = Math.ceil(week_count / week.nodes);
                if (maxWeek < value) {
                    maxWeek = value;
                }
                chartData.week[city].nodes.push([week.start + "~" + keyDay, value]);
                week_count = 0;
                week = { month: -1, nodes: [] };
            } else {
                week_count += value;
                week.nodes++;
                week.end = keyDay;
            }
            // 整理月的数据
            if (month.month == -1) {
                month.month = day.getMonth();
                month.start = keyDay;
            }
            if (day.getMonth() != month.month) {
                value = Math.ceil(month_count / month.nodes);
                if (maxMonth < value) {
                    maxMonth = value;
                }
                chartData.month[city].nodes.push([month.start + "~" + keyDay, value]);
                month_count = 0;
                month = { month: -1, nodes: [] };
            } else {
                month_count += value;
                month.nodes++;
                month.end = keyDay;
            }

        }
        if (month.month != -1) {
            if (maxMonth < value) {
                maxMonth = value;
            }
            chartData.month[city].nodes.push([month.start + "~" + month.end, Math.ceil(month_count / month.nodes)]);
        }
        if (week.month != -1) {
            if (maxWeek < value) {
                maxWeek = value;
            }
            chartData.week[city].nodes.push([week.start + "~" + week.end,  Math.ceil(week_count / week.nodes)]);
        }
        chartData.day[city].max = maxDay;
        chartData.week[city].max = maxWeek;
        chartData.month[city].max = maxMonth;
        maxMonth = maxWeek = maxDay = 0;
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();