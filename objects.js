var objects;

(function() {
    var ilx = 100;
    var irx = 500;
    var olx = 0;
    var orx = 600;
    var iw = 400;
    var ow = 600;

    var ity = 100;
    var iby = 500;
    var oty = 0;
    var oby = 600;
    var ih = 400;
    var oh = 600;

    var bg = function(ctx) {

        ctx.strokeStyle = colors.BLACK;
        ctx.fillStyle = colors.BLACK;

        //Deep Background
        ctx.fillRect(olx, oty, ow, oh);

        //Back Wall
        ctx.fillStyle = colors.BACK_WALL;
        ctx.fillRect(ilx, ity, iw, ih);
        ctx.strokeRect(ilx, ity, iw, ih);

        //Floor
        ctx.fillStyle = colors.FLOOR;
        ctx.moveTo(irx, iby);
        ctx.lineTo(orx, oby);
        ctx.lineTo(olx, oby);
        ctx.lineTo(ilx, iby);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Top Wall
        ctx.fillStyle = colors.FLOOR;
        ctx.moveTo(olx, oty);
        ctx.lineTo(ilx, ity);
        ctx.lineTo(irx, ity);
        ctx.lineTo(orx, oty);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Left Wall
        ctx.fillStyle = colors.SIDE_WALL;
        ctx.moveTo(olx, oty);
        ctx.lineTo(ilx, ity);
        ctx.lineTo(ilx, iby);
        ctx.lineTo(olx, oby);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Right Wall
        ctx.fillStyle = colors.SIDE_WALL;
        ctx.moveTo(orx, oty);
        ctx.lineTo(irx, ity);
        ctx.lineTo(irx, iby);
        ctx.lineTo(orx, oby);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        for(z=10; z<=100; z+=15) {
            var x = (ilx - olx) / 100 * z + olx;
            var y = (ity - oty) / 100 * z + oty;
            var w = (ow - iw) / 100 * (100 - z) + iw;
            var h = (oh - ih) / 100 * (100 - z) + ih;
            if(parseInt(x) != x) w = parseInt(w) + 1;
            if(parseInt(y) != y) h = parseInt(h) + 1;
            x = parseInt(x);
            y = parseInt(y);

            ctx.lineWidth = 1;
            ctx.strokeStyle = colors.BACK_WALL;
            ctx.strokeRect(x, y, w, h);
        }

    }

    var wallLines = function(ctx, z) {
        var x = (ilx - olx) / 100 * z + olx;
        var y = (ity - oty) / 100 * z + oty;
        var w = (ow - iw) / 100 * (100 - z) + iw;
        var h = (oh - ih) / 100 * (100 - z) + ih;
        if(parseInt(x) != x) w = parseInt(w) + 1;
        if(parseInt(y) != y) h = parseInt(h) + 1;
        x = parseInt(x);
        y = parseInt(y);

        ctx.fillStyle = colors.WALL_LINE_GLOW;
        ctx.fillRect(x, y, w, h);

        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.WALL_LINE;
        ctx.strokeRect(x, y, w, h);
    }

    var destructable = function(ctx, x, y, z, w, h, color) {
        object(ctx, x, y, z, w, h, color, "destructable");
    }

    var ballRender = function(ctx, x, y, z, w, h, color) {
        object(ctx, x, y, z, w, h, color, "ball");
    }

    var object = function(ctx, x, y, z, w, h, color, objType) {

        var perctDiffW = iw / ow;
        var perctDiffH = ih / oh;

        w = parseInt(w * ((perctDiffW / 100 * (100 - z)) + perctDiffW));
        h = parseInt(h * ((perctDiffH / 100 * (100 - z)) + perctDiffH));

        startingX = (ilx - olx) / 100 * z;
        startingY = (ity - oty) / 100 * z;

        x = parseInt(x * ((perctDiffW / 100 * (100 - z)) + perctDiffW * 2) + startingX);
        y = parseInt(y * ((perctDiffH / 100 * (100 - z)) + perctDiffH * 2) + startingY);


        switch (objType) {
            case "destructable":
                ctx.fillStyle = color;
                ctx.fillRect(x, y, w, h);
                ctx.strokeStyle = colors.BLACK;
                ctx.strokeRect(x, y, w, h);
                break;
            case "ball":
                ball.renderX = x - w/2;
                ball.renderY = y - h/2;
                ball.renderW = w;
                ball.renderH = h;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.ellipse(x - w/2, y - h/2, w, h, 45 * Math.PI/180, 0, 2 * Math.PI);
                ctx.fill();
                ctx.lineWidth = 1;
                break;
        }
    }

    var paddleRender = function(ctx, x, y) {
        ctx.strokeStyle = colors.PADDLE_OUTLINE;
        ctx.fillStyle = colors.PADDLE;
        ctx.fillRect(x - (paddle.w/2), y - (paddle.h/2), paddle.w, paddle.h);
        ctx.strokeRect(x - (paddle.w/2), y - (paddle.h/2), paddle.w, paddle.h);
    }

    var score = function(ctx) {
        ctx.strokeStyle = colors.WHITE;
        ctx.fillStyle = colors.GLASS;
        ctx.fillRect(418, 538, 180, 60);
        ctx.strokeRect(418, 538, 180, 60);

        ctx.fillStyle=colors.WHITE;
        ctx.font="24px Verdana";
        ctx.fillText("SCORE: " + world.score, 423, 562);

        ctx.fillStyle=colors.WHITE;
        ctx.font="24px Verdana";
        ctx.fillText("LIVES: " + world.lives, 435, 592);
    }

    var gameOver = function(ctx) {
        ctx.textAlign = "center";
        ctx.strokeStyle = colors.WHITE;
        ctx.fillStyle = colors.GLASS;
        ctx.fillRect(150, 200, 300, 200);
        ctx.strokeRect(150, 200, 300, 200);

        ctx.fillStyle=colors.WHITE;
        ctx.font="24px Verdana";
        ctx.fillText("YOUR SCORE WAS:", 300, 250);

        ctx.font="48px Verdana";
        ctx.fillText(world.score, 300, 300);

        ctx.font="24px Verdana";
        ctx.fillText("CLICK TO PLAY AGAIN", 300, 370);
        ctx.textAlign = "left";
    }

    var clickToStart = function(ctx) {
        ctx.textAlign = "center";
        ctx.strokeStyle = colors.WHITE;
        ctx.fillStyle = colors.GLASS;
        ctx.fillRect(150, 200, 300, 200);
        ctx.strokeRect(150, 200, 300, 200);

        ctx.fillStyle=colors.WHITE;
        ctx.font="48px Verdana";
        ctx.fillText("CLICK", 300, 255);
        ctx.fillText("TO", 300, 315);
        ctx.fillText("PLAY", 300, 375);
        ctx.textAlign = "left";
    }

    objects = {
        Background: bg
        , WallLines: wallLines
        , Destructable: destructable
        , Ball: ballRender
        , Score: score
        , Paddle: paddleRender
        , GameOver: gameOver
        , ClickToStart: clickToStart
    }

})()
