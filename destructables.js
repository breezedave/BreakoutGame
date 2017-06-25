var destructables = [];

var addDestructable = function(id, x, y, z, w, h) {
    destructables[id] = {
        id: id
        , x: x
        , y: y
        , z: z
        , w: w
        , h: h
        , hits: 3
    };
};

var isHit = function(ball, obj){
    var ballMinX = ball.x - (ball.w / 3);
    var ballMaxX = ball.x + (ball.w / 3);
    var ballMinY = ball.y - (ball.w / 3);
    var ballMaxY = ball.y + (ball.w / 3);

    var objMinX = obj.x;
    var objMaxX = obj.x + obj.w;
    var objMinY = obj.y;
    var objMaxY = obj.y + obj.h;

    if(ballMaxX >= objMinX && ballMinX <= objMaxX) {
        if(ballMaxY >= objMinY && ballMinY <= objMaxY) {
            obj.hits--;
            world.score += 1;
            if(obj.hits <= 0) {
                delete destructables[obj.id];
                world.score += 4;
            }
        }
    }
}

var setMap = function() {
    destructables = {};
    var i=0;
    for(var x=0; x<24; x++) {
        for(var y=0; y<24; y++) {
            addDestructable("id" + i, x*12+9, y*12+9, 100, 15, 15);
            if(parseInt(y/2)%2 == parseInt(x/2)%2) destructables["id" + i].hits = 2;
            i++;
        }
    }

};
