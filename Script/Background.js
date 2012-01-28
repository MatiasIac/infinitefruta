function BackGameObject() {
    this.init = function () {
        this.backgroundimage = new Image();
        this.backgroundimage.src = "background.png";
        this.x = 0;
        this.y = 0;
    }

    this.update = function () {
        this.x -= SPEED;

        if (this.x + 511 <= 0)
            this.x = 0;
    }

    this.draw = function () {
        context.drawImage(this.backgroundimage, this.x, this.y,
                    this.backgroundimage.width, this.backgroundimage.height);

        context.drawImage(this.backgroundimage, this.x + 511, this.y,
                    this.backgroundimage.width, this.backgroundimage.height);
    }
}