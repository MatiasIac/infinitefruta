function BearGameObject() {
    var counter = 0;

    this.init = function () {
        this.img = new Image();
        this.img.src = "bear.png";
        this.x = 200;
        this.y = 130;
        this.frame = 0;
        this.visible = false;
		
		this.speed = 10;
		this.frameSwitcher = 23;
    }

    this.rect = function () {
        var _rect = new Rectangle();
        _rect.init(this.x, this.y, 15, 17);
        return _rect;
    }

    this.update = function () {
        if (this.visible) {
            counter++;
            this.x -= this.speed;

            if (counter >= this.frameSwitcher) {
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
                        this.frame * 24, 0, 24, 31,
                        this.x, this.y, 24, 31);
        }
    }
}