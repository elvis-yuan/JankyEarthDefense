import Meteor from "./meteor";
import explosion from "./explosion";
import Shield from "./shield";
import Earth from "./earth";
import Explosion from "./explosion";

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.meteorArray = [];
    this.numMeteors = 2;
    this.speed = 1;
    this.shieldArray = [];
    this.tempStartPoint = { x: 0, y: 0 };
    this.tempEndPoint = { x: 0, y: 0 };
    this.tempLineLength = 0;

    this.mousedown = false;
    this.mouseX = this.canvas.width / 2;
    this.mouseY = this.canvas.height / 2;

    this.explosionArray = [];

    this.power = {
      max: 100,
      current: 100,
      rate: 0.5
    };

    this.health = 3;
    this.score = 0;
    this.gameOver = false;

    this.earth = new Earth(this.canvas, this.ctx);

    this.createMeteors = this.createMeteors.bind(this);
    this.loop = this.loop.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.increaseDifficulty = this.increaseDifficulty.bind(this);

    canvas.addEventListener("mousedown", this.handleMousedown, false);
    canvas.addEventListener("mouseup", this.handleMouseup, false);
    canvas.addEventListener("mousemove", this.handleMousemove, false);
  }

  //Line intersection math source: http://www.kevlindev.com/gui/math/intersection/Intersection.js
  intersection(a1, a2, b1, b2) {
    var result;
    var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    if (u_b != 0) {
      var ua = ua_t / u_b;
      var ub = ub_t / u_b;
      if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        result = {
          x: a1.x + ua * (a2.x - a1.x),
          y: a1.y + ua * (a2.y - a1.y)
        };
      } else {
        result = false;
      }
    } else {
      result = false;
    }
    return result;
  }

  startGame() {
    this.difficultyInterval = setInterval(this.increaseDifficulty, 3000);
    this.meteorInterval = setInterval(this.createMeteors, 700);
    this.gameLoop = setInterval(this.loop, 16);
  }

  increaseDifficulty() {
    if (this.speed < 5) {
      this.speed += 0.1;
    }
    if (this.numMeteors < 5) {
      this.numMeteors += 0.1;
    }
    if (this.power.rate < 0.75) {
      this.power.rate += 0.03;
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createMeteors() {
    if (this.meteorArray.length < this.numMeteors) {
      this.meteorArray.push(new Meteor(this.canvas, this.ctx, this.speed));
    }
  }

  updateMeteors() {
    for (var i = 0; i < this.meteorArray.length; i++) {
      // if (
      //   this.meteorArray[i].endPoint.x < -100 ||
      //   this.meteorArray[i].endPoint.x > this.canvas.width + 100 ||
      //   this.meteorArray[i].endPoint.y < -100 ||
      //   this.meteorArray[i].endPoint.y > this.canvas.height + 100
      // ) {
      //   this.meteorArray.splice(i, 1);
      //   this.createMeteors();
      // }
      this.meteorArray[i].update();
      this.meteorArray[i].render();
    }
  }

  renderShields() {
    for (var i = 0; i < this.shieldArray.length; i++) {
      this.shieldArray[i].render();
    }
  }

  updatePower() {
    if (this.power.current < 0) {
      this.power.current = 0;
    }

    if (this.power.current < this.power.max) {
      this.power.current += this.power.rate;
    }

    if (this.power.current > this.power.max) {
      this.power.current = this.power.max;
    }

    if (this.mousedown) {
      var dx = this.mouseX - this.tempStartPoint.x;
      var dy = this.mouseY - this.tempStartPoint.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= this.power.current) {
        this.tempEndPoint = { x: this.mouseX, y: this.mouseY };
        this.tempLineLength = distance;
      } else {
        var angle = Math.atan2(dy, dx);
        this.tempEndPoint = {
          x: this.tempStartPoint.x + Math.cos(angle) * this.power.current,
          y: this.tempStartPoint.y + Math.sin(angle) * this.power.current
        };

        var dx2 = this.tempEndPoint.x - this.tempStartPoint.x;
        var dy2 = this.tempEndPoint.y - this.tempStartPoint.y;

        this.tempLineLength = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      }
    }
  }

  renderGuide() {
    if (this.mousedown) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.tempStartPoint.x, this.tempStartPoint.y);
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.strokeStyle = "#606060";
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(this.tempStartPoint.x, this.tempStartPoint.y);
      this.ctx.lineTo(this.tempEndPoint.x, this.tempEndPoint.y);
      this.ctx.strokeStyle = "#fff";
      this.ctx.stroke();
    }
  }

  updateShields() {
    for (var i = 0; i < this.shieldArray.length; i++) {
      for (var k = 0; k < this.meteorArray.length; k++) {
        var shield = this.shieldArray[i];
        var meteor = this.meteorArray[k];
        var intersection = this.intersection(
          shield.startPoint,
          shield.endPoint,
          meteor.startPoint,
          meteor.endPoint
        );
        if (intersection) {
          this.score += 100;
          this.score += 100 - Math.floor(shield.length);
          this.shieldArray.splice(i, 1);
          this.createCluseterExplosion(
            intersection.x,
            intersection.y,
            100,
            100,
            20
          );
          this.createLineExplosion(
            shield.startPoint.x,
            shield.startPoint.y,
            shield.angle,
            100,
            100,
            shield.length,
            20
          );

          this.createLineExplosion(
            meteor.startPoint.x,
            meteor.startPoint.y,
            meteor.angle,
            0,
            50,
            meteor.length,
            20
          );
          this.meteorArray.splice(k, 1);
          break;
        }
      }
    }
  }

  createLineExplosion(x, y, angle, hue, light, length, count) {
    while (count > 0) {
      var newLength = Math.random() * length;
      var newX = x - Math.cos(angle) * newLength;
      var newY = y - Math.sin(angle) * newLength;
      this.explosionArray.push(new Explosion(newX, newY, hue, light, this.ctx));
      count--;
    }
  }

  createCluseterExplosion(x, y, hue, light, count) {
    while (count > 0) {
      var newRadius = Math.random() * 2;
      var newAngle = Math.random() * Math.PI * 2;
      var newX = x + Math.cos(newAngle) * newRadius;
      var newY = y + Math.sin(newAngle) * newRadius;
      this.explosionArray.push(new Explosion(newX, newY, hue, light, this.ctx));
      count--;
    }
  }

  updateExplosions() {
    for (var i = 0; i < this.explosionArray.length; i++) {
      var explosion = this.explosionArray[i];
      var radians = explosion.angle * (Math.PI / 180);
      var dx = Math.cos(radians) * (explosion.speed * explosion.alpha);
      var dy = Math.sin(radians) * (explosion.speed * explosion.alpha);

      explosion.x += dx;
      explosion.y += dy;

      explosion.alpha -= 0.02;

      if (explosion.alpha <= 0) {
        this.explosionArray.splice(i, 1);
      }
    }
  }

  renderExplosions() {
    for (var i = 0; i < this.explosionArray.length; i++) {
      var explosion = this.explosionArray[i];
      explosion.render();
    }
  }

  renderEarth() {
    this.earth.render();
  }

  updateEarth() {
    for (var i = 0; i < this.meteorArray.length; i++) {
      var meteor = this.meteorArray[i];
      var meteorPoint = meteor.startPoint;
      var dx = this.canvas.width / 2 - meteorPoint.x;
      var dy = this.canvas.height / 2 - meteorPoint.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= 35) {
        this.health -= 1;

        this.createCluseterExplosion(
          meteorPoint.x,
          meteorPoint.y,
          Math.random() * 250,
          Math.random() * 25 + 50,
          20
        );
        this.createLineExplosion(
          meteorPoint.x,
          meteorPoint.y,
          meteor.angle,
          0,
          50,
          meteor.length,
          20
        );
        this.meteorArray.splice(i, 1);
      }
    }
  }

  renderScore() {
    var score = this.score.toString();
    var fullScore = "Score: " + score;
    this.ctx.font = "20px Georgia";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(fullScore, this.canvas.width - 200, 50);
  }

  renderLives() {
    var lives = this.health.toString();
    var fullLives = "Lives: " + lives;
    this.ctx.font = "20px Georgia";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(fullLives, 20, 50);
  }

  loop() {
    this.clear();
    this.renderScore();
    this.renderLives();
    this.checkGameOver();
    this.updateEarth();
    this.renderEarth();
    this.updateMeteors();
    this.updateShields();
    this.renderShields();
    this.updatePower();
    this.renderGuide();
    this.updateExplosions();
    this.renderExplosions();
  }

  checkGameOver() {
    if (this.health <= 0) {
      this.gameOver = true;
      clearInterval(this.gameLoop);
      clearInterval(this.meteorInterval);
      clearInterval(this.difficultyInterval);
    }
  }

  handleMousedown() {
    this.mousedown = true;
    this.tempStartPoint = { x: this.mouseX, y: this.mouseY };
  }

  handleMouseup() {
    this.mousedown = false;
    if (
      this.tempStartPoint.x != this.tempEndPoint.x ||
      this.tempStartPoint.y != this.tempEndPoint.y
    ) {
      this.shieldArray.push(
        new Shield(this.tempStartPoint, this.tempEndPoint, this.ctx)
      );
      this.power.current -= this.tempLineLength;
    }
  }

  handleMousemove(e) {
    this.mouseX = e.x - this.canvas.offsetLeft;
    this.mouseY = e.y - this.canvas.offsetTop;
  }
}

export default Game;
