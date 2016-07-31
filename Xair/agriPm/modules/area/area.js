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

	module.exports = __webpack_require__(414);


/***/ },

/***/ 414:
/***/ function(module, exports, __webpack_require__) {

	Vue.component('area',{
	    template:__webpack_require__(415),
	    data:function(){
	        return {
	            provinceData:null,
	            cityData:null,
	            districtData:null,
	            townData:null,
	            province:'',
	            city:'2342',
	            district:'',
	            town:'',
	            areaCode:''
	        }
	    },
	    props: {
	        areaCode: {
	            type: String,
	            required: false,
	            default: ''
	        },
	        closeArea:{
	            type:Function,
	            required: true
	        }
	    },
	    methods: {
	        tabChooseProvice:function(){

	        },
	        tabChooseCity:function(){

	        },
	        tabChooseDistrict:function(){

	        },
	        tabChooseTown:function(){

	        },
	        getProvinceData:function(){

	        },
	        getOtherData:function(){

	        }
	    },
	    ready:function(){
	        // alert(2)
	    }
	});

/***/ },

/***/ 415:
/***/ function(module, exports) {

	module.exports = "<div id=\"chooseArea\">\r\n\t<div @click=\"closeArea\" class=\"area-mark\"></div>\r\n\t<div class=\"area-tab\">\r\n\t\t<ul class=\"area-tab-menu\">\r\n\t\t\t<li @click=\"tabChooseProvice\" class=\"active\">省</li>\r\n\t\t\t<li @click=\"tabChooseCity\">市</li>\r\n\t\t\t<li @click=\"tabChooseDistrict\">县</li>\r\n\t\t\t<li @click=\"tabChooseTown\">乡</li>\r\n\t\t</ul>\r\n\t\t<div class=\"area-tab-con\">\r\n\t\t    <ul id=\"province\">\r\n\t\t        <li v-for=\"provice in provinceData\">{{ provice.name }}</li>\r\n\t\t    </ul>\r\n\t\t    <ul id=\"city\">\r\n\t\t    \t<li v-for=\"city in cityData\">{{ city.name }}</li>\r\n\t\t    </ul>\r\n\t\t    <ul id=\"district\">\r\n\t\t    \t<li v-for=\"district in districtData\">{{ district.name }}</li>\r\n\t\t    </ul>\r\n\t\t    <ul id=\"town\">\r\n\t\t    \t<li v-for=\"town in townData\">{{ town.name }}</li>\r\n\t\t    </ul>\r\n\t\t</div>\r\n\t\t<!-- <div class=\"loadtip\"></div> -->\r\n\t</div>\r\n</div>";

/***/ }

/******/ });