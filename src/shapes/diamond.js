import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"

const VERTICES = [
  [0, 0, -1], // Point 0 --> A
  [0, -0.50, 0.25], // Point 1 --> B
  [0, 0, 1], // Point 2 --> C
  [0, 0.5, 0.25], // Point 3 --> D
  [0.5, 0, 0.25], // Point 4 --> E
  [-0.5, 0, 0.25]  // Point 5 --> F 
]

const FACES = [
  // Bottom of diamond
  VERTICES[0], VERTICES[3], VERTICES[5], // ADF
  VERTICES[0], VERTICES[4], VERTICES[3], // AED
  VERTICES[0], VERTICES[1], VERTICES[4], // ABE
  VERTICES[0], VERTICES[5], VERTICES[1], // AFB

  // Top of diamond 
  VERTICES[5], VERTICES[3], VERTICES[2], // FDC
  VERTICES[3], VERTICES[4], VERTICES[2], // DEC
  VERTICES[4], VERTICES[1], VERTICES[2], // EBC
  VERTICES[1], VERTICES[5], VERTICES[2], // BFC
]

export default class DiamondShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    this.Shape = new Shape({ vertices: FACES })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }
}