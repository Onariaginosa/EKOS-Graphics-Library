import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"

export default class IcosahedronShape {
  constructor({ X = 0.525731112119133606, Z = 0.850650808352039932, color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    const VERTICES = [
      [-X, 0.0, Z],
      [X, 0.0, Z],
      [-X, 0.0, -Z],
      [X, 0.0, -Z],
      [0.0, Z, X],
      [0.0, Z, -X],
      [0.0, -Z, X],
      [0.0, -Z, -X],
      [Z, X, 0.0],
      [-Z, X, 0.0],
      [Z, -X, 0.0],
      [-Z, -X, 0.0]
    ]

    const FACES = [
      VERTICES[1], VERTICES[4], VERTICES[0],
      VERTICES[4], VERTICES[9], VERTICES[0],
      VERTICES[4], VERTICES[5], VERTICES[9],
      VERTICES[8], VERTICES[5], VERTICES[4],
      VERTICES[1], VERTICES[8], VERTICES[4],
      VERTICES[1], VERTICES[10], VERTICES[8],
      VERTICES[10], VERTICES[3], VERTICES[8],
      VERTICES[8], VERTICES[3], VERTICES[5],
      VERTICES[3], VERTICES[2], VERTICES[5],
      VERTICES[3], VERTICES[7], VERTICES[2],
      VERTICES[3], VERTICES[10], VERTICES[7],
      VERTICES[10], VERTICES[6], VERTICES[7],
      VERTICES[6], VERTICES[11], VERTICES[7],
      VERTICES[6], VERTICES[0], VERTICES[11],
      VERTICES[6], VERTICES[1], VERTICES[0],
      VERTICES[10], VERTICES[1], VERTICES[6],
      VERTICES[11], VERTICES[0], VERTICES[9],
      VERTICES[2], VERTICES[11], VERTICES[9],
      VERTICES[5], VERTICES[2], VERTICES[9],
      VERTICES[11], VERTICES[2], VERTICES[7],
    ]

    this.Shape = new Shape({ vertices: FACES })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }
}