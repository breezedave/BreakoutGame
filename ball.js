var ball;

var setBall = function() {
    ball = {
        x: 150
        , y: 150
        , z: 1
        , xD: 0.7
        , yD: 0.5
        , zD: 1
        , w: 7
    };
};

var ballMovement = function() {
    if(ball.x <= ball.w && ball.xD <0) ball.xD = ball.xD * -1
    if(ball.x >= world.w && ball.xD >0) ball.xD = ball.xD * -1

    if(ball.y <= ball.w && ball.yD <0) ball.yD = ball.yD * -1
    if(ball.y >= world.h && ball.yD >0) ball.yD = ball.yD * -1

    if(ball.z >= 100) ball.zD = ball.zD * -1;

    ball.x += ball.xD;
    ball.y += ball.yD;
    ball.z += ball.zD;

    if (ball.z == 100) checkDestructables();
    if (ball.z == 0) checkPaddle();

    if(!world.playing) return;
    setTimeout(ballMovement, 10);
};

var checkDestructables = function() {
    for(i in destructables) {
        isHit(ball, destructables[i]);
    }
}

var checkPaddle = function() {
    var paddleMinX = paddle.x - (paddle.w / 2);
    var paddleMaxX = paddle.x + (paddle.w / 2);
    var paddleMidX = paddle.x;
    var paddleMinY = paddle.y - (paddle.w / 2);
    var paddleMaxY = paddle.y + (paddle.w / 2);
    var paddleMidY = paddle.y;

    var ballMinX = ball.renderX;
    var ballMaxX = ball.renderX + ball.renderW;
    var ballMidX = ball.renderX + (ball.renderW/2);
    var ballMinY = ball.renderY;
    var ballMaxY = ball.renderY + ball.renderH;
    var ballMidY = ball.renderY + (ball.renderY/2);

    ball.zD = ball.zD * -1;
    if(paddleMaxX >= ballMinX && paddleMinX <= ballMaxX) {
        if(paddleMaxY >= ballMinY && paddleMinY <= ballMaxY) {
            ball.xD = (ball.renderX - paddleMidX) / (paddle.w / 2) * 0.75;
            ball.yD = (ball.renderY - paddleMidY) / (ball.renderY/2) * 1.5;
            return;
        }
    }

    ball.x = 150;
    ball.y = 150;
    world.lives--;
    if(world.lives == 0) gameOver();
}
