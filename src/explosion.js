class Explosion {
  constructor(x, y, hue, light, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.light = light;
    this.size = Math.floor(Math.random() * 1) + 1;
    this.speed = Math.floor(Math.random() * 1) + 1;
    this.angle = Math.floor(Math.random() * 360);
    this.alpha = Math.random() * 0.3 + 0.7;
  }

  render() {
    this.ctx.fillStyle =
      "hsla(" + this.hue + ", 100%, "+ this.light +"%," + this.alpha + ")";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
export default Explosion;
