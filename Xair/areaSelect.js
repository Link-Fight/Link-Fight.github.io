Vue.component("areaSelect", {
	    template: __webpack_require__(29),
	    props: {
	        show: {
	            type: Boolean,
	            default: false,
	            twoWay: true
	        },
	        selected: {
	            type: Object,
	            default: function () {
	                return { name: '', id: '' }
	            },
	        },
	        dateKey: {
	            type: String,
	            required: true,
	        },
	        isShowCountry: {
	            type: Boolean,
	            default: false
	        }
	    },
	    data: function () {
	        return {
	            current: {
	                province: { id: "", name: "" },
	                city: { id: "", name: "" },
	                county: { id: "", name: "" },
	                town: { id: "", name: "" }
	            },
	            currentType: "province",
	            provinceList: [],
	            cityList: [],
	            countyList: [],
	            townList: [],
	            isSearch: false,
	            searchList: [],
	            flagStore: false,
	            store: null,
	        }
	    },
	    created: function () {
	        if (!this.flagStore) {
	            this.store = {
	            }
	            this.flagStore = true;
	        }

	    },
	    watch: {
	        'show': function (val, oldVal) {
	            var _this = this;
	            if (val) {
	                _this.isSearch = false;
	                _this.currentType = 'province';
	                _this.provinceList = [];
	                _this.cityList = [];
	                _this.countyList = [];
	                _this.townList = [];
	                if (!!_this.selected) {
	                    _this.selected = {
	                        name: '', id: '',
	                    }
	                }
	                console.log(_this.selected.id + "#");
	                if (_this.selected.id) {
	                    Xa.get('/common/area/up_areas', { id: !!_this.selected.id ? _this.selected.id : "0" }, function (result) {
	                        if (result.status == 200) {
	                            if (result.data.length != 0) {
	                                var d = result.data;
	                                for (var i = 0; i < d.length; i++) {
	                                    if (d[i].level == 1) {
	                                        for (var j = 0; j < d[i].data.length; j++) {
	                                            if (d[i].data[j].id == d[i].id) {
	                                                d[i].data[j].active = true;
	                                                _this.current.province.id = d[i].data[j].id;
	                                                _this.current.province.name = d[i].data[j].name;
	                                            } else {
	                                                d[i].data[j].active = false;
	                                            }
	                                        }
	                                        _this.provinceList = d[i].data;
	                                    } else if (d[i].level == 2) {
	                                        for (var j = 0; j < d[i].data.length; j++) {
	                                            if (d[i].data[j].id == d[i].id) {
	                                                d[i].data[j].active = true;
	                                                _this.current.city.id = d[i].data[j].id;
	                                                _this.current.city.name = d[i].data[j].name;
	                                            } else {
	                                                d[i].data[j].active = false;
	                                            }
	                                        }
	                                        _this.cityList = d[i].data;

	                                    } else if (d[i].level == 3) {
	                                        for (var j = 0; j < d[i].data.length; j++) {
	                                            if (d[i].data[j].id == d[i].id) {
	                                                d[i].data[j].active = true;
	                                                _this.current.county.id = d[i].data[j].id;
	                                                _this.current.county.name = d[i].data[j].name;
	                                            } else {
	                                                d[i].data[j].active = false;
	                                            }
	                                        }

	                                        _this.countyList = d[i].data;

	                                    } else if (d[i].level == 4) {
	                                        for (var j = 0; j < d[i].data.length; j++) {
	                                            if (d[i].data[j].id == d[i].id) {
	                                                d[i].data[j].active = true;
	                                                _this.current.town.id = d[i].data[j].id;
	                                                _this.current.town.name = d[i].data[j].name;
	                                            } else {
	                                                d[i].data[j].active = false;
	                                            }
	                                        }

	                                        _this.townList = d[i].data;

	                                    }
	                                }
	                            }
	                        } else {
	                            alert(result.message);
	                        }
	                    });
	                } else {
	                    Xa.get('/common/area/areas', { upid: !!_this.selected.id ? _this.selected.id : "0" }, function (result) {
	                        if (result.status == 200) {
	                            for (var i = 0; i < result.data.length; i++) {
	                                result.data[i].active = false;
	                            }
	                            _this.provinceList = result.data;
	                        } else {
	                            alert(result.message);
	                        }
	                    });

	                }
	            }

	        }
	    },
	    methods: {
	        doneFn: function (result, type, item) {
	            if (result.status == 200) {
	                if (result.data.length > 0) {
	                    this.store[item.id] = result.data;
	                }

	                for (var i = 0; i < result.data.length; i++) {
	                    result.data[i].active = false;
	                }
	                if (type == 'city') {
	                    for (var i = 0; i < this.provinceList.length; i++) {
	                        this.provinceList[i].active = false;
	                    }
	                    this.current.town.id = '';
	                    this.current.town.name = '';
	                    this.current.county.id = '';
	                    this.current.county.name = '';
	                    this.current.city.id = '';
	                    this.current.city.name = '';

	                    this.current.province.id = item.id;
	                    this.current.province.name = item.name;

	                    this.selected.id = item.id;
	                    this.selected.name = this.current.province.name;
	                    this.cityList = result.data;

	                } else if (type == 'county') {
	                    for (var i = 0; i < this.cityList.length; i++) {
	                        this.cityList[i].active = false;
	                    }
	                    this.current.town.id = '';
	                    this.current.town.name = '';
	                    this.current.county.id = '';
	                    this.current.county.name = '';

	                    this.current.city.id = item.id;
	                    this.current.city.name = item.name;
	                    this.selected.id = item.id;
	                    this.selected.name = this.current.province.name + this.current.city.name;
	                    this.countyList = result.data;
	                } else if (type == 'town') {
	                    for (var i = 0; i < this.countyList.length; i++) {
	                        this.countyList[i].active = false;
	                    }
	                    this.current.town.id = '';
	                    this.current.town.name = '';

	                    this.current.county.id = item.id;
	                    this.current.county.name = item.name;
	                    this.selected.id = item.id;
	                    this.selected.name = this.current.province.name + this.current.city.name + this.current.county.name;
	                    this.townList = result.data;
	                } else {
	                    for (var i = 0; i < this.townList.length; i++) {
	                        this.townList[i].active = false;
	                    }
	                    this.current.town.id = item.id;
	                    this.current.town.name = item.name;
	                    this.selected.id = item.id;
	                    this.selected.name = this.current.province.name + this.current.city.name + this.current.county.name + this.current.town.name;

	                }
	                item.active = true;
	                if (result.data.length != 0) {
	                    this.currentType = type;
	                } else {
	                    this.$dispatch('selectEnd', this.current);
	                    this.show = false;
	                    this.$dispatch('areaComponent-msg', {
	                        key: this.dateKey,
	                        val: {
	                            id: this.selected.id,
	                            name: this.selected.name,
	                        }
	                    });
	                }
	            }
	        },
	        subFun: function (type, item) {
	            var _this = this;
	            console.log(type + "@" + item);
	            if (item.id) {
	                if (type != "last" && !!this.store[item.id]) {
	                    _this.doneFn({
	                        status: 200,
	                        data: this.store[item.id],
	                    }, type, item)
	                    return;
	                }
	                Xa.get("/common/area/areas", { upid: item.id }, function (result) {
	                    if (result.status == 200) {
	                        _this.doneFn(result, type, item);
	                    } else {
	                        alert(result.message);
	                    }

	                });
	            }
	        },
	        selectEnd: function () {
	            this.show = false;
	            this.$dispatch('selectEnd', this.current);
	            this.$dispatch('areaComponent-msg', {
	                key: this.dateKey,
	                val: {
	                    id: this.selected.id,
	                    name: this.selected.name,
	                }
	            });
	        },
	        selectCountry: function () {
	            this.show = false;
	            this.current.town.id = '';
	            this.current.town.name = '';
	            this.current.county.id = '';
	            this.current.county.name = '';
	            this.current.city.id = '';
	            this.current.city.name = '';
	            this.current.province.id = '';
	            this.current.province.name = '';
	            this.selected.id = 0;
	            this.selected.name = '全国';
	            this.$dispatch('selectEnd', this.current);
	        }
	    },
	    filters: {
	        getJsonObj: function (param) {
	            return JSON.stringify(param);
	        }
	    },
	    ready: function () { }
	});

