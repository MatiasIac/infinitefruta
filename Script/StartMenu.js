function StartMenuTextGameObject() {
    var counter = 0;

    this.init = function () {
        this.x = 100;
        this.y = 90;
        this.frame = 0;
    }

    this.update = function () {
        counter++;

        if (counter >= FRAME_SWITCHER) {
            this.frame++;
            counter = 0;
        }

        if (this.frame >= 2) this.frame = 0;
    };

    this.draw = function () {
        if (this.frame) {
            context.strokeStyle = "#003300";
            context.fillStyle = "#FFFFFF";
            context.strokeText("CLICK PARA INICIAR", this.x, this.y);
            context.fillText("CLICK PARA INICIAR", this.x, this.y);
        }
    };
}