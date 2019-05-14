class Monster {
  constructor(text) {
    this.text = text;
    // Monster is coming from :
    const pos = Math.floor(Math.random() * 100);
    const comingFromSide = Math.floor(Math.random() * 4);
    switch (comingFromSide) {
      // left
      case 1:
        this.left= -20;
        this.top= pos;
        break;
      // right
      case 2:
        this.left= 120;
        this.top= pos;
        break;
      // top
      case 3:
          this.top= -20;
          this.left= pos;
        break;
      // bottom
      default:
          this.top= 120;
          this.left= pos;
        break;
    }
    // Calculate speedX and speedY (distance per step)
    let directionX = 50 - this.left;
    let directionY = 50 - this.top;
    let len = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= len;
    directionY /= len;
    // Adjust speed here (distance per step)
    this.speedX = directionX * 0.05;
    this.speedY = directionY * 0.05;
    // Get image
    this.left > 50 ? this.facing = 'left' : this.facing = 'right';
  }

  move() {
    this.top += this.speedY;
    this.left += this.speedX;
  }
}

export default Monster;