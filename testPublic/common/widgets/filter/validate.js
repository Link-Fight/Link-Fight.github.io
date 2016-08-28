/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/*
	* validateResult最终校验对象
	* *required：是否需要检验
	* *val：最后提交值
	* *status：校验状态
	* *msg：提示信息
	* */
	Vue.directive('validate', {
	    bind: function bind(val) {},
	    update: function update(newVal, oldVal) {
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
	                "text": function text(params) {
	                    debugger;
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
	                            config.result.msg += "输入长度不要少于" + params.minLength;
	                        }
	                    }
	                    if (params.maxLength >= 1) {
	                        if (params.val.length > params.maxLength) {
	                            config.result.status = false;
	                            config.result.msg += "输入长度不要超过" + params.maxLength;
	                        }
	                    }
	                    if (params.required) {
	                        config.toolFn.required(params.val);
	                    }
	                },
	                "checkbox": function checkbox(params) {
	                    if (params.required) {
	                        config.toolFn.required(params.val);
	                    }
	                },
	                "textarea": function textarea(params) {
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
	                "select": function select(params) {
	                    if (params.required) {
	                        config.toolFn.required(params.val);
	                    }
	                },
	                "gis": function gis(params) {
	                    if (params.required) {
	                        config.toolFn.required(params.val);
	                    }
	                },
	                "datetime": function datetime(params) {
	                    debugger;
	                    if (params.val) {
	                        if (params.minDate) {
	                            try {
	                                var minDate = new Date(params.minDate);
	                                var curDate = new Date(params.val);
	                                if (minDate > curDate) {
	                                    config.result.status = false;
	                                    config.result.msg += "请选择在" + params.minDate + "之后的日期";
	                                }
	                            } catch (e) {}
	                        }
	                        if (params.maxDate) {
	                            try {
	                                var maxDate = new Date(params.maxDate);
	                                var curDate = new Date(params.val);
	                                if (maxDate < curDate) {
	                                    config.result.status = false;
	                                    config.result.msg += "请选择在" + params.maxDate + "之前的日期";
	                                }
	                            } catch (e) {}
	                        }
	                    }
	                }

	            },
	            toolFn: {
	                "required": function required(params) {
	                    debugger;
	                    if (Array.isArray(params)) {
	                        if (params.length == 0) {
	                            config.result.status = false;
	                            config.result.msg += "最少选择一项 ";
	                        }
	                    } else {
	                        if (!!!params) {
	                            config.result.status = false;
	                            config.result.msg += "这是必填项 ";
	                        }
	                    }
	                }
	            }
	        };
	        // 输入不为空 并且  有类型的校验方法
	        if (!!oldVal) {
	            if (!!config.typeValidFn[newVal.type]) {
	                config.typeValidFn[newVal.type](newVal);
	            } else if (newVal.required) {
	                config.toolFn.required(newVal.val);
	            }
	        }
	        if (oldVal && oldVal.required && newVal.val != oldVal.val && newVal.val != '') {
	            if (newVal.validate) {
	                if (!(newVal.validate instanceof RegExp)) {
	                    try {
	                        var ergExp = new Function('return ' + newVal.validate)();
	                        if (ergExp instanceof RegExp) newVal.validate = ergExp;else newVal.validate = /^[]*/;
	                    } catch (e) {
	                        newVal.validate = /^[]*/;
	                    }
	                }
	                try {
	                    var result = newVal.validate.test(newVal.val);
	                    if (!result) {
	                        config.result.status = result;
	                        config.result.msg += newVal.validataMessage;
	                    } else {
	                        config.result.status = result;
	                        config.result.msg = '';
	                    }
	                } catch (e) {
	                    console.error(e);
	                }
	            }
	        }
	        if (!!this.vm.validateResult) {
	            this.vm.$set("validateResult." + newVal.key, {
	                required: newVal.required,
	                val: newVal.val,
	                status: config.result.status,
	                msg: config.result.msg
	            });
	        }
	    },
	    unbind: function unbind() {}
	});

/***/ }
/******/ ]);