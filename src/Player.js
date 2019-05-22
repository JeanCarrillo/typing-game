const types = {
  archer: {
    standing: {
      spriteMin: 0,
      spriteMax: 9,
    },
    shooting: {
      spriteMin: 0,
      spriteMax: 9,
    }
  }
};

class Player {
  constructor(type, num, name) {
    // if (num && name) {
    //   this.num = num;
    //   this.name = name;
    //   if (this.num === 1) {
    //     this.posX = 48;
    //     this.posY = 37;
    //   }
    // }
    this.posX = 50;
    this.posY = 39;
    if (num) {
      this.posX = 48;
      this.posY = 36;
    }
    this.num = num;
    this.alive = true;
    this.type = type;
    this.status = "standing";
    this.animation = types[this.type][this.status].spriteMin;
    this.animationDelay = 50;
    this.animationTime = Date.now();
    this.direction = 1;
  }

  action() {
    this.animate(types[this.type][this.status].spriteMin, types[this.type][this.status].spriteMax);
  }

  animate(spriteMin, spriteMax) {
    const now = Date.now();
    if (now - this.animationTime > this.animationDelay) {
      this.animationTime = Date.now();
      if (this.animation >= spriteMin && this.animation < spriteMax) {
        this.animation += 1;
      } else {
        if (this.alive) {
          if (this.status === 'shooting' && this.animation >= spriteMax) {
            this.updateStatus('standing');
          } else {
            this.animation = spriteMin;
          }
        } else {
          this.animation = spriteMax;
        }
      }
    }
  }

  updateStatus(status, direction) {
    this.status = status;
    this.animation = types[this.type][this.status].spriteMin;
    if (direction) {
      this.direction = direction;
    }
  }
}

export default Player;