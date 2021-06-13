import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"

const VERTICES = [
  [0, 0, 0], // Point 0 --> A
  [0, 0.5, 0], // Point 1 --> B
  [0, 0.25, 0.5] // Point 2 --> C
]

const FACES = [
  VERTICES[0], VERTICES[1], VERTICES[2]
]

export default class TriangleShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    this.Shape = new Shape({ vertices: FACES })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }
}