
class Player {
  constructor(){
    this.types = {
      archer: {
        Stand: {
          spriteMin: 0,
          spriteMax: 9,
        },
        Shot: {

        }
      }
    }
    this.type = "archer";
    this.status = "Stand";
    this.img = this.type + this.status;
    this.posX = 50;
    this.posY = 39;
    this.animation = this.types[this.type][this.status].spriteMin;
    this.spriteMin= 0;
    this.spriteMax= 9;
    this.alive = true;
    this.animationDelay = 50;
    this.animationTime = Date.now();
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
}

export default Player;