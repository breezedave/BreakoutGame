var world;
var paddle;
var canv = document.getElementById('canvas');
var globalCtx = canv.getContext("2d");
var bgCanvas = document.createElement('canvas');
bgCanvas.setAttribute("width", 800);
bgCanvas.setAttribute("height", 600);

var setWorld = function() {
    world = {
        w: 300
        , h: 300
        , score: 0
        , lives: 5
        , playing: false
        , readyToStart: true
    }
}
setWorld();

var setPaddle = function() {
    paddle = {
        x : 0
        , y : 0
        , w: 70
        , h: 50
    }
}

document.body.onmousemove = function(evt) {
    mouseStuff(evt);
}

document.body.addEventListener("touchstart", function(evt) {
    mouseStuff(evt);
}, false);

document.body.addEventListener("touchmove", function(evt) {
    mouseStuff(evt);
}, false);

document.body.addEventListener("touchend", function(evt) {
    mouseStuff(evt);
}, false);

document.body.onclick = function() {
    if(!world.playing) startGame();
}

var mouseStuff = function(evt) {
    evt.preventDefault();
    if(!paddle) return;
    paddle.x = evt.clientX;
    paddle.y = evt.clientY;
}

var preRender = function() {
    var ctxBg = bgCanvas.getContext("2d");
    objects.Background(ctxBg);
    renderDestructables(ctxBg);
}

var gameOver = function() {
    for(i in destructables) {
        delete destructables[i];
    }
    world.playing = false;
    world.gameOver = true;
    canv.style.cursor = "pointer";
}

var startGame = function() {
    setWorld();
    setPaddle();
    setBall();
    setMap();
    world.gameOver = false;
    world.playing = true;
    world.readyToStart = false;
    ballMovement();
    preRender();
    canv.style.cursor = "none";
}

var renderDestructables = function(ctx) {
    for(i in destructables) {
        var o = destructables[i];
        switch (o.hits) {
            case 1:
            o.color = colors.RED;
            break;
            case 2:
            o.color = colors.GREEN;
            break;
            case 3:
            o.color = colors.BLUE;
            break;
        }
        objects.Destructable(ctx, o.x, o.y, o.z, o.w, o.h, o.color);
    }
};

var render = function() {
    globalCtx.clearRect(0, 0, canv.width, canv.height);
    globalCtx.drawImage(bgCanvas, 0, 0);

    if(world.playing) {
        if(ball.z >= 98) {
            globalCtx.clearRect(0, 0, canv.width, canv.height);
            preRender();
            globalCtx.drawImage(bgCanvas, 0, 0);
        };

        objects.Ball(globalCtx, ball.x, ball.y, 100, ball.w, ball.w, colors.SHADOW);
        objects.WallLines(globalCtx, ball.z);
        objects.Ball(globalCtx, ball.x, ball.y, ball.z, ball.w, ball.w, colors.BALL);
        objects.Score(globalCtx);

        objects.Paddle(globalCtx, paddle.x, paddle.y);
    }

    if(world.gameOver) {
        objects.GameOver(globalCtx);
    }

    if(world.readyToStart) {
        objects.ClickToStart(globalCtx);
    }

    window.requestAnimationFrame(render);
}

preRender();

window.requestAnimationFrame(render);
