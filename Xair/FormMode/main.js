
Vue.directive('validate', {
    bind: function (val) {

    },
    update: function (newVal, oldVal) {
        console.log("newVal" + JSON.stringify(newVal));
        // console.log("oldVal" + JSON.stringify(oldVal));
        if (newVal.type == "datetime") {
            alert(newVal.val);
        }
        if (!oldVal && !!newVal && !!newVal.key) {
            console.info("First" + newVal.key);
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
                                config.result.msg += " 选择日期需要在" + params.minDate + "之后 ";
                            }
                        }
                    }
                    if (!!params.maxDate) {
                        if (params.val.length >= params.maxDate.length) {
                            if (params.val > params.maxDate) {
                                config.result.status = false;
                                config.result.msg += " 选择日期需要在" + params.maxDate + "之前 ";
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
            console.log(newVal.type);
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
                "viewMode": "date",
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
            Birthday: ""
        },
        validateResult: {
        },
        mode: "view",
    },
    filters: {

    }
});
