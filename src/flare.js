class Flare {
  constructor(x, y, hue, ctx) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.ctx = ctx;
    this.radius = Math.random() * 5 + 10;
  }

  render() {
    var newRadius = this.radius;
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + Math.random() * 2 - 1,
      this.y + Math.random() * 2 - 1,
      newRadius < 0 ? 0 : newRadius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle =
      "hsla(" +
      this.hue +
      ", 100%, " +
      (Math.random() * 50 + 50) +
      "%, " +
      (Math.random() * 50 + 50) / 100 +
      ")";
    this.ctx.fill();
  }
}

export default Flare;
