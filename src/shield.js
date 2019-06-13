class Shield {
  constructor(startPoint, endPoint, ctx) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.ctx = ctx;

    var dx = startPoint.x - endPoint.x;
    var dy = startPoint.y - endPoint.y;
    this.length = Math.sqrt(dx * dx + dy * dy);
    this.angle = Math.atan2(dy, dx);
  }

  render() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }
}

export default Shield;
