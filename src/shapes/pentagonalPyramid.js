import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"

const VERTICES = [
  [0, 0, 0.5], //peak of pyramid - point 0 - A

  [-1, 0, -0.5], // point 1 - B
  [-1, -1, -0.5], // point 2 - C

  [1, -1, -0.5], //point 3 - D
  [1, 0, -0.5], //point 4 - E

  [0, 1, -0.5] //point 5 - F
]

const FACES = [
  VERTICES[3], VERTICES[0], VERTICES[2], //DAC
  VERTICES[4], VERTICES[0], VERTICES[3], //EAD
  VERTICES[5], VERTICES[0], VERTICES[4], //FAE
  VERTICES[1], VERTICES[0], VERTICES[5], //BAF
  VERTICES[2], VERTICES[0], VERTICES[1], //CAB
  VERTICES[1], VERTICES[5], VERTICES[4], //BFE
  VERTICES[1], VERTICES[4], VERTICES[3], //BED
  VERTICES[2], VERTICES[1], VERTICES[3], //CBD
]

export default class PentagonalPyramidShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    this.Shape = new Shape({ vertices: FACES })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }
}