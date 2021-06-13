import { Matrix } from "./FrozenStandardLibrary"

export default class Composite {
  constructor({ shape = null, shell = null, scale = [1, 1, 1], position = [0, 0, 0] }) {
    Object.assign(this, { shape, shell, scale, position })
    this.mode = "TRIANGLES"
    this.colors = false
    this.normals = "FACETED"
    this.matrix = new Matrix({ })
  }

  getType() {
    return "Composite"
  }

  getPositionX() {
    return this.position[0]
  }

  getPositionY() {
    return this.position[1]
  }

  getPositionZ() {
    return this.position[2]
  }

  movePosition(x, y, z) {
    this.shape.movePosition(x, y, z)
    this.position = [x + this.position[0], y + this.position[1], z + this.position[2]]
  }

  setPosition(x, y, z) {
    let delta = [x - this.position[0], y - this.position[1], z - this.position[2]]
    this.movePosition(delta[0], delta[1], delta[2])
  }

  smooth() {
    this.normals = "SMOOTH"
  }

  faceted() {
    this.normals = "FACETED"
  }

  wireframe() {
    this.mode = "LINES"
  }

  solid() {
    this.mode = "TRIANGLES"
  }

  useMultipleColors() {
    this.colors = true
  }

  useOneColor() {
    this.colors = false
  }

  setScale(x, y, z) {
    // Because scale is based on original vertices, must set position right after
    this.shape.scaleVertices(x, y, z)
    this.shape.movePosition(this.position[0], this.position[1], this.position[2])
  }

  generateObjectToDraw(gl) {
    let result = {
      mode: gl[this.mode],
      matrix: this.matrix.getFloat32(),
    }
    if (this.mode === "TRIANGLES") {
      result.vertices = this.shape.solid
      if (this.normals === "SMOOTH") {
        result.normals = this.shape.getSmoothNormals()
      } else if (this.normals === "FACETED") {
        result.normals = this.shape.getFacetedNormals()
      }
    } else if (this.mode === "LINES") {
      result.vertices = this.shape.wireframe
      if (this.normals === "SMOOTH") {
        result.normals =  this.shape.getWireframeNormals(this.shape.getSmoothNormals())
      } else if (this.normals === "FACETED") {
        result.normals =  this.shape.getWireframeNormals(this.shape.getFacetedNormals())
      }
    }
    if (this.colors && this.shell.multiple) {
      result.colors = this.shell.colors
    } else {
      result.color = this.shell.color
    }
    return result
  }

  scaleMatrix(x, y, z) {
    this.matrix.multiplyByScaleMatrix(x, y, z)
  }

  translationMatrix(x, y, z) {
    this.matrix.multiplyByTranslationMatrix(x, y, z)
  }

  rotationMatrix(angle, x, y, z) {
    this.matrix.multiplyByRotationMatrix(angle, x, y, z)
  }

  perspectiveMatrix(r, l, t, b, n, f) {
    this.matrix.multiplyByPerspectiveMatrix(r, l, t, b, n, f)
  }

  orthographicMatrix(r, l, t, b, n, f) {
    this.matrix.multiplyByOrthographicMatrix(r, l, t, b, n, f)
  }
  
  identityMatrix() {
    this.matrix.multiplyByIdentityMatrix()
  }
}