import {
  Group,
  DiamondShape,
  CubeShape,
  SphereShape,
} from "../../FrozenStandardLibrary/FrozenStandardLibrary"

export default class EarthGiant {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
    this.addAll(this.x, this.y, this.z)
    this.bounceMax = 0.2
    this.bounceCurrent = 0
    this.bounceDirection = 1
  }

  addAll(x, y, z) {
    this.group = new Group({})
    let b = makeBody(x, y, z - 1)
    let l = makeLegs(x, y - 1.8, z)
    let a = makeArms(x, y, z)
    let f = makeFace(x, y + 0.3, z + 1.5)
    this.group.add(b)
    this.group.add(l)
    this.group.add(a)
    this.group.add(f)
    this.group.faceted()
  }

  bounce() {
    this.bounceCurrent = this.bounceCurrent + 0.1 * this.bounceDirection
    this.group.movePosition(0, this.bounceCurrent, 0)
    if (this.bounceCurrent >= this.bounceMax || this.bounceCurrent <= -this.bounceMax) {
      this.bounceDirection *= -1
    }
  }

  translate(x, y, z) {
    this.addAll(this.x + x, this.y + y, this.z + z)
  }
}

const BLUEWHITE = { r: 0.4, g: 0.6, b: 0.8 }
const BLUEWHITER = { r: 0.45, g: 0.7, b: 0.85 }
const BLACK = { r: 0, g: 0, b: 0 }

const UpperBody = (x, y, z, sx, sy, sz, color) => {
  const b = new DiamondShape({ color })
  b.Composite.scaleMatrix(sx, sy, sz)
  b.Composite.translationMatrix(x, y, z)
  b.Composite.smooth()
  return b.Composite
}

const makeBody = (x, y, z) => {
  const g = new Group({})
  g.add(UpperBody(x, y, z, 3, 3, 0.75, BLUEWHITE))
  g.add(cube(x, y - 1, z, 1.5, 1, 1, BLUEWHITE))
  return g
}

const makeArms = (x, y, z) => {
  const g = new Group({})
  let l = cube(x - 0.85, y - 0.25, z - 0.75, 1.3, 0.5, 0.5, BLUEWHITER)
  let r = cube(x + 0.85, y-0.25, z - 0.75, 1.3, 0.5, 0.5, BLUEWHITER)
  g.add(l)
  g.add(r)
  return g
}

const cube = (x, y, z, sx, sy, sz, color) => {
  const c = new CubeShape({ color })
  c.Composite.scaleMatrix(sx, sy, sz)
  c.Composite.translationMatrix(x, y, z)
  return c.Composite
}

const eye = (x, y, z, s, color) => {
  let e = new SphereShape({ color })
  e.Composite.scaleMatrix(s, s, s)
  e.Composite.translationMatrix(x, y, z)
  return e.Composite
}

const makeFace = (x, y, z) => {
  const g = new Group({})
  g.add(cube(x, y, z - 2, 1, 1, 0.2, BLUEWHITE))
  g.add(cube(x, y, z - 1.6, 1, 0.2, 0.2, BLUEWHITER))
  g.add(cube(x, y, z - 1.5, 0.4, 0.1, 0.2, BLACK))
  g.add(eye(x - 0.25, y + 0.25, z - 1.5, 0.2, BLACK))
  g.add(eye(x + 0.25, y + 0.25, z - 1.5, 0.2, BLACK))
  return g
}
const makeLegs = (x, y, z) => {
  const g = new Group({})
  g.add(cube(x - 0.4, y, z - 1.5, 0.5, 0.75, 0.4, BLUEWHITE))
  g.add(cube(x + 0.4, y, z - 1.5, 0.5, 0.75, 0.4, BLUEWHITE))
  return g
}