function PresentGameObject() {
    var counter = 0;

    this.init = function () {
        this.img = new Image();
        this.img.src = "chest.png";
        this.x = START_X;
        this.y = 147;
        this.frame = 0;
        this.visible = false;

        if (Math.floor(Math.random() * 11) <= 5) {
            this.y = 147;
        } else {
            this.y = 110;
        }
    }

    this.rect = function () {
        var _rect = new Rectangle();
        _rect.init(this.x, this.y, 15, 17);
        return _rect;
    }

    this.update = function () {
        if (this.visible) {
            this.x -= SPEED;

            if (this.x < -30) this.visible = false;
        }
    }

    this.draw = function () {
        if (this.visible) {
            context.drawImage(this.img, this.x, this.y,
                                  this.img.width, this.img.height);
        }
    }
}