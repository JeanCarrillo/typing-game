class Monster {
  constructor(text, type) {
    this.types = {
      zombie: {
        sizeX: 5,
        sizeY: 5,
        animationDelay: 200,
        walking: {
          speed: 0.1,
          spriteMin: 40,
          spriteMax: 45,
        },
        running: {
          speed: 0.2,
          spriteMin: 34,
          spriteMax: 39,
        },
        dying: {
          spriteMin: 7,
          spriteMax: 13,
        }
      },
      troll: {
        sizeX: 15,
        sizeY: 15,
        animationDelay: 200,
        walking: {
          speed: 0.05,
          spriteMin: 42,
          spriteMax: 48,
        },
        // running: {
        //   speed: 0.1,
        //   spriteMin: 34,
        //   spriteMax: 39,
        // },
        hurt: {
          speed: 0,
          spriteMin: 14,
          spriteMax: 20,
        },
        dying: {
          spriteMin: 7,
          spriteMax: 13,
        }
      }
    }
    this.text = text;
    this.alive = true;
    // Monster is coming from :
    const pos = Math.floor(Math.random() * 100);
    const comingFromSide = Math.floor(Math.random() * 4);
    switch (comingFromSide) {
      // left
      case 1:
        this.left = -10;
        this.top = pos;
        break;
      // right
      case 2:
        this.left = 110;
        this.top = pos;
        break;
      // top
      case 3:
        this.top = -10;
        this.left = pos;
        break;
      // bottom
      default:
        this.top = 110;
        this.left = pos;
        break;
    }
    // Temp values for player, will be variables if player moves someday
    this.playerPosX = 50;
    this.playerPosY = 39;
    // Calculate speedX and speedY (distance per step)
    let directionX = this.playerPosX - this.left;
    let directionY = this.playerPosY - this.top;
    let len = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= len;
    directionY /= len;
    // Determine race of monster
    this.type = type;
    // Determine movingStatus
    // 1: walking     2: running
    if (this.types[this.type].hasOwnProperty('running')) {
      this.status = Math.ceil(Math.random() * 3);
      if (this.status === 3) {
        this.status = 'running';
      } else {
        this.status = 'walking';
      }
    } else {
      this.status = 'walking'
    }
    this.speedX = directionX * this.types[this.type][this.status].speed;
    this.speedY = directionY * this.types[this.type][this.status].speed;
    this.animation = this.types[this.type][this.status].spriteMin;
    // Get image
    this.sizeX = this.types[this.type].sizeX;
    this.sizeY = this.types[this.type].sizeY;
    const randomImg = Math.ceil(Math.random() * 3);
    this.img = this.type + randomImg;
    this.animationDelay = this.types[this.type].animationDelay;
    this.animationTime = Date.now();
    this.left > 50 ? this.direction = -1 : this.direction = 1;
  }

  move() {
    if (this.status !== 'dying' && this.status !== 'hurt') {
      if (!(this.top > this.playerPosY - 2
        && this.top < this.playerPosY + 2)
        || !(this.left > this.playerPosX - 2
          && this.left < this.playerPosX + 2)) {
        this.top += this.speedY;
        this.left += this.speedX;
      }
    }
    this.animate(this.types[this.type][this.status].spriteMin, this.types[this.type][this.status].spriteMax);
  }

  animate(spriteMin, spriteMax) {
    const now = Date.now();
    if (now - this.animationTime > this.animationDelay) {
      this.animationTime = Date.now();
      if (this.animation >= spriteMin && this.animation < spriteMax) {
        this.animation += 1;
      } else {
        if (this.alive) {
          // if monster is no longer hurt > back to walking
          if (this.status === 'hurt' && this.animation >= spriteMax) {
            this.updateStatus('walking');
          } else {
            this.animation = spriteMin;
          }
        } else {
          this.animation = spriteMax;
        }
      }
    }
  }

  updateStatus(status) {
    this.status = status;
    this.animation = this.types[this.type][this.status].spriteMin;
  }
}

export default Monster;
