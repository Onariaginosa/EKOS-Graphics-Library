import Vector from '../matrices/Vector'
export default class Shape {
  // VERTICES LOOK LIKE BELOW
  // Thus, user can make custom shapes, or use predefined shapes in Geometry constructor. 
  // Every three points make up a triangle to be used to draw a face. 
  // const VERTICES = [
  //   // Shape 1
  //   0, 0, 0 // point 1
  //   0, 0, 0 // point 2
  //   0, 0, 0 // point 3
  //   // Shape 2
  //   0, 0, 0 // point 1
  //   0, 0, 0 // point 2
  //   0, 0, 0 // point 3
  // ]
  // Optionally, in most Shape files that we have predefined, a user can 
  // organize shapes with a const FACES where every three vertices represents a triangle 
  // and then the FACES array be passed into the constructor. 
  // const FACES = [
  //   VERTICES[x], VERTICES[y], VERTICES[z] // triangle xyz
  // ]

  constructor({ vertices = null }) {
    Object.assign(this, { vertices, originalVertices: vertices })
    this.wireframe = this.getWireframeVertices()
    this.solid = this.getTriangleVertices()
  }

  getType() {
    return "Shape"
  }

  getTriangleVertices = () => {
    return this.vertices.flat()
  }

  getWireframeVertices = () => {
    const vertices = []
    for (let i = 0; i < this.vertices.length; i += 3) {
      // creates proper line segments
      vertices.push(this.vertices[i])
      vertices.push(this.vertices[i + 1])

      vertices.push(this.vertices[i + 1])
      vertices.push(this.vertices[i + 2])

      vertices.push(this.vertices[i])
      vertices.push(this.vertices[i + 2])
    }
    return vertices.flat()
  }

  getFacetedNormals() {
    let p0, p1, p2, A, B, N
    let normals = []
    for (let i = 0; i < this.vertices.length; i += 3) {
      p0 = new Vector(this.vertices[i][0], this.vertices[i][1], this.vertices[i][2])
      p1 = new Vector(this.vertices[i + 1][0], this.vertices[i + 1][1], this.vertices[i + 1][2])
      p2 = new Vector(this.vertices[i + 2][0], this.vertices[i + 2][1], this.vertices[i + 2][2])

      A = p1.subtract(p0)
      B = p2.subtract(p0)
      N = A.cross(B)
      //Pushed normals to match the vertices
      for (let j = 0; j < 3; j++) {
        normals.push(...N.elements)
      }
    }
    return normals
  }

  getVertexName(vertex) {
    return `${vertex[0]}, ${vertex[1]}, ${vertex[2]}`
  }

  getWireframeNormals(normals) {
    const norm = []
    for (let i = 0; i < normals.length; i += 9) {
      // point 1 and point 2 normals
      norm.push(normals[i], normals[i + 1], normals[i + 2])
      norm.push(normals[i + 3], normals[i + 4], normals[i + 5])
      // point 2 and point 3 normals
      norm.push(normals[i + 3], normals[i + 4], normals[i + 5])
      norm.push(normals[i + 6], normals[i + 7], normals[i + 8])
      // point 1 and point 3 normals
      norm.push(normals[i], normals[i + 1], normals[i + 2])
      norm.push(normals[i + 6], normals[i + 7], normals[i + 8])
    }
    return norm
  }

  getSmoothNormals() {
    let seen = { }
    let p0, p1, p2, A, B, N, name
    let normals = []
    for (let i = 0; i < this.vertices.length; i += 3) {
      p0 = new Vector(this.vertices[i][0], this.vertices[i][1], this.vertices[i][2])
      p1 = new Vector(this.vertices[i + 1][0], this.vertices[i + 1][1], this.vertices[i + 1][2])
      p2 = new Vector(this.vertices[i + 2][0], this.vertices[i + 2][1], this.vertices[i + 2][2])

      A = p1.subtract(p0)
      B = p2.subtract(p0) //  B = p2.subtract(p1)
      N = A.cross(B)
      for (let j = 0; j < 3; j++) {
        name = this.getVertexName(this.vertices[i + j])
        if (seen[name] === undefined) {
          seen[name] = [N]
        } else {
          seen[name].push(N)
        }
      }
    }
    for (let norms in seen) {
      // Get updated normal
      for (let k = 1; k < seen[norms].length; k++) {
        //Add all the normal vectors
        seen[norms][0] = seen[norms][0].add(seen[norms][k])
      }
      seen[norms] = seen[norms][0].divide(seen[norms].length)
    }
    for (let vert of this.vertices) {
      // for each vertex get its normal
      normals.push(...seen[this.getVertexName(vert)].elements)
    }
    return normals
  }

  scaleVertices(x, y, z) {
    this.vertices = [...this.originalVertices]
    this.vertices = this.vertices.map(([a, b, c]) => [a * x, b * y, c * z])
    this.update()
  }

  movePosition(x, y, z) {
    this.vertices = this.vertices.map(([a, b, c]) => [a + x, b + y, c + z])
    this.update()
  }

  update() {
    this.wireframe = this.getWireframeVertices()
    this.solid = this.getTriangleVertices()
  }
}