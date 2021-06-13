import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"

const VERTICES = [
  // FRONT FACE
  [-1, -1, 0], // 0: Bottom Left - A
  [-0.25, -1, 0], // 1: Bottom Mid Left - B
  [0.25, -1, 0], // 2: Bottom Mid Right - C
  [1, -1, 0], // 3: Bottom Right - D
  [-0.25, -1, 1], // 4: Top Left - E 
  [0.25, -1, 1], // 5: Top Right - F 
  // BACK FACE
  [-1, 1, 0], // 6: Bottom Left - G
  [-0.25, 1, 0], // 7: Bottom Mid Left - H 
  [0.25, 1, 0], // 8: Bottom Mid Right - I
  [1, 1, 0], // 9: Bottom Right - J
  [-0.25, 1, 1], // 10: Top Left - K
  [0.25, 1, 1], // 11: Top Right - L
]

const FACES = [
  // TOP
  VERTICES[5], VERTICES[10], VERTICES[4], //FKE  
  VERTICES[5], VERTICES[11], VERTICES[10], //FLK 
  // FRONT
  VERTICES[1], VERTICES[4], VERTICES[0], // BEA
  VERTICES[2], VERTICES[4], VERTICES[1], //CEB 
  VERTICES[2], VERTICES[5], VERTICES[4], //CFE 
  VERTICES[3], VERTICES[5], VERTICES[2], //DFC
  // RIGHT
  VERTICES[9], VERTICES[5], VERTICES[3], //JFD 
  VERTICES[9], VERTICES[11], VERTICES[5], //JLF
  // BACK
  VERTICES[7], VERTICES[6],  VERTICES[10], //HKG
  VERTICES[8], VERTICES[7],  VERTICES[10],  //IKH
  VERTICES[8], VERTICES[10], VERTICES[11], //ILK
  VERTICES[9], VERTICES[8],  VERTICES[11], //JLI 

  VERTICES[10], VERTICES[7],  VERTICES[6], //HKG
  VERTICES[8],  VERTICES[7], VERTICES[10], //IKH
  VERTICES[8], VERTICES[10], VERTICES[11], //ILK
  VERTICES[9], VERTICES[8], VERTICES[11], //JLI
  // LEFT
  VERTICES[0], VERTICES[10], VERTICES[6], //AKG 
  VERTICES[0], VERTICES[4], VERTICES[10], //AEK
  // BOTTOM
  VERTICES[3], VERTICES[0], VERTICES[6], //DGA
  VERTICES[3], VERTICES[6], VERTICES[9], //DJG
]

export default class TrapezodialPrismShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null }) {
    this.Shape = new Shape({ vertices: FACES })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }
}