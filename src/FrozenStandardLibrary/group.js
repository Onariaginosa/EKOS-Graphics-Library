import { Matrix } from "./FrozenStandardLibrary"

export default class Group {
  constructor({ composites = [], groups = [], scale = [1, 1, 1], position = [0, 0, 0] }) {
    Object.assign(this, { composites, groups, scale, position })
    this.matrix = new Matrix({ })
  }

  wireframe() {
    this.composites.forEach(c => {
      c.wireframe()
    })
    this.groups.forEach(g => {
      g.wireframe()
    })
  }

  solid() {
    this.composites.forEach(c => {
      c.solid()
    })
    this.groups.forEach(g => {
      g.solid()
    })
  }

  smooth() {
    this.composites.forEach(c => {
      c.smooth()
    })
    this.groups.forEach(g => {
      g.smooth()
    })
  }

  faceted() {
    this.composites.forEach(c => {
      c.faceted()
    })
    this.groups.forEach(g => {
      g.faceted()
    })
  }

  isEmpty() {
    return this.composites.length === 0
  }

  getType() {
    return "Group"
  }

  getAveragePosition() {
    let children = [...this.composites, ...this.groups]
    if (this.isEmpty()) {
      return [0, 0, 0]
    } else {
      let pos = [0, 0, 0]
      for (let c of children) {
        pos = [pos[0] + c.position[0], pos[1] + c.position[1], pos[2] + c.position[2]]
      }
      this.position = pos.map(x => x / children.length)
    }
  }

  add(object) {
    if (object.getType() === "Composite") {
      if (!this.composites.includes(object)) {
        this.composites.push(object)
      }
    } else if (object.getType() === "Group") {
      if (!this.groups.includes(object)) {
        this.groups.push(object)
      }
    }
    if ((this.composites.length + this.groups.length) === 1) {
      this.getAveragePosition()
    }
  }

  remove(object) {
    if (object.getType() === "Group") {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i] === object) {
          this.groups.splice(i, 1)
        }
      }
    }
    else if (object.getType() === "Composite") {
      for (let i = 0; i < this.composites.length; i++) {
        if (this.composites[i] === object) {
          this.composites.splice(i, 1)
        }
      }
    }
  }

  getPositionX() {
    return this.position[0]
  }

  getPositionY() {
    return this.position[1]
  }

  getPositionZ() {
    return this.position[2]
  }

  setPosition(x, y, z) {
    let children = [...this.composites, ...this.groups]
    let delta = [x - this.position[0], y - this.position[1], z - this.position[2]]
    this.position = [x, y, z]
    for (let c of children) {
      c.movePosition(delta[0], delta[1], delta[2])
    }
  }

  movePosition(x, y, z) {
    let children = [...this.composites, ...this.groups]
    for (let c of children) {
      c.movePosition(x, y, z)
    }
    this.position = [x + this.position[0], y + this.position[1], z + this.position[2]]
  }

  setScale(x, y, z) {
    if (this.isEmpty()) {
      return
    }
    // Because scale is based on original vertices, must set position right after
    for (let c of this.composites) {
      c.shape.scaleVertices(x, y, z)
      c.shape.movePosition(this.position[0], this.position[1], this.position[2])
    }
    for (let g of this.groups) {
      g.setScale(x, y, z)
    }
  }

  generateObjectsToDraw(gl) {
    let toDraw = []
    for (let c of this.composites) {
      toDraw.push(c.generateObjectToDraw(gl))
    }

    for (let g of this.groups) {
      toDraw.push(...g.generateObjectsToDraw(gl))
    }
    return toDraw
  }

  scaleMatrix(x, y, z) {
    this.matrix.multiplyByScaleMatrix(x, y, z)
    this.updateChildrenMatrix()
  }

  translationMatrix(x, y, z) {
    this.matrix.multiplyByTranslationMatrix(x, y, z)
    this.updateChildrenMatrix()
  }

  rotationMatrix(angle, x, y, z) {
    this.matrix.multiplyByRotationMatrix(angle, x, y, z)
    this.updateChildrenMatrix()
  }

  perspectiveMatrix(r, l, t, b, n, f) {
    this.matrix.multiplyByPerspectiveMatrix(r, l, t, b, n, f)
    this.updateChildrenMatrix()
  }

  orthographicMatrix(r, l, t, b, n, f) {
    this.matrix.multiplyByOrthographicMatrix(r, l, t, b, n, f)
    this.updateChildrenMatrix()
  }
  
  identityMatrix() {
    this.matrix.multiplyByIdentityMatrix()
    this.updateChildrenMatrix()
  }

  updateChildrenMatrix() {
    for (let c of this.composites) {
      c.matrix.matrix = (this.matrix.multiply(c.matrix.matrix))
    }
    for (let g of this.groups) {
      g.matrix.matrix = (this.matrix.multiply(g.matrix.matrix))
      g.updateChildrenMatrix()
    }
  }
}