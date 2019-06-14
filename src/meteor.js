class Meteor {
  constructor(canvas, ctx, speed) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.side = Math.floor(Math.random() * 4);
    this.startPoint;
    this.speed = Math.random() * 2 + speed;

    switch (this.side) {
      case 0:
        this.startPoint = {
          y: 0,
          x: Math.random() * this.canvas.width
        };
        break;
      case 1:
        this.startPoint = {
          y: Math.random() * this.canvas.height,
          x: this.canvas.width
        };
        break;
      case 2:
        this.startPoint = {
          y: this.canvas.height,
          x: Math.random() * this.canvas.width
        };
        break;
      case 3:
        this.startPoint = {
          y: Math.random() * this.canvas.height,
          x: 0
        };
        break;
    }

    var dx = this.canvas.width / 2 - this.startPoint.x;
    var dy = this.canvas.height / 2 - this.startPoint.y;
    this.angle = Math.atan2(dy, dx);
    this.length = 80;

    this.endPoint = {
      y: this.startPoint.y - Math.sin(this.angle) * this.length,
      x: this.startPoint.x - Math.cos(this.angle) * this.length
    };
  }

  update() {
    this.startPoint.x += Math.cos(this.angle) * this.speed;
    this.endPoint.x += Math.cos(this.angle) * this.speed;
    this.startPoint.y += Math.sin(this.angle) * this.speed;
    this.endPoint.y += Math.sin(this.angle) * this.speed;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();
  }
}

export default Meteor;
