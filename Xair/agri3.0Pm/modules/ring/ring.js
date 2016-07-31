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

	module.exports = __webpack_require__(436);


/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	Vue.component('ring',{
		template:__webpack_require__(437),
	    computed:{

	    },
	    props: {
	    	rate:{
	    		type:Number,
				required:false,
				default:'0'
			},
			type:{
				
			}
		},
	    methods: {
	    	dispathEventAndClose:function(event){
	    		this.$dispatch(event);
	    	}
	    }
	});

/***/ },

/***/ 437:
/***/ function(module, exports) {

	module.exports = "<style>\r\n\t.ring{width:25px;height:25px;text-align:center;}\r\n\t.pie{width:50px;height:50px;background-color:blue;border-radius:25px;position:absolute;}\r\n\t.pie1{clip:rect(0px,50px,50px,25px);-webkit-transform:rotate(0deg);background-color:#fff;}\r\n\t.pie2{clip:rect(0px,25px,50px,0px);-webkit-transform:rotate(0deg);background-color:#fff;}\r\n\t.hold{width:50px;height:50px;position:absolute;z-index:1;}\r\n\t.bg{width:50px;height:50px;border-radius:50px;position:absolute;background-color:#0DC75A;}\r\n\t.time{width:40px;height:40px;margin:5px 0 0 5px;background-color:red;border-radius:40px;position:absolute;z-index:1;text-align:center;line-height:40px;font-size:12px;}\r\n</style>\r\n<div class=\"ring\">\r\n\t<div class=\"hold\">\r\n\t\t<div class=\"pie pie1\" style=\"transform:rotate(120deg);\"></div>\r\n\t</div>\r\n\t<div class=\"hold\">\r\n\t\t<div class=\"pie pie2\"></div>\r\n\t</div>\r\n\t<div class=\"bg\"></div>\r\n\t<div class=\"time\">12%</div>\r\n</div>";

/***/ }

/******/ });