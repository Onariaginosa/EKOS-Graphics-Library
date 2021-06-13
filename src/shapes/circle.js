import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"
// inspiration for the SphereShape class was drawn heavily from three.js' CircleGeometry on github : https://github.com/mrdoob/three.js/blob/master/src/geometries/CircleGeometry.js

// const phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI, thetaEnd = Math.min( thetaStart + thetaLength, Math.PI )

const thetaStart = 0, thetaLength = Math.PI * 2
export default class CircleShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null, radius = 0.5, segments = 20}) {
    Object.assign(this, { radius, segments : Math.max( 3, Math.floor( segments ) ) })
    this.generateVertices()
    this.Shape = new Shape({ vertices: this.vertices })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }

  generateVertices() {
    const indices = []
    const vertices = []
    let vertex = []

    vertices.push([0, 0, 0]);

    for (let s = 0, i = 3; s <= this.segments; s++, i += 3) {

      const segment = thetaStart + s / this.segments * thetaLength
      vertex.x = this.radius * Math.cos(segment)
      vertex.y = this.radius * Math.sin(segment)
      vertex.z = 0;

      vertices.push([vertex.x, vertex.y, vertex.z])

    }
    // indices

    for (let i = 1; i <= this.segments; i++) {
      indices.push(i, i + 1, 0)
    }
    let v = []
    for (let j = 0; j < indices.length; j += 3) {
      v.push(vertices[indices[j]], vertices[indices[j + 1]], vertices[indices[j+2]])
    }

    this.vertices = v
  }

}