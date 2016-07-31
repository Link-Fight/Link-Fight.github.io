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

	module.exports = __webpack_require__(432);


/***/ },

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	Vue.component('toast', {
	  template: __webpack_require__(408),
	  props: {
	    /**
	     * toast类型
	     * icon: 包含图标的提示框（默认）
	     * msg: 不含图标的提示框
	     * loading: 包含loading动画的提示框
	     */
	    type: {
	      type: String,
	      required: false,
	      default: 'icon'
	    }
	  },
	  filters: {
	    getClassName: function (params) {
	      var attrClass = "toast_" + this.type;
	      params[attrClass] = true;
	      return params;
	    },
	  }

	});





/***/ },

/***/ 408:
/***/ function(module, exports) {

	module.exports = "<div :class=\"{'weui_loading_toast': type === 'loading'}|getClassName\">\r\n  <div class=\"weui_mask_transparent\"></div>\r\n  <div class=\"weui_toast\">\r\n    <div class=\"weui_loading\" v-if=\"type === 'loading'\">\r\n      <div v-for=\"n in 12\" class=\"weui_loading_leaf\" :class=\"'weui_loading_leaf_' + n\"></div>\r\n    </div>\r\n    <i class=\"weui_icon_toast\" v-if=\"type !='loading'&&type!='msg'\"></i>\r\n    <div class=\"weui_toast_content\">\r\n      <slot></slot>\r\n    </div>\r\n  </div>\r\n</div>";

/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(407);
	var wxContrlller = __webpack_require__(433);
	Vue.component('personWxUpload', {
	    template: __webpack_require__(435),
	    props: {
	        serverIDs: {
	            type: Array,
	            default: function () {
	                return [];
	            },
	            twoWay: true
	        },
	        imgs: {
	            type: Array,
	            default: function () {
	                return [];
	            },
	            twoWay: true
	        },

	    },
	    data: function () {
	        return {
	            loadingToastShow: false,
	            selectImg: "",
	        }
	    },
	    methods: {
	        chooseImage: function () {
	            var _this = this;
	            wxContrlller.ready(function () {
	                wxContrlller.chooseImage({
	                    count: 1
	                }).done(function (localIds) {
	                    var uploadIds;
	                    _this.imgs = localIds;
	                    _this.selectImg = _this.imgs;
	                    uploadIds = localIds
	                    if (uploadIds.length > 0) {
	                        _this.loadingToastShow = true;
	                        wxContrlller.upload(uploadIds).done(function (serverIds) {
	                            _this.loadingToastShow = false;
	                            _this.serverIDs = _this.serverIDs.concat(serverIds);
	                        });
	                    }
	                });
	            });

	        },
	        delFn: function () {
	            var _this = this;
	            _this.imgs.pop();
	            _this.serverIDs.pop();
	        }
	    },
	    events: {

	    },
	    created: function () {
	        wxContrlller.config();
	        wxContrlller.error(function (msg) {
	            console.log(msg);
	        })
	    },
	    filters: {
	        getImageStr: function (obj) {
	            if (obj["backgroundImage"]) {
	                obj["backgroundImage"] = "url(" + obj["backgroundImage"] + ")";
	                obj["backgroundImage"];
	            }
	            return obj;
	        }
	    },
	});





/***/ },

/***/ 433:
/***/ function(module, exports, __webpack_require__) {

	var wx_api =  true ? __webpack_require__(434) : require("apis/wx");
	module.exports = {
	    config: function () {
	        wx_api.config().done(function(data){
	            wx.config({
	                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	                appId: data.appId, // 必填，公众号的唯一标识
	                timestamp: data.timestamp, // 必填，生成签名的时间戳
	                nonceStr: data.nonceStr, // 必填，生成签名的随机串
	                signature: data.signature,// 必填，签名，见附录1
	                jsApiList: ["chooseImage","previewImage","uploadImage","hideMenuItems","showMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	            });
	        }).fail(function(data){
	            alert(data.msg);
	        });
	    },
	    ready:function(fun){
	        wx.ready(function(res){
	            fun && fun(res);
	        })
	    },
	    error:function(fun){
	    wx.error(function(res){
	        fun && fun(res)
	    })},
	    chooseImage:function(options){
	        var localIds = [];
	        var count = (options && options.count) ? options.count:9;
	        var sizeType = (options && options.sizeType) ? options.sizeType:['original', 'compressed'];
	        var sourceType = (options && options.sourceType) ? options.sourceType:['album', 'camera'];
	        var def = $.Deferred();

	        wx.chooseImage({
	            count:count, //默认9张
	            sizeType:sizeType, // 可以指定是原图还是压缩图，默认二者都有
	            sourceType:sourceType, // 可以指定来源是相册还是相机，默认二者都有
	            success: function (res) {
	                for(var i=0;i<res.localIds.length;i++){
	                    localIds.push(res.localIds[i]);
	                }
	                def.resolve(localIds);
	            },
	            fail:function(res){
	                alert(JSON.stringify(res))
	            }
	        });
	        return def;
	    },
	    upload:function(localIds){
	        var i = 0,length = localIds.length,serverIds=[];
	        var def = $.Deferred();
	        function upload(){
	            wx.uploadImage({
	                isShowProgressTips:0,
	                localId: localIds[i],
	                success: function (res) {
	                    i++;
	                    serverIds.push(res.serverId);
	                    if (i < length) {
	                        upload();
	                    }else{
	                        def.resolve(serverIds);
	                    }
	                },
	                fail: function (res) {
	                    def.reject(JSON.stringify(res));
	                }
	            });
	        }
	        upload();
	        return def;
	    },
	    previewImage:function(current,urls){
	        wx.previewImage({
	            current:current, // 当前显示图片的http链接
	            urls:urls // 需要预览的图片http链接列表
	        });
	    },
	    getImageUrl:function(res_uids){
	        var def = $.Deferred();
	        def = wx_api.getImageUrl(JSON.stringify(res_uids));
	        return def;
	        
	    }
	}

/***/ },

/***/ 434:
/***/ function(module, exports) {

	module.exports={
	    config:function(options){
	        var def = $.Deferred();
	        var url = window.location.href.toString();
	        Xa.get("/wechat/wechat/wechat_signature_info/?url="+url,{},function(result){
	            if(result.status == 200){
	                def.resolve(result.data);
	            }else{
	                def.reject({msg:result.message});
	            }
	        });
	        return def;
	    },
	    getImageUrl:function(res_uids){
	        var def = $.Deferred();
	        setTimeout(function () {
	            def.resolve([
	                {
	                    "uid": "43D3CBAA-1EA0-B134-A28C-0A09D25DF66C",
	                    "url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/544bf4e8050d88324715f82e6ab97300.jpg?e=1468234564&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:XNbCJ4tgWA10ZOtt5gFG2zhTwzs=",
	                    "thumb_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/544bf4e8050d88324715f82e6ab97300.jpg?imageView2/0/w/100/h/100&e=1468234564&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:QWegX_H3OMJnF_1pS3gcrBL0lo0=",
	                    "uri": "v3/user/avatar/544bf4e8050d88324715f82e6ab97300.jpg"
	                },
	                {
	                    "uid": "7F146067-3ED5-B40B-0BF5-F409BAEB8BAE",
	                    "url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/0952c673476da94db1c72f4478f45165.jpg?e=1468234564&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:KmsXDYuAZbW1OyooXF95z8_yNqw=",
	                    "thumb_url": "http://7xlyy2.com1.z0.glb.clouddn.com/v3/user/avatar/0952c673476da94db1c72f4478f45165.jpg?imageView2/0/w/100/h/100&e=1468234564&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:vnGsb3dAPsE6mHF-MkLpyqMAb78=",
	                    "uri": "v3/user/avatar/0952c673476da94db1c72f4478f45165.jpg"
	                }
	            ]);
	        }, 1000);
	        return def;
	    }
	}

/***/ },

/***/ 435:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .upload_photo {\r\n        position: relative;\r\n        left: 0;\r\n        top: 0;\r\n        width: 54px;\r\n        height: 54px;\r\n    }\r\n    \r\n\r\n    .upload_photo .delDiv,\r\n    .upload_photo .chooseDiv {\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        width: 100%;\r\n        height: 100%;\r\n        background-repeat: no-repeat;\r\n        background-size: cover;\r\n        /*background-size: 100%;*/\r\n        /*background-color: red;*/\r\n    }\r\n</style>\r\n<div class=\"upload_photo\">\r\n    <div class=\"delDiv\" v-show=\"imgs.length>0\" :style=\"{backgroundImage:selectImg}|getImageStr\">\r\n\r\n        <div style=\" position: absolute;top:-6px;right: -6px; \">\r\n            <i class=\"weui_icon_clear \" style=\"display: block;color:red;font-size: 16px \" @click=\"delFn() \"></i>\r\n        </div>\r\n    </div>\r\n    <div v-show=\"!imgs.length>0\" class=\"chooseDiv \" @click=\"chooseImage \">\r\n    </div>\r\n    <toast type=\"loading\" v-show=\"loadingToastShow \">上传中...</toast>\r\n</div>";

/***/ }

/******/ });