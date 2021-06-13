import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"

const VERTICES = [
  // VERTICES FORM BOTTOM HEXAGON CLOCKWISE
  [0, 0, -0.25],            // A : 0 : CENTER BOTTOM
  [0.50, 0, -0.25],            // C : 1 
  [0.25, 0.50, -0.25],          // D : 2
  [-0.25, 0.50, -0.25],         // E : 3
  [-0.50, 0, -0.25],           // B : 4
  [-0.25, -0.50, -0.25],         // G : 5
  [0.25, -0.50, -0.25],         // F : 6
  // VERTICES FORM TOP HEXAGON CLOCKWISE
  [0, 0, 0.25],            // A : 7 : CENTER TOP
  [0.50, 0, 0.25],            // C : 8 
  [0.25, 0.50, 0.25],          // D : 9
  [-0.25, 0.50, 0.25],         // E : 10
  [-0.50, 0, 0.25],           // B : 11
  [-0.25, -0.50, 0.25],         // G : 12
  [0.25, -0.50, 0.25],         // F : 13
]

const FACES = [
  // BACK FACE HEXAGON
  VERTICES[0], VERTICES[2], VERTICES[1],     // ADC
  VERTICES[0], VERTICES[3], VERTICES[2],     // AED
  VERTICES[0], VERTICES[4], VERTICES[3],     // ABE
  VERTICES[0], VERTICES[5], VERTICES[4],     // AGB
  VERTICES[0], VERTICES[6], VERTICES[5],     // AFG
  VERTICES[0], VERTICES[1], VERTICES[6],     // ACF  
  // FRONT FACE HEXAGON
  VERTICES[7], VERTICES[9], VERTICES[8],     // ADC
  VERTICES[7], VERTICES[10], VERTICES[9],    // AED
  VERTICES[7], VERTICES[11], VERTICES[10],   // ABE
  VERTICES[7], VERTICES[12], VERTICES[11],   // AGB 
  VERTICES[7], VERTICES[13], VERTICES[12],   // AFG
  VERTICES[7], VERTICES[8], VERTICES[13],    // ACF

  // CD SIDE FACE
  VERTICES[1], VERTICES[2], VERTICES[8],
  VERTICES[9], VERTICES[8], VERTICES[2],
  // DE SIDE FACE
  VERTICES[2], VERTICES[3], VERTICES[9],
  VERTICES[10], VERTICES[9], VERTICES[3],

  // EB SIDE FACE 
  VERTICES[3], VERTICES[4], VERTICES[10],  
  VERTICES[11], VERTICES[10], VERTICES[4],
  VERTICES[4], VERTICES[3], VERTICES[10],
  VERTICES[11], VERTICES[10], VERTICES[4],

  // BG SIDE FACE
  VERTICES[4], VERTICES[5], VERTICES[11],
  VERTICES[12], VERTICES[11], VERTICES[5],

  // GF SIDE FACE
  VERTICES[5], VERTICES[6], VERTICES[12],
  VERTICES[13], VERTICES[12], VERTICES[6],

  // FC SIDE FACE
  VERTICES[6], VERTICES[1], VERTICES[13],
  VERTICES[8], VERTICES[13], VERTICES[1],
]

export default class HexagonalPrismShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    this.Shape = new Shape({ vertices: FACES })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }
}