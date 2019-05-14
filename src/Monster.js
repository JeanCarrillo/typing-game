class Monster {
  constructor(props) {
    this.text = props.text;
    // Monster is coming from :
    const pos = Math.floor(Math.random() * 100);
    const comingFromSide = Math.floor(Math.random() * 4);
    this.monsterStyle = {
      
    };
    switch (comingFromSide) {
      // left
      case 1:
        this.monsterStyle = {
          left: -10,
          top: pos,
        };
        break;
      // right
      case 2:
        this.monsterStyle = {
          left: 110,
          top: pos,
        };
        break;
      // top
      case 3:
        this.monsterStyle = {
          top: 10,
          left: pos,
        };
        break;
      // bottom
      default:
        this.monsterStyle = {
          top: 110,
          left: pos,
        };
        break;
    }
    // Calculate speedX and speedY (distance per step)
    let directionX = 50 - this.monsterStyle.left;
    let directionY = 50 - this.monsterStyle.top;
    let len = Math.sqrt(directionX * directionX + directionY * directionY);
    directionX /= len;
    directionY /= len;
    // Adjust speed here (distance per step)
    this.speedX = directionX * 0.1
    this.speedY = directionY * 0.1
  }

  move() {
    this.monsterStyle.top += this.speedY;
    this.monsterStyle.left += this.speedX;
  }
}

export default Monster;