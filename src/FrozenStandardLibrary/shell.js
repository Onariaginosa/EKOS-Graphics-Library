export default class Shell {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    Object.assign(this, { color, colors })
    this.single = true
    this.multiple = colors ? true : false
  }

  getType() {
    return "Shell"
  }
}