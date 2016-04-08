; (function(_W) {

    function Mediator(obj) {
        if (!(this instanceof Mediator)) {
            return new Mediator();
        }
        this.shipArray = [];
        this.MSG;
        //丢包率
        this.Packetloss = obj["loss"] || 0.3;
    }

    Mediator.prototype = {
        constructor: Mediator,
        broadcast: function() {
            var that = this;
            this.shipArray.forEach(function(ship) {
                if (ship instanceof SpaceShip) {
                        console.log(that.MSG);
                    if (Math.random() > that.Packetloss) {
                        //模拟30%的丢包
                        ship.receiveMessage(that.MSG);
                        console.info("send Success!")
                    }
                    
                }
            });
        }
    }


    /**
     * 飞船对象
     */
    function SpaceShip(obj) {
        this.boundingBox = obj["boundingBox"];
        this.currentBox = null;
        this.id = obj["id"];
        this.speed = 2;
        this.STATE = 0; // 当前飞船状态: 0（默认）静止，1 运功
        this.ENERGY = 100;//初始能能量100
        this.SPEEDUP = 3;//默认能量增加为3
        this.SPEEDDOWN = 5;//默认运动时的能量消耗为5
        this.DEG = obj["DEG"]||0;//绕行星飞行的当前角度
        this.TIME;
        // this.message.receiveMessage = this.message.receiveMessage.bind(this);
        // this.powerSys.work = this.powerSys.work.bind(this);
    }

    SpaceShip.prototype = {
        constructor: SpaceShip,
        /**
         *  初始化方法
         *  
         * */
        init: function() {
            var currentBox = window.document.createElement("div");
            currentBox.id="ship"+this.id;
            currentBox.className = "spaceArea";
            currentBox.innerHTML="<span>" + this.toString() + "</span>";
            //确定飞船的父节点
            this.boundingBox.appendChild(currentBox);
            //
            //确定当前飞船
            this.currentBox = currentBox;
             console.info(this.currentBox);
            var that = this;
            //保持运行
            this.TIME = setInterval(function() {
                //引擎工作
                that.work();
                // 渲染飞船
                that.render();
            }, 500);
            
        },
        sendMessage: function() {

        },
        receiveMessage: function(message) {
            //  确定是发给当前飞船的消息
            if (message["id"] == "ship"+this.id) {
                if (message["commond"] == "start") {
                    this.STATE = 1;
                } else if (message["commond"] == "stop") {
                    this.STATE = 0;
                } else if (message["commond"] == "destroy") {
                    this.destroy();
                }

            }
        },
        /**
         * 动力系统   停止  运动  还有工作
         */
        start: function() {
            this.STATE = 1;
        },
        stop: function() {
            this.STATE = 0;
        },
        work: function(params) {
            if (this.STATE == 0) {
                this.ENERGY += this.SPEEDUP;
                if (this.ENERGY >= 100) {
                    this.ENERGY = 100;
                }
            } else {
                this.ENERGY -= this.SPEEDDOWN;
                if (this.ENERGY <= 0) {
                    this.STATE = 0;
                    this.ENERGY = 0;
                }
            }
            // console.log(new Date().toLocaleTimeString()+" "+ this);
        },
        toString: function() {
            return "" + this.id + "号" + this.ENERGY + "%";
        },
        destroy: function() {
            //飞船摧毁
            this.boundingBox.removeChild(this.currentBox);
            clearInterval(this.TIME);
            for (key in this) {
                delete this[key];
            }
            // this.prototype=null;
        },
        //渲染飞船运动
        render: function() {
            // console.log(this+"@@"+this.STATE);
            if (this.STATE == 1) {
                this.currentBox.style.transform = "rotate(" + (this.DEG += this.speed) + "deg)";
                
            }
            this.currentBox.getElementsByTagName("span")[0].innerText=this.toString();
        },
        
    }


    /**
     * 控制
     */
    function Control(obj) {
        //飞船空域
        this.SpaceArea = obj["AREA"];
        // 控制台
        this.ConsoleBoard = obj["BOARD"];
        //添加飞船按钮
        this.addBtn = obj["ADD"];
        //限制飞船数量
        this.LIMITCOUNT = 4;
        this.Mediator = new Mediator({});
        this.init();
    }

    Control.prototype = {
        constructor: Control,
        consoleContent: "号飞船下达指令：</td><td><input type='button' value='开始飞行'></td><td><input type='button' value='停止飞行'></td><td><input type='button' value='销毁'></td></tr>",
        init: function(params) {
            this.bindUI();
        },
        bindUI: function() {
            var that = this;
            this.ConsoleBoard.addEventListener("click", function(event) {
                event = event || window.event;
                if (event.target.type == "button") {
                    if (event.target.value == "开始飞行") {
                        var mss = {
                            id: event.target.parentNode.parentNode.id,
                            commond: "start",
                        };
                    } else if (event.target.value == "停止飞行") {
                        var mss = {
                            id: event.target.parentNode.parentNode.id,
                            commond: "stop",
                        };
                    } else if (event.target.value == "销毁") {
                        var mss = {
                            id: event.target.parentNode.parentNode.id,
                            commond: "destroy",
                        };
                        that.ConsoleBoard.removeChild(event.target.parentNode.parentNode.parentNode);
                    }
                    mss&&setTimeout(function() {
                        that.Mediator.MSG=mss;
                        that.Mediator.broadcast();
                    }, 1000);
                }
            });
            this.addBtn.addEventListener("click", function(params) {
                var shipCount = 0;
                that.Mediator.shipArray.forEach(function(ship) {
                    if (ship.ENERGY) {
                        shipCount++;
                    }
                });
                if (shipCount >= that.LIMITCOUNT) {
                    return;
                }
                var ship = new SpaceShip(
                        { id: that.Mediator.shipArray.length, 
                            boundingBox:that.SpaceArea,
                            DEG: parseInt(this.id)*30,
                        }
                        );
                ship.init();
                that.Mediator.shipArray.push(ship);
                that.ConsoleBoard.innerHTML+="<tr id='ship"+ship.id+"'><td>"+ship.id+that.consoleContent;
            });
        },
    }

  window.Control = Control;
} (Window))