function PlayerGameObject() {
    var counter = 0;

    this.init = function () {
        this.img = new Image();
        this.img.src = "prota.png";
        this.x = 40;
        this.y = 130;
        this.frame = 0;
        this.sinCounter = 0.1;
    }

    this.rect = function () {
        var _rect = new Rectangle();
        _rect.init(this.x, this.y, 15, 17);
        return _rect;
    }

    this.update = function () {
        counter++;

        if (counter >= FRAME_SWITCHER) {
            this.frame++;
            counter = 0;
        }

        if (this.frame >= 2) this.frame = 0;

        if (isJumping) {
            this.sinCounter -= 0.1;
            this.y = (Math.sin(this.sinCounter) * 2) + this.y;

            if (this.y > 130) {
                isJumping = false;
                this.y = 130;
                this.sinCounter = 0.1;
            }
        }
    }

    this.draw = function () {
        context.drawImage(this.img,
                        this.frame * 29, 0, 29, 32,
                        this.x, this.y, 29, 32);
    }
}