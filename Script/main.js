var canvas;
var context;
var back;
var graphicStack;
var isJumping;
var stateMachine;
var timerCounter;

var FRAME_SWITCHER;
var SPEED;
var START_X;

var hitFx;
var powerFx;
var jumpFx;

function startGame() {
    SPEED = 2;
    FRAME_SWITCHER = 12;
    START_X = 310;
    stateMachine = 0;
    isJumping = false;

    hitFx = new Audio();
    hitFx.src = "Fx/hit.wav";

    powerFx = new Audio();
    powerFx.src = "Fx/power.wav";

    jumpFx = new Audio();
    jumpFx.src = "Fx/jump.wav";

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    graphicStack = new Array();
    graphicStack.push(new StartMenuTextGameObject());
    graphicStack[0].init();

    back = new BackGameObject();
    back.init();

    setInterval(runGame, 1000 / 30);
}

function runGame() {
    context.fillStyle = "rgb(255,255,255)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    back.update();
    back.draw();

    for (var i = 0; i < graphicStack.length; i++) {
        try {
            graphicStack[i].update();
            graphicStack[i].draw();

            if (stateMachine == 1) {
                if ((graphicStack[i].getType() != "dummyGameObject") &&
                    (graphicStack[i].getType() != "PlayerGameObject") &&
                    (graphicStack[i].getType() != "PointCounterGameObject")) {
                    if (graphicStack[0].rect().intersects(graphicStack[i].rect())) {
                        if (graphicStack[i].visible) {
                            switch (graphicStack[i].getType()) {
                                case "PresentGameObject":
                                    graphicStack[1].AddPoint();
                                    timerCounter += 4;
                                    SPEED += 0.3;
                                    powerFx.play();
                                    break;
                                case "BearGameObject":
                                case "SnakeGameObject":
                                    graphicStack[1].TakePoint()
                                    hitFx.play();
                                    break;
                            }
                            graphicStack[i].visible = false;
                        }
                    }
                }
            }
        } catch (e) {
            //just swalow the exception
            //don't in real life
        }
    }

    if (stateMachine == 1) {
        context.strokeText("Tiempo restante: " + timerCounter / 2, 10, 10);
        context.fillText("Tiempo restante: " + timerCounter / 2, 10, 10);

        if (timerCounter / 2 == 1) {
            stateMachine = 2;
            Action();
        }
    }
}

function addGameObjects() {
    if (stateMachine == 1) {
        var i;

        timerCounter -= 2;

        for (i = 2; i <= graphicStack.length; i++) {
            if (i == graphicStack.length) return;
            if (!graphicStack[i].visible) break;
        }

        var obj;
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                obj = new BearGameObject();
                break;
            case 1:
                obj = new PresentGameObject();
                break;
            case 2:
                obj = new SnakeGameObject();
                break;
        }

        obj.init();
        obj.visible = true;
        graphicStack[i] = obj;
    }
}

function Action() {
    switch (stateMachine) {
        case 0:
            graphicStack.pop();
            timerCounter = 20;
            stateMachine = 1;

            graphicStack.push(new PlayerGameObject());
            graphicStack.push(new PointCounterGameObject());
            graphicStack[0].init();
            graphicStack[1].init();

            graphicStack.push(new dummyGameObject());
            graphicStack.push(new dummyGameObject());
            graphicStack.push(new dummyGameObject());
            graphicStack.push(new dummyGameObject());
            graphicStack.push(new dummyGameObject());

            setInterval(addGameObjects, 2000);
            break;
        case 1:
            if (!isJumping) jumpFx.play();

            isJumping = true;
            break;
        case 2:
            var _totalPoints = graphicStack[1].counter;
            for (; graphicStack.length > 0; ) {
                graphicStack.pop();
            }
            graphicStack.pop();
            graphicStack.push(new TotalPointsGameObject());
            graphicStack[0].init();
            graphicStack[0].counter = _totalPoints;
            stateMachine = 3;
            break;
    }
}