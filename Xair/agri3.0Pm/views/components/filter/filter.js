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

	module.exports = __webpack_require__(456);


/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

	var filterComponent = Vue.extend({
	    template:__webpack_require__(457),
	    props:{
	        filterList:{
	            type:Array,
	            default:function(){
	                return[{
	                    'pro_uid':'',
	                    'app_pro_title': '',
	                    'num': ''
	                }]
	            }
	        }

	    },
	    data:function(){
	        return{
	            show:false,
	            currentText:'',
	            currentUid:'',
	            currentIndex:''
	        }

	    },
	    watch:{
	        'filterList':{
	            handler:function(newVal,oldVal){
	                var obj = newVal.filter(function (item) {return item.pro_uid == 0});
	                console.info(JSON.stringify(obj));
	                this.filterEvent(obj[0])
	            },
	            deep:true
	            
	        }
	    },
	    methods:{
	        filterEvent:function(item){
	            this.show = false;
	            this.currentText = item.app_pro_title;
	            this.currentIndex = item.num;
	            this.currentUid = item.pro_uid;
	            this.$dispatch('filterEvent',{pro_uid:item.pro_uid})
	        }
	        
	    },
	    ready:function(){
	/*
	        var obj = this.filterList.filter(function (item) {return item.pro_uid == 0});
	        this.filterEvent(obj[0])
	*/
	    }
	});

	module.exports ={
	    filterComponent:filterComponent
	}


/***/ },

/***/ 457:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .filter-title {\r\n        height: 28px;\r\n        line-height: 28px;\r\n        padding: 10px 0;\r\n        text-align: center;\r\n        position: relative;\r\n        background-color: #fff;\r\n        z-index: 2;\r\n    }\r\n    \r\n    .filter-title:after {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: -1px;\r\n        width: 100%;\r\n        height: 1px;\r\n        border-top: 1px solid #cdcdcd;\r\n        color: #cdcdcd;\r\n        -webkit-transform-origin: 0 0;\r\n        transform-origin: 0 0;\r\n    }\r\n    \r\n    .filter-list {\r\n        position: fixed;\r\n        left: 0;\r\n        top: 0;\r\n        -webkit-transform: translate(0, -100%);\r\n        transform: translate(0, -100%);\r\n        -webkit-backface-visibility: hidden;\r\n        backface-visibility: hidden;\r\n        z-index: 2;\r\n        width: 100%;\r\n        background-color: #fff;\r\n        -webkit-transition: -webkit-transform .5s;\r\n        transition: -webkit-transform .5s;\r\n        transition: transform .5s;\r\n        transition: transform .5s, -webkit-transform .5s;\r\n    }\r\n    \r\n    .filter-list-toggle {\r\n        -webkit-transform: translate(0, 48px);\r\n        transform: translate(0, 48px);\r\n    }\r\n    \r\n    .filter_cell {\r\n        position: relative;\r\n        height: 28px;\r\n        line-height: 28px;\r\n        padding: 10px 0;\r\n        text-align: center;\r\n    }\r\n    \r\n    .filter_cell:before {\r\n        content: \" \";\r\n        position: absolute;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        border-top: 1px solid #D9D9D9;\r\n        color: #D9D9D9;\r\n        -webkit-transform-origin: 0 0;\r\n        transform-origin: 0 0;\r\n        -webkit-transform: scaleY(0.5);\r\n        transform: scaleY(0.5);\r\n    }\r\n    \r\n    .filter_cell:active {\r\n        background-color: #ECECEC;\r\n    }\r\n</style>\r\n<div class=\"global-mask\" v-show=\"!!filterList.length && filterList[0].app_pro_title != ''\">\r\n    <div class=\"global_mask_transition\" :class=\"{'global_fade_toggle':show}\" @click=\"show=false\"></div>\r\n    <div class=\"filter-box\">\r\n        <div class=\"filter-title\" @click=\"show = !show\">\r\n            <template v-if=\"!!currentIndex||currentIndex=='0'\">\r\n                {{currentText}}({{currentIndex}})\r\n            </template>\r\n            <template v-else>\r\n                {{currentText}}\r\n            </template>\r\n            <i class=\"iconfont\" :class=\"{'icon-xiangxia':!show,'icon-xiangxia-copy':show}\" style=\"display:inline-block;width:16px;height:16px;\"></i>\r\n        </div>\r\n        <div class=\"filter-list\" :class=\"{'filter-list-toggle':show}\">\r\n            <div v-for=\"item in filterList\" class=\"filter_cell\" @click=\"filterEvent(item)\">\r\n                <template v-if=\"!!item.num||item.num=='0'\">\r\n                    {{item.app_pro_title}}({{item.num}})\r\n                </template>\r\n                <template v-else>\r\n                    {{item.app_pro_title}}\r\n                </template>\r\n                <i class=\"iconfont icon-iconfontgouxuan global-color-green\" v-if=\"item.pro_uid == currentUid\"></i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }

/******/ });