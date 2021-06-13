import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"

const VERTICES = [
  [-0.5, -0.5, -0.5], //0: Bottom Left - A
  [0.5, -0.5, -0.5], //1: Bottom Right - B
  [-0.5, 0.5, -0.5], //2: Top Left - C
  [0.5, 0.5, -0.5], //3: Top Right - D

  [-0.5, -0.5, 0.5], //0: Bottom Left - E
  [0.5, -0.5, 0.5], //1: Bottom Right - F
  [-0.5, 0.5, 0.5], //2: Top Left - G
  [0.5, 0.5, 0.5], //3: Top Right - H
]

const FACES = [
  VERTICES[2], VERTICES[1], VERTICES[0], //CBA
  VERTICES[2], VERTICES[3], VERTICES[1], //CDB

  VERTICES[6], VERTICES[5], VERTICES[4], //GFE
  VERTICES[6], VERTICES[7], VERTICES[5], //GHF

  VERTICES[0], VERTICES[6], VERTICES[4], //AGE
  VERTICES[0], VERTICES[2], VERTICES[6], //ACG

  VERTICES[2], VERTICES[3], VERTICES[6], //CDG
  VERTICES[3], VERTICES[7], VERTICES[6], //DHG

  VERTICES[3], VERTICES[1], VERTICES[7], //DBH
  VERTICES[1], VERTICES[5], VERTICES[7], //BFH

  VERTICES[1], VERTICES[0], VERTICES[5], //BAF
  VERTICES[0], VERTICES[4], VERTICES[5], //AEF
]

export default class CubeShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    this.Shape = new Shape({ vertices: FACES })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }
}
