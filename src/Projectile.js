
class Projectile {
  constructor(type, dirX, dirY) {
    this.types = {
      arrow: {
        speed: 1,
      }
    }
    console.log(dirX, dirY)
    // Temp values
    this.left = 50;
    this.top = 42;
    this.type = type;
    this.img = this.type;
    let directionX = dirX - this.left;
    let directionY = dirY - this.top;
    let len = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= len;
    directionY /= len;
    this.speedX = directionX * this.types[this.type].speed;
    this.speedY = directionY * this.types[this.type].speed;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    console.log(screenW, screenH)
    const directionX2 = this.mmap(directionX, -1, 1, -screenW / 2, screenW / 2);
    const directionY2 = this.mmap(directionY, -1, 1, screenH / 2, -screenH / 2);
    this.angle = Math.atan2(directionY2, directionX2) * 180 / Math.PI;
    console.log(this.angle)
    // this.angle = Math.atan2(directionX, directionY) * 180 / Math.PI;
  }

  move() {
    this.top += this.speedY;
    this.left += this.speedX;
  }

  mmap(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

}

export default Projectile;