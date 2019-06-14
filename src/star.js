class Star {
  constructor(x, y, radius, speed, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
    this.saturation = 30 * 5;
    this.lightness = 8 * 3;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.shadowColor = "transparent";
    this.ctx.fillStyle =
      "hsla(60, " +
      this.saturation +
      "%, " +
      this.lightness +
      "%, " +
      0.2 +
      ")";
    this.ctx.fill();
  }

  update() {
    this.y += this.speed;
  }
}
export default Star;
