/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var instructions = document.getElementById("game-instructions");
  var play = document.getElementById("play-button");
  var gameover = document.getElementById("game-over");
  play.addEventListener("click", handleClick);

  function handleClick(e) {
    const newGame = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, ctx);
    newGame.startGame();
    instructions.classList.add("hidden");
  }
  var retry = document.getElementById("retry");
  retry.addEventListener("click", () => {
    gameover.classList.toggle("show");
    handleClick();
  });
});


/***/ }),

/***/ "./src/explosion.js":
/*!**************************!*\
  !*** ./src/explosion.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (Explosion);


/***/ }),

/***/ "./src/flare.js":
/*!**********************!*\
  !*** ./src/flare.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Flare);


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _meteor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./meteor */ "./src/meteor.js");
/* harmony import */ var _shield__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shield */ "./src/shield.js");
/* harmony import */ var _explosion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./explosion */ "./src/explosion.js");
/* harmony import */ var _flare__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flare */ "./src/flare.js");
/* harmony import */ var _star__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./star */ "./src/star.js");






class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.meteorArray = [];
    this.numMeteors = 1;
    this.speed = 1;
    this.shieldArray = [];
    this.flareArray = [];
    this.starsArray = [];

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
    this.counter = 10000;
    this.gameOver = false;
    this.gamePause = false;
    this.fade = 0;

    // this.earth = new Earth(this.canvas, this.ctx);
    this.earth = new Image();
    this.earth.src = "./assets/planet-transparent-5.png";

    this.handleGameOver = this.handleGameOver.bind(this);
    this.createStars = this.createStars.bind(this);
    this.createMeteors = this.createMeteors.bind(this);
    this.loop = this.loop.bind(this);
    this.handleMouseup = this.handleMouseup.bind(this);
    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
    this.increaseDifficulty = this.increaseDifficulty.bind(this);

    canvas.addEventListener("mousedown", this.handleMousedown, false);
    canvas.addEventListener("mouseup", this.handleMouseup, false);
    canvas.addEventListener("mousemove", this.handleMousemove, false);
    document.addEventListener("keydown", e => {
      switch (e.code) {
        case "Space":
          e.preventDefault();
          this.handleSpace();
          break;
        default:
          break;
      }
    });
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
    this.fade = 0;
    this.createStars(20);
    this.difficultyInterval = setInterval(this.increaseDifficulty, 3000);
    this.meteorInterval = setInterval(this.createMeteors, 700);
    this.gameLoop = setInterval(this.loop, 16);
    this.starLoop = setInterval(() => this.createStars(5), 5000);
  }

  increaseDifficulty() {
    if (this.speed < 4) {
      this.speed += 0.05;
    }
    if (this.numMeteors < 7) {
      this.numMeteors += 0.1;
    }
    if (this.power.rate < 0.75) {
      this.power.rate += 0.03;
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createStars(count) {
    while (count >= 0) {
      this.starsArray.push(
        new _star__WEBPACK_IMPORTED_MODULE_4__["default"](
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height,
          Math.random() * 2,
          0.2,
          this.ctx
        )
      );
      count--;
    }
  }

  renderStars() {
    for (var i = 0; i < this.starsArray.length; i++) {
      this.starsArray[i].render();
    }
  }

  updateStars() {
    for (var i = 0; i < this.starsArray.length; i++) {
      this.starsArray[i].update();
      if (this.starsArray[i].y > this.canvas.height) {
        this.starsArray.splice(i, 1);
        break;
      }
    }
  }

  createMeteors() {
    if (this.meteorArray.length < this.numMeteors) {
      this.meteorArray.push(new _meteor__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas, this.ctx, this.speed));
    }
  }

  updateMeteors() {
    for (var i = 0; i < this.meteorArray.length; i++) {
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
          if (this.score / this.counter > 1) {
            this.health += 1;
            this.counter += 10000;
          }
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

          this.createFlares(intersection.x, intersection.y, 120);
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
      this.explosionArray.push(new _explosion__WEBPACK_IMPORTED_MODULE_2__["default"](newX, newY, hue, light, this.ctx));
      count--;
    }
  }

  createCluseterExplosion(x, y, hue, light, count) {
    while (count > 0) {
      var newRadius = Math.random() * 2;
      var newAngle = Math.random() * Math.PI * 2;
      var newX = x + Math.cos(newAngle) * newRadius;
      var newY = y + Math.sin(newAngle) * newRadius;
      this.explosionArray.push(new _explosion__WEBPACK_IMPORTED_MODULE_2__["default"](newX, newY, hue, light, this.ctx));
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

  createFlares(x, y, hue) {
    this.flareArray.push(new _flare__WEBPACK_IMPORTED_MODULE_3__["default"](x, y, hue, this.ctx));
    this.flareArray.push(
      new _flare__WEBPACK_IMPORTED_MODULE_3__["default"](
        x + (Math.random() * 10 - 5),
        y + (Math.random() * 10 - 5),
        hue,
        this.ctx
      )
    );
    this.flareArray.push(
      new _flare__WEBPACK_IMPORTED_MODULE_3__["default"](
        x + (Math.random() * 10 - 5),
        y + (Math.random() * 10 - 5),
        hue,
        this.ctx
      )
    );
  }

  renderFlares() {
    for (var i = 0; i < this.flareArray.length; i++) {
      this.flareArray[i].render();
    }
  }

  updateFlares() {
    for (var i = 0; i < this.flareArray.length; i++) {
      var flare = this.flareArray[i];
      flare.radius -= 0.7;
      if (flare.radius <= 0) {
        this.flareArray.splice(i, 1);
      }
    }
  }

  renderEarth() {
    this.ctx.drawImage(
      this.earth,
      this.canvas.width / 2 - 38,
      this.canvas.height / 2 - 38,
      75,
      75
    );
  }

  updateEarth() {
    for (var i = 0; i < this.meteorArray.length; i++) {
      var meteor = this.meteorArray[i];
      var meteorPoint = meteor.startPoint;
      var dx = this.canvas.width / 2 - meteorPoint.x;
      var dy = this.canvas.height / 2 - meteorPoint.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= 29) {
        if (this.health > 0) {
          this.health -= 1;
        }

        this.createCluseterExplosion(
          meteorPoint.x,
          meteorPoint.y,
          Math.random() * 250,
          Math.random() * 25 + 50,
          40
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

        this.createFlares(meteorPoint.x, meteorPoint.y, 0);

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
    var fullLives = lives;
    this.ctx.font = "25px Georgia";
    this.ctx.fillStyle = "white";
    this.ctx.shadowColor = "rgba(0,0,0,1)";
    this.ctx.shadowBlur = 4;
    this.ctx.fillText(
      fullLives,
      this.canvas.width / 2 - 7,
      this.canvas.height / 2 + 5
    );
  }

  renderPower() {
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(
      this.canvas.width - 50,
      this.canvas.height - 250,
      20,
      -100
    );

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      this.canvas.width - 50,
      this.canvas.height - 250,
      20,
      -this.power.current
    );
  }

  loop() {
    this.clear();
    this.updateStars();
    this.renderStars();
    this.renderScore();
    this.renderPower();
    this.updateEarth();
    this.renderEarth();
    this.renderLives();
    this.updateMeteors();
    this.updateShields();
    this.renderShields();
    this.updatePower();
    this.renderGuide();
    this.updateExplosions();
    this.renderExplosions();
    this.updateFlares();
    this.renderFlares();
    this.checkGameOver();
  }

  checkGameOver() {
    if (this.health <= 0) {
      this.fade += 0.01;
      this.ctx.fillStyle = "rgba(0,0,0," + this.fade + ")";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      if (!this.gameOver) {
        this.gameOver = true;
        setTimeout(() => this.handleGameOver(), 1400);
      }
    }
  }

  handleGameOver() {
    clearInterval(this.gameLoop);
    clearInterval(this.meteorInterval);
    clearInterval(this.difficultyInterval);
    var gameover = document.getElementById("game-over");
    gameover.classList.add("show");
    document.getElementById("score").textContent =
      "You scored: " + this.score + " points!";
  }

  handleSpace() {
    // debugger;
    this.gamePause = this.gamePause ? false : true;
    if (this.gamePause) {
      clearInterval(this.gameLoop);
      clearInterval(this.meteorInterval);
      clearInterval(this.difficultyInterval);
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        "Paused",
        this.canvas.width / 2 - 40,
        this.canvas.height / 2 - 100
      );
      this.tempStartPoint = { x: 0, y: 0 };
      this.tempEndPoint = { x: 0, y: 0 };
      this.tempLineLength = 0;
    } else {
      this.difficultyInterval = setInterval(this.increaseDifficulty, 3000);
      this.meteorInterval = setInterval(this.createMeteors, 700);
      this.gameLoop = setInterval(this.loop, 16);
    }
  }

  handleMousedown() {
    if (!this.gamePause) {
      this.mousedown = true;
      this.tempStartPoint = { x: this.mouseX, y: this.mouseY };
    }
  }

  handleMouseup() {
    if (!this.gamePause) {
      this.mousedown = false;
      if (this.shieldArray.length < 50) {
        if (
          this.tempStartPoint.x != this.tempEndPoint.x ||
          this.tempStartPoint.y != this.tempEndPoint.y
        ) {
          this.shieldArray.push(
            new _shield__WEBPACK_IMPORTED_MODULE_1__["default"](this.tempStartPoint, this.tempEndPoint, this.ctx)
          );
          this.power.current -= this.tempLineLength;
        }
      }
    }
  }

  handleMousemove(e) {
    this.mouseX = e.x - this.canvas.offsetLeft;
    this.mouseY = e.y - this.canvas.offsetTop;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./src/meteor.js":
/*!***********************!*\
  !*** ./src/meteor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Meteor);


/***/ }),

/***/ "./src/shield.js":
/*!***********************!*\
  !*** ./src/shield.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Shield);


/***/ }),

/***/ "./src/star.js":
/*!*********************!*\
  !*** ./src/star.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (Star);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map