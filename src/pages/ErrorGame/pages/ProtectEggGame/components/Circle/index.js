import GameObject from "../GameObject";

export default class Circle extends GameObject {

  /** @type {number} */
  radius;
  /** @type {string} */
  color;
  /** @type {boolean} */
  visible;

  constructor (context, x, y, r, vx = 0, vy = 0) {
    super(context, x, y, vx, vy);
    this.color = '#2ecc71';
    this.radius = r;
    this.visible = true;
  }

  /**
   * @param {number} radius 
   */
  setRadius (radius) {
    this.radius = radius;
    return this;
  }

  /**
   * @param {string} value 
   */
  setColor (value) {
    this.color = value;
    return this;
  }

  update (deltaTime) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
  }

  render () {
    if (this.visible) {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

}