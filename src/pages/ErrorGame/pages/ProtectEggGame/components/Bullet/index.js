import Circle from "../Circle";

export default class Bullet extends Circle {

  constructor (context, x, y, r, vx, vy) {
    super(context, x, y, r, vx, vy);
    this.setData('active', false);
  }

  destroy () {
    this.setData('active', false);
    this.visible = false;
  }

  shoot (vx, vy) {
    const bulletSpeed = this.getData('speed') ?? 0;
    this.setVelocity(vx * bulletSpeed, vy * bulletSpeed);
    this.visible = true;
    this.setData('active', true);
  }

  update (deltaTime) {
    if (this.x < 0 || this.x > 500 || this.y < 0 || this.y > 500) {
      this.setVelocity(0);
      this.destroy();
      return;
    }

    // Super
    if (this.visible) {
      this.x += this.vx * deltaTime;
      this.y += this.vy * deltaTime;
    }
  }

}