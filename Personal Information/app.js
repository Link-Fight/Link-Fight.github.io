/**
 * Created by liuna on 2016/4/13.
 */

/**
 * Created by liuna on 2016/4/13.
 */

function natureBox() {
    window.event.target.value="";
    var pic = document.getElementById("natureBox").src;
    if (pic.indexOf("down") > -1) {
        document.getElementById("natureBox").src = "images/icons/icon_arrow_gray_left.png";
    }
    else {
        document.getElementById("natureBox").src = "images/icons/icon_arrow_gray_down.png";
    }
    $("#showChoice").slideToggle("fast");
}

function chooseNature(e) {
    e = e || window.event;
    var txt = e.target.innerText;
    document.getElementById("nature").value = txt;
    $("#showChoice").slideUp("fast");
    document.getElementById("natureBox").src = "images/icons/icon_arrow_gray_left.png";
}

function cityBox() {
    document.getElementById("cityDistrict").placeholder = "支持中文/拼音";
}







function init() {
    $(".button-01").on("click", chooseNature);
    // var mLis = document.getElementsByClassName("button01");
    // for(var i =0;i<mLis.length;i++){
    //     console.log("2");
    //     mLis[i].addEventListener("click",chooseNature);
    // }
    $("#natureBox").on("click", natureBox);
    // var imgBtn = document.getElementById("natureBox");
    // imgBtn.addEventListener("click",natureBox);
    $("#nature").on("click", natureBox);
    // var inputBtn=document.getElementById("nature");
    // inputBtn.addEventListener("click",natureBox);
    $("#cityDistrict").on("click", cityBox);
    // var inputBtn02=document.getElementById("cityDistrict")
    // inputBtn02.addEventListener("click",cityBox);
}


window.onload = function () {
    init();
    console.log("1");
    var city = new City();
}


/**
 * 城市
 */

function City() {
    this.input = "#cityDistrict";
    this.display = "#showCity"; //.hide()
    this.select = "#tapSelect";
    this.tapActiveClass = "active";
    var that = this;
    $(this.input).bind("click", function () {
        $(this).val("");
        $(that.display).slideToggle("fast");
    });
    $(this.select + " a").bind("click", function (e) {
        e = e || window.event;
        if (e.target.nodeName == "A") {
            var index = e.target.href.indexOf("#") + 1;
            var text = e.target.href.slice(index);
        }
        var pNode = $(e.target.parentNode);
        if (!pNode.attr("class") && pNode.attr("class").indexOf(that.tapActiveClass) != -1) {
            return;
        } else {
            $("#tapSelect div.active").removeClass(that.tapActiveClass);
            pNode.addClass(that.tapActiveClass);
        }
        initList($(e.target).attr("href").replace("#", ""));
    });
    $(this.display + " ul").bind("click", function (e) {
        if (e.target.nodeName == "LI") {
            var text = e.target.innerText;
            $(that.input).val(text);
            $(that.display).slideToggle("fast");
        }
    });


    function initList(key) {
        var date = that.defaultDate[key];
        $(that.display + " ul").empty();
        if (date.forEach) {
            date.forEach(function (value) {
                $(that.display + " ul").append("<li class='city-item'>" + value.name + "</li>")
            });
        } else {
            for(var i=0;i<date.length;i++){
                  $(that.display + " ul").append("<li class='city-item'>" + date[i].name + "</li>")
            }
        }

    }

    this.defaultDate =
        {
            "popularCity": [
                { "id": 1, "name": "上海" }, { "id": 2, "name": "北京" }, { "id": 3, "name": "广州" }, { "id": 4, "name": "杭州" }, { "id": 5, "name": "厦门" },
                { "id": 6, "name": "南京" }, { "id": 7, "name": "澳门" }, { "id": 8, "name": "成都" }, { "id": 9, "name": "青岛" }, { "id": 10, "name": "福州" },
                { "id": 11, "name": "天津" }, { "id": 12, "name": "深圳" }, { "id": 13, "name": "大连" }, { "id": 14, "name": "沈阳" }, { "id": 15, "name": "昆明" },
                { "id": 16, "name": "武汉" }, { "id": 17, "name": "宁波" }, { "id": 18, "name": "无锡" }, { "id": 19, "name": "重庆" }, { "id": 20, "name": "三亚" },
                { "id": 21, "name": "西安" }
            ],
            "aCity": [
                { "id": 1, "name": "鞍山" },
                { "id": 2, "name": "安阳" },
                { "id": 3, "name": "安顺" },
                { "id": 4, "name": "安庆" },
                { "id": 5, "name": "北京" },
                { "id": 6, "name": "蚌埠" },
                { "id": 7, "name": "包头" },
                { "id": 8, "name": "保定" },
                { "id": 9, "name": "宝鸡" },
                { "id": 10, "name": "白银" },
                { "id": 11, "name": "白云鄂博" },
                { "id": 12, "name": "巴彦淖尔" },
                { "id": 13, "name": "北戴河" },
                { "id": 14, "name": "博鳌" },
                { "id": 15, "name": "本溪" },
                { "id": 16, "name": "阜新" },
                { "id": 17, "name": "白山" },
                { "id": 18, "name": "白城" },
                { "id": 19, "name": "亳州" },
                { "id": 20, "name": "滨州" },
                { "id": 21, "name": "北海" },
                { "id": 22, "name": "百色" },
                { "id": 23, "name": "巴中" },
                { "id": 24, "name": "宝山" },
                { "id": 25, "name": "重庆" },
                { "id": 26, "name": "成都" },
                { "id": 27, "name": "长沙" },
                { "id": 28, "name": "长春" },
                { "id": 29, "name": "承德" },
                { "id": 30, "name": "常州" },
                { "id": 31, "name": "池州" },
                { "id": 32, "name": "沧州" },
                { "id": 33, "name": "赤峰" },
                { "id": 34, "name": "滁州" },
                { "id": 35, "name": "巢湖" },
                { "id": 36, "name": "常德" },
                { "id": 37, "name": "郴州" },
                { "id": 38, "name": "潮州" },
                { "id": 39, "name": "崇左" },
                { "id": 40, "name": "德阳" },
                { "id": 41, "name": "大连" },
                { "id": 42, "name": "大庆" },
                { "id": 43, "name": "大同" },
                { "id": 44, "name": "丹东" },
                { "id": 45, "name": "大冶" },
                { "id": 46, "name": "东营" },
                { "id": 47, "name": "登封" },
                { "id": 48, "name": "大理" },
                { "id": 49, "name": "德州" },
                { "id": 50, "name": "东莞" },
                { "id": 51, "name": "达州" },
                { "id": 52, "name": "定西" },
                { "id": 53, "name": "大石桥" },
                { "id": 54, "name": "鄂尔多斯" },
                { "id": 55, "name": "鄂州" },
                { "id": 56, "name": "佛山" },
                { "id": 57, "name": "福州" },
                { "id": 58, "name": "抚顺" },
                { "id": 59, "name": "阜阳" },
                { "id": 60, "name": "抚州" },
                { "id": 61, "name": "防城港" },
                { "id": 62, "name": "广州" },
                { "id": 63, "name": "贵阳" },
                { "id": 64, "name": "桂林" },
                { "id": 65, "name": "赣州" },
                { "id": 66, "name": "贵港" },
                { "id": 67, "name": "广元" },
                { "id": 68, "name": "广安" },
                { "id": 69, "name": "杭州" },
                { "id": 70, "name": "固原" }
            ],
            "hCity": [
                { "id": 1, "name": "哈尔滨" },
                { "id": 2, "name": "呼和浩特" },
                { "id": 3, "name": "合肥" },
                { "id": 4, "name": "海口" },
                { "id": 5, "name": "邯郸" },
                { "id": 6, "name": "湖州" },
                { "id": 7, "name": "黄山" },
                { "id": 8, "name": "黄石" },
                { "id": 9, "name": "黄冈" },
                { "id": 10, "name": "衡阳" },
                { "id": 11, "name": "汉中" },
                { "id": 12, "name": "菏泽" },
                { "id": 13, "name": "衡水" },
                { "id": 14, "name": "呼伦贝尔" },
                { "id": 15, "name": "葫芦岛" },
                { "id": 16, "name": "淮南" },
                { "id": 17, "name": "淮北" },
                { "id": 18, "name": "鹤壁" },
                { "id": 19, "name": "淮安" },
                { "id": 20, "name": "怀化" },
                { "id": 21, "name": "惠州" },
                { "id": 22, "name": "河源" },
                { "id": 23, "name": "贺州" },
                { "id": 24, "name": "河池" },
                { "id": 25, "name": "鹤岗" },
                { "id": 26, "name": "黑河" },
                { "id": 27, "name": "济南" },
                { "id": 28, "name": "吉林" },
                { "id": 29, "name": "九江" },
                { "id": 30, "name": "景德镇" },
                { "id": 31, "name": "金昌" },
                { "id": 32, "name": "揭阳" },
                { "id": 33, "name": "吉安" },
                { "id": 34, "name": "锦州" },
                { "id": 35, "name": "鸡西" },
                { "id": 36, "name": "佳木斯" },
                { "id": 37, "name": "金华" },
                { "id": 38, "name": "济宁" },
                { "id": 39, "name": "焦作" },
                { "id": 40, "name": "荆州" },
                { "id": 41, "name": "荆门" },
                { "id": 42, "name": "江门" },
                { "id": 43, "name": "酒泉" },
                { "id": 44, "name": "嘉峪关" },
                { "id": 45, "name": "嘉兴" },
                { "id": 46, "name": "昆明" },
                { "id": 47, "name": "开封" },
                { "id": 48, "name": "克拉玛依" },
                { "id": 49, "name": "兰州" },
                { "id": 50, "name": "拉萨" },
                { "id": 51, "name": "洛阳" },
                { "id": 52, "name": "柳州" },
                { "id": 53, "name": "乐山" },
                { "id": 54, "name": "临沧" },
                { "id": 55, "name": "陇南" },
                { "id": 56, "name": "丽江" },
                { "id": 57, "name": "连云港" },
                { "id": 58, "name": "廊坊" },
                { "id": 59, "name": "辽阳" },
                { "id": 60, "name": "辽源" },
                { "id": 61, "name": "泸州" },
                { "id": 62, "name": "漯河" },
                { "id": 63, "name": "来宾" },
                { "id": 64, "name": "娄底" },
                { "id": 65, "name": "赣州" }
            ],
            "mCity": [
                { "id": 1, "name": "绵阳" },
                { "id": 2, "name": "牡丹江" },
                { "id": 3, "name": "丽水" },
                { "id": 4, "name": "马鞍山" },
                { "id": 5, "name": "六安" },
                { "id": 6, "name": "龙岩" },
                { "id": 7, "name": "莱芜" },
                { "id": 8, "name": "临沂" },
                { "id": 9, "name": "聊城" },
                { "id": 10, "name": "茂名" },
                { "id": 11, "name": "梅州" },
                { "id": 12, "name": "眉山" },
                { "id": 13, "name": "南京" },
                { "id": 14, "name": "宁波" },
                { "id": 15, "name": "南通" },
                { "id": 16, "name": "南昌" },
                { "id": 17, "name": "南平" },
                { "id": 18, "name": "南阳" },
                { "id": 19, "name": "宁德" },
                { "id": 20, "name": "南宁" },
                { "id": 21, "name": "内江" },
                { "id": 22, "name": "南充" },
                { "id": 23, "name": "莆田" },
                { "id": 24, "name": "萍乡" },
                { "id": 25, "name": "盘锦" },
                { "id": 26, "name": "攀枝花" },
                { "id": 27, "name": "平顶山" },
                { "id": 28, "name": "平遥" },
                { "id": 29, "name": "平凉" },
                { "id": 30, "name": "濮阳" },
                { "id": 31, "name": "许昌" },
                { "id": 32, "name": "普洱" },
                { "id": 33, "name": "青岛" },
                { "id": 34, "name": "泉州" },
                { "id": 35, "name": "齐齐哈尔" },
                { "id": 36, "name": "秦皇岛" },
                { "id": 37, "name": "曲阜" },
                { "id": 38, "name": "七台河" },
                { "id": 39, "name": "秦州" },
                { "id": 40, "name": "曲靖" },
                { "id": 41, "name": "庆阳" },
                { "id": 42, "name": "日照" },
                { "id": 43, "name": "清远" },
                { "id": 44, "name": "钦州" },
                { "id": 45, "name": "上海" },
                { "id": 46, "name": "深圳" },
                { "id": 47, "name": "苏州" },
                { "id": 48, "name": "沈阳" },
                { "id": 49, "name": "石家庄" },
                { "id": 50, "name": "汕头" },
                { "id": 51, "name": "三亚" },
                { "id": 52, "name": "绍兴" },
                { "id": 53, "name": "十堰" },
                { "id": 54, "name": "上饶" },
                { "id": 55, "name": "四平" },
                { "id": 56, "name": "松原" },
                { "id": 57, "name": "宿迁" },
                { "id": 58, "name": "宿州" },
                { "id": 59, "name": "三明" },
                { "id": 60, "name": "三门峡" },
                { "id": 61, "name": "商丘" },
                { "id": 62, "name": "随州" },
                { "id": 63, "name": "邵阳" },
                { "id": 64, "name": "韶关" },
                { "id": 65, "name": "汕尾" },
                { "id": 66, "name": "遂宁" },
                { "id": 67, "name": "石嘴山" },
                { "id": 68, "name": "双鸭山" },
                { "id": 69, "name": "绥化" },
                { "id": 70, "name": "天津" },
                { "id": 71, "name": "唐山" },
                { "id": 72, "name": "太原" },
                { "id": 73, "name": "泰安" },
                { "id": 74, "name": "泰州" },
                { "id": 75, "name": "铁岭" },
                { "id": 76, "name": "通辽" },
                { "id": 77, "name": "通化" },
                { "id": 78, "name": "台州" },
                { "id": 79, "name": "铜陵" },
                { "id": 80, "name": "天水" }
            ],
            "wCity": [
                { "id": 1, "name": "武汉" },
                { "id": 2, "name": "无锡" },
                { "id": 3, "name": "乌鲁木齐" },
                { "id": 4, "name": "潍坊" },
                { "id": 5, "name": "芜湖" },
                { "id": 6, "name": "武夷山" },
                { "id": 7, "name": "渭南" },
                { "id": 8, "name": "乌海" },
                { "id": 9, "name": "乌兰察布" },
                { "id": 10, "name": "温州" },
                { "id": 11, "name": "威海" },
                { "id": 12, "name": "梧州" },
                { "id": 13, "name": "武夷" },
                { "id": 14, "name": "吴忠" },
                { "id": 15, "name": "西安" },
                { "id": 16, "name": "厦门" },
                { "id": 17, "name": "西宁" },
                { "id": 18, "name": "襄樊" },
                { "id": 19, "name": "咸阳" },
                { "id": 20, "name": "湘潭" },
                { "id": 21, "name": "忻州" },
                { "id": 22, "name": "信阳" },
                { "id": 23, "name": "邢台" },
                { "id": 24, "name": "宣城" },
                { "id": 25, "name": "新余" },
                { "id": 26, "name": "新乡" },
                { "id": 27, "name": "孝感" },
                { "id": 28, "name": "咸宁" },
                { "id": 29, "name": "徐州" },
                { "id": 30, "name": "烟台" },
                { "id": 31, "name": "银川" },
                { "id": 32, "name": "扬州" },
                { "id": 33, "name": "宜昌" },
                { "id": 34, "name": "岳阳" },
                { "id": 35, "name": "延安" },
                { "id": 36, "name": "营口" },
                { "id": 37, "name": "延吉" },
                { "id": 38, "name": "伊春" },
                { "id": 39, "name": "盐城" },
                { "id": 40, "name": "鹰潭" },
                { "id": 41, "name": "宜春" },
                { "id": 42, "name": "益阳" },
                { "id": 43, "name": "永州" },
                { "id": 44, "name": "阳江" },
                { "id": 45, "name": "云浮" },
                { "id": 46, "name": "玉林" },
                { "id": 47, "name": "宜宾" },
                { "id": 48, "name": "雅安" },
                { "id": 49, "name": "玉溪" },
                { "id": 50, "name": "郑州" },
                { "id": 51, "name": "珠海" },
                { "id": 52, "name": "漳州" },
                { "id": 53, "name": "株洲" },
                { "id": 54, "name": "肇庆" },
                { "id": 55, "name": "自贡" },
                { "id": 56, "name": "舟山" },
                { "id": 57, "name": "张家界" },
                { "id": 58, "name": "遵义" },
                { "id": 59, "name": "湛江" },
                { "id": 60, "name": "张家口" },
                { "id": 61, "name": "朝阳" },
                { "id": 62, "name": "镇江" },
                { "id": 63, "name": "淄博" },
                { "id": 64, "name": "枣庄" },
                { "id": 65, "name": "中山" },
                { "id": 66, "name": "资阳" },
                { "id": 67, "name": "周口" },
                { "id": 68, "name": "驻马店" },
                { "id": 69, "name": "昭通" },
                { "id": 70, "name": "张掖" },
                { "id": 71, "name": "中卫" }
            ]
        }


















}







































