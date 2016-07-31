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

	module.exports = __webpack_require__(478);


/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

	var map,pageMainData,activeData,
	unfinished = {color:'white',opacity:1,fillOpacity:0,weight:2},
	unchecked = {color:'#6f0',opacity:1,fillOpacity:0,weight:2,dashArray:'12,12'},
	checked = {color:'#6f0',opacity:1,fillOpacity:0,weight:2,dashArray:'1,1'},
	current = {color:'#ea8010',opacity:1,fillOpacity:0,weight:2,dashArray:'1,1'},
	unpass = {color:'red',opacity:1,fillOpacity:0,weight:2,dashArray:'1,1'},
	transparentOption = {color:'#6f0',opacity:0,fillOpacity:0,weight:0,clickable:false},
	barriersOption = {color:'red',opacity:1,weight:1,clickable:false},
	airline = {color:'#56abe4',opacity:1,weight:2,clickable:false},
	dived = {color:'#5AADE4',opacity:1,fillOpacity:0,weight:2};
	module.exports = {
	    template:__webpack_require__(465),
	    data:function(){
	        return{
	            tab:1,
	            isShowDialog:false,
	            isLoadingMap:true,
	            isShowFooter:false,
	            isLoadingData:false,
	            isFocusing:false,
	            isAllAirline:false,
	            activeAirlineIndex:-1,
	            searchValue:'',
	            toastText:'',
	            toastShow:false,
	            loadingToastText:'',
	            loadingToastShow:false,
	            stat:[],
	            queryData:[],
	            landData:{
	                info:{items:[]},
	                flights:[],
	                confirm:{}
	            },
	            preConfirmQuery:{
	                uid:'',
	                content:'',
	                confirm_result:false
	            },
	            confirmQuery:{
	                uid:'',
	                content:'',
	                confirm_result:-1
	            }
	        }
	    },
	    props:{
	        editable:{
	            type:Boolean,
	            default:false
	        },
	        searchable:{
	            type:Boolean,
	            default:false
	        }
	    },
	    watch:{
	        isAllAirline:function(val){
	            this.showAll(val);
	        },
	        isFocusing:function(val){
	            if(val && activeData){
	                this.setBlockActive(activeData,false);
	                this.isFocusing = true;
	            }
	        }
	    },
	    methods:{
	        setTab:function(num){
	            this.tab = num;
	            if(this.tab == 2){
	                if(activeData.flights){
	                    this.landData.flights = activeData.flights;
	                }else{
	                    this.isLoadingData = true;
	                    Xa.get('/wechat/report/land/work_logs',{uid:activeData.uid},function(rs){
	                        this.isLoadingData = false;
	                        if(rs.status == 200){
	                            activeData.flights = this.landData.flights = rs.data;
	                            activeData.flights.forEach(function(item){
	                                item.polyline = L.polyline(item.points,transparentOption).addTo(map);
	                            }.bind(this));
	                        }else{
	                            alert(rs.message);
	                        }
	                    }.bind(this));
	                }
	            }
	            if(this.tab == 3){
	                if(activeData.confirm){
	                    this.landData.confirm = activeData.confirm;
	                }else{
	                    this.isLoadingData = true;
	                    Xa.get('/wechat/report/land/confirm_content',{uid:activeData.uid},function(rs){
	                        this.isLoadingData = false;
	                        if(rs.status == 200){
	                            activeData.confirm = this.landData.confirm = rs.data;
	                        }else{
	                            alert(rs.message);
	                        }
	                    }.bind(this));
	                }
	            }
	        },
	        showThisAirline:function(index){
	            if(this.isAllAirline == true){
	                this.isAllAirline = false;
	                // this.showAll(false);
	            }
	            Vue.nextTick(function(){
	                if(this.activeAirlineIndex != index){
	                    if(this.activeAirlineIndex != -1){
	                        activeData.flights[this.activeAirlineIndex].polyline.setStyle(transparentOption);
	                    }
	                    if(activeData && activeData.flights[index]){
	                        activeData.flights[index].polyline.setStyle(airline);
	                        this.activeAirlineIndex = index;
	                    }
	                }else{
	                    this.activeAirlineIndex = -1;
	                    if(activeData && activeData.flights[index]){
	                        activeData.flights[index].polyline.setStyle(transparentOption);
	                    }
	                }
	            }.bind(this))
	            
	        },
	        getBaseLandData:function(data){
	            return {
	                title:data.title,
	                type:data.type,
	                work_logs_title:data.work_logs_title,
	                items:data.items || []
	            }
	        },
	        setBlockActive:function(data,autofit){
	            this.isFocusing = false;
	            if(typeof data == 'number'){
	                data = pageMainData[data];
	            }
	            //data  旧数据：复位  新数据：重置
	            if(activeData){
	                activeData.polygon.setStyle(activeData.lineOption);
	            }
	            if(data == activeData){
	                this.isShowFooter = false;
	                this.isAllAirline = false;
	                this.showAll(false);
	                activeData = null;
	                this.setTab(1);
	            }else{
	                this.landData.info = this.getBaseLandData(data);
	                this.isShowFooter = true;
	                activeData = data;
	                var id = data.id;
	                data.polygon.setStyle(current);
	                if(autofit){
	                    map.fitBounds(data.polygon.getBounds());
	                }
	            }
	        },
	        searchCancelFn:function(){
	            this.isFocusing = false;
	            this.searchValue = "";
	        },
	        showAll:function(val){
	            if(!activeData || !activeData.flights || !activeData.flights.length) return;
	            activeData.flights.forEach(function(it){
	                it.polyline.setStyle(val?airline:transparentOption);
	            });
	            this.activeAirlineIndex = -1;
	        },
	        getOptionByType:function(type){
	            var option;
	            switch(type){
	                case 0:
	                    option = unfinished;break;
	                case 1:
	                    option = unchecked;break;
	                case 2:
	                    option = checked;break;
	                case 4:
	                    option = unpass;break;
	                case 5:
	                    option = dived;break;
	                default:
	                    option = unfinished;break;
	            }
	            return option;
	        },
	        confirmSubmit:function(){
	            if(!this.preConfirmQuery.content){
	                alert('请输入审批意见');
	                return;
	            }
	            this.isShowDialog = false;
	            this.confirmQuery.uid = this.preConfirmQuery.uid;
	            this.confirmQuery.content = this.preConfirmQuery.content;
	            this.confirmQuery.confirm_result = this.preConfirmQuery.confirm_result ? 1 : -1;
	            this.loadingToastText = "保存中..";
	            this.loadingToastShow = true;
	            Xa.post('/wechat/land/confirm',this.confirmQuery,function(rs){
	                this.loadingToastShow = false;
	                if(rs.status == 200){
	                    this.toastText = '保存成功'
	                    this.toastShow = true;
	                    setTimeout(function(){
	                        this.toastShow = false;
	                        activeData.confirm = this.landData.confirm = rs.data;
	                        activeData.lineOption = rs.data.confirm_result == 1 ? checked : unpass;
	                    }.bind(this),1000)
	                }else{
	                    alert(rs.message);
	                }
	            }.bind(this))
	        },
	        cancelSubmit:function(){
	            this.isShowDialog = false;
	        },
	        showDialog:function(){
	            this.preConfirmQuery.uid = this.landData.confirm.uid;
	            this.preConfirmQuery.content = this.landData.confirm.content;
	            this.preConfirmQuery.confirm_result = this.landData.confirm.confirm_result == 1 ? true : false;
	            this.isShowDialog = true;
	        }
	    },
	    ready:function(){
	        var _this = this,featureGroupNumber = L.featureGroup([]);
	        map = L.map('map',{zoomControl:false,attributionControl:false}).setView([32.76880048488168,97.119140625], 3 );
	        var url = 'http://agri-map.xaircraft.com/google/{z}/{x}/{y}.jpeg';
	        L.tileLayer(url, {maxZoom: 19}).addTo(map);
	        var locationNameLayer = 'http://t5.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}';
	        L.tileLayer(locationNameLayer, {maxZoom:19}).addTo(map);
	        map.on('click',function(){
	            if(activeData){
	                _this.setBlockActive(activeData,false);
	            }
	        });
	        if(!this.$route.query.src){
	            this.isLoadingMap = false;
	            alert('404');
	            return;  
	        } 
	        Xa.get(this.$route.query.src,this.$route.query.params && JSON.parse(this.$route.query.params),function(rs){
	            if(rs.status == 200){
	                this.$root.seoPageInfo.title = rs.data.doc_title;
	                this.isLoadingMap = false;
	                var featureGroup = L.featureGroup([]);
	                pageMainData = rs.data.lands;
	                this.stat = rs.data.stat || [];
	                for(var i in pageMainData){
	                    this.queryData.push(this.getBaseLandData(pageMainData[i]));
	                    for(var k in pageMainData[i].barriers){
	                        pageMainData[i].barriers[k].polygon = L.polygon(pageMainData[i].barriers[k],barriersOption).addTo(map);
	                    }
	                    if(pageMainData[i].center){
	                        var number = L.marker(pageMainData[i].center,{icon:L.divIcon({className:'land_No'})}).on("add",function(e){
	                            var div = document.createElement('div');
	                            div.innerHTML = this.info.number;
	                            e.target._icon.appendChild(div);
	                        });
	                        number.info = {number:pageMainData[i].number};
	                        featureGroupNumber.addLayer(number);
	                    }
	                    var option = this.getOptionByType(pageMainData[i].type);
	                    pageMainData[i].lineOption = option;
	                    pageMainData[i].polygon = L.polygon(pageMainData[i].points,option);
	                    pageMainData[i].polygon.index = i;
	                    pageMainData[i].polygon.on('click',function(){
	                        _this.setBlockActive(pageMainData[this.index],false);
	                    })
	                    featureGroup.addLayer(pageMainData[i].polygon);
	                }
	                map.on('zoomend',function(){
	                    if(this.getZoom()<16){
	                        map.removeLayer(featureGroupNumber);
	                    }else{
	                        featureGroupNumber.addTo(map);
	                    }
	                });
	                featureGroup.addTo(map);
	                featureGroup.getLayers().length && map.fitBounds(featureGroup.getBounds());
	            }else{
	                alert(rs.message);
	            }
	        }.bind(this));
	    }
	}


/***/ },

/***/ 465:
/***/ function(module, exports) {

	module.exports = "<style>\r\n\t.switch{color:#666;}\r\n\t.switch .switch-tabs{height:40px;line-height:40px;text-align:center;background:white;overflow:hidden;border-top: 1px solid #eee;border-bottom: 1px solid #eee;}\r\n\t.switch .switch-tabs .switch-tab{overflow:hidden;-webkit-transition:0.2s linear;width:50%;max-width:50%;border-right:1px solid #eee;}\r\n\t.switch .switch-tabs .switch-tab:last-child{border-right:0;}\r\n\t.switch .webkit-box{display:-webkit-box;}\r\n\t.switch .webkit-box-vertical{display:-webkit-box;-webkit-box-orient:vertical;}\r\n\t.switch .flex{-webkit-box-flex:1;}\r\n\t.switch .scroll-y{overflow-x:hidden;overflow-y:auto;}\r\n\t.switch .disable{opacity:0;pointer-events:none;}\r\n\t.switch .width-0{max-width:0 !important;width:0 !important;}\r\n\t.switch .switch-container{height:200px;}\r\n\t.switch .switch-container>div{width:300%;height:100%;-webkit-transition:0.2s linear;}\r\n\t.switch .switch-container>div>div{max-width:33.33%;width:33.33%;height:100%;position:relative;}\r\n\r\n\t.switch .flights{color:#666;font-size:13px !important;border-bottom:1px solid #eee;}\r\n\t.switch .flights.current{background:#eee;}\r\n\t.switch .flights .flight>div{float:left;width:50%;}\r\n\t.flight-number{min-width:30px;text-align:right;}\r\n\r\n\t.route-footer{max-height:0;width:100%;font-size:14px;overflow:auto;position:absolute;background:white;bottom:0;z-index:1;-webkit-transition:max-height 0.2s;}\r\n\t.dialog .weui_dialog_bd{padding:0;}\r\n\t.dialog .weui_dialog .weui_dialog_hd{display:none;}\r\n\t.dialog .weui_dialog{width:90%;}\r\n\t.map-stats{position:absolute;top:8px;left:8px;z-index:1;}\r\n\t.map-stats>div{background:white;border:1px solid #aaa;margin-right:8px;text-align:center;min-width:70px;line-height:20px;padding:3px 5px;border-radius:4px;}\r\n\t.map-stats>div:last-child{margin-right:0;}\r\n</style>\r\n\r\n<div class=\"xa-webkit-box-vertical\" style=\"height:100%;\">\r\n\t<!-- 搜索开始 -->\r\n\t<div v-if=\"searchable\" class=\"weui_search_bar\" :class=\"{'weui_search_focusing':isFocusing}\" style=\"height:44px;\">\r\n        <div class=\"weui_search_outer\">\r\n            <div class=\"weui_search_inner\">\r\n                <i class=\"weui_icon_search\" style=\"top:7px\"></i>\r\n                <input type=\"search\" @keyup.enter=\"customSearchEvent('search')\"  v-model=\"searchValue\" class=\"weui_search_input\" id=\"search_input\"  placeholder=\"输入搜索内容\"/>\r\n                <a href=\"javascript:\" v-show=\"!!searchValue\" class=\"weui_icon_clear\" @click=\"searchValue = ''\" style=\"top:7px\"></a>\r\n            </div>\r\n            <label for=\"search_input\" @click=\"isFocusing = true\" class=\"weui_search_text\" id=\"search_text\" style=\"z-index:1;\">\r\n                <i class=\"weui_icon_search\"></i>\r\n                <span>搜索</span>\r\n            </label>\r\n        </div>\r\n        <a href=\"javascript:\" @click=\"searchCancelFn\" class=\"weui_search_cancel\">取消</a>\r\n    </div>\r\n\t<div v-show=\"searchable && isFocusing\" class=\"weui_cells weui_cells_access\" style=\"position:absolute;top:44px;left:0;width:100%;z-index:1;margin-top:0;max-height:300px;overflow-y: auto;\">\r\n        <div v-for=\"item in queryData | filterBy searchValue in 'title' 'items'\"  @click=\"setBlockActive($index,true)\" class=\"weui_cell\">\r\n            <div class=\"weui_cell_bd weui_cell_primary\">\r\n                <p>{{ item.title }}</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\t<!-- 搜索结束 -->\r\n\t<div class=\"xa-flex xa-webkit-box-vertical\" :class=\"{'loading-map':isLoadingMap}\" style=\"position:relative;\">\r\n\t\t<div v-show=\"!isFocusing\" class=\"map-stats xa-webkit-box\">\r\n\t\t\t<div v-for=\"item in stat\">\r\n\t\t\t\t<div>{{ item.key }}</div>\r\n\t\t\t\t<div>{{ item.value }}</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div v-pre id=\"map\" class=\"xa-flex\"></div>\r\n\t\t<div class=\"route-footer\" :style=\"{'max-height':isShowFooter?'242px':'0'}\">\r\n\t\t\t<div class=\"switch\">\r\n\t\t\t\t<div class=\"switch-tabs webkit-box\">\r\n\t\t\t\t\t<div @click=\"setTab(2)\" class=\"switch-tab webkit-box flex\" :class=\"{'disable':tab==3,'width-0':tab==3}\">\r\n\t\t\t\t\t\t<div @click.stop=\"setTab(1)\" style=\"width:40px;\" v-show=\"tab==2\">\r\n\t\t\t\t\t\t\t<i class=\"iconfont icon-fanhui1\"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"flex\">{{ landData.info.work_logs_title }}</div>\r\n\t\t\t\t\t\t<div v-show=\"tab==2\"><span style=\"vertical-align:top;\">全部</span><input v-model=\"isAllAirline\" value=\"true\" class=\"weui_switch min\" style=\"margin:7px 4px;\" type=\"checkbox\"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div @click=\"setTab(3)\" class=\"switch-tab webkit-box flex\" :class=\"{'disable':tab==2,'width-0':tab==2}\">\r\n\t\t\t\t\t\t<div @click.stop=\"setTab(1)\" style=\"width:40px;\" v-show=\"tab==3\">\r\n\t\t\t\t\t\t\t<i class=\"iconfont icon-fanhui1\"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"flex\">审批</div>\r\n\t\t\t\t\t\t<div @click=\"showDialog\" v-if=\"editable\" v-show=\"tab==3\" style=\"padding:0 5px;color:#008000;\">{{ landData.confirm && landData.confirm.confirm_at ? '编辑审批':'添加审批' }}</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"switch-container scroll-y\">\r\n\t\t\t\t\t<div class=\"webkit-box scroll-y\" :style=\"{'-webkit-transform':'translate('+(tab==1?'-33.33%':tab==2?0:'-66.66%')+')'}\">\r\n\t\t\t\t\t\t<div :class=\"{'loading-data':isLoadingData}\" class=\"flex scroll-y xa-bg-white\">\r\n\t\t\t\t\t\t\t<div @click=\"showThisAirline($index)\" v-for=\"item in landData.flights\" :class=\"{'current':activeAirlineIndex == $index}\" class=\"flights webkit-box xa-line-min\">\r\n\t\t\t\t\t\t\t\t<div class=\"flight flex\">\r\n\t\t\t\t\t\t\t\t\t<div v-for=\"it in item.items\">{{ it.key+'：'+it.value }}</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"flight-number\">{{ item.title }}</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"flex scroll-y xa-bg-white xa-txt-666\">\r\n\t\t\t\t\t\t\t<div class=\"xa-line xa-txt-bold\">{{ landData.info.title }}</div>\r\n\t\t\t\t\t\t\t<div class=\"xa-line-min\" v-for=\"item in landData.info.items\">{{ item.key+'：'+item.value }}</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div :class=\"{'loading-data':isLoadingData}\" class=\"flex scroll-y xa-bg-white\">\r\n\t\t\t\t\t\t\t<div v-show=\"landData.confirm && landData.confirm.confirm_at\" class=\"webkit-box-vertical\" style=\"height:100%;\">\r\n\t\t\t\t\t\t\t\t<div class=\"webkit-box\" style=\"height:40px;line-height:40px;padding:10px;border-bottom:1px solid #eee;\">\r\n\t\t\t\t\t\t\t\t\t<div style=\"height:40px;width:40px;\">\r\n\t\t\t\t\t\t\t\t\t\t<img v-if=\"landData.confirm.user_avatar\" :src=\"landData.confirm.user_avatar\" alt=\"头像\" style=\"width:40px;height:40px;\">\r\n\t\t\t\t\t\t\t\t\t\t<i v-else class=\"iconfont icon-zhanghaotouxiang\" style=\"font-size:30px;\"></i>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"flex\" style=\"padding:0 10px;overflow:hidden;\">\r\n\t\t\t\t\t\t\t\t\t\t{{ landData.confirm.user_name }}\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div :style=\"{color:landData.confirm.confirm_result == 1 ? '#008000' : 'red'}\">\r\n\t\t\t\t\t\t\t\t\t\t{{ landData.confirm.confirm_result == 1 ? '通过':'不通过' }}\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"flex xa-line-min scroll-y\" style=\"font-size:13px;\">\r\n\t\t\t\t\t\t\t\t\t{{ landData.confirm.content }}\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"xa-txt-right xa-line-min xa-txt-888\" style=\"font-size:13px;\">审批时间：{{ landData.confirm.confirm_at }}</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div v-else style=\"text-align:center;color:#A9B7B7;font-size:13px;\">\r\n\t\t\t\t\t\t\t\t<div style=\"height:106px;margin-top: 15px;\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"iconfont icon-zanwujilu\" style=\"font-size:70px;\"></i>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div>暂无审批记录</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"dialog\">\r\n\t\t<dialog v-show=\"isShowDialog\" type=\"confirm\" title=\"\"\r\n\t\t\tconfirm-button=\"确定\" cancel-button=\"取消\"\r\n\t\t\t@weui-dialog-confirm=\"confirmSubmit()\"\r\n\t\t\t@weui-dialog-cancel=\"cancelSubmit()\">\r\n\t\t\t<div class=\"weui-cell\" style=\"padding:0 10px;line-height:44px;display:-webkit-box;\">\r\n\t\t\t\t<div style=\"-webkit-box-flex:1;color:black;font-weight:bold;font-size:16px;\">审批意见</div>\r\n\t\t\t\t<div style=\"-webkit-box-flex:1;text-align:right;color:#C9C9C9;\"><span :style=\"{color:preConfirmQuery.confirm_result ? '#008000' : 'red'}\">{{ preConfirmQuery.confirm_result ? '通过':'不通过'}}</span><input class=\"weui_switch min\" v-model=\"preConfirmQuery.confirm_result\" style=\"vertical-align:middle;margin-left:6px;-webkit-transform:translateY(-1px);\" type=\"checkbox\"></div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"weui_cell_bd weui_cell_primary\" style=\"color:black;\">\r\n\t\t\t\t<textarea v-model=\"preConfirmQuery.content\" placeholder=\"请填写补充意见\" class=\"weui_textarea\" style=\"padding:5px 10px;\" rows=\"5\"></textarea>\r\n\t\t    </div>\r\n\t\t</dialog>\r\n\t</div>\r\n\t<toast v-show=\"toastShow\">{{ toastText }}</toast>\r\n\t<toast type=\"loading\" v-show=\"loadingToastShow\">{{ loadingToastText }}</toast>\r\n</div>\r\n";

/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

	var mapLand = __webpack_require__(464);
	Xa.defineModule("/map/confirm/confirm",function(){
	    return {
	        template:__webpack_require__(479),
	        data:function(){
	            return{
	               
	            }
	        },
	        route:{
	            data:function(transition){
	                this.$root.seoPageInfo.title = "查看合同地块";
	            }
	        },
	        components:{
	            mapLand:mapLand
	        },
	        ready:function(){
	        }
	    }
	           
	})


/***/ },

/***/ 479:
/***/ function(module, exports) {

	module.exports = "<map-land :editable=\"true\"></map-land>";

/***/ }

/******/ });