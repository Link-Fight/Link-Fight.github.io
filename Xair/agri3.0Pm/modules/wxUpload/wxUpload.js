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

	module.exports = __webpack_require__(442);


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

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(407);
	var wxContrlller = __webpack_require__(433);
	Vue.component('wxUpload', {
	        template: __webpack_require__(443),
	        props:{
	            serverIDs:{
	                type:Array,
	                default:function(){
	                    return [];
	                },
	                twoWay:true
	            },
	            mode:{
	                type:String,
	                default:function(){
	                    return 'view';
	                }
	            },
	            label:{
	                type:String,
	                default:function(){
	                    return '';
	                }
	            }
	        },
	        data:function(){
	            return {
	                oldImgs:[],
	                preOldImgs:[],
	                imgs:[],
	                count:1,
	                loadingToastShow:false
	            }
	        },
	        watch:{},
	        methods:{
	            chooseImage:function(){
	                var _this = this;
	                wxContrlller.ready(function(){
	                    console.log("config配置成功");
	                    wxContrlller.chooseImage().done(function(localIds){
	                        var uploadIds;
	                        if(_this.imgs.length == 0){
	                            _this.imgs = localIds;
	                            uploadIds = localIds
	                        }else{
	                            var uniqueIds = Xa.Array.union(_this.imgs,localIds);
	                            uploadIds = Xa.Array.diff(uniqueIds,_this.imgs);
	                            _this.imgs = uniqueIds;
	                        }
	                        if(uploadIds.length >0){
	                            _this.loadingToastShow = true;
	                            wxContrlller.upload(uploadIds).done(function(serverIds){
	                                _this.loadingToastShow = false;
	                                var wechatServerIds = [];
	                                for(var i=0;i<serverIds.length;i++){
	                                    wechatServerIds.push("wechat"+serverIds[i]);
	                                }
	                                _this.serverIDs = _this.serverIDs.concat(wechatServerIds);
	                            });
	                        }
	                    });
	                });

	            },
	            previewFn:function(currentUrl){
	                wxContrlller.previewImage(currentUrl,this.preOldImgs);
	            },
	            delOldImgFn:function(img,index){
	                var _this = this;
	                _this.oldImgs.splice(index,1);
	                for(var i=0;i<_this.serverIDs.length;i++){
	                    if(img.uid == _this.serverIDs[i]){
	                        _this.serverIDs.splice(i,1);
	                    }
	                }    
	            },
	            delFn:function(index){
	                var _this = this;
	                _this.imgs.splice(index,1);
	                _this.serverIDs.splice(index,1);
	            }
	        },
	        events:{

	        },
	        created:function(){
	            wxContrlller.config();
	            wxContrlller.error(function(msg){
	                console.log(msg);
	            })
	        },
	        ready:function(){
	            var _this = this;
	            wxContrlller.getImageUrl(_this.serverIDs).done(function(data){
	                for(var i=0;i<data.length;i++){
	                    _this.preOldImgs.push(data[i].url);
	                }
	                _this.oldImgs = data;
	            }).fail(function(data){
	                alert(data.msg)
	            });
	        }
	    });





/***/ },

/***/ 443:
/***/ function(module, exports) {

	module.exports = "<style>\r\n    .uploader_file_empty{\r\n        height: 67px;width: 67px;padding:5px;border:1px solid #f3f3f3;text-align: center;line-height: 67px;\r\n    }\r\n</style>\r\n<div class=\"weui_cells weui_cells_form\" style=\"margin-top:0;\">\r\n    <div class=\"weui_cell\">\r\n        <div class=\"weui_cell_bd weui_cell_primary\">\r\n            <div class=\"weui_uploader\">\r\n                <div class=\"weui_uploader_bd\" style=\"padding-top:10px;\">\r\n                    <div v-if=\"mode == 'view'\">\r\n                        <slot name=\"imgViewMode\">\r\n                            <ul v-show=\"oldImgs.length>0\">\r\n                                <li v-for=\"img in oldImgs\" class=\"weui_uploader_file\">\r\n                                    <img :src=\"img.thumb_url\" style=\"height: 79px;width: 79px\" @click=\"previewFn(img.url)\"/>\r\n                                </li>\r\n                            </ul>\r\n                            <ul v-show=\"oldImgs.length<=0\">\r\n                                <li class=\"weui_uploader_file uploader_file_empty\">暂无图片</li>\r\n                            </ul>\r\n                        </slot>\r\n                    </div>\r\n                    <div v-if=\"mode=='edit'\">\r\n                        <slot name=\"imgDisplay\">\r\n                            <ul>\r\n                                <li v-for=\"img in oldImgs\" class=\"weui_uploader_file\" style=\"position: relative\">\r\n                                    <img :src=\"img.thumb_url\" style=\"height: 79px;width: 79px\"/>\r\n                                    <div @click=\"delOldImgFn(img,$index)\" style=\"position: absolute;top:-6px;right: -6px;\">\r\n                                        <i class=\"weui_icon_clear\" style=\"display: block;color:red;font-size: 16px\"></i>\r\n                                    </div>\r\n                                </li>\r\n                            </ul>\r\n                        </slot>\r\n                        <slot name=\"wxUpload\">\r\n                            <ul class=\"weui_uploader_files\">\r\n                                <li class=\"weui_uploader_file\" style=\"position: relative\" v-for=\"imgSrc in imgs\" track-by=\"$index\">\r\n                                    <img :src=\"imgSrc\" style=\"height: 79px;width:79px;\"/>\r\n                                    <div style=\"position: absolute;top:-6px;right: -6px;\">\r\n                                        <i class=\"weui_icon_clear\" style=\"display: block;color:red;font-size: 16px\" @click=\"delFn($index)\"></i>\r\n                                    </div>\r\n                                </li>\r\n                            </ul>\r\n                            <div class=\"weui_uploader_input_wrp\">\r\n                                <span class=\"weui_uploader_input\" @click=\"chooseImage\"></span>\r\n                            </div>\r\n                        </slot>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <toast type=\"loading\" v-show=\"loadingToastShow\">上传中...</toast>\r\n</div>\r\n";

/***/ }

/******/ });