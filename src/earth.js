class Earth {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  render() {
    this.ctx.beginPath();

    var grd = this.ctx.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      35,
      90,
      60,
      Math.PI * 2
    );
    grd.addColorStop(0, "blue");
    grd.addColorStop(1, "green");
    this.ctx.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      35,
      90,
      60,
      Math.PI * 2
    );
    this.ctx.fillStyle = grd;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Earth;
