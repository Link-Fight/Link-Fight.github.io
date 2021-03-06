
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
Vue.component("date", {
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
    },
    methods: {
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

Vue.component("area", {
    template: '#area',
    props: {
        show: {
            type: Boolean,
            default: false,
            twoWay: true
        },
        selected: {
            type: Object,
            default: function () {
                return { name: '', id: '' }
            },
            // twoWay: true
        },
        dateKey: {
            type: String,
            required: true,
        },
        isShowCountry: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            menus: [
                {
                    pid: 0,
                    id: "",
                    name: "请选择",
                    level: 0,
                }
            ],
            pathMenus: [],
            currentLevel: 0,
            currentId: 0,
            store: {},//暂存数据
        }
    },
    computed: {
        curlevelActiveId: function () {
            return this.pathMenus[this.currentLevel - 1].id;
        }
    },
    created: function () {
    },
    watch: {
        'show': function (val, oldVal) {
            if (val) {
                this.init();
            }

        },
        "pathMenus": function (val, oldVal) {
            console.log("pathMenus");
            var menus = [];

            for (var level = 0; level < this.pathMenus.length; level++) {
                menus.push({
                    pid: level > 0 ? this.pathMenus[level - 1].id : 0,
                    id: this.pathMenus[level].id,
                    name: this.pathMenus[level].name,
                    level: level,
                });
            }
            menus.push({
                pid: this.pathMenus.length == 0 ? "0" : this.pathMenus[this.pathMenus.length - 1].id,
                id: "",
                name: "请选择",
                level: this.pathMenus.length == 0 ? 0 : level,
            })
            this.menus = menus;
        }
    },
    methods: {
        init: function () {
            var _this = this;
            if (!!_this.selected) {
                _this.selected = {
                    name: '', id: '',
                }
            }
            console.log(_this.selected.id + "#");
            if (_this.selected.id) {
                Xa.get('/common/area/up_areas', { id: !!_this.selected.id }, function (result) {
                    if (result.status == 200) {
                        if (result.data.length != 0) {
                            var dataList = [];
                            for (var i = 0; i < result.data.length; i++) {
                                if (result.data[i].level == 1) {
                                    _this.$set("store.id" + "0", result.data[i].data);
                                } else if (result.data[i].data.length > 0) {
                                    _this.$set("store.id" + result.data[i].id, result.data[i].data);
                                }
                                dataList[result.data[i].level - 1] = {
                                    id: result.data[i].id,
                                    name: result.data[i].name,
                                };
                            }
                            if (dataList.length > 0) {
                                do {
                                    _this.pathMenus.push(dataList.shift());
                                } while (dataList.length == 0);
                            }
                            _this.currentLevel = _this.pathMenus.length - 1;
                        }

                    } else {
                        alert(result.message);
                    }
                });
            } else {
                if (_this.store["id0"]) {
                    return;
                } else if (true) {
                    var data = {};
                    _this.currentLevel = 0;
                    _this.currentShowId = 0;
                    _this.$set("store.id" + _this.currentShowId, data);
                } else {
                    Xa.get('/common/area/areas', { upid: "0" }, function (result) {
                        if (result.status == 200) {
                            _this.currentLevel = 0;
                            _this.$set("store.id" + _this.currentShowId, result.date);
                        } else {
                            alert(result.message);
                        }
                    });
                }


            }

        },
        selectEnd: function () {
            this.show = false;
            this.$dispatch('selectEnd', this.current);
            this.$dispatch('areaComponent-msg', {
                key: this.dateKey,
                val: {
                    id: this.currentId,
                    name: this.toString(),
                }
            });
        },
        clickItem: function (item) {
            if (!this.store["id" + item.id]) {
                this.getNextLevelDate(item.id, item.name);
            }
            this.nextLevelTabs(item);
        },
        getNextLevelDate: function (id, name) {
            var _this = this;

            if (true) {
                var data = [];
                if (data.length == 0) {
                    _this.pathMenus.push({
                        id: id,
                        name: name,
                    });
                    this.currentId = id;
                    this.selectEnd();
                    return;
                }
                _this.$set("store.id" + id, data);
            } else {
                Xa.get("/common/area/areas", { upid: item.id }, function (result) {
                    if (result.status == 200) {
                        if (result.data.length > 0) {
                            _this.$set("store.id" + id, result.data);
                        } else {
                            _this.pathMenus.push({
                                id: id,
                                name: name,
                            });
                            this.currentId = id;
                            this.selectEnd();
                            return;
                        }
                    } else {
                        alert(result.message);
                        return;
                    }

                });
            }

        },
        menusClick: function (item) {
            this.currentLevel = item.level;
            if (!this.store["id" + item.pid]) {
                this.getNextLevelDate(item.pid);
            }
        },
        nextLevelTabs: function (item) {
            if (this.currentLevel < this.pathMenus.length) {
                do {
                    this.pathMenus.pop();
                } while (this.currentLevel == this.pathMenus.length);
            }
            this.currentId = item.id;
            this.currentLevel++;
            this.currentShowId = item.id;
            this.pathMenus.push({
                id: item.id,
                name: item.name,
            });
        },
        toString: function () {
            var str = "";
            this.pathMenus.forEach(function (element) {
                str += element.name;
            });
            return str;
        }
    },
    filters: {
        getJsonObj: function (param) {
            return JSON.stringify(param);
        }
    },
    ready: function () { }
});

var app = new Vue({
    el: '#app',
    data: {
        showAn:false,
        selectColor: true,
        invalid: true,
        msg: '',
        dateComponent: {
            status: false,
            key: "",
            val: "",
            viewMode: "",
        },
        areaComponent: {
            show: false,
            key: "",
            current: {
                name: "",
                id: ""
            }
        },
        area: {
            id: "",
            name: "233"
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
            checkboxVar: ['1'],
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
    },
    filters: {

    },
    methods: {
        showDateFn: function (key, val, viewMode) {
            this.dateComponent.key = key;
            this.dateComponent.val = val;
            this.dateComponent.viewMode = viewMode;
            this.dateComponent.status = true;
        },
        showAreaFu: function (key, val) {
            console.log("showAreaFu@" + key + " " + val + " ");
            if (!!val) {
                this.areaComponent.current.name = val.name;
                this.areaComponent.current.id = val.id;
            }
            this.areaComponent.key = key;
            this.areaComponent.show = true;
        },
    },
    events: {
        'dateComponent-msg': function (params) {
            this.$set(params.key, params.val);
        },
         'areaComponent-msg': function (params) {
                console.log('areaComponent-msg',JSON.stringify(params));
                this.$set(params.key, params.val);
            },
    }
});
