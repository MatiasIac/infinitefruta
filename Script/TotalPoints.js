function TotalPointsGameObject() {
    this.init = function () {
        this.x = 75;
        this.y = 100;
        this.counter = 0;
    }

    this.update = function () {
    }

    this.draw = function () {
        context.font = 'normal bold 18px sans-serif';
        context.strokeStyle = "#003300";
        context.fillStyle = "#FFFFFF";
        context.strokeText("Regalos totales: " + this.counter, this.x, this.y);
        context.fillText("Regalos totales: " + this.counter, this.x, this.y);

        context.font = 'normal bold 28px sans-serif';
        context.strokeStyle = "#003300";
        context.fillStyle = "#FF0000";
        context.strokeText("¡Feliz Año 2012!", this.x - 30, this.y + 30);
        context.fillText("¡Feliz Año 2012!", this.x - 30, this.y + 30);
    }
}