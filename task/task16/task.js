/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input");
    var value = document.getElementById("aqi-value-input");
    aqiData = aqiData ? aqiData : {};

    if (!Number.isInteger(parseFloat(value.value)))
    {
        alert("请输入整数！");
        return;
    }
    aqiData[city.value] = value.value;

}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table");
    for (key in aqiData) {
        aqiTable.innerHTML += "<tr><td>" + key + "</td><td>" + aqiData[key] + "</td><td><button>删除</button></td></tr>";
    }
    aqiData = {};
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.
    event = event ? event : window.event;
    if (event.target.tagName == "BUTTON" && event.target.innerText == "删除") {
        event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
    }
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var aqiTable = document.getElementById("aqi-table");
    aqiTable.onclick = delBtnHandle;
}

init();
