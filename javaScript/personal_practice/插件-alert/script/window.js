define(["Widget"], function(WIDGET) {

    function mixin(dest, src) {
        var target = dest;
        for (var key in src) {
            dest[key] = src[key];
        }
        return target;
    }

    function Owindow(params) {
        WIDGET.Widget.call(this);
        this.cfg = {
            content: "",
            title: "消息",
            handler: null,
            width: 500,
            height: 300,
            hasMask: true,
            hasCloseBtn: false,
            text4AlertBtn: "确定",
            skinClassName: "",
        };
        this.mask = null;
        this.EventListener = {};
    }
    Owindow.prototype = mixin(Object.create(WIDGET.Widget.prototype),
        {
            constructor: Owindow,
            renderUI: function(container) {
                this.boundingBox = $("<div class='windows_boundingBox'>" +
                    "<div class =window_header>" + this.cfg.title + "</div>" +
                    "<div class =window_body>" + this.cfg.content + "</div>" +
                    "<div class =window_footer><button id=alertSure>" + this.cfg.text4AlertBtn + "</button></div>" +
                    +"</div>");
                if (this.cfg.hasMask) {
                    this.mask = document.createElement("div");
                    this.mask.className = "windows_mask";
                    container.appendChild(this.mask);
                }
                if (this.cfg.hasCloseBtn) {
                    var closeBtn = document.createElement("span");
                    closeBtn.className = "window_closeBtn";
                    closeBtn.innerHTML = "X";
                    this.boundingBox[0].appendChild(closeBtn);
                }
            },
            bindUI: function() {
                var that = this;
                document.body.getElementsByClassName("")[0]
                var alertBtn = this.boundingBox[0].querySelector("#alertSure")
                alertBtn.onclick = function() {
                    that.fire("alertSure", "close alertSure");
                    that.destroy();
                };
                var closeBtn = this.boundingBox[0].querySelector(".window_closeBtn");
                closeBtn.onclick = function() {
                    that.fire("clostBtn", "close btn");
                    that.destroy();
                }
            },
            syncUI: function(params) {
                this.boundingBox.css({
                    width: this.cfg.width + "px",
                    height: this.cfg.height + "px",
                    left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + "px",
                    top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + "px"
                });
                if (this.cfg.skinClassName) {
                    this.boundingBox[0].classList.add(this.cfg.skinClassName);
                }
            },
            destructor: function(params) {
                this.mask && this.mask.parentElement.removeChild(this.mask)
            },
            alert: function(container, cfg) {
                mixin(this.cfg, cfg);
                this.render(container);
                return this;
            },
            confirm: function() {

            },
            prompt: function() {

            },
            say: function() {
                console.log("I'm window" + "@:" + this);
            }
        });

    return { Owindow };
}
);