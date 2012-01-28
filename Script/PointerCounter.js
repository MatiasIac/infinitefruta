function PointCounterGameObject() {
    this.init = function () {
        this.x = 200;
        this.y = 9;
        this.counter = 0;
    }

    this.AddPoint = function () {
        this.counter++;
    }

    this.TakePoint = function () {
        if (this.counter - 1 >= 0)
            this.counter--;
    }

    this.update = function () {
    }

    this.draw = function () {
        context.strokeStyle = "#003300";
        context.fillStyle = "#FFFFFF";
        context.strokeText("Regalos: " + this.counter, this.x, this.y);
        context.fillText("Regalos: " + this.counter, this.x, this.y);
    }
}