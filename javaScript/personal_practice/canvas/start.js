window.onload = function() {
    draw();

}

function draw() {
    canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ran = Math.min(canvas.width, canvas.height);
    var count = canvas.width*canvas.height;
    ctx = canvas.getContext("2d");

    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
   
    var lingrad = ctx.createLinearGradient(0, -canvas.height/2, 0, canvas.height/2);
    lingrad.addColorStop(0, '#232256');
    lingrad.addColorStop(1, '#143778');


    // Create a circular clipping path
    // ctx.beginPath();
    // ctx.arc(0, 0, ran / 2, 0, Math.PI * 2, true);
    // ctx.clip();

    var lingrad = ctx.createLinearGradient(0, -canvas.height/2, 0, canvas.height/2);
    lingrad.addColorStop(0, '#232256');
    lingrad.addColorStop(1, '#143778');
    ctx.fillStyle = lingrad;
    ctx.fillRect(-canvas.width/2, -canvas.height/2 ,canvas.width, canvas.height );
    console.log(ran);
    // draw stars
    for (var j = 1; j < count/(100*100/2); j++) {
        ctx.save();
        ctx.fillStyle = '#fff';
        var x =canvas.width/2 - Math.floor(Math.random() * canvas.width);
        var y =canvas.height/2 - Math.floor(Math.random() * canvas.height);
        // console.info(ran+"# "+x+":@"+y);
        ctx.translate(x,y);
        drawStar(ctx, Math.floor(Math.random() * 8) + 2);
        ctx.restore();
    }

    function drawStar(ctx, r) {
        ctx.save();
        ctx.rotate(Math.PI*2/(r));
        ctx.beginPath()
        ctx.moveTo(r, 0);
        for (var i = 0; i < 9; i++) {
            ctx.rotate(Math.PI / 5);
            if (i % 2 == 0) {
                ctx.lineTo((r / 0.525731) * 0.200811, 0);
            } else {
                ctx.lineTo(r, 0);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    ctx.restore();
}