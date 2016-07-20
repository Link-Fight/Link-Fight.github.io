Vue.component("areaSelect", {
    template: require("./areaSelect.html"),
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
            // twoWay: true
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
            menuTabs: [
                {
                    pid: "0",
                    id: "",
                    name: "请选择",
                    level: 0,
                }
            ],//显示的路径
            pathMenus: [],//路径
            currentLevel: 0,//当前级别
            currentId: 0,//当前选择
            currentShowId: 0,//当前显示的列表
            store: {
            },//暂存数据
        }
    },
    computed: {
        curlevelActiveId: function () {
            console.log("curlevelActiveId");
            return this.pathMenus.length > 0&&this.currentLevel<= this.pathMenus.length ? this.pathMenus[this.currentLevel - 1].id : "";
        }
    },
    created: function () {
    },
    watch: {
        'show': function (val, oldVal) {
            if (val) {
                this.init();
            }

        },
        'pathMenus': function (val, oldVal) {
            console.log("pathMenus");
            var level = 0
            console.log("menuTabs");
            var menus = [];
            for (level = 0; level < this.pathMenus.length; level++) {
                menus.push({
                    pid: level < 0 ? this.pathMenus[level - 1].id : 0,
                    id: this.pathMenus[level].id,
                    name: this.pathMenus[level].name,
                    level: level + 1,
                });
            }
            menus.push({
                pid: this.pathMenus.length == 0 ? "0" : this.pathMenus[this.pathMenus.length - 1].id,
                id: "",
                name: "请选择",
                level: this.pathMenus.length == 0 ? 0 : level + 1,
            })
            this.menuTabs = menus;
        }
    },
    methods: {
        init: function () {
            var _this = this;
            if (!!_this.selected) {
                _this.selected = {
                    name: '', id: '',
                }
            }
            console.log(_this.selected.id + "init#");
            if (_this.selected.id) {
                Xa.get('/common/area/up_areas', { id: !!_this.selected.id }, function (result) {
                    if (result.status == 200) {
                        if (result.data.length != 0) {
                            var dataList = [];
                            for (var i = 0; i < result.data.length; i++) {
                                if (result.data[i].level == 1) {
                                    _this.$set("store.id0", result.data);
                                } else if (result.data[i].data.length > 0) {
                                    _this.$set("store.id" + result.data[i].id, result.data);
                                }
                                dataList[result.data[i].level - 1] = {
                                    id: result.data[i].id,
                                    name: result.data[i].name,
                                };
                            }
                            if (dataList.length > 0) {
                                do {
                                    _this.pathMenus.push(dataListshift());
                                } while (dataList.length == 0);
                            }
                            _this.currentLevel = _this.pathMenus.length - 1;
                            if (_this.pathMenus.length > 1) {
                                _this.currentShowId = _this.pathMenus[_this.pathMenus.length - 2].id;
                            } else {
                                _this.currentShowId = 0;
                            }
                        }

                    } else {
                        alert(result.message);
                    }
                });
            } else {
                Xa.get('/common/area/areas', { upid: "0" }, function (result) {
                    if (result.status == 200) {
                        _this.currentLevel = 0;
                        _this.currentShowId = 0;
                        _this.$set("store.id" + _this.currentShowId, result.data);
                        // _this.store["id"+_this.currentShowId] = result.data;
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
                    id: this.currentId,
                    name: this.toString(),
                }
            });
        },
        clickItem: function (item) {
            console.log("clickItem");
            if (!this.store["id" + item.id]) {
                this.getNextLevelDate(item.id, item.name);
            }
            this.nextLevelTabs(item);
        },
        getNextLevelDate: function (id, name) {
            var _this = this;
            Xa.get("/common/area/areas", { upid: id }, function (result) {
                if (result.status == 200) {
                    if (result.data.length > 0) {
                        _this.$set("store.id" + id, result.data);
                    } else {
                        _this.currentId = id;
                        _this.pathMenus.push({
                            id: id,
                            name: name,
                        });
                        _this.selectEnd();
                        return;
                    }
                } else {
                    alert(result.message);
                    return;
                }

            });
        },
        menusClick: function (item) {
            this.currentLevel = item.level;
            this.currentShowId = item.pid;
            if (!this.store["id" + item.pid]) {
                getNextLevelDate(item.pid);
            }
        },
        nextLevelTabs: function (item) {
            if (this.currentLevel < this.pathMenus.length) {
                do {
                    this.pathMenus.pop();
                } while (this.currentLevel == this.pathMenus.length);
            }
            this.currentId = item.id;
            this.currentLevel++;
            this.currentShowId = item.id;
            this.pathMenus.push({
                id: item.id,
                name: item.name,
            });
        },
        toString: function () {
            var str = "";
            this.pathMenus.forEach(function (element) {
                str += element.name;
            });
            return str;
        }
    },
    filters: {
        getJsonObj: function (param) {
            return JSON.stringify(param);
        }
    },
    ready: function () { }
});

