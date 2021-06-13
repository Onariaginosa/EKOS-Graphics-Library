import { Matrix } from "./FrozenStandardLibrary"
import getCameraMatrix from "../matrices/CameraMatrix"
import { inv } from "mathjs"

export default class Camera {
  constructor({ x = 0, y = 0, z = 0, other = [], projection = "Orthographic", right = -4,  left = 4, top = -4, bottom = 4, near = 1, far = 6 }) {
    Object.assign(this, { projection, right, left, top, bottom, near, far, x, y, z })
    this.matrix = new Matrix({ matrix: getCameraMatrix(x, y, z, ...other) })
  }
  
  getViewMatrix() {
    return this.invert(this.matrix.matrix)
  }

  getProjectionMatrix() {
    let p = new Matrix({ })
    if (this.projection === "Orthographic") {
      p.multiplyByOrthographicMatrix(this.right, this.left, this.top, this.bottom, this.near, this.far)
    } else if (this.projection === "Perspective") {
      p.multiplyByPerspectiveMatrix(this.right, this.left, this.top, this.bottom, this.near, this.far)
    }
    return p.getFloat32()
  }

  getCameraMatrix() {
    return this.matrix.getFloat32()
  }

  invert(m) {
    let matrix = this.convertMatrixtoArray(m)
    inv(matrix)
    return this.convertArraytoMatrix(matrix)
  }

  convertMatrixtoArray(m) {
    let matrix = []
    for (let i = 0; i < m.length; i += 4) {
      matrix.push([m[i], m[i + 1], m[i + 2], m[i + 3]])
    }
    return matrix
  }

  convertArraytoMatrix(m) {
    return m.flat()
  }
}