
class Projectile {
  constructor(type, dirX, dirY) {
    this.types = {
      arrow: {
        speed: 1,
      }
    }
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
    // const dirX2 = this.mmap(dirX, 0, 100, -1, 1);
    // const dirY2 = this.mmap(dirY, 0, 100, -1, 1);
    // this.angle = Math.atan2(dirY2, dirX2);
    this.angle = Math.atan2(directionX,directionY) * 180 / Math.PI;
    console.log(this.angle)
  }

  move() {
    this.top += this.speedY;
    this.left += this.speedX;
  }

  // mmap(x, in_min, in_max, out_min, out_max) {
  //   return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  // }

}

export default Projectile;