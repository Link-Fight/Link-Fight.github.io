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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(469);


/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	Xa.defineModule('/demo/chart/chart', function () {
	    return {
	        template: __webpack_require__(470),
	        data: function () {
	            return {

	                chartDates: [
	                    {
	                        tooltip: {
	                            trigger: 'item',
	                            formatter: "{a} <br/>{b}: {c} ({d}%)"
	                        },
	                        legend: {
	                            orient: 'vertical',
	                            x: 'left',
	                            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
	                        },
	                        roseType: 'radius',
	                        series: [
	                            {
	                                name: '访问来源',
	                                type: 'pie',
	                                radius: ['50%', '75%'],
	                                avoidLabelOverlap: false,
	                                label: {
	                                    normal: {
	                                        show: false,
	                                        position: 'center'
	                                    },
	                                    emphasis: {
	                                        show: true,
	                                        textStyle: {
	                                            fontSize: '30',
	                                            fontWeight: 'bold'
	                                        }
	                                    }
	                                },
	                                labelLine: {
	                                    normal: {
	                                        show: false
	                                    }
	                                },
	                                data: [
	                                    { value: 335, name: '直接访问' },
	                                    { value: 310, name: '邮件营销' },
	                                    { value: 234, name: '联盟广告' },
	                                    { value: 135, name: '视频广告' },
	                                    { value: 1548, name: '搜索引擎' }
	                                ]
	                            }
	                        ]
	                    },
	                    {
	                        tooltip: {
	                            trigger: 'item',
	                            formatter: "{a} <br/>{b}: {c} ({d}%)"
	                        },
	                        legend: {
	                            orient: 'vertical',
	                            x: 'left',
	                            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', ' ']
	                        },
	                        series: [
	                            {
	                                name: '访问来源',
	                                type: 'pie',
	                                radius: ['50%', '70%'],
	                                avoidLabelOverlap: false,
	                                label: {
	                                    normal: {
	                                        show: false,
	                                        position: 'center'
	                                    },
	                                    emphasis: {
	                                        show: true,
	                                        textStyle: {
	                                            fontSize: '30',
	                                            fontWeight: 'bold'
	                                        }
	                                    }
	                                },
	                                labelLine: {
	                                    normal: {
	                                        show: false
	                                    }
	                                },
	                                data: [
	                                    { value: 135, name: '直接访问' },
	                                    { value: 210, name: '邮件营销' },
	                                    { value: 334, name: '联盟广告' },
	                                    { value: 135, name: '视频广告' },
	                                    { value: 1548, name: '搜索引擎' }
	                                ]
	                            }
	                        ]
	                    },
	                    {
	                        title: {
	                            text: '未来一周气温变化',
	                            subtext: '纯属虚构',
	                            x: "center",
	                        },
	                        tooltip: {
	                            trigger: 'axis'
	                        },
	                        legend: {
	                            data: ['最高气温', '最低气温'],
	                            x: "left",
	                            padding: 10,
	                        },
	                        toolbox: {
	                            show: true,
	                            feature: {
	                                dataZoom: {
	                                    yAxisIndex: 'none'
	                                },
	                                dataView: { readOnly: false },
	                                magicType: { type: ['line', 'bar'] },
	                                restore: {},
	                                saveAsImage: {}
	                            }
	                        },
	                        xAxis: {
	                            type: 'category',
	                            boundaryGap: true,
	                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	                        },
	                        yAxis: {
	                            type: 'value',
	                            axisLabel: {
	                                formatter: '{value} °C'
	                            }
	                        },
	                        series: [
	                            {
	                                name: '最高气温',
	                                type: 'line',
	                                data: [11, 11, 15, 13, 12, 13, 10],
	                                markPoint: {
	                                    data: [
	                                        { type: 'max', name: '最大值' },
	                                        { type: 'min', name: '最小值' }
	                                    ]
	                                },
	                                markLine: {
	                                    data: [
	                                        { type: 'average', name: '平均值' }
	                                    ]
	                                }
	                            },
	                            {
	                                name: '最低气温',
	                                type: 'line',
	                                data: [1, -2, 2, 5, 3, 2, 0],
	                                markPoint: {
	                                    data: [
	                                        { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
	                                    ]
	                                },
	                                markLine: {
	                                    data: [
	                                        { type: 'average', name: '平均值' },
	                                        [{
	                                            symbol: 'none',
	                                            x: '90%',
	                                            yAxis: 'max'
	                                        }, {
	                                                symbol: 'circle',
	                                                label: {
	                                                    normal: {
	                                                        position: 'start',
	                                                        formatter: '最大值'
	                                                    }
	                                                },
	                                                type: 'max',
	                                                name: '最高点'
	                                            }]
	                                    ]
	                                }
	                            }
	                        ]
	                    },
	                    {
	                        title: {
	                            text: '未来一周气温变化',
	                            subtext: '纯属虚构',
	                            x: "center",
	                        },
	                        tooltip: {
	                            trigger: 'axis',
	                            triggerOn: 'mousemove',
	                            alwaysShowContentL: true,
	                            position: function (point, params, dom) {
	                                // 固定在顶部
	                                return [point[0], '10%'];
	                            }
	                        },
	                        legend: {
	                            data: ['最高气温', '最低气温'],
	                            x: "left",
	                            padding: 10,
	                        },
	                        toolbox: {
	                            show: true,
	                            itemSize: 30,
	                            orient: "vertical",
	                            feature: {
	                                dataZoom: {
	                                    yAxisIndex: 'none'
	                                },
	                                dataView: { readOnly: false },
	                                magicType: { type: ['line', 'bar'] },
	                                restore: {},
	                                saveAsImage: {}
	                            }
	                        },
	                        xAxis: {
	                            type: 'category',
	                            boundaryGap: true,
	                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	                        },
	                        yAxis: {
	                            type: 'value',
	                            axisLabel: {
	                                formatter: '{value} °C'
	                            }
	                        },
	                        dataZoom: [
	                            {   // 这个dataZoom组件，默认控制x轴。
	                                type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
	                                start: 0,      // 左边在 10% 的位置。
	                                end: 50         // 右边在 60% 的位置。
	                            },
	                            {   // 这个dataZoom组件，也控制x轴。
	                                type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
	                                start: 10,      // 左边在 10% 的位置。
	                                end: 60         // 右边在 60% 的位置。
	                            }
	                        ],
	                        series: [
	                            {
	                                name: '最高气温',
	                                type: 'line',
	                                data: [11, 11, 15, 13, 12, 13, 10],
	                                markPoint: {
	                                    data: [
	                                        { type: 'max', name: '最大值' },
	                                        { type: 'min', name: '最小值' }
	                                    ]
	                                },
	                                markLine: {
	                                    data: [
	                                        { type: 'average', name: '平均值' }
	                                    ]
	                                }
	                            },
	                            {
	                                name: '最低气温',
	                                type: 'line',
	                                data: [1, -2, 2, 5, 3, 2, 0],
	                                markPoint: {
	                                    data: [
	                                        { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
	                                    ]
	                                },
	                                markLine: {
	                                    data: [
	                                        { type: 'average', name: '平均值' },
	                                        [{
	                                            symbol: 'none',
	                                            x: '90%',
	                                            yAxis: 'max'
	                                        }, {
	                                                symbol: 'circle',
	                                                label: {
	                                                    normal: {
	                                                        position: 'start',
	                                                        formatter: '最大值'
	                                                    }
	                                                },
	                                                type: 'max',
	                                                name: '最高点'
	                                            }]
	                                    ]
	                                }
	                            }
	                        ]
	                    },
	                    {
	                        tooltip: {
	                            trigger: 'axis'
	                        },
	                        legend:
	                        {
	                            x: 0,
	                            data: ['一二三四五六Step Start', 'Step Middle', 'Step End', "no Step default", "no Step smooth"],
	                            // formatter: function (name) {
	                            //     console.log(arguments);
	                            //     return echarts.format.truncateText(name, 65, '14px Microsoft Yahei', '…');
	                            // },
	                        },
	                        grid: {
	                            left: '3%',
	                            right: '8%',
	                            bottom: '3%',
	                            containLabel: true
	                        },
	                        toolbox: {
	                            feature: {
	                                restore: {},
	                                magicType: { show: true, type: ['line', 'bar',] },
	                                dataView: {
	                                    readOnly: true,
	                                    optionToContent: function (opt) {
	                                        var table = "";
	                                        for (var index = 0, len = opt.xAxis.length; index < len; index++) {
	                                            var axisData = opt.xAxis[index].data;
	                                            var series = opt.series;
	                                            table += '<table class="chart-DataView-Table" style="width:100%;text-align:center"><tbody><tr style="background:green;color:#fff">'
	                                                + '<td>' + opt.xAxis[index].name + '</td>';
	                                            for (var si = 0, l = series.length; si < l; si++) {
	                                                table += '<td>' + series[si].name + '</td>';
	                                            }
	                                            table + '</tr>';
	                                            for (var i = 0, l = axisData.length; i < l; i++) {
	                                                table += '<tr>' + '<td>' + axisData[i] + '</td>';
	                                                for (var ssi = 0, ll = series.length; ssi < ll; ssi++) {
	                                                    var value = series[ssi].data[i];
	                                                    if (value instanceof Object) {
	                                                        value = value.value;
	                                                    }
	                                                    table += '<td>' + value + '</td>';
	                                                }
	                                                table += '</tr>';
	                                            }
	                                            table += '</tbody></table>';
	                                        }
	                                        return table;
	                                    },
	                                }
	                            }
	                        },
	                        xAxis: [{
	                            type: 'category',
	                            name: "时间",
	                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	                            nameRotate: -45,
	                        }],
	                        yAxis: {
	                            type: 'value'
	                        },
	                        series: [
	                            {
	                                name: '一二三四五六Step Start',
	                                type: 'line',
	                                step: 'start',
	                                data: [120, 132, 101, 134, 90, 230, 210]
	                            },
	                            {
	                                name: 'Step Middle',
	                                type: 'line',
	                                step: 'middle',
	                                data: [220, 282, 201, 234, 290, 430, 410]
	                            },
	                            {
	                                name: 'Step End',
	                                type: 'line',
	                                step: 'end',
	                                data: [450, 432, 401, 454, 590, 530, 510]
	                            },
	                            {
	                                name: 'no Step default',
	                                type: 'line',
	                                data: [550, 532, 445, 554, 690, 630, 530]
	                            },
	                            {
	                                name: 'no Step smooth',
	                                type: 'line',
	                                smooth: true,
	                                data: [650, 632, 645, 654, 710, 730, 630]
	                            },
	                        ]
	                    },
	                    {
	                        //X 轴显示
	                        chartType: "line",
	                        "xAxis.data": ['周一', "周二", "周三", "周四", "周五", "周六", "周日"],
	                        "series": [{
	                            name: '一二三四五六Step Start',
	                            type: 'line',
	                            data: [120, 132, 101, 134, 90, 230, 210]
	                        },
	                            {
	                                name: 'Step Middle',
	                                
	                                data: [220, 282, 201, 234, 290, 430, 410]
	                            },
	                            {
	                                name: 'Step End',
	                                type: 'bar',
	                                data: [450, 432, 401, 454, 590, 530, 510]
	                            },
	                            {
	                                name: 'no Step default',
	                                type: 'line',
	                                data: [550, 532, 445, 554, 690, 630, 530]
	                            },
	                            {
	                                name: 'no Step smooth',
	                                type: 'line',
	                                data: [650, 632, 645, 654, 710, 730, 630]
	                            },
	                        ]
	                    },

	                ]
	            }
	        }
	    }
	})

/***/ },

/***/ 470:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .chart {\r\n        width: 100%;\r\n        height: 300px;\r\n        padding: 0 4px;\r\n        box-sizing:border-box;\r\n    }\r\n</style>\r\n\r\n2333\r\n<template v-for='chart in chartDates'>\r\n    <div class=\"chart\" v-echarts=\"chart\" ></div>\r\n</template>";

/***/ }

/******/ });