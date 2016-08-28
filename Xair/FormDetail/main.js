
Vue.directive('validate', {
    bind: function (val) {

    },
    update: function (newVal, oldVal) {
        if (newVal.type == "datetime") {
        }
        if (!oldVal && !!newVal && !!newVal.key) {
            this.vm.$set("validateResult." + newVal.key, {
                required: newVal.required,
                val: newVal.val,
                status: "",
                msg: "",
            })
        }
        var config = {
            dataType: {
                "string": "",
                "integer": {
                    validate: /^[-+]?[0-9]*$/,
                    msg: "请输入整数 "
                },
                "float": {
                    validate: /^[-+]?[0-9]+(\.[0-9]+)?$/,
                    msg: "请输入浮点数 "
                }
            },
            result: {
                status: true,
                msg: ""
            },
            typeValidFn: {
                "text": function (params) {
                    if (!!config.dataType[params.dataType]) {
                        var result = config.dataType[params.dataType].validate.test(params.val);
                        if (!result) {
                            config.result.status = result;
                            config.result.msg = config.dataType[params.dataType].msg;
                        }
                    }
                    if (params.minLength >= 1) {
                        if (params.val.length < params.minLength) {
                            config.result.status = false;
                            config.result.msg += " 输入长度不要少于" + params.minLength + " ";
                        }
                    }
                    if (params.maxLength >= 1) {
                        if (params.val.length > params.maxLength) {
                            config.result.status = false;
                            config.result.msg += "输入长度不要超过" + params.maxLength + " ";
                        }
                    }
                    if (params.required) {
                        config.toolFn.required(params.val);
                    }
                },
                "checkbox": function (params) {
                    if (params.required) {
                        config.toolFn.required(params.val);
                    }
                },
                "textarea": function (params) {
                    if (!!config.dataType[params.dataType]) {
                        var result = config.dataType[params.dataType].validate.test(params.val);
                        if (!result) {
                            config.result.status = result;
                            config.result.msg = config.dataType[params.dataType].msg;
                        }
                    }
                    if (params.required) {
                        config.toolFn.required(params.val);
                    }
                },
                "dropdown": function (params) {
                    if (params.required) {
                        config.toolFn.required(params.val);
                    }
                },
                "datetime": function (params) {
                    if (!!params.minDate) {
                        if (params.val.length >= params.minDate.length) {
                            if (params.val < params.minDate) {
                                config.result.status = false;
                                config.result.msg += " 最早选择日期是" + params.minDate + " ";
                            }
                        }
                    }
                    if (!!params.maxDate) {
                        if (params.val.length >= params.maxDate.length) {
                            if (params.val > params.maxDate) {
                                config.result.status = false;
                                config.result.msg += " 最晚选择日期是" + params.maxDate + " ";
                            }
                        }
                    }
                    if (params.required) {
                        config.toolFn.required(params.val);
                    }
                }
            },
            toolFn: {
                "required": function (params) {
                    if (Array.isArray(params)) {
                        if (params.length == 0) {
                            config.result.status = false;
                            config.result.msg += " 最少选择一项 ";
                        }
                    } else {
                        if (!!!params) {
                            config.result.status = false;
                            config.result.msg += " 这是必填项 ";
                        }
                    }
                }
            }
        };
        // 输入不为空 并且  有类型的校验方法
        if (!!oldVal && !!config.typeValidFn[newVal.type]) {
            config.typeValidFn[newVal.type](newVal);
        }

        if (oldVal && oldVal.required && newVal.val != oldVal.val && newVal.val != '') {
            if (newVal.validate) {
                var result = newVal.validate.test(newVal.val);
                if (!result) {
                    config.result.status = result;
                    config.result.msg += newVal.validataMessage;
                } else {
                    config.result.status = result;
                    config.result.msg = '';
                }
            }
        }
        this.vm.$set("validateResult." + newVal.key, {
            required: newVal.required,
            val: newVal.val,
            status: config.result.status,
            msg: config.result.msg,
        });

    },
    unbind: function () {

    }
});
//   template: require("./index.html"),
Vue.component("expandDate", {
    template: '#date',
    data: function () {
        return {
            dateTab: -1,
            touchConfight: {},
            format: "",
            date: {
                YYYY: "2010",
                MM: "10",
                DD: '1',
                day: '1',
                HH: "09",
                mm: "21",
            },
            horizontal: 0,
            touch: {
                time: 0,
                X: 0,
                Y: 0,
                status: "",
                direction: "",
                start: {
                    X: 0,
                    Y: 0,
                },
                end: {
                    X: 0,
                    Y: 0,
                }
            },
            touchConfig: {
                lastTime: null,
                oldX: 0,
                sleepTime: 100,
            }
        }
    },
    props: {
        showDate: {
            type: Boolean,
            required: true,
            twoWay: true
        },
        viewMode: {
            type: String,
            default: "datetime",
        },
        dateKey: {
            type: String,
            required: true,
        },
        dateValue: {
            type: String,
            default: function () {
                return "datetime"
            },
            // twoWay: true,
        }
    },
    computed: {
        weekText: function () {
            var data = new Date(this.date.YYYY, this.date.MM - 1, this.date.DD);
            if (data.toString().indexOf('Invalid') == -1) {
                return this.getWeekText(data.getDay());
            } else {
                return "";
            }
        },
        chooseText: function () {
            if (this.dateTab == -1) {
                try {
                    if (this.viewMode == 'datetime-local') {
                        this.viewMode = 'datetime'
                    }
                    if (this.viewMode == 'datetime') {
                        this.format = "YYYY-MM-DD HH:mm";
                    } else if (this.viewMode == 'days') {
                        this.format = "YYYY-MM-DD";
                    } else if (this.viewMode == 'months') {
                        this.format = "YYYY-MM";
                    } else if (this.viewMode == 'years') {
                        this.format = "YYYY";
                    }
                    var date = new Date(this.dateValue);
                    if (date.toString().indexOf("Invalid") == -1) {
                        this.date.YYYY = date.getFullYear();
                        this.date.MM = date.getMonth() + 1;
                        this.date.DD = date.getDate();
                        this.date.day = date.getDay();
                        this.date.HH = date.getHours();
                        this.date.mm = date.getMinutes();
                    }

                } catch (e) {

                }
                this.dateTab = 0;
            }
            if (this.dateTab == 0) {
                return '选择';
            }
            if (this.dateTab == 1) {
                return '选择年';
            }
            if (this.dateTab == 2) {
                return !!this.date.YYYY ? this.date.YYYY + '年' : "选择月";
            }
            if (this.dateTab == 3) {
                return !!this.date.DD ? this.date.YYYY + "年" + this.date.MM + '月' : "选择日";
            }
        }
    },
    watch: {
        "touch.status": function (val, oldVal) {
            if (val == "end") {
                var _this = this;
                clearInterval(_this.touch.time);
                var target = 0;
                _this.touch.time = setInterval(function () {
                    var speed = (_this.horizontal) / 4;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    console.info(speed);
                    _this.horizontal -= speed;
                    if (Math.abs(_this.horizontal) <= 0) {
                        clearInterval(_this.touch.time);
                        _this.horizontal = 0;
                    }
                }, 40);
            }
        }
    },
    methods: {
        touchend: function (event) {
            this.touch.status = "end";
            if (event.touches[0]) {
                this.touch[this.touch.status].X = event.touches[0].clientX;
                this.touch[this.touch.status].Y = event.touches[0].clientY;
            }

        },
        touchstart: function (event) {
            clearInterval(this.touch.time);
            this.touch.status = "start";
            this.touch[this.touch.status].X = event.touches[0].clientX;
            this.touch[this.touch.status].Y = event.touches[0].clientY;
            var date = new Date();
            this.touchConfig.lastTime = date;
            this.touchConfig.oldX = event.touches[0].clientX;

        },
        touchMoveHorizontal: function (event) {
            if (Math.abs(this.horizontal) >= 102) {
                // this.horizontal = (this.horizontal / this.horizontal) * 102;
                if (this.horizontal > 0) {
                    this.horizontal = 102;
                } else {
                    this.horizontal = -102;
                }
            }
            this.touch.X = event.touches[0].clientX;
            var date = new Date();

            if (date - this.touchConfig.lastTime > this.touchConfig.sleepTime) {
                if (this.touch.X < this.touchConfig.oldX) {
                    this.horizontal -= 2;
                    this.touch.direction = "L";
                    console.info("L");
                } else {
                    this.horizontal += 2;
                    this.touch.direction = "R";
                    console.log("R")
                }
            }
        },
        touchFun: function (key, event) {
            var _this = this;
            if (event.type == 'touchmove') {
                var date = new Date();
                var touchY = event.touches[0].clientY;
                var touchConfight = _this.$data.touchConfight[key];
                if (!touchConfight) {
                    var clientRects = event.currentTarget.getBoundingClientRect()
                    var sleepTime = 50;
                    if (key == "HH") {
                        sleepTime = 120;
                    }
                    _this.$data.touchConfight[key] = touchConfight = {
                        lastTime: date,
                        oldY: touchY,
                        sleepTime: sleepTime,
                    }
                }
                if (date - touchConfight.lastTime > touchConfight.sleepTime) {
                    touchConfight.lastTime = date;
                    if (touchY < touchConfight.oldY) {
                        _this.mHandleNum(key, 'UP', event);
                    } else {
                        _this.mHandleNum(key, 'DOWN', event);
                    }
                    touchConfight.oldY = touchY;
                }
            }
        },
        mHandleNum: function (key, action, event) {
            var num = +this.date[key];
            if (action == "UP") {
                num++;
            } else if (action == "DOWN") {
                num--;
            }
            if (key == "HH") {
                num = (num + 24) % 24;
            } else if (key == 'mm') {
                num = (num + 60) % 60;
            } else if (key == 'MM') {
                num = (num + 12) % 12;
                if (num == 0)
                    num = 12;
            } else if (key == "DD") {
                var days = new Date(this.date.YYYY, this.date.MM, 0).getDate();
                num = (num + days) % days;
                if (num == 0) {
                    num = days;
                }
            }
            if (num <= 9) {
                num = "0" + "" + num;
            }
            this.date[key] = num;
        },
        clickFn: function (key, action, event) {
            this.mHandleNum.apply(this, arguments);
        },
        changeTab: function (num) {
            if (num == 2 && !this.date.YYYY) return;
            if (num == 3 && !this.date.MM) return;
            this.dateTab = num;
        },
        goHome: function () {
            this.dateTab = 0;
        },
        finishDate: function () {
            if (this.dateTab == 0) {
                this.dateTab = -1;
                this.showDate = false;
                console.info(this.toString());
                this.$dispatch('dateComponent-msg', {
                    key: this.dateKey,
                    val: this.toString(),
                });
            }
            this.goHome();
        },
        cancelDate: function () {
            console.log("cancelDate");
            this.showDate = false;
            console.log("cancelDate" + this.showDate);
        },
        toString: function () {
            var result = this.format;
            result = result.replace("YYYY", this.date.YYYY);
            if ((this.date.MM + "").length == 1) {
                this.date.MM = "0" + this.date.MM;
            }
            if ((this.date.DD + "").length == 1) {
                this.date.DD = "0" + this.date.DD;
            }
            if ((this.date.HH + "").length == 1) {
                this.date.HH = "0" + this.date.HH;
            }
            if ((this.date.mm + "").length == 1) {
                this.date.mm = "0" + this.date.mm;
            }
            result = result.replace("MM", this.date.MM);
            result = result.replace("DD", this.date.DD);
            result = result.replace("HH", this.date.HH);
            result = result.replace("mm", this.date.mm);
            return result;
        },
        getWeekText: function (num) {
            if (num == 1) return '星期一';
            if (num == 2) return '星期二';
            if (num == 3) return '星期三';
            if (num == 4) return '星期四';
            if (num == 5) return '星期五';
            if (num == 6) return '星期六';
            if (num == 0) return '星期天';
        },
        initDate: function () {
            var mDate = new Date();
            this.date.YYYY = mDate.getFullYear();
            this.date.MM = mDate.getMonth() + 1;
            this.date.DD = mDate.getDate();
            this.date.day = mDate.getDay();
            this.date.HH = "09";
            this.date.mm = "21";
        },
    },
    filters: {
        filNum: function (num, key, action) {
            num = parseInt(num);
            var addVar = "";
            if (num == -1) {
                if (key == 'HH') {
                    num += 24;
                } else if (key == 'mm') {
                    num += 60;
                }
            }
            if (key == 'YYYY') {
                addVar = '年';
            }
            if (key == 'HH' && num == 24) {
                num = '00';
            }
            if (key == 'mm' && num == 60) {
                num = '00';
            }
            if (key == 'MM') {
                addVar = '月';
                if (num != 12) {
                    num = (num + 12) % 12;
                }
                if (num == 0) {
                    num = 12;
                }
            }

            if (key == 'DD') {
                addVar = '日';
                var days = new Date(this.date.YYYY, this.date.MM, 0).getDate();
                if (num != days) {
                    num = (num + days) % days;

                }
                if (num == 0) {
                    num = days;
                }
            }

            if ((num + '').length < 2) {
                num = "0" + "" + num;
            }
            return num + addVar;
        }
    },
    created: function () {
        this.initDate();
    },
    ready: function () {
        var _this = this;
        this.$el.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
    }
});

var MyComponent = Vue.extend({
    template: '<div>A custom component!</div>'
})

// 注册
Vue.component('my-component', MyComponent)

var app = new Vue({
    el: '#app',
    data: {
        detailDate: [

            {
                titile: "我是tab",
                type: "TABS",
                tabs: [
                    {
                        key: "1",
                        val: "任务详情",
                    },
                    {
                        key: "2",
                        val: "作业工单",
                    }
                ]
            },
            {
                title: "",
                type: "PARAMS",
                tabs: 1,
                dataSet: [
                    {
                        key: "地区",
                        value: "新疆/巴州",
                        envent: "PHOTO"
                    },
                    {
                        key: "地区A",
                        value: "新疆/巴州A",
                        envent: "PHOTO"
                    },
                    {
                        key: "地区B",
                        value: "新疆/巴州B",
                        envent: "PHOTO"
                    },
                    {
                        key: "地区C",
                        value: "新疆/巴州C",
                        envent: "PHOTO"
                    },
                    {
                        key: "地区D",
                        value: "新疆/巴州D",
                        envent: "PHOTO"
                    },

                ]
            },
            {
                title: "",
                type: "PARAMS",
                tabs: 2,
                dataSet: [
                    {
                        key: "2地区",
                        value: "新疆/巴州",
                    },
                    {
                        key: "2地区A",
                        value: "新疆/巴州A",
                    },
                    {
                        key: "2地区B",
                        value: "新疆/巴州B",
                    },
                    {
                        key: "2地区C",
                        value: "新疆/巴州C",
                    },
                    {
                        key: "2地区D",
                        value: "新疆/巴州D",
                    },

                ]
            },
            {
                title: "文本",
                type: "TEXT_AREA",
                text_title: "备注",
                text_content: "备注说明，备注说明，备注说明，备注说明，备注说明，备注说明，备注说明，备注说明，备注说明，备注说明，备注说明，备注说明，"
            },
        ],
        currentKey: "",
        arr: {
            "city": [
                "A", "B", "C"
            ]
        },
        selectColor: true,
        invalid: true,
        msg: '',
        dateComponent: {
            status: false,
            key: "",
            val: "",
            viewMode: "",
        },

        html: {
            title: {
                "type": "title",
                "id": "title0000000002",
                "label": "form标题",
                "colSpan": 12
            },
            text: {
                "type": "text",
                "variable": "email",
                "var_uid": "166656494576a53c8e73307048199702",
                "dataType": "integer",
                "protectedValue": false,
                "id": "email",
                "name": "email",
                "label": "电子邮箱",
                "defaultValue": "",
                "placeholder": "输入邮箱",
                "hint": "",
                "required": true,
                "textTransform": "none",
                "validate": "",
                // "validate": /^[\w_-]+@[\w_-]+(\.[\w_-]+)+$/,
                "validateMessage": "邮箱格式错误",
                "minLength": 5,
                "maxLength": 10,
                "formula": "",
                "mode": "parent",
                "operation": "",
                "datasource": "database",
                "dbConnection": "workflow",
                "dbConnectionLabel": "PM Database",
                "sql": "",
                "dataVariable": "",
                "var_name": "email",
                "colSpan": 12
            },
            textarea: {
                "type": "textarea",
                "variable": "note",
                "var_uid": "906677246576a5a2f7bb591008504434",
                "dataType": "float",
                "protectedValue": false,
                "id": "note",
                "name": "note",
                "label": "问题描述,",
                "defaultValue": "2333",
                "placeholder": "填点什么",
                "hint": "",
                "required": true,
                "validate": "",
                "validateMessage": "",
                "mode": "parent",
                "datasource": "database",
                "dbConnection": "workflow",
                "dbConnectionLabel": "PM Database",
                "sql": "",
                "dataVariable": "",
                "rows": "10",
                "var_name": "note",
                "colSpan": 12
            },
            checkbox: {
                "type": "checkbox",
                "variable": "checkboxVar",
                "var_uid": "394465358577a2cbdce30e1068303843",
                "dataType": "boolean",
                "protectedValue": false,
                "id": "checkboxVar",
                "name": "checkboxVar",
                "label": "checkbox_1",
                "defaultValue": "",
                "hint": "",
                "required": true,
                "mode": "parent",
                "options": [
                    {
                        "value": "1",
                        "label": "需求合同"
                    },
                    {
                        "value": "2",
                        "label": "订单合同"
                    },
                    {
                        "value": "3",
                        "label": "演示合同"
                    },
                ],
                "var_name": "checkboxVar1",
                "colSpan": 12
            },
            checkbox2: {
                "type": "checkbox",
                "variable": "checkboxVar2",
                "var_uid": "394465358577a2cbdce30e1068303843",
                "dataType": "boolean",
                "protectedValue": false,
                "id": "checkboxVar",
                "name": "checkboxVar",
                "label": "checkbox_1",
                "defaultValue": "",
                "hint": "",
                "required": true,
                "mode": "parent",
                "options": [
                    {
                        "value": "1",
                        "label": "需求"
                    },
                    {
                        "value": "2",
                        "label": "订单"
                    },
                    {
                        "value": "3",
                        "label": "演示"
                    },
                ],
                "var_name": "checkboxVar1",
                "colSpan": 12
            },
            radio: {
                "type": "radio",
                "variable": "radioVar",
                "var_uid": "369878403577a2cceaf87f2062793180",
                "dataType": "string",
                "protectedValue": false,
                "id": "radioVar",
                "name": "radioVar",
                "label": "radio_1",
                "defaultValue": "",
                "hint": "",
                "required": true,
                "mode": "parent",
                "datasource": "database",
                "dbConnection": "workflow",
                "dbConnectionLabel": "PM Database",
                "sql": "",
                "dataVariable": "",
                "options": [
                    {
                        "value": "1",
                        "label": "高"
                    },


                    {
                        "value": "2",
                        "label": "中"
                    },
                    {
                        "value": "3",
                        "label": "低"
                    },
                ],
                "var_name": "radioVar",
                "colSpan": 12
            },
            dropdown: {
                "type": "dropdown",
                "variable": "city",
                "var_uid": "617034912577f47e8e6cd01036918745",
                "dataType": "string",
                "protectedValue": false,
                "id": "city",
                "name": "city",
                "label": "城市",
                "defaultValue": "",
                "placeholder": "选择城市...",
                "hint": "",
                "required": true,
                "mode": "parent",
                "datasource": "dataVariable",
                "dbConnection": "workflow",
                "dbConnectionLabel": "PM Database",
                "sql": "",
                "dataVariable": "",
                "options": [
                    {
                        "value": "1",
                        "label": "广州"
                    },
                    {
                        "value": "2",
                        "label": "深圳"
                    },
                    {
                        "value": "3",
                        "label": "上海"
                    },
                    {
                        "value": "4",
                        "label": "北京"
                    }, {
                        "value": "5",
                        "label": "南京"
                    },
                    {
                        "value": "6",
                        "label": "武汉"
                    },
                    {
                        "value": "7",
                        "label": "杭州"
                    }

                ],
                "var_name": "city",
                "colSpan": 12,
                "optionsSql": [

                ],
            },
            submit: {
                "type": "submit",
                "id": "submit0000000001",
                "name": "submit0000000001",
                "label": "提交",
                "colSpan": 12
            },

            textarea_OP: {
                "type": "textarea",
                "variable": "note_op",
                "var_uid": "906677246576a5a2f7bb591008504434",
                "dataType": "float",
                "protectedValue": false,
                "id": "note",
                "name": "note_op",
                "label": "处理意见",
                "defaultValue": "2333",
                "placeholder": "请输入处理意见",
                "hint": "",
                "required": true,
                "validate": "",
                "validateMessage": "",
                "mode": "parent",
                "datasource": "database",
                "dbConnection": "workflow",
                "dbConnectionLabel": "PM Database",
                "sql": "",
                "dataVariable": "",
                "rows": "10",
                "var_name": "note",
                "colSpan": 12
            },
            dropdownList: {
                "type": "dropdown",
                "variable": "city",
                "var_uid": "617034912577f47e8e6cd01036918745",
                "dataType": "string",
                "protectedValue": false,
                "id": "city",
                "name": "city",
                "label": "负责人",
                "defaultValue": "",
                "placeholder": "请选择城市...",
                "hint": "",
                "required": true,
                "mode": "parent",
                "datasource": "dataVariable",
                "dbConnection": "workflow",
                "dbConnectionLabel": "PM Database",
                "sql": "",
                "dataVariable": "",
                "options": [
                    {
                        "value": "1",
                        "label": "广州"
                    },
                    {
                        "value": "2",
                        "label": "深圳"
                    },
                    {
                        "value": "3",
                        "label": "上海"
                    },
                    {
                        "value": "4",
                        "label": "北京"
                    },
                    {
                        "value": "5",
                        "label": "茂名"
                    },
                    {
                        "value": "6",
                        "label": "武汉"
                    },

                ],
                "var_name": "city",
                "colSpan": 12,
                "optionsSql": [

                ],
            },
            dateTime: {
                "type": "datetime",
                "variable": "Birthday",
                "var_uid": "756988525577db1d5d21563021960905",
                "dataType": "date",
                "protectedValue": false,
                "id": "Birthday",
                "name": "Birthday",
                "label": "生日",
                "placeholder": "请选择日期",
                "hint": "",
                "required": true,
                "mode": "parent",
                "format": "YYYY-MM-DD",
                "dayViewHeaderFormat": "MMMM YYYY",
                "extraFormats": false,
                "stepping": 1,
                "minDate": "2016-07-05",
                "maxDate": "2016-07-16",
                "useCurrent": "true",
                "collapse": true,
                "locale": "",
                "defaultDate": "2016-07-13",
                "disabledDates": false,
                "enabledDates": false,
                "daysOfWeekDisabled": false,
                "calendarWeeks": false,
                "viewMode": "days",
                "toolbarPlacement": "default",
                "showTodayButton": false,
                "showClear": "false",
                "widgetPositioning": {
                    "horizontal": "auto",
                    "vertical": "auto"
                },
                "widgetParent": null,
                "keepOpen": false,
                "var_name": "Birthday",
                "colSpan": 12,
                "data": {
                    "value": "",
                    "label": ""
                }
            },
            date: {
                "type": "datetime",
                "variable": "day",
                "var_uid": "756988525577db1d5d21563021960905",
                "dataType": "date",
                "protectedValue": false,
                "id": "day",
                "name": "day",
                "label": "开始时间",
                "placeholder": "请选择时间",
                "hint": "",
                "required": true,
                "mode": "parent",
                "format": "YYYY-MM-DD",
                "dayViewHeaderFormat": "MMMM YYYY",
                "extraFormats": false,
                "stepping": 1,
                "minDate": "2016-07-05",
                "maxDate": "2016-07-16",
                "useCurrent": "true",
                "collapse": true,
                "locale": "",
                "defaultDate": "2016-07-13",
                "disabledDates": false,
                "enabledDates": false,
                "daysOfWeekDisabled": false,
                "calendarWeeks": false,
                "viewMode": "datetime-local",
                "toolbarPlacement": "default",
                "showTodayButton": false,
                "showClear": "false",
                "widgetPositioning": {
                    "horizontal": "auto",
                    "vertical": "auto"
                },
                "widgetParent": null,
                "keepOpen": false,
                "var_name": "day",
                "colSpan": 12,
                "data": {
                    "value": "",
                    "label": ""
                }
            },
            checkval: {
                "type": "checkbox",
                "variable": "checkboxValue",
                "var_uid": "394465358577a2cbdce30e1068303843",
                "dataType": "boolean",
                "protectedValue": false,
                "id": "checkboxValue",
                "name": "checkboxValue",
                "label": " 本人已认真阅读条款！",
                "defaultValue": "",
                "hint": "",
                "required": true,
                "mode": "parent",
                "options": [
                    {
                        "value": "1",
                        "label": "true"
                    },
                    {
                        "value": "0",
                        "label": "false"
                    }
                ],
                "var_name": "checkboxValue",
                "colSpan": 12
            },
        },
        variables: {
            email: '',
            reportText: '',
            checkboxVar: "",
            checkboxVar2: "",
            dropdown: "",
            radio: "",
            note_op: "",
            dropdownList: {
                value: "233",
                title: "李世明",
            },
            Birthday: "2016-11-09",
            day: "",
            checkboxValue: "0",
        },
        validateResult: {
        },
        mode: "view",
        eventV2: {
            "show": {
                fn: "checkboxVar2||checkboxVar",
                items:
                [
                    {
                        "control_id": "checkboxVar2",
                        "value": ['1', '2']
                    },
                    {
                        "control_id": "checkboxVar",
                        "value": "1"
                    },
                ]
            }
        },

        eventV1: {
            "show": {

                "control_id": "checkboxVar",

                "value": ['1', '2']

            }
        },

        showEvent: false,
    },
    filters: {
        eventShow: function (config) {
            console.info("eventShow", JSON.stringify(config));
            console.info("eventShow", JSON.stringify(this.variables));
            var _this = this;
            var strConfig = JSON.stringify(config);
            console.log(strConfig);
            if (strConfig.length <= 4) {
                return true;
            }
            var result = true;

            if (Array.isArray(config.show.items)) {
                var strFn = config.show.fn;
                var resultObj = {};
                config.show.items.forEach(function (item) {
                    var value = _this.variables[item.control_id];
                    resultObj.key = item.control_id;
                    if (Array.isArray(item.value)) {
                        resultObj.result = item.value.indexOf(value) > -1;
                    } else {
                        resultObj.result = item.value == value;
                    }
                    if (!!strFn) {
                        strFn = strFn.replace(resultObj.key, resultObj.result);
                    }
                });
                if (config.show.items.length == 0) {
                    result = resultObj.result;
                } else {

                    result = _this.evilFn(strFn);
                }
            } else {
                var value = this.variables[config.show.control_id];
                if (Array.isArray(config.show.value)) {
                    result = config.show.value.indexOf(value) > -1;
                }
                if (value == config.show.value) {
                    result = true;
                } else {
                    result = false;
                }
            }

            if(!result){

            }
            return result;
        },
        eventShow2: function (config) {
            var strConfig = JSON.stringify(config);
            console.log(strConfig);
            if (strConfig.length <= 4) {
                return true;
            }
            var value = this.variables[config.show.control_id];
            if (Array.isArray(config.show.value)) {
                return config.show.value.indexOf(value) > -1;
            }

            if (value == config.show.value) {
                return true;
            } else {
                return false;
            }

        }
    }
    ,
    methods: {
        evilFn: function (fn) {
            var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
            return new Fn('return ' + fn)();
        },
        showDateFn: function (key, val, viewMode) {
            this.dateComponent.key = key;
            this.dateComponent.val = val;
            this.dateComponent.viewMode = viewMode;
            this.dateComponent.status = true;
        }
    },
    events: {
        'dateComponent-msg': function (params) {
            this.$set(params.key, params.val);
        }
    }
});
