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

	module.exports = __webpack_require__(410);


/***/ },

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	Vue.component("date",{
	    template:__webpack_require__(411),
	    data:function(){
	        return{
	        }
	    },
	    props:{
	        menu:{
	            type:Array,
	            default:function(){
	                return[{
	                    text:'',
	                    class:''
	                }]
	            },
	            twoWay:true
	        }
	    },
	    watch:{
	    },
	    methods:{
	        tabFn:function(index){
	            
	        }
	    },
	    ready:function(){
	    }
	});



/***/ },

/***/ 411:
/***/ function(module, exports) {

	module.exports = "<section class=\"\">\r\n    <menu class=\"global-header-tab global-fix-top\">\r\n        <a href=\"\" v-for=\"item in menu\" :class=\"item.class\" @click=\"tabFn($index)\">{{tiem.text}}</a>\r\n    </menu>\r\n    <div>\r\n        <solt name=\"\">\r\n\r\n        </solt>\r\n    </div>\r\n</section>";

/***/ }

/******/ });