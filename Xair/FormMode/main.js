
Vue.directive('validate', {
    bind: function (val) {

    },
    update: function (newVal, oldVal) {
        // console.log("newVal" + JSON.stringify(newVal));
        if (newVal.type == "datetime") {
            console.log(JSON.stringify(newVal));
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

Vue.component("date", {
    template: '#date',
    data: function () {
        return {
            dateTab: 0,
            years: ['不限'],
            months: ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            days: ['不限'],
            chooseText: '筛选',
            // direction: "233@",
            oldDate: {
                year: '',
                month: '',
                day: '',
                week: '',
                weekText: '',
                string: '',
                stringWeek: '',
                HH: "08",
                mm: "20"
            }
        }
    },
    props: {
        showDate: {
            type: Boolean,
            // required: true,
            default: true,
            twoWay: true
        },
        date: {
            type: Object,
            // required: true,
            default: function () {
                return {
                    year: '',
                    month: '',
                    day: '',
                    week: '',
                    weekText: '',
                    string: '',
                    stringWeek: '',
                    HH: "09",
                    mm: "21",

                }
            },
            twoWay: true
        }
    },
    watch: {
        'showDate': function (val, oldVal) {
            this.dateTab = 0;
            if (val) {
                for (var i in this.date) {
                    this.oldDate[i] = this.date[i];
                }
            }
        },
        'dateTab': function (val) {
            if (val == 0) this.chooseText = "筛选";
            if (val == 1) this.chooseText = "选择年";
            if (val == 2) this.chooseText = "选择月";
            if (val == 3) this.chooseText = "选择日";
        }
    },
    methods: {
        touchFun: function (key, event) {
            var _this = this;
            if (event.type == 'touchmove') {
                var date = new Date();
                var touchY = event.touches[0].screenY;
                if (!event.currentTarget.configDate) {
                    var clientRects = event.currentTarget.getBoundingClientRect()
                    var top = clientRects.top - 150;
                    var bottom = clientRects.bottom + 150;
                    event.currentTarget.configDate = {
                        lastTime: date,
                        oldY: touchY,
                        top: top,
                        bottom: bottom,
                    }
                }
                if (date - event.currentTarget.configDate.lastTime > 50) {
                    console.count(key + "$" + touchY);
                    event.currentTarget.configDate.lastTime = date;
                    if (touchY >= event.currentTarget.configDate.top && touchY <= event.currentTarget.configDate.bottom) {
                        if (touchY < event.currentTarget.configDate.oldY) {
                            // _this.direction = event.target.nodeName + "@UP" + event.currentTarget.nodeName;
                            _this.mHandleNum(key, 'UP', event);
                        } else {
                            // _this.direction = event.target.nodeName + "@DOWN" + event.currentTarget.nodeName;
                            _this.mHandleNum(key, 'DOWN', event);
                        }
                    }
                    event.currentTarget.configDate.oldY = touchY;
                }
            }
            if (event.type.indexOf("touch") == -1) {
                console.warn(key + "@" + event.type);
            }
        },
        mHandleNum: function (key, action, event) {
            console.count(+this.date[key]);
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
                if (num == 0) {
                    this.mHandleNum('HH', 'UP', event);
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
        selectDate: function (str, num) {
            switch (str) {
                case 'year':
                    this.date.month = '';
                    this.date.day = '';
                    this.date.week = '';
                    this.date.weekText = '';
                    if (typeof num == 'string') {
                        this.date.year = '';
                        this.finishDate();
                    } else {
                        this.dateTab = 2;
                        this.date.year = num;
                    }
                    break;
                case 'month':
                    this.date.day = '';
                    this.date.week = '';
                    this.date.weekText = '';
                    if (typeof num == 'string') {
                        this.date.month = '';
                        this.finishDate();
                    } else {
                        this.dateTab = 3;
                        this.date.month = num;
                        this.setDaysByYearAndMonth();
                    }
                    break;
                case 'day':
                    if (typeof num == 'string') {
                        this.date.day = '';
                        this.date.week = '';
                        this.date.weekText = '';
                    } else {
                        this.date.day = num;
                        this.date.week = new Date(this.date.year, this.date.month - 1, this.date.day).getDay();
                        this.date.weekText = this.getWeekText(this.date.week);
                    }
                    this.finishDate();
                    break;
            }
        },
        changeTab: function (num) {
            if (num == 2 && !this.date.year) return;
            if (num == 3 && !this.date.month) return;
            this.dateTab = num;
        },
        finishDate: function () {
            this.toString();
            this.dateTab = 0;
            this.showDate = false;
        },
        clearDate: function () {
            this.date.year = '';
            this.date.month = '';
            this.date.day = '';
            this.date.week = '';
            this.date.weekText = '';
        },
        cancelDate: function () {
            this.showDate = false;
            for (var i in this.oldDate) {
                this.date[i] = this.oldDate[i];
            }
        },
        setDaysByYearAndMonth: function () {
            var number = new Date(this.date.year, this.date.month, 0).getDate();
            this.days = ['不限'];
            for (var i = 1; i <= number; i++) {
                this.days.push(i);
            }
        },
        toString: function () {
            var str = '';
            if (this.date.year) {
                str += this.date.year;
            }
            if (this.date.month) {
                str += '-' + this.date.month;
            }
            if (this.date.day) {
                str += '-' + this.date.day;
            }
            this.date.string = str;
            if (this.date.weekText) {
                this.date.stringWeek = str + ' ' + this.date.weekText;
            } else {
                this.date.stringWeek = str;
            }
        },
        getWeekText: function (num) {
            if (num == 1) return '星期一';
            if (num == 2) return '星期二';
            if (num == 3) return '星期三';
            if (num == 4) return '星期四';
            if (num == 5) return '星期五';
            if (num == 6) return '星期六';
            if (num == 7) return '星期天';
        }
    },
    filters: {
        filNum: function (num, key) {
            if (num == -1) {
                if (key == 'HH') {
                    num += 24;
                } else if (key == 'mm') {
                    num += 60;
                }
            }
            if (num <= 9) {
                num = "0" + "" + num;
            }
            return num;
        }
    },
    ready: function () {
        var _this = this;
        this.$el.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        console.log("Ready");
        var currentYear = new Date().getFullYear();
        this.years = ['不限'];
        for (var i = 2015; i <= currentYear; i++) {
            this.years.push(i);
        }
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
        selectColor: true,
        invalid: true,
        msg: '',
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
                        "label": "true"
                    },
                    {
                        "value": "0",
                        "label": "false"
                    }
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
                "var_name": "Birthday",
                "colSpan": 12,
                "data": {
                    "value": "",
                    "label": ""
                }
            },
            dateTime1: {
                "type": "datetime",
                "variable": "BeginDay",
                "var_uid": "756988525577db1d5d21563021960905",
                "dataType": "date",
                "protectedValue": false,
                "id": "BeginDay",
                "name": "BeginDay",
                "label": "开始时间",
                "placeholder": "请选择时间",
                "hint": "",
                "required": false,
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
                "var_name": "BeginDay",
                "colSpan": 12,
                "data": {
                    "value": "",
                    "label": ""
                }
            }
        },
        variables: {
            email: '',
            reportText: '',
            checkboxVar: ['1'],
            dropdown: "",
            radio: "",
            note_op: "",
            dropdownList: {
                value: "233",
                title: "李世明",
            },
            Birthday: "",
            Beginday: ""
        },
        validateResult: {
        },
        mode: "view",
    },
    filters: {

    }
});
