import Circle from "../Circle";

export default class Enemy extends Circle {

  dead () {
    this.setData('active', false);
    this.visible = false;
  }

  setSprite (value) {
    this.sprite = value;
    this.texture = this.sprite.src;
    return this;
  }

  update (deltaTime) {
    if (this.x < -200 || this.x > 700 || this.y < -200 || this.y > 700) {
      this.setVelocity(0);
      this.dead();
      return;
    }

    if (this.getData('isDead')) return;

    // Super
    if (this.visible) {
      this.x += this.vx * deltaTime;
      this.y += this.vy * deltaTime;
    }
  }

  render () {
    if (this.visible) {
      if (this.texture) {
        const offsetX = this.sprite.width / 2 * 1.23;
        const offsetY = this.sprite.height / 2 * 1.15;
        this.ctx.drawImage(this.sprite, this.x - offsetX, this.y - offsetY);
      }

      // this.ctx.strokeStyle = '#8e44ad';
      // this.ctx.beginPath();
      // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // this.ctx.stroke();
    }
  }

}
