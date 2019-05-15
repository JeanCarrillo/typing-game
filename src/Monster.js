class Monster {
  constructor(text) {
    this.text = text;
    this.alive = true;
    // Monster is coming from :
    const pos = Math.floor(Math.random() * 100);
    const comingFromSide = Math.floor(Math.random() * 4);
    switch (comingFromSide) {
      // left
      case 1:
        this.left = -20;
        this.top = pos;
        break;
      // right
      case 2:
        this.left = 120;
        this.top = pos;
        break;
      // top
      case 3:
        this.top = -20;
        this.left = pos;
        break;
      // bottom
      default:
        this.top = 120;
        this.left = pos;
        break;
    }
    // Calculate speedX and speedY (distance per step)
    let directionX = 50 - this.left;
    let directionY = 50 - this.top;
    let len = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= len;
    directionY /= len;
    // Adjust speed here (distance per step)
    this.speedX = directionX * 0.2;
    this.speedY = directionY * 0.2;
    // Get image
    const randomZombie = Math.ceil(Math.random() * 3);
    this.img = 'zombie' + randomZombie;
    this.animation = 40;
    this.animationDelay = 200;
    this.animationTime = Date.now();
    this.left > 50 ? this.direction = -1 : this.direction = 1;
  }

  move() {
    const now = Date.now();
    if (this.alive) {
      if (!(this.top > 48
        && this.top < 52)
        || !(this.left > 48
          && this.left < 52)) {
        this.top += this.speedY;
        this.left += this.speedX;
        if (now - this.animationTime > this.animationDelay) {
          this.animationTime = Date.now();
          if (this.animation >= 40 && this.animation < 45) {
            this.animation += 1;
          } else {
            this.animation = 40;
          }
        }
      }
    } else {
      if (this.animation > 15) {
        this.animation = 7; // 14
      }
      if (now - this.animationTime > this.animationDelay) {
        this.animationTime = Date.now();
        if (this.animation >= 7 && this.animation < 14) {
          this.animation += 1;
        } else {
          this.animation = 14;
        }
      }
    }
  }
}

export default Monster;