export class DiffuseLight {
  constructor({ colors = [1, 0, 0], position = [-4, -2, 0] }) {
    Object.assign(this, { colors, position })
  }

  getType() {
    return "Diffuse"
  }

  getLightColors() {
    return this.colors
  }

  getLightSource() {
    return this.position
  }
}
