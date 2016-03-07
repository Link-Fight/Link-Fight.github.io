function CanvasShow(canvas, option) {
    if (!(this instanceof CanvasShow)) {
        return new CanvasShow(optioin);
    }

    this.canvas = canvas;
    this.num = option["NUM"] || 30;
    this.canvas.width = option["WIDTH"];
    this.canvas.height = option["HEIGHT"];
    this.diagonal = len = Math.sqrt(this.canvas.width * this.canvas.width + this.canvas.height * this.canvas.height);
    this.context = canvas.getContext('2d');
    // this.context.strokeStyle = 'rgba(0,0,0,0.18)',//设置或返回用于笔触的颜色、渐变或模式 
    this.context.fillStyle = 'rgba(0,0,0,0.35)';//设置或返回用于填充绘画的颜色、渐变或模式
    this.circleArr = [];
    this.text = option["TEXT"] || [];
}
CanvasShow.prototype = {

    randomNum: function (max, min) {
        min = min > 0 ? min : 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    initCricle: function () {
        var i;
        for (i = 0; i < this.num; i++) {
            this.circleArr[i] = this.drawCircle(
                new this.Circle(
                    this.randomNum(this.canvas.width),
                    this.randomNum(this.canvas.height),
                    this.text[i] ? this.randomNum(30, 10) : this.randomNum(15, 5),//有文字的圆圈会大一点
                    this.text[i] ? this.randomNum(10, -10) * 0.02 : this.randomNum(20, -20) * 0.1,
                    this.text[i] ? this.randomNum(10, -10) * 0.02 : this.randomNum(20, -20) * 0.1,
                    this.text[i]
                    ));
        }
    },

    Circle: function (x, y, r, mX, mY, text) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.mX = mX;
        this.mY = mY;
        this.text = text;
    },

    drawCircle: function (circle) {
        if ((circle.text)) {
            var oldStyle = this.context.fillStyle;
            this.context.font = ((circle.r * 2) / circle.text.length) + "px Georgia";
            var gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            this.context.fillStyle = gradient;//'rgba(0,0,0,0.8)';
            this.context.fillText(circle.text, circle.x - (circle.r), circle.y);
            this.context.fillStyle = oldStyle;
        } else {
            this.context.beginPath();
            this.context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
            this.context.closePath()
            this.context.fill();
        }
        return circle;
    },

    drawLine: function (x, y, mX, mY) {
        var dX = Math.abs(x - mX),
            dY = Math.abs(y - mY),
            len = Math.sqrt(dX * dX + dY * dY);
        // console.log(len/this.diagonal);
        this.context.beginPath();
        //  this.context.lineWidth =1*(len/this.diagonal)+1;
        this.context.strokeStyle = 'rgba(0,0,0,' + (1 - len / this.diagonal) * 0.04 + ')';
        this.context.moveTo(x, y);
			     this.context.lineTo(mX, mY);
			     this.context.closePath();
			     this.context.stroke();
    },

    draw: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.num; i++) {
            this.drawCircle(this.circleArr[i]);
            this.circleArr[i].x += this.circleArr[i].mX;
            if (this.circleArr[i].x > this.canvas.width)
                this.circleArr[i].x = 0;
            else if (this.circleArr[i].x < 0)
                this.circleArr[i].x = this.canvas.width;

            this.circleArr[i].y += this.circleArr[i].mY;
            if (this.circleArr[i].y > this.canvas.height)
                this.circleArr[i].y = 0;
            else if (this.circleArr[i].y < 0)
                this.circleArr[i].y = this.canvas.height;
        }

        for (var i = 0; i < this.num; i++) {
            for (var j = i + 1; j < this.num; j++) {
                this.drawLine(this.circleArr[i].x, this.circleArr[i].y, this.circleArr[j].x, this.circleArr[j].y);
            }

        }

    }
};