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
    // Temp values for player, will be variables if player moves someday
    this.playerPosX = 48;
    this.playerPosY = 40;
    // Calculate speedX and speedY (distance per step)
    let directionX = this.playerPosX - this.left;
    let directionY = this.playerPosY - this.top;
    let len = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= len;
    directionY /= len;
    // Determine race of monster
    // 1: zombie      2: troll
    const randomRace = Math.ceil(Math.random() * 2);
    if (randomRace === 1) {
      this.race = 'zombie';
    }
    if (randomRace === 2) {
      this.race = 'troll';
    }
    // Determine type of monster
    // 1: walking     2: running
    this.type = Math.ceil(Math.random() * 2);
    if (this.type === 1) {
      // Walking : Adjust speed here (distance per step)
      this.speedX = directionX * 0.1;
      this.speedY = directionY * 0.1;
      this.animation = 40;
    }
    if (this.type === 2) {
      // Running : Adjust speed here (distance per step)
      this.speedX = directionX * 0.2;
      this.speedY = directionY * 0.2;
      this.animation = 34;
    }
    // Get image
    const randomZombie = Math.ceil(Math.random() * 3);
    this.img = this.race + randomZombie;
    this.animationDelay = 200;
    this.animationTime = Date.now();
    this.left > 50 ? this.direction = -1 : this.direction = 1;
  }

  move() {
    if (this.alive) {
      if (!(this.top > this.playerPosY - 2
        && this.top < this.playerPosY + 2)
        || !(this.left > this.playerPosX - 2
          && this.left < this.playerPosX + 2)) {
        this.top += this.speedY;
        this.left += this.speedX;
        if (this.type === 1) {
          this.animate(40, 45);
        }
        if (this.type === 2) {
          this.animate(34, 39);
        }
      }
    } else {
      if (this.animation > 13) {
        this.animation = 7;
      }
      this.animate(7, 13);
    }
  }

  animate(spriteMin, spriteMax) {
    const now = Date.now();
    if (now - this.animationTime > this.animationDelay) {
      this.animationTime = Date.now();
      if (this.animation >= spriteMin && this.animation < spriteMax) {
        this.animation += 1;
      } else {
        if (this.alive) {
          this.animation = spriteMin;
        } else {
          this.animation = spriteMax;
        }
      }
    }
  }
}

export default Monster;