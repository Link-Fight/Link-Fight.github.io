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

	module.exports = __webpack_require__(470);


/***/ },

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

	Xa.defineModule("/demo/mapApproval/mapApproval",function(){
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
	    return {
	        template:__webpack_require__(471),
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
	                            rs = {
	                                "status": 200,
	                                "message": "SUCCESS",
	                                "data": [{
	                                    "title": "#1",
	                                    "items": [
	                                        {
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        }
	                                    ],
	                                    "points":[{"type":1,"height":3,"speed":5,"lat":28.3158244983,"lng":112.6166300688},{"type":1,"height":3,"speed":5,"lat":28.3160157636,"lng":112.6167321032},{"type":1,"height":3,"speed":5,"lat":28.316005171,"lng":112.6167602791},{"type":1,"height":3,"speed":5,"lat":28.3158096644,"lng":112.6166559821},{"type":1,"height":3,"speed":5,"lat":28.3157948305,"lng":112.6166818953},{"type":1,"height":3,"speed":5,"lat":28.3159945785,"lng":112.616788455},{"type":1,"height":3,"speed":5,"lat":28.3159839859,"lng":112.6168166309},{"type":1,"height":3,"speed":5,"lat":28.3157702,"lng":112.6167087},{"type":2,"height":3,"speed":5,"lat":28.3157619,"lng":112.6167076},{"type":1,"height":3,"speed":5,"lat":28.3156469769,"lng":112.6166368466},{"type":1,"height":3,"speed":5,"lat":28.3155702664,"lng":112.616595924},{"type":1,"height":3,"speed":5,"lat":28.3155587849,"lng":112.6166236358},{"type":1,"height":3,"speed":5,"lat":28.3159669,"lng":112.6168408},{"type":1,"height":3,"speed":5,"lat":28.3159496,"lng":112.6168992},{"type":1,"height":3,"speed":5,"lat":28.3164499,"lng":112.6172093},{"type":1,"height":3,"speed":5,"lat":28.3164839,"lng":112.6171174},{"type":1,"height":3,"speed":5,"lat":28.3168588107,"lng":112.6173171673},{"type":2,"height":3,"speed":5,"lat":28.3163442151,"lng":112.6171153763},{"type":2,"height":3,"speed":5,"lat":28.3163364567,"lng":112.6171137855},{"type":1,"height":3,"speed":5,"lat":28.3168434785,"lng":112.6173428047},{"type":1,"height":3,"speed":5,"lat":28.3164503,"lng":112.6171332},{"type":2,"height":3,"speed":5,"lat":28.3164253,"lng":112.617212}]
	                                },{
	                                    "title": "#1",
	                                    "items": [
	                                        {
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        }
	                                    ],
	                                    "points":[{"type":2,"height":3,"speed":5,"lat":28.3161034,"lng":112.6170156},{"type":1,"height":3,"speed":5,"lat":28.3161269,"lng":112.616983},{"type":1,"height":3,"speed":5,"lat":28.3160693439,"lng":112.6169298206},{"type":1,"height":3,"speed":5,"lat":28.3155473104,"lng":112.6166513309},{"type":1,"height":3,"speed":5,"lat":28.3155358324,"lng":112.6166790343},{"type":1,"height":3,"speed":5,"lat":28.3162804,"lng":112.6170861},{"type":2,"height":3,"speed":5,"lat":28.3162948671,"lng":112.61709393},{"type":2,"height":3,"speed":5,"lat":28.3163364567,"lng":112.6171137855},{"type":2,"height":3,"speed":5,"lat":28.3163442151,"lng":112.6171153763},{"type":1,"height":3,"speed":5,"lat":28.3168281416,"lng":112.6173684498},{"type":1,"height":3,"speed":5,"lat":28.3168128048,"lng":112.617394095},{"type":1,"height":3,"speed":5,"lat":28.3155243544,"lng":112.6167067378},{"type":1,"height":3,"speed":5,"lat":28.3155128764,"lng":112.6167344412},{"type":1,"height":3,"speed":5,"lat":28.3167974679,"lng":112.6174197401},{"type":1,"height":3,"speed":5,"lat":28.3167821311,"lng":112.6174453852},{"type":1,"height":3,"speed":5,"lat":28.3157852,"lng":112.6169143},{"type":1,"height":3,"speed":5,"lat":28.3157691704,"lng":112.6169388198},{"type":1,"height":3,"speed":5,"lat":28.3167667942,"lng":112.6174710303},{"type":1,"height":3,"speed":5,"lat":28.3167514573,"lng":112.6174966754},{"type":1,"height":3,"speed":5,"lat":28.3157642317,"lng":112.6169700118},{"type":1,"height":3,"speed":5,"lat":28.3157592929,"lng":112.6170012038},{"type":1,"height":3,"speed":5,"lat":28.316732562,"lng":112.6175204222},{"type":1,"height":3,"speed":5,"lat":28.316686627,"lng":112.6175297436},{"type":1,"height":3,"speed":5,"lat":28.3157543541,"lng":112.6170323958},{"type":1,"height":3,"speed":5,"lat":28.3157494153,"lng":112.6170635879},{"type":1,"height":3,"speed":5,"lat":28.316643413,"lng":112.6175405167},{"type":1,"height":3,"speed":5,"lat":28.3166189892,"lng":112.6175613141},{"type":1,"height":3,"speed":5,"lat":28.3157444766,"lng":112.6170947798},{"type":1,"height":3,"speed":5,"lat":28.3157395378,"lng":112.6171259718},{"type":1,"height":3,"speed":5,"lat":28.3165952679,"lng":112.6175824862},{"type":1,"height":3,"speed":5,"lat":28.3165715468,"lng":112.6176036583},{"type":1,"height":3,"speed":5,"lat":28.315734599,"lng":112.6171571638},{"type":1,"height":3,"speed":5,"lat":28.3157296602,"lng":112.6171883558},{"type":1,"height":3,"speed":5,"lat":28.3165370704,"lng":112.6176190928},{"type":1,"height":3,"speed":5,"lat":28.3164926507,"lng":112.6176292226},{"type":1,"height":3,"speed":5,"lat":28.3157247214,"lng":112.6172195478},{"type":1,"height":3,"speed":5,"lat":28.3157197825,"lng":112.6172507398}]
	                                },{
	                                    "title": "#1",
	                                    "items": [
	                                        {
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        }
	                                    ],
	                                    "points":[{"type":1,"height":3,"speed":5,"lat":28.3164482311,"lng":112.6176393524},{"type":1,"height":3,"speed":5,"lat":28.3164038114,"lng":112.6176494823},{"type":1,"height":3,"speed":5,"lat":28.3157148437,"lng":112.6172819317},{"type":1,"height":3,"speed":5,"lat":28.3157099049,"lng":112.6173131237},{"type":1,"height":3,"speed":5,"lat":28.3163593917,"lng":112.6176596121},{"type":1,"height":3,"speed":5,"lat":28.3163149721,"lng":112.6176697419},{"type":1,"height":3,"speed":5,"lat":28.3157049661,"lng":112.6173443157},{"type":1,"height":3,"speed":5,"lat":28.3157000272,"lng":112.6173755076},{"type":1,"height":3,"speed":5,"lat":28.3162705524,"lng":112.6176798717},{"type":1,"height":3,"speed":5,"lat":28.3162261328,"lng":112.6176900014},{"type":1,"height":3,"speed":5,"lat":28.3156777266,"lng":112.6173974375},{"type":1,"height":3,"speed":5,"lat":28.3156435262,"lng":112.6174130191},{"type":1,"height":3,"speed":5,"lat":28.3161817131,"lng":112.6177001312},{"type":1,"height":3,"speed":5,"lat":28.3161295329,"lng":112.6177061209},{"type":1,"height":3,"speed":5,"lat":28.315640429,"lng":112.6174451935},{"type":1,"height":3,"speed":5,"lat":28.3156373318,"lng":112.6174773679},{"type":1,"height":3,"speed":5,"lat":28.3160720744,"lng":112.6177092947},{"type":1,"height":3,"speed":5,"lat":28.316014616,"lng":112.6177124684},{"type":1,"height":3,"speed":5,"lat":28.3156342346,"lng":112.6175095424},{"type":1,"height":3,"speed":5,"lat":28.3156311374,"lng":112.6175417168},{"type":1,"height":3,"speed":5,"lat":28.315876701,"lng":112.6176727201},{"type":1,"height":3,"speed":5,"lat":28.3158089112,"lng":112.6176703823},{"type":1,"height":3,"speed":5,"lat":28.3156280402,"lng":112.6175738913},{"type":1,"height":3,"speed":5,"lat":28.315624943,"lng":112.6176060657},{"type":1,"height":3,"speed":5,"lat":28.3157411215,"lng":112.6176680445},{"type":1,"height":3,"speed":5,"lat":28.3168720503,"lng":112.6173130572},{"type":1,"height":3,"speed":5,"lat":28.3167427741,"lng":112.6175292231},{"type":1,"height":3,"speed":5,"lat":28.3167427741,"lng":112.6175292231},{"type":1,"height":3,"speed":5,"lat":28.3167283714,"lng":112.6175311467},{"type":1,"height":3,"speed":5,"lat":28.3167283714,"lng":112.6175311467},{"type":1,"height":3,"speed":5,"lat":28.3167277525,"lng":112.6175312538},{"type":1,"height":3,"speed":5,"lat":28.3167277525,"lng":112.6175312538},{"type":1,"height":3,"speed":5,"lat":28.3166502583,"lng":112.6175477648},{"type":1,"height":3,"speed":5,"lat":28.3166502583,"lng":112.6175477648},{"type":1,"height":3,"speed":5,"lat":28.3166462981,"lng":112.6175498033},{"type":1,"height":3,"speed":5,"lat":28.3166462981,"lng":112.6175498033},{"type":1,"height":3,"speed":5,"lat":28.3165640121,"lng":112.6176232468},{"type":1,"height":3,"speed":5,"lat":28.3165640121,"lng":112.6176232468},{"type":1,"height":3,"speed":5,"lat":28.3161648392,"lng":112.6177142773},{"type":1,"height":3,"speed":5,"lat":28.3161648392,"lng":112.6177142773},{"type":1,"height":3,"speed":5,"lat":28.3159792784,"lng":112.6177245269},{"type":1,"height":3,"speed":5,"lat":28.3159792784,"lng":112.6177245269},{"type":1,"height":3,"speed":5,"lat":28.315896664,"lng":112.6176842312},{"type":1,"height":3,"speed":5,"lat":28.315896664,"lng":112.6176842312},{"type":1,"height":3,"speed":5,"lat":28.3158933303,"lng":112.6176833927},{"type":1,"height":3,"speed":5,"lat":28.3158933303,"lng":112.6176833927},{"type":1,"height":3,"speed":5,"lat":28.3157173758,"lng":112.6176773248}]
	                                },{
	                                    "title": "#1",
	                                    "items": [
	                                        {
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        },{
	                                            "key": "面积",
	                                            "value": "12 亩"
	                                        }
	                                    ],
	                                    "points":[{"type":1,"height":3,"speed":5,"lat":28.3157173758,"lng":112.6176773248},{"type":1,"height":3,"speed":5,"lat":28.3156101491,"lng":112.6176664016},{"type":1,"height":3,"speed":5,"lat":28.3156101491,"lng":112.6176664016},{"type":1,"height":3,"speed":5,"lat":28.3156361407,"lng":112.6173963954},{"type":1,"height":3,"speed":5,"lat":28.3156361407,"lng":112.6173963954},{"type":1,"height":3,"speed":5,"lat":28.3156834101,"lng":112.6173858859},{"type":1,"height":3,"speed":5,"lat":28.3156834101,"lng":112.6173858859},{"type":1,"height":3,"speed":5,"lat":28.3156906218,"lng":112.6173775951},{"type":1,"height":3,"speed":5,"lat":28.3156906218,"lng":112.6173775951},{"type":1,"height":3,"speed":5,"lat":28.3157614564,"lng":112.6169302248},{"type":1,"height":3,"speed":5,"lat":28.3157614564,"lng":112.6169302248},{"type":1,"height":3,"speed":5,"lat":28.3157570986,"lng":112.6169195296},{"type":1,"height":3,"speed":5,"lat":28.3157570986,"lng":112.6169195296},{"type":1,"height":3,"speed":5,"lat":28.3156907551,"lng":112.616875526},{"type":1,"height":3,"speed":5,"lat":28.3156907551,"lng":112.616875526},{"type":1,"height":3,"speed":5,"lat":28.3156479116,"lng":112.6168338351},{"type":1,"height":3,"speed":5,"lat":28.3156479116,"lng":112.6168338351},{"type":1,"height":3,"speed":5,"lat":28.3156464498,"lng":112.6168326738},{"type":1,"height":3,"speed":5,"lat":28.3156464498,"lng":112.6168326738},{"type":1,"height":3,"speed":5,"lat":28.3155877509,"lng":112.6167951756},{"type":1,"height":3,"speed":5,"lat":28.3155877509,"lng":112.6167951756},{"type":1,"height":3,"speed":5,"lat":28.3155839805,"lng":112.6167938739},{"type":1,"height":3,"speed":5,"lat":28.3155839805,"lng":112.6167938739},{"type":1,"height":3,"speed":5,"lat":28.3154821391,"lng":112.6167848223},{"type":1,"height":3,"speed":5,"lat":28.3154821391,"lng":112.6167848223},{"type":1,"height":3,"speed":5,"lat":28.3155679457,"lng":112.6165777183},{"type":1,"height":3,"speed":5,"lat":28.3155679457,"lng":112.6165777183},{"type":1,"height":3,"speed":5,"lat":28.3157656087,"lng":112.6166969822},{"type":1,"height":3,"speed":5,"lat":28.3157656087,"lng":112.6166969822},{"type":1,"height":3,"speed":5,"lat":28.3157775533,"lng":112.6166934912},{"type":1,"height":3,"speed":5,"lat":28.3157775533,"lng":112.6166934912},{"type":1,"height":3,"speed":5,"lat":28.3158299994,"lng":112.6166018736},{"type":1,"height":3,"speed":5,"lat":28.3158299994,"lng":112.6166018736},{"type":1,"height":3,"speed":5,"lat":28.3160281478,"lng":112.6167249784},{"type":1,"height":3,"speed":5,"lat":28.3160281478,"lng":112.6167249784},{"type":1,"height":3,"speed":5,"lat":28.3159842122,"lng":112.6168418459},{"type":1,"height":3,"speed":5,"lat":28.3159842122,"lng":112.6168418459},{"type":1,"height":3,"speed":5,"lat":28.3159875712,"lng":112.6168544612},{"type":1,"height":3,"speed":5,"lat":28.3159875712,"lng":112.6168544612},{"type":1,"height":3,"speed":5,"lat":28.3160631016,"lng":112.616910935},{"type":1,"height":3,"speed":5,"lat":28.3160631016,"lng":112.616910935},{"type":1,"height":3,"speed":5,"lat":28.3161386703,"lng":112.6169812575},{"type":1,"height":3,"speed":5,"lat":28.3161386703,"lng":112.6169812575},{"type":1,"height":3,"speed":5,"lat":28.3161419018,"lng":112.6169831909},{"type":1,"height":3,"speed":5,"lat":28.3161419018,"lng":112.6169831909},{"type":1,"height":3,"speed":5,"lat":28.3162170574,"lng":112.6170080686},{"type":1,"height":3,"speed":5,"lat":28.3162170574,"lng":112.6170080686},{"type":1,"height":3,"speed":5,"lat":28.3162197731,"lng":112.6170084824},{"type":1,"height":3,"speed":5,"lat":28.3162197731,"lng":112.6170084824},{"type":1,"height":3,"speed":5,"lat":28.3163079133,"lng":112.6170068021},{"type":1,"height":3,"speed":5,"lat":28.3163079133,"lng":112.6170068021},{"type":1,"height":3,"speed":5,"lat":28.3162930597,"lng":112.6170725991},{"type":1,"height":3,"speed":5,"lat":28.3162930597,"lng":112.6170725991},{"type":1,"height":3,"speed":5,"lat":28.3162983436,"lng":112.6170846313},{"type":1,"height":3,"speed":5,"lat":28.3162983436,"lng":112.6170846313},{"type":1,"height":3,"speed":5,"lat":28.3163399332,"lng":112.6171044868},{"type":1,"height":3,"speed":5,"lat":28.3163399332,"lng":112.6171044868},{"type":1,"height":3,"speed":5,"lat":28.3163438512,"lng":112.6171052901},{"type":1,"height":3,"speed":5,"lat":28.3163438512,"lng":112.6171052901},{"type":1,"height":3,"speed":5,"lat":28.316501487,"lng":112.6170980275},{"type":1,"height":3,"speed":5,"lat":28.316501487,"lng":112.6170980275},{"type":1,"height":3,"speed":5,"lat":28.3166788486,"lng":112.6172099612},{"type":1,"height":3,"speed":5,"lat":28.3166788486,"lng":112.6172099612},{"type":1,"height":3,"speed":5,"lat":28.3166794017,"lng":112.6172102828},{"type":1,"height":3,"speed":5,"lat":28.3166794017,"lng":112.6172102828},{"type":1,"height":3,"speed":5,"lat":28.3168720503,"lng":112.6173130572}]
	                                }]
	                            }

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
	                            rs = {
	                                "status": 200,
	                                "message": "SUCCESS",
	                                "data": {
	                                }
	                            }
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
	                // Xa.post('/wechat/land/confirm',this.confirmQuery,function(rs){
	            Xa.get(this.$route.query.src,this.$route.query.params && JSON.parse(this.$route.query.params),function(rs){
	                    this.loadingToastShow = false;
	                    rs.data = {
	                        "uid": "27cfa8a7111264fa8cc3b107ce68673e270b10fc",
	                        "user_uid": "99d04724b223aedc55baa7c7404608124c16bf18",
	                        "user_avatar": "",
	                        "user_name": "李开封",
	                        "content": "审批说明，审批说明审批说明，审批说明审批说明，审批说明审批说明，审批说明审批说明，审批说明审批说明，审批说明审批说明，审批说明审批说明，审批说明审批说明，审批说明",
	                        "confirm_result": 1,
	                        "confirm_at": "2016年7月12日 12:34"
	                    }
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
	        route:{
	            data:function(transition){
	                this.$root.seoPageInfo.title = "查看合同地块";
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
	                    rs.data.stat = [{
	                        "key": "总面积",
	                        "value": "1234 亩"
	                    },
	                    {
	                      "key": "地块",
	                        "value": "2345"  
	                    },
	                    {
	                      "key": "已完成",
	                        "value": "2345亩"  
	                    }];
	                    rs.data.lands = [
	                        {
	                            "uid":"asdfasdfklasdfkl",
	                            "number": 1852,
	                            "title": "梁光西10号地",
	                            "type":5,
	                            "area_size": 65.198,
	                            "points": [
	                                {
	                                    "lat": 28.3168855525,
	                                    "lng": 112.6173088721
	                                },
	                                {
	                                    "lat": 28.3166832922,
	                                    "lng": 112.61720097
	                                },
	                                {
	                                    "lat": 28.3165036852,
	                                    "lng": 112.6170876193
	                                },
	                                {
	                                    "lat": 28.3163434798,
	                                    "lng": 112.6170950003
	                                },
	                                {
	                                    "lat": 28.3163018902,
	                                    "lng": 112.6170751448
	                                },
	                                {
	                                    "lat": 28.3163196944,
	                                    "lng": 112.6169962776
	                                },
	                                {
	                                    "lat": 28.3162196192,
	                                    "lng": 112.6169981855
	                                },
	                                {
	                                    "lat": 28.3161444636,
	                                    "lng": 112.6169733078
	                                    },
	                                    {
	                                        "lat": 28.3160685274,
	                                        "lng": 112.6169026433
	                                    },
	                                    {
	                                        "lat": 28.3159926,
	                                        "lng": 112.6168458727
	                                    },
	                                    {
	                                        "lat": 28.3160397563,
	                                        "lng": 112.6167204383
	                                    },
	                                    {
	                                        "lat": 28.3158269553,
	                                        "lng": 112.6165882303
	                                    },
	                                    {
	                                        "lat": 28.3157699011,
	                                        "lng": 112.6166878978
	                                    },
	                                    {
	                                        "lat": 28.3155637647,
	                                        "lng": 112.6165635213
	                                    },
	                                    {
	                                        "lat": 28.3154683055,
	                                        "lng": 112.616793923
	                                    },
	                                    {
	                                        "lat": 28.3155832657,
	                                        "lng": 112.6168041406
	                                    },
	                                    {
	                                        "lat": 28.3156419646,
	                                        "lng": 112.6168416388
	                                    },
	                                    {
	                                        "lat": 28.3156854318,
	                                        "lng": 112.6168839367
	                                    },
	                                    {
	                                        "lat": 28.3157524852,
	                                        "lng": 112.6169284111
	                                    },
	                                    {
	                                        "lat": 28.3156816506,
	                                        "lng": 112.6173757813
	                                    },
	                                    {
	                                        "lat": 28.3156278052,
	                                        "lng": 112.6173877529
	                                    },
	                                    {
	                                        "lat": 28.315600085,
	                                        "lng": 112.6176757166
	                                    },
	                                    {
	                                        "lat": 28.315716827,
	                                        "lng": 112.6176876091
	                                    },
	                                    {
	                                        "lat": 28.3158930522,
	                                        "lng": 112.6176936864
	                                    },
	                                    {
	                                        "lat": 28.3159776095,
	                                        "lng": 112.6177349298
	                                    },
	                                    {
	                                        "lat": 28.3161659693,
	                                        "lng": 112.6177245256
	                                    },
	                                    {
	                                        "lat": 28.3165679507,
	                                        "lng": 112.6176328547
	                                    },
	                                    {
	                                        "lat": 28.3166519467,
	                                        "lng": 112.617557885
	                                    },
	                                    {
	                                        "lat": 28.3167294409,
	                                        "lng": 112.617541374
	                                    },
	                                    {
	                                        "lat": 28.3167479881,
	                                        "lng": 112.6175388969
	                                    }
	                                ],
	                            "barriers": [],
	                            "work_logs_title": "共4架次",
	                            "center":{
	                                "lat": 42.1824089,
	                                "lng": 87.2824038
	                            },
	                            "items":[{
	                                "key":"编号",
	                                "value":"#1234512"
	                            },{
	                               "key":"面积",
	                               "value":"234亩"
	                            },{
	                                "key":"客户",
	                                "value":"张三"
	                            },{
	                               "key":"地址",
	                               "value":"湖南省张家界市大四的飞阿斯达飞啊撒旦啊撒旦啊撒旦啊撒旦"
	                            },
	                            {
	                                "key":"编号",
	                                "value":"#1234512"
	                            },{
	                               "key":"面积",
	                               "value":"234亩"
	                            }]
	                        }
	                    ]
	                    var featureGroup = L.featureGroup([]);
	                    pageMainData = rs.data.lands;
	                    console.log(rs.data.stat);
	                    this.stat = rs.data.stat;
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
	})


/***/ },

/***/ 471:
/***/ function(module, exports) {

	module.exports = "<style>\r\n\t.switch{color:#666;}\r\n\t.switch .switch-tabs{height:40px;line-height:40px;text-align:center;background:white;overflow:hidden;border-top: 1px solid #eee;border-bottom: 1px solid #eee;}\r\n\t.switch .switch-tabs .switch-tab{overflow:hidden;-webkit-transition:0.2s linear;width:50%;max-width:50%;border-right:1px solid #eee;}\r\n\t.switch .switch-tabs .switch-tab:last-child{border-right:0;}\r\n\t.switch .webkit-box{display:-webkit-box;}\r\n\t.switch .webkit-box-vertical{display:-webkit-box;-webkit-box-orient:vertical;}\r\n\t.switch .flex{-webkit-box-flex:1;}\r\n\t.switch .scroll-y{overflow-x:hidden;overflow-y:auto;}\r\n\t.switch .disable{opacity:0;pointer-events:none;}\r\n\t.switch .width-0{max-width:0 !important;width:0 !important;}\r\n\t.switch .switch-container{height:200px;}\r\n\t.switch .switch-container>div{width:300%;height:100%;-webkit-transition:0.2s linear;}\r\n\t.switch .switch-container>div>div{max-width:33.33%;width:33.33%;height:100%;position:relative;}\r\n\r\n\t.switch .flights{color:#666;font-size:13px !important;border-bottom:1px solid #eee;}\r\n\t.switch .flights.current{background:#eee;}\r\n\t.switch .flights .flight>div{float:left;width:50%;}\r\n\t.flight-number{min-width:30px;text-align:right;}\r\n\r\n\t.route-footer{max-height:0;width:100%;font-size:14px;overflow:auto;position:absolute;background:white;bottom:0;z-index:1;-webkit-transition:max-height 0.2s;}\r\n\t.dialog .weui_dialog_bd{padding:0;}\r\n\t.dialog .weui_dialog .weui_dialog_hd{display:none;}\r\n\t.dialog .weui_dialog{width:90%;}\r\n\t.map-stats{position:absolute;top:8px;left:8px;z-index:1;}\r\n\t.map-stats>div{background:white;border:1px solid #aaa;margin-right:8px;text-align:center;min-width:70px;line-height:20px;padding:3px 5px;border-radius:4px;}\r\n\t.map-stats>div:last-child{margin-right:0;}\r\n</style>\r\n\r\n<div class=\"xa-webkit-box-vertical\" style=\"height:100%;\">\r\n\t<!-- 搜索开始 -->\r\n\t<div v-show=\"true\" class=\"weui_search_bar\" :class=\"{'weui_search_focusing':isFocusing}\" style=\"height:44px;\">\r\n        <div class=\"weui_search_outer\">\r\n            <div class=\"weui_search_inner\">\r\n                <i class=\"weui_icon_search\" style=\"top:7px\"></i>\r\n                <input type=\"search\" @keyup.enter=\"customSearchEvent('search')\"  v-model=\"searchValue\" class=\"weui_search_input\" id=\"search_input\"  placeholder=\"输入搜索内容\"/>\r\n                <a href=\"javascript:\" v-show=\"!!searchValue\" class=\"weui_icon_clear\" @click=\"searchValue = ''\" style=\"top:7px\"></a>\r\n            </div>\r\n            <label for=\"search_input\" @click=\"isFocusing = true\" class=\"weui_search_text\" id=\"search_text\" style=\"z-index:1;\">\r\n                <i class=\"weui_icon_search\"></i>\r\n                <span>搜索</span>\r\n            </label>\r\n        </div>\r\n        <a href=\"javascript:\" @click=\"searchCancelFn\" class=\"weui_search_cancel\">取消</a>\r\n    </div>\r\n\t<div v-show=\"isFocusing\" class=\"weui_cells weui_cells_access\" style=\"position:absolute;top:44px;left:0;width:100%;z-index:1;margin-top:0;max-height:300px;overflow-y: auto;\">\r\n        <div v-for=\"item in queryData | filterBy searchValue in 'title' 'items'\"  @click=\"setBlockActive($index,true)\" class=\"weui_cell\">\r\n            <div class=\"weui_cell_bd weui_cell_primary\">\r\n                <p>{{ item.title }}</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\t<!-- 搜索结束 -->\r\n\t<div class=\"xa-flex xa-webkit-box-vertical\" :class=\"{'loading-map':isLoadingMap}\" style=\"position:relative;\">\r\n\t\t<div v-show=\"!isFocusing\" class=\"map-stats xa-webkit-box\">\r\n\t\t\t<div v-for=\"item in stat\">\r\n\t\t\t\t<div>{{ item.key }}</div>\r\n\t\t\t\t<div>{{ item.value }}</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div v-pre id=\"map\" class=\"xa-flex\"></div>\r\n\t\t<div class=\"route-footer\" :style=\"{'max-height':isShowFooter?'242px':'0'}\">\r\n\t\t\t<div class=\"switch\">\r\n\t\t\t\t<div class=\"switch-tabs webkit-box\">\r\n\t\t\t\t\t<div @click=\"setTab(2)\" class=\"switch-tab webkit-box flex\" :class=\"{'disable':tab==3,'width-0':tab==3}\">\r\n\t\t\t\t\t\t<div @click.stop=\"setTab(1)\" style=\"width:40px;\" v-show=\"tab==2\">\r\n\t\t\t\t\t\t\t<i class=\"iconfont icon-fanhui1\"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"flex\">{{ landData.info.work_logs_title }}</div>\r\n\t\t\t\t\t\t<div v-show=\"tab==2\"><span style=\"vertical-align:top;\">全部</span><input v-model=\"isAllAirline\" value=\"true\" class=\"weui_switch min\" style=\"margin:7px 4px;\" type=\"checkbox\"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div @click=\"setTab(3)\" class=\"switch-tab webkit-box flex\" :class=\"{'disable':tab==2,'width-0':tab==2}\">\r\n\t\t\t\t\t\t<div @click.stop=\"setTab(1)\" style=\"width:40px;\" v-show=\"tab==3\">\r\n\t\t\t\t\t\t\t<i class=\"iconfont icon-fanhui1\"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"flex\">审批</div>\r\n\t\t\t\t\t\t<div @click=\"showDialog\" v-show=\"tab==3\" style=\"padding:0 5px;color:#008000;\">{{ landData.confirm && landData.confirm.confirm_at ? '编辑审批':'添加审批' }}</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"switch-container scroll-y\">\r\n\t\t\t\t\t<div class=\"webkit-box scroll-y\" :style=\"{'-webkit-transform':'translate('+(tab==1?'-33.33%':tab==2?0:'-66.66%')+')'}\">\r\n\t\t\t\t\t\t<div :class=\"{'loading-data':isLoadingData}\" class=\"flex scroll-y xa-bg-white\">\r\n\t\t\t\t\t\t\t<div @click=\"showThisAirline($index)\" v-for=\"item in landData.flights\" :class=\"{'current':activeAirlineIndex == $index}\" class=\"flights webkit-box xa-line-min\">\r\n\t\t\t\t\t\t\t\t<div class=\"flight flex\">\r\n\t\t\t\t\t\t\t\t\t<div v-for=\"it in item.items\">{{ it.key+'：'+it.value }}</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"flight-number\">{{ item.title }}</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"flex scroll-y xa-bg-white xa-txt-666\">\r\n\t\t\t\t\t\t\t<div class=\"xa-line xa-txt-bold\">{{ landData.info.title }}</div>\r\n\t\t\t\t\t\t\t<div class=\"xa-line-min\" v-for=\"item in landData.info.items\">{{ item.key+'：'+item.value }}</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div :class=\"{'loading-data':isLoadingData}\" class=\"flex scroll-y xa-bg-white\">\r\n\t\t\t\t\t\t\t<div v-show=\"landData.confirm && landData.confirm.confirm_at\" class=\"webkit-box-vertical\" style=\"height:100%;\">\r\n\t\t\t\t\t\t\t\t<div class=\"webkit-box\" style=\"height:40px;line-height:40px;padding:10px;border-bottom:1px solid #eee;\">\r\n\t\t\t\t\t\t\t\t\t<div style=\"height:40px;width:40px;\">\r\n\t\t\t\t\t\t\t\t\t\t<img v-if=\"landData.confirm.user_avatar\" :src=\"landData.confirm.user_avatar\" alt=\"头像\" style=\"width:40px;height:40px;\">\r\n\t\t\t\t\t\t\t\t\t\t<i v-else class=\"iconfont icon-zhanghaotouxiang\" style=\"font-size:30px;\"></i>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"flex\" style=\"padding:0 10px;overflow:hidden;\">\r\n\t\t\t\t\t\t\t\t\t\t{{ landData.confirm.user_name }}\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div :style=\"{color:landData.confirm.confirm_result == 1 ? '#008000' : 'red'}\">\r\n\t\t\t\t\t\t\t\t\t\t{{ landData.confirm.confirm_result == 1 ? '通过':'不通过' }}\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"flex xa-line-min scroll-y\" style=\"font-size:13px;\">\r\n\t\t\t\t\t\t\t\t\t{{ landData.confirm.content }}\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"xa-txt-right xa-line-min xa-txt-888\" style=\"font-size:13px;\">审批时间：{{ landData.confirm.confirm_at }}</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div v-else style=\"text-align:center;color:#A9B7B7;font-size:13px;\">\r\n\t\t\t\t\t\t\t\t<div style=\"height:106px;margin-top: 15px;\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"iconfont icon-zanwujilu\" style=\"font-size:70px;\"></i>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div>暂无审批记录</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"dialog\">\r\n\t\t<dialog v-show=\"isShowDialog\" type=\"confirm\" title=\"\"\r\n\t\t\tconfirm-button=\"确定\" cancel-button=\"取消\"\r\n\t\t\t@weui-dialog-confirm=\"confirmSubmit()\"\r\n\t\t\t@weui-dialog-cancel=\"cancelSubmit()\">\r\n\t\t\t<div class=\"weui-cell\" style=\"padding:0 10px;line-height:44px;display:-webkit-box;\">\r\n\t\t\t\t<div style=\"-webkit-box-flex:1;color:black;font-weight:bold;font-size:16px;\">审批意见</div>\r\n\t\t\t\t<div style=\"-webkit-box-flex:1;text-align:right;color:#C9C9C9;\"><span :style=\"{color:preConfirmQuery.confirm_result ? '#008000' : 'red'}\">{{ preConfirmQuery.confirm_result ? '通过':'不通过'}}</span><input class=\"weui_switch min\" v-model=\"preConfirmQuery.confirm_result\" style=\"vertical-align:middle;margin-left:6px;-webkit-transform:translateY(-1px);\" type=\"checkbox\"></div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"weui_cell_bd weui_cell_primary\" style=\"color:black;\">\r\n\t\t\t\t<textarea v-model=\"preConfirmQuery.content\" placeholder=\"请填写补充意见\" class=\"weui_textarea\" style=\"padding:5px 10px;\" rows=\"5\"></textarea>\r\n\t\t    </div>\r\n\t\t</dialog>\r\n\t</div>\r\n\t<toast v-show=\"toastShow\">{{ toastText }}</toast>\r\n\t<toast type=\"loading\" v-show=\"loadingToastShow\">{{ loadingToastText }}</toast>\r\n</div>\r\n";

/***/ }

/******/ });