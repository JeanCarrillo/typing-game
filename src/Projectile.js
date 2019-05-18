
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
    this.angle = Math.atan2(directionX,directionY);
    console.log(this.angle)
  }

  move() {
    this.top += this.speedY;
    this.left += this.speedX;
  }

}

export default Projectile;