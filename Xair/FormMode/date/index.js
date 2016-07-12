require("./index.css");
Vue.component("date", {
    template: require("./index.html"),
    data: function () {
        return {
            dateTab: 0,
            years: ['不限'],
            months: ['不限', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            days: ['不限'],
            chooseText: '筛选',
            oldDate: {
                year: '',
                month: '',
                day: '',
                week: '',
                weekText: '',
                string: '',
                stringWeek: '',
                HH: "",
                mm: ""
            }
        }
    },
    props: {
        showDate: {
            type: Boolean,
            // required: true,
            default: true,
            twoWay: true
        },
        date: {
            type: Object,
            // required: true,
            default: function () {
                return {
                    year: '',
                    month: '',
                    day: '',
                    week: '',
                    weekText: '',
                    string: '',
                    stringWeek: '',
                    HH: "",
                    mm: ""
                }
            },
            twoWay: true
        }
    },
    watch: {
        'showDate': function (val, oldVal) {
            this.dateTab = 0;
            if (val) {
                for (var i in this.date) {
                    this.oldDate[i] = this.date[i];
                }
            }
        },
        'dateTab': function (val) {
            if (val == 0) this.chooseText = "筛选";
            if (val == 1) this.chooseText = "选择年";
            if (val == 2) this.chooseText = "选择月";
            if (val == 3) this.chooseText = "选择日";
        }
    },
    methods: {
        selectDate: function (str, num) {
            switch (str) {
                case 'year':
                    this.date.month = '';
                    this.date.day = '';
                    this.date.week = '';
                    this.date.weekText = '';
                    if (typeof num == 'string') {
                        this.date.year = '';
                        this.finishDate();
                    } else {
                        this.dateTab = 2;
                        this.date.year = num;
                    }
                    break;
                case 'month':
                    this.date.day = '';
                    this.date.week = '';
                    this.date.weekText = '';
                    if (typeof num == 'string') {
                        this.date.month = '';
                        this.finishDate();
                    } else {
                        this.dateTab = 3;
                        this.date.month = num;
                        this.setDaysByYearAndMonth();
                    }
                    break;
                case 'day':
                    if (typeof num == 'string') {
                        this.date.day = '';
                        this.date.week = '';
                        this.date.weekText = '';
                    } else {
                        this.date.day = num;
                        this.date.week = new Date(this.date.year, this.date.month - 1, this.date.day).getDay();
                        this.date.weekText = this.getWeekText(this.date.week);
                    }
                    this.finishDate();
                    break;
            }
        },
        changeTab: function (num) {
            if (num == 2 && !this.date.year) return;
            if (num == 3 && !this.date.month) return;
            this.dateTab = num;
        },
        finishDate: function () {
            this.toString();
            this.dateTab = 0;
            this.showDate = false;
        },
        clearDate: function () {
            this.date.year = '';
            this.date.month = '';
            this.date.day = '';
            this.date.week = '';
            this.date.weekText = '';
        },
        cancelDate: function () {
            this.showDate = false;
            for (var i in this.oldDate) {
                this.date[i] = this.oldDate[i];
            }
        },
        setDaysByYearAndMonth: function () {
            var number = new Date(this.date.year, this.date.month, 0).getDate();
            this.days = ['不限'];
            for (var i = 1; i <= number; i++) {
                this.days.push(i);
            }
        },
        toString: function () {
            var str = '';
            if (this.date.year) {
                str += this.date.year;
            }
            if (this.date.month) {
                str += '-' + this.date.month;
            }
            if (this.date.day) {
                str += '-' + this.date.day;
            }
            this.date.string = str;
            if (this.date.weekText) {
                this.date.stringWeek = str + ' ' + this.date.weekText;
            } else {
                this.date.stringWeek = str;
            }
        },
        getWeekText: function (num) {
            if (num == 1) return '星期一';
            if (num == 2) return '星期二';
            if (num == 3) return '星期三';
            if (num == 4) return '星期四';
            if (num == 5) return '星期五';
            if (num == 6) return '星期六';
            if (num == 7) return '星期天';
        }
    },
    ready: function () {
        var currentYear = new Date().getFullYear();
        this.years = ['不限'];
        for (var i = 2015; i <= currentYear; i++) {
            this.years.push(i);
        }
    }
});

