function SnakeGameObject() {
    var counter = 0;

    this.init = function () {
        this.img = new Image();
        this.img.src = "snake.png";
        this.x = START_X;
        this.y = 145;
        this.frame = 0;
        this.visible = false;
    }

    this.rect = function () {
        var _rect = new Rectangle();
        _rect.init(this.x, this.y, 15, 17);
        return _rect;
    }

    this.update = function () {
        if (this.visible) {
            counter++;
            this.x -= SPEED;

            if (counter >= FRAME_SWITCHER) {
                this.frame++;
                counter = 0;
            }

            if (this.frame >= 2) this.frame = 0;

            if (this.x < -30) this.visible = false;
        }
    }

    this.draw = function () {
        if (this.visible) {
            context.drawImage(this.img,
                        this.frame * 15, 0, 15, 17,
                        this.x, this.y, 15, 17);
        }
    }
}