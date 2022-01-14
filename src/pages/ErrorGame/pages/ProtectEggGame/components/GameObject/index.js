export default class GameObject {

  /** @type {string} */
  tag;

  /** @private @type {Map<string, any>} */
  _data;

  /** @type {CanvasRenderingContext2D} */
  ctx;
  /** @type {number} */
  x;
  /** @type {number} */
  y;
  /** @type {number} */
  vx;
  /** @type {number} */
  vy;
  /** @type {string} */
  texture;

  /**
   * @param {CanvasRenderingContext2D} context 
   * @param {number} x 
   * @param {number} y 
   * @param {number} vx 
   * @param {number} vy 
   */
  constructor (context, x = 0, y = x, vx = 0, vy = 0){
    this.ctx = context;
    this._data = new Map();

    this.x = x;
    this.y = y;

    this.vx = vx;
    this.vy = vy;

    this.isColliding = false;
    this.tag = '';
  }

  setData (key, val) {
    this._data.set(key, val);
    return this;
  }

  getData (key) {
    return this._data.get(key);
  }

  /**
   * @param {string} value 
   */
  setTag (value) {
    this.tag = value;
    return this;
  }

  setVelocity (x, y = x) {
    this.vx = x;
    this.vy = y;
    return this;
  }

  rotateAndPaintImage (image, angleInRad, positionX, positionY, axisX, axisY ) {
    this.ctx.translate(positionX, positionY);
    this.ctx.rotate(angleInRad);
    this.ctx.drawImage(image, -axisX, -axisY);
    this.ctx.rotate(-angleInRad);
    this.ctx.translate(-positionX, -positionY);
  }

  /**
   * @param {number} deltaTime 
   */
  update (deltaTime) {}

  /**
   * @param {number} deltaTime 
   */
  render (deltaTime) {}

}