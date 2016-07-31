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

	module.exports = __webpack_require__(508);


/***/ },

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

	var inbox_api =  true ? __webpack_require__(496) : require("apis/inbox");
	module.exports = {
	    getInboxList: function (data) {
	        var def = $.Deferred();
	        def = inbox_api.getInboxList(data);
	        return def;
	    },
	    draft_list: function (data) {
	        var def = $.Deferred();
	        def = inbox_api.draft_list(data);
	        return def;
	    },
	    participated_list: function (data) {
	        var def = $.Deferred();
	        def = inbox_api.participated_list(data);
	        return def;
	    },
	    participated_detail: function (data) {
	        var def = $.Deferred();
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else
	            def = inbox_api.participated_detail(data);
	        return def;
	    },
	    delete_case: function (data) {
	        var def = $.Deferred();
	        console.log(JSON.stringify(data));
	        if (!data.app_uid)
	            def.reject({ msg: "app_uid不能为空" });
	        else
	            def = inbox_api.delete_case(data);
	        return def;
	    }
	}

/***/ },

/***/ 496:
/***/ function(module, exports) {

	module.exports = {
	    getInboxList: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "total": [
	                    {
	                        "pro_uid": "",
	                        "app_pro_title": "全部",
	                        "num": 3
	                    },
	                    {
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_pro_title": "合同审核",
	                        "num": 2
	                    },
	                    {
	                        "pro_uid": "404907226576a4c21afecf0085860988",
	                        "app_pro_title": "合同审核改",
	                        "num": 1
	                    }
	                ],
	                "data": [
	                    {
	                        "app_uid": "723602294577382de17aee4064715054",
	                        "app_number": "13",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-29 08:13:28",
	                        "del_init_date": null,
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "审核合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "",
	                    },
	                    {
	                        "app_uid": "979766845576b8e63ed7c36074379637",
	                        "app_number": "3",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-29 08:40:52",
	                        "del_init_date": null,
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "审核合同",
	                        "previous_usr_name": "Polaris Zheng",
	                        "previous_usr_photo_path": "",
	                    },
	                    {
	                        "app_uid": "817779541576a7ea3705628093580342",
	                        "app_number": "2",
	                        "pro_uid": "404907226576a4c21afecf0085860988",
	                        "app_update_date": "2016-06-27 07:58:22",
	                        "del_init_date": "2016-06-23 10:45:14",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "修改合同",
	                        "previous_usr_name": "Polaris Zheng",
	                        "previous_usr_photo_path": "",
	                    }
	                ]
	            });
	        }, 2000);
	        return def;
	    },
	    draft_list: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "total": [
	                    {
	                        "pro_uid": 0,
	                        "app_pro_title": "全部",
	                        "num": 11
	                    },
	                    {
	                        "pro_uid": "23590087857721cec16cdb9001203154",
	                        "app_pro_title": "作业需求",
	                        "num": 1
	                    },
	                    {
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_pro_title": "合同审核",
	                        "num": 0
	                    }
	                ],
	                "data": [
	                    {
	                        "app_uid": "3595275875774cd1f8bb1e7031243896",
	                        "app_number": "18",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-30 15:41:20",
	                        "del_init_date": "2016-06-30 15:41:19",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "1541442875774b51258a0a6088012663",
	                        "app_number": "16",
	                        "pro_uid": "23590087857721cec16cdb9001203154",
	                        "app_update_date": "2016-06-30 13:58:45",
	                        "del_init_date": "2016-06-30 13:58:42",
	                        "app_pro_title": "作业需求",
	                        "app_tas_title": "创建作业需求",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "150329589577230215a00f0088795720",
	                        "app_number": "12",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 09:36:16",
	                        "del_init_date": "2016-06-28 08:06:57",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "3359680175771d468ddd6a0005471282",
	                        "app_number": "11",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:35:46",
	                        "del_init_date": "2016-06-28 01:35:37",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "8545532225771d3fb583a89095933900",
	                        "app_number": "10",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:33:54",
	                        "del_init_date": "2016-06-28 01:33:47",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "3676452635771d3cfe24b46040147081",
	                        "app_number": "9",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:33:12",
	                        "del_init_date": "2016-06-28 01:33:04",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "2212524415771d347aed4d2073866424",
	                        "app_number": "8",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:30:57",
	                        "del_init_date": "2016-06-28 01:30:48",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "8275451665771d312d6dd73008810289",
	                        "app_number": "7",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-28 01:30:14",
	                        "del_init_date": "2016-06-28 01:29:55",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "79815673857708fa33a69d5081541160",
	                        "app_number": "6",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-27 02:29:56",
	                        "del_init_date": "2016-06-27 02:29:55",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "803283691576bbe1dafac23071943239",
	                        "app_number": "5",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-23 11:11:11",
	                        "del_init_date": "2016-06-23 10:46:54",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    },
	                    {
	                        "app_uid": "901458740576ba7bf1a5ea1030880650",
	                        "app_number": "4",
	                        "pro_uid": "404907226576a4c21afecf0085860989",
	                        "app_update_date": "2016-06-23 09:11:27",
	                        "del_init_date": "2016-06-23 09:11:27",
	                        "app_pro_title": "合同审核",
	                        "app_tas_title": "新增合同",
	                        "previous_usr_name": "Administrator admin",
	                        "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo="
	                    }
	                ]
	            });
	        }, 2000);
	        return def;
	    },
	    participated_list: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve([
	                {
	                    "app_uid": "3595275875774cd1f8bb1e7031243896",
	                    "app_number": "18",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-30 15:41:20",
	                    "del_init_date": "2016-06-30 15:41:19",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "1541442875774b51258a0a6088012663",
	                    "app_number": "16",
	                    "pro_uid": "23590087857721cec16cdb9001203154",
	                    "app_update_date": "2016-06-30 13:58:45",
	                    "del_init_date": "2016-06-30 13:58:42",
	                    "app_pro_title": "作业需求",
	                    "app_tas_title": "创建作业需求",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "150329589577230215a00f0088795720",
	                    "app_number": "12",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 09:36:16",
	                    "del_init_date": "2016-06-28 08:06:57",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "3359680175771d468ddd6a0005471282",
	                    "app_number": "11",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:35:46",
	                    "del_init_date": "2016-06-28 01:35:37",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "8545532225771d3fb583a89095933900",
	                    "app_number": "10",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:33:54",
	                    "del_init_date": "2016-06-28 01:33:47",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "3676452635771d3cfe24b46040147081",
	                    "app_number": "9",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:33:12",
	                    "del_init_date": "2016-06-28 01:33:04",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "2212524415771d347aed4d2073866424",
	                    "app_number": "8",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:30:57",
	                    "del_init_date": "2016-06-28 01:30:48",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "8275451665771d312d6dd73008810289",
	                    "app_number": "7",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-28 01:30:14",
	                    "del_init_date": "2016-06-28 01:29:55",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "79815673857708fa33a69d5081541160",
	                    "app_number": "6",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-27 02:29:56",
	                    "del_init_date": "2016-06-27 02:29:55",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "803283691576bbe1dafac23071943239",
	                    "app_number": "5",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-23 11:11:11",
	                    "del_init_date": "2016-06-23 10:46:54",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                },
	                {
	                    "app_uid": "901458740576ba7bf1a5ea1030880650",
	                    "app_number": "4",
	                    "pro_uid": "404907226576a4c21afecf0085860989",
	                    "app_update_date": "2016-06-23 09:11:27",
	                    "del_init_date": "2016-06-23 09:11:27",
	                    "app_pro_title": "合同审核",
	                    "app_tas_title": "新增合同",
	                    "previous_usr_name": "Administrator admin",
	                    "previous_usr_photo_path": "http://7xlyy2.com1.z0.glb.clouddn.com/uav_reports2016022710020600.jpg?e=1771898533&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:7T3TLyitjsmeMKQT8kCVLM8oHZo=",
	                    "app_status": "DRAFT"
	                }
	            ]
	            );
	        }, 2000);
	        return def;
	    },
	    participated_detail: function (data) {
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve({
	                "pro_name": "合同审核",
	                "app_name": "#17",
	                "app_init_usr_username": "Administrator admin",
	                "app_status": "TO_DO",
	                "app_create_date": "2016-06-30 15:25:54",
	                "app_update_date": "2016-07-13 19:49:30",
	                "history": [
	                    {
	                        "tas_title": "审核合同",
	                        "status": "TASK_COMPLETED",
	                        "delegations": [
	                            {
	                                "del_index": "#2",
	                                "del_finish_date": "2016-07-13 19:44:51",
	                                "usr_name": "Administrator admin",
	                                "avatar_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                            },
	                            {
	                                "del_index": "#4",
	                                "del_finish_date": "2016-07-13 19:49:29",
	                                "usr_name": "Administrator admin",
	                                "avatar_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                            }
	                        ]
	                    },
	                    {
	                        "tas_title": "修改合同",
	                        "status": "TASK_IN_PROGRESS",
	                        "delegations": [
	                            {
	                                "del_index": "#3",
	                                "del_finish_date": "2016-07-13 19:47:04",
	                                "usr_name": "Administrator admin",
	                                "avatar_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                            },
	                            {
	                                "del_index": "#5",
	                                "del_finish_date": "Not finished",
	                                "usr_name": "li si",
	                                "avatar_url": ""
	                            }
	                        ]
	                    },
	                    {
	                        "tas_title": "新增合同",
	                        "status": "TASK_COMPLETED",
	                        "delegations": [
	                            {
	                                "del_index": "#1",
	                                "del_finish_date": "2016-06-30 17:00:37",
	                                "usr_name": "Administrator admin",
	                                "avatar_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/e0a4b4c2cf077d242f2177eff9af1f08.jpg?imageView2/1/w/100/h/100&e=1783071948&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:UnSqODqcHgapry3cTuyQnGgV90A="
	                            }
	                        ]
	                    }
	                ]
	            });
	        }, 2000);
	        return def;
	    },
	}


	//  

/***/ },

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

	var inboxController = __webpack_require__(495);
	Xa.defineModule("/pm/participated_detail/participated_detail", function () {
	    return {
	        template: __webpack_require__(509),
	        data: function () {
	            return {
	                isLoading: true,
	                app_uid:this.$route.query.app_uid,
	                displayContent:false,
	                detail:{},
	                historyStatus:{
	                    'TASK_COMPLETED':'已完成',
	                    'TASK_IN_PROGRESS':'进行中',
	                    'TASK_PENDING_NOT_EXECUTED':'未开始',
	                    'TASK_PARALLEL':'并行任务'
	                },
	                historyStatusColor:{
	                    'TASK_COMPLETED':'global-color-green',
	                    'TASK_IN_PROGRESS':'global-color-blue',
	                    'TASK_PENDING_NOT_EXECUTED':'global-color-red',
	                    'TASK_PARALLEL':'global-color-yellow'
	                },
	                appStatus:{
	                    'TO_DO':'待办',
	                    'DRAFT':'草稿',
	                    'PAUSED':'暂停',
	                    'CANCELLED':'取消',
	                    'COMPLETED':'完成'
	                }
	                
	            }
	        },
	        created: function () {
	            
	        },
	        watch: {},
	        methods: {
	        },
	        events: {
	        },
	        route: {
	            data: function (transition) {
	                var _this = this;
	                inboxController.participated_detail({app_uid:_this.app_uid}).done(function (data) {
	                    _this.displayContent = true;
	                    transition.next({
	                        "detail":data
	                    })
	                }).fail(function(data){
	                    alert(data.msg);
	                }).always(function(){
	                    _this.isLoading = false;
	                })
	            }
	        },
	        filters: {
	/*
	            'filterHistoryStatus':function(val){
	                switch (val){
	                    case 'TASK_COMPLETED':
	                        return '已完成';
	                    case 'TASK_IN_PROGRESS':
	                        return '进行中';
	                    case 'TASK_PENDING_NOT_EXECUTED':
	                        return '未开始';
	                    case 'TASK_PARALLEL':
	                        return '并行任务';
	                }
	            },
	            'filterAppStatus':function(val){
	                switch (val){
	                    case 'TO_DO':
	                        return '待办';
	                    case 'DRAFT':
	                        return '草稿';
	                    case 'PAUSED':
	                        return '暂停';
	                    case 'CANCELLED':
	                        return '取消';
	                    case 'COMPLETED':
	                        return '完成';
	                }
	            }
	*/
	        },
	        ready: function () {
	            this.$root.seoPageInfo.title = "详情";
	        },
	        components: {
	        }
	    }

	})




/***/ },

/***/ 509:
/***/ function(module, exports) {

	module.exports = "<div :class=\"{'global-loading':isLoading}\">\r\n    <div v-if=\"displayContent\">\r\n        <div class=\"weui_cells\">\r\n            <div class=\"weui_cell\">\r\n                <div class=\"weui_cell_hd\">\r\n                    <span class=\"weui_label\">名称</span>\r\n                </div>\r\n                <div class=\"weui_cell_bd weui_cell_primary\">{{detail.pro_name}}</div>\r\n            </div>\r\n            <div class=\"weui_cell\">\r\n                <div class=\"weui_cell_hd\">\r\n                    <span class=\"weui_label\">编号</span>\r\n                </div>\r\n                <div class=\"weui_cell_bd weui_cell_primary\">{{detail.app_name}}</div>\r\n            </div>\r\n            <div class=\"weui_cell\">\r\n                <div class=\"weui_cell_hd\">\r\n                    <span class=\"weui_label\">创建人</span>\r\n                </div>\r\n                <div class=\"weui_cell_bd weui_cell_primary\">{{detail.app_init_usr_username}}</div>\r\n            </div>\r\n            <div class=\"weui_cell\">\r\n                <div class=\"weui_cell_hd\">\r\n                    <span class=\"weui_label\">当前状态</span>\r\n                </div>\r\n                <div class=\"weui_cell_bd weui_cell_primary\">{{appStatus[detail.app_status]}}</div>\r\n            </div>\r\n            <div class=\"weui_cell\">\r\n                <div class=\"weui_cell_hd\">\r\n                    <span class=\"weui_label\">创建时间</span>\r\n                </div>\r\n                <div class=\"weui_cell_bd weui_cell_primary\">{{detail.app_create_date}}</div>\r\n            </div>\r\n            <div class=\"weui_cell\">\r\n                <div class=\"weui_cell_hd\">\r\n                    <span class=\"weui_label\">最后更新</span>\r\n                </div>\r\n                <div class=\"weui_cell_bd weui_cell_primary\">{{detail.app_update_date}}</div>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"weui_cells_title\">处理历史</div>\r\n        <div class=\"weui_panel\" v-for=\"item in detail.history\">\r\n            <div class=\"weui_panel_hd weui_panel_hd_cell\">\r\n                <p class=\"weui_panel_hd_primary\" style=\"font-weight: 900\">{{item.tas_title}}</p>\r\n                <span :class=\"historyStatusColor[item.status]\">{{historyStatus[item.status]}}</span>\r\n            </div>\r\n            <div class=\"weui_panel_bd\">\r\n                <div class=\"weui_media_box weui_media_small_appmsg\">\r\n                    <div class=\"weui_cells weui_cells_access\">\r\n                        <div class=\"weui_cell\" href=\"javascript:;\" v-for=\"delegation in item.delegations\">\r\n                            <div class=\"weui_cell_hd\">\r\n                                <img :src=\"delegation.avatar_url\" style=\"width:36px;height:36px;display: block;margin-right: 10px\"/>\r\n                            </div>\r\n                            <div class=\"weui_cell_bd weui_cell_primary\">\r\n                                <div style=\"color:#666\">\r\n                                    <p>{{delegation.usr_name}}</p>\r\n                                    <p>{{delegation.del_index}}</p>\r\n                                </div>\r\n                            </div>\r\n                            <span class=\"weui_cell_text_ft\">{{delegation.del_finish_date}}</span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ }

/******/ });