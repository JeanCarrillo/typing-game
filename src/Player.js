
class Player {
  constructor(type){
    this.types = {
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
    }
    this.alive = true;
    this.type = type;
    this.status = "standing";
    this.posX = 50;
    this.posY = 39;
    this.animation = this.types[this.type][this.status].spriteMin;
    this.animationDelay = 50;
    this.animationTime = Date.now();
    this.direction = 1;
  }

  action() {
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
    this.animation = this.types[this.type][this.status].spriteMin;
    if (direction) {
      this.direction = direction;
    }
  }
}

export default Player;