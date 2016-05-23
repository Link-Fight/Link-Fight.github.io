(function() {
    function Tag() {
        this.input = document.getElementById("tagInput");
        this.content = document.getElementById("tagConent");
    }

    Tag.prototype = {
        constructor: Tag,
        initEvet: function(params) {
            var that = this;
            this.content.addEventListener("click", eventHandler.remove);
            this.input.addEventListener("keyup", function(params) {
                var inputText = this.value.split(/[,$#！!，;；、\s\n]+/);
                if (inputText.length > 1) {
                    // eventHandler.check({ contentDiv: that.content });
                    eventHandler.check.call({ contentDiv: that.content }, inputText[0]) && eventHandler.rightIn.call({ contentDiv: that.content }, inputText[0]);
                    this.value = "";
                }
            });
        }
    }

    function Interest() {
        this.input = document.getElementById("habbyInput");
        this.content = document.getElementById("interestContent");
        this.btn = document.getElementById("interestBtn");
        this.data = [];
    }
    Interest.prototype = {
        constructor: Infinity,
        initEvet: function(params) {
            var that = this;
            this.btn.addEventListener("click", function(event) {
                var inputArr = that.input.value.split(/[,$#！!，;；、\s\n]+/g);
                if (inputArr.length > 0) {
                    var arr = [1, 2, 3, 4];
                    inputArr = inputArr.filter(function(value, index, arr) {
                        var has = 0;
                        arr.forEach(function(val) {
                            if (val == value) {
                                has++;
                            }
                            that.data.forEach(function(pV) {
                                if (pV == value) {
                                    has++;
                                }
                            });
                        });
                        if (has > 1) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                    var mContentDiv = that.content.getElementsByTagName("div");
                    if (inputArr.length > 10) {
                        inputArr.reverse().slice(0, 10).reverse();
                    }
                    if (mContentDiv.length + inputArr.length > 0) {
                        for (var i = 0, len = mContentDiv.length + inputArr.length - 10; i < len; i++) {
                            eventHandler.leftOut.call({ contentDiv: that.content });
                        }
                    }
                    inputArr.forEach(function(value) {
                        eventHandler.rightIn.call({ contentDiv: that.content }, value);
                    });
                     that.data=that.data.concat(inputArr);
                }
            });
        }
    }
    /**
     * 委托的事件
     */
    var eventHandler = {
        arrInput: [],
        inputIn: function(input) {
            var input = document.getElementById("input").value.trim();
            eventHandler.arrInput = input.split(/[,，;；、\s\n]+/);
            if (input.length == 0) {
                return;
            }
        },
        leftIn: function(params) {
            eventHandler.inputIn();
            var that = this;
            eventHandler.arrInput.forEach(function(params) {
                that.contentDiv.innerHTML = "<div>" + params.trim() + "</div>" + that.contentDiv.innerHTML;
            });
            eventHandler.arrInput = [];
        },
        rightIn: function(params) {
            var that = this;
            params.trim() && (that.contentDiv.innerHTML += "<div>" + params.trim() + "</div>");
        },
        leftOut: function(params) {
            this.contentDiv.removeChild(this.contentDiv.getElementsByTagName("div")[0]);
        },
        rightOut: function(params) {
            var cDiv = this.contentDiv.getElementsByTagName("div");
            this.contentDiv.removeChild(cDiv[cDiv.length - 1]);
        },
        search: function(params) {
            var sT = document.getElementById("search").value;
            var textDiv = this.contentDiv.getElementsByTagName("div");
            for (var i = 0, len = textDiv.length; i < len; i++) {
                if (textDiv[i].innerText.indexOf(sT) != -1) {
                    textDiv[i].className = "target";
                } else {
                    textDiv[i].className = "";
                }
            }
        },
        /**
         * 检查是否已经有10个tag了
         * 是：删除
         * 
         * 检查是否有重复的tag
         */
        check: function(params) {
            var textDiv = this.contentDiv.getElementsByTagName("div");
            if (textDiv.length >= 10) {
                eventHandler.leftOut.call(this);
            }
            for (var i = 0, len = textDiv.length; i < len; i++) {
                if (textDiv[i].innerText == params) {
                    return false
                }
            }
            return true;
        },
        remove: function(event) {
            event = event || window.event;
            if (event.target.id == "") {
                event.target.parentNode.removeChild(event.target);
            }
        }

    }


    var tag = new Tag();
    tag.initEvet();

    var interest = new Interest();
    interest.initEvet();
})();

