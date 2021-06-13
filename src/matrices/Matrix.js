import getOrthographicMatrix from "./OrthographicMatrix"
import getPerspectiveMatrix from "./PerspectiveMatrix"
import getRotationMatrix from "./RotationMatrix"
import getScaleMatrix from "./ScaleMatrix"
import getTranslationMatrix from "./TranslationMatrix"

const IDENTITY_MATRIX = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]

export default class Matrix {
  constructor({ matrix = IDENTITY_MATRIX }) {
    this.matrix = matrix
  }

  getFloat32() {
    return new Float32Array(this.matrix)
  }

  multiplyByIdentityMatrix() {
    this.matrix = this.multiply(IDENTITY_MATRIX)
  }

  multiplyByScaleMatrix(x, y, z) {
    this.matrix = this.multiply(getScaleMatrix(x, y, z))
  }

  multiplyByRotationMatrix(angle, x, y, z) {
    this.matrix = this.multiply(getRotationMatrix(angle, x, y, z))
  }

  multiplyByTranslationMatrix(x, y, z) {
    this.matrix = this.multiply(getTranslationMatrix(x, y, z))
  }

  multiplyByOrthographicMatrix(r, l, t, b, n, f) {
    let ortho = getOrthographicMatrix(r, l, t, b, n, f)
    this.matrix = this.multiplyPure(this.matrix, ortho)
  }

  multiplyByPerspectiveMatrix(r, l, t, b, n, f) {
    let perspective = getPerspectiveMatrix(r, l, t, b, n, f)
    this.matrix = this.multiplyPure(this.matrix, perspective)
  }

  dotProduct(i, j, other) {
    return (this.matrix[i] * other[j])
      + (this.matrix[i + 1] * other[j + 4])
      + (this.matrix[i + 2] * other[j + 8])
      + (this.matrix[i + 3] * other[j + 12])
  }

  orientMatrix(result) {
    let newResult = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < result.length; j += 4) {
        newResult.push(result[i + j])
      }
    }
    return newResult
  }

  multiplyPure(one, other) { 
    let result = []
    let column = 0
    for (let row = 0; row < one.length; row += 4) {
      for (let i = 0; i < one.length; i += 4) {
        result.push(this.dotProduct(i, column, other))
      }
      column++
    }
    return this.orientMatrix(result)
  }

  multiply(other) {
    let result = []
    let column = 0
    for (let row = 0; row < this.matrix.length; row += 4) {
      for (let i = 0; i < this.matrix.length; i += 4) {
        result.push(this.dotProduct(i, column, other))
      }
      column++
    }
    return this.orientMatrix(result)
  }
}