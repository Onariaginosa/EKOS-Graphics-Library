import { Shape, Shell, Composite } from "../FrozenStandardLibrary/FrozenStandardLibrary"
// inspiration for the SphereShape class was drawn heavily from three.js' SphereGeometry on github : https://github.com/mrdoob/three.js/blob/master/src/geometries/SphereGeometry.js 

const phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI, thetaEnd = Math.min( thetaStart + thetaLength, Math.PI )

export default class SphereShape {
  constructor({ color = { r: 0.6, g: 1, b: 1 }, colors = null, radius = 0.5, widthSegments = 10, heightSegments = 6 }) {
    Object.assign(this, { radius, widthSegments : Math.max( 3, Math.floor( widthSegments ) ), heightSegments : Math.max( 2, Math.floor( heightSegments ) ) })
    this.generateVertices()
    this.Shape = new Shape({ vertices: this.vertices })
    this.Shell = new Shell({ color, colors })
    this.Composite = new Composite({ shape: this.Shape, shell: this.Shell })
  }

  generateVertices() {
    let index = 0
		const indices = []
    const grid = []
		const vertex = []
    const vertices = []
    
    for (let iy = 0; iy <= this.heightSegments; iy++) {
      const verticesRow = []
      const v = iy / this.heightSegments
			for ( let ix = 0; ix <= this.widthSegments; ix ++ ) {
				const u = ix / this.widthSegments
				// vertex
				vertex.x = - this.radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength )
				vertex.y = this.radius * Math.cos( thetaStart + v * thetaLength )
				vertex.z = this.radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength )
        vertices.push([vertex.x, vertex.y, vertex.z])
        verticesRow.push( index ++ )
      }
      grid.push( verticesRow )
    }
    // indices
		for ( let iy = 0; iy < this.heightSegments; iy ++ ) {
			for ( let ix = 0; ix < this.widthSegments; ix ++ ) {
				const a = grid[ iy ][ ix + 1 ]
				const b = grid[ iy ][ ix ]
				const c = grid[ iy + 1 ][ ix ]
				const d = grid[ iy + 1 ][ ix + 1 ]
				if ( iy !== 0 || thetaStart > 0 ) indices.push( a, b, d )
				if ( iy !== this.heightSegments - 1 || thetaEnd < Math.PI ) indices.push( b, c, d )
			}
    }
    let v = []
    for (let j = 0; j < indices.length; j+= 3) {
      v.push(vertices[indices[j]], vertices[indices[j + 1]], vertices[indices[j + 2]])
    }
    this.vertices = v
  }
}