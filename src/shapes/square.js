import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"

const VERTICES = [
  [-0.5, -0.5, 0], //0: Bottom Left - A
  [0.5, -0.5, 0], //1: Bottom Right - B
  [-0.5, 0.5, 0], //2: Top Left - C
  [0.5, 0.5, 0], //3: Top Right - D
]

const FACES = [
  VERTICES[1], VERTICES[2], VERTICES[0], //BCA 
  VERTICES[1], VERTICES[3], VERTICES[2], //BDC 
]

export default class SquareShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    this.Shape = new Shape({ vertices: FACES })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }
}