import Circle from "../Circle";

export default class Egg extends Circle {

  setSprite (value) {
    this.sprite = value;
    this.texture = this.sprite.src;
    return this;
  }

  render () {
    if (this.visible) {
      if (this.texture) {
        if (this.getData('life') <= 0) return;
        this.ctx.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2);
        if (this.getData('life') >= 2) {
          this.ctx.drawImage(this.sprite, this.x - this.sprite.width / 2 - 18, this.y - this.sprite.height / 2 + 8);
        }
        if (this.getData('life') >= 3) {
          this.ctx.drawImage(this.sprite, this.x - this.sprite.width / 2 + 12, this.y - this.sprite.height / 2 + 6);
        }
        if (this.getData('life') > 3) {
          this.ctx.drawImage(this.sprite, this.x - this.sprite.width / 2 + 4, this.y - this.sprite.height / 2 + 12);
        }
      }

      // this.ctx.strokeStyle = '#8e44ad';
      // this.ctx.beginPath();
      // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      // this.ctx.stroke();
    }
  }

}