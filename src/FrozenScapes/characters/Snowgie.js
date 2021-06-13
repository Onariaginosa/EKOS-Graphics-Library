import {
  Group,
  SphereShape,
  HexagonalPrismShape,
  SquareShape,
  PentagonalPyramidShape
} from "../../FrozenStandardLibrary/FrozenStandardLibrary"

export default class Snowgie {
  constructor(x, y, z) {
    this.group = new Group({})
    this.x = x
    this.y = y
    this.z = z
    this.toAnimate = null
    this.addAll()
  }

  addAll = () => {
    let head = makeHead(this.x, this.y, this.z)
    this.group.add(head)
    let body = makeBody(this.x, this.y, this.z)
    this.group.add(body)
  }
}

const BLACK = { r: 0, g: 0, b: 0 }
const WHITE = { r: 1, g: 1, b: 1 }
const LIGHTBLUE = { r: 173 / 255, g: 218 / 255, b: 247 / 255 }

const makeHead = (x, y, z) => {
  let g = new Group({})
  g.add(head(x, y, z))
  g.add(eyes(x - 0.1, y - 0.02, z + 0.25))
  g.add(eyes(x + 0.1, y + 0.03, z + 0.25))
  g.add(mouthSide(x + 0.03, y - 0.1, z + 0.25, 270))
  g.add(mouthSide(x - 0.03, y - 0.1, z + 0.25, 90))
  g.add(tooth(x, y - 0.11, z + 0.25))
  return g
}

const makeBody = (x, y, z) => {
  let g = new Group({})
  g.add(mainbody(x, y, z))
  g.add(leg(x - 0.15, y - 0.65, z))
  g.add(leg(x + 0.15, y - 0.65, z))
  return g
}

const head = (x, y, z) => {
  const h = new SphereShape({ widthSegments: 10, heightSegments: 10, color: WHITE })
  h.Composite.scaleMatrix(0.5, 0.5, 0.5)
  h.Composite.translationMatrix(x, y, z)
  return h.Composite
}

const eyes = (x, y, z) => {
  const e = new HexagonalPrismShape({ color: BLACK })
  e.Composite.scaleMatrix(0.15, 0.15, 0.15)
  e.Composite.translationMatrix(x, y, z)
  return e.Composite
}

const tooth = (x, y, z) => {
  const m = new SquareShape({ color: WHITE })
  m.Composite.scaleMatrix(0.1, 0.1, 0.1)
  m.Composite.translationMatrix(x, y, z)
  return m.Composite
}

const mouthSide = (x, y, z, r) => {
  const m = new PentagonalPyramidShape({ color: LIGHTBLUE })
  m.Composite.scaleMatrix(0.1, 0.1, 0.1)
  m.Composite.rotationMatrix(r, 0, 1, 1)
  m.Composite.translationMatrix(x, y, z)
  return m.Composite
}

const mainbody = (x, y, z) => {
  const m = new SphereShape({ widthSegments: 10, heightSegments: 10, color: WHITE })
  m.Composite.scaleMatrix(0.45, 0.45, 0.45)
  m.Composite.translationMatrix(x, y - 0.4, z)
  return m.Composite
}

const leg = (x, y, z) => {
  const l = new SphereShape({ widthSegments: 10, heightSegments: 10, color: WHITE })
  l.Composite.scaleMatrix(0.25, 0.25, 0.25)
  l.Composite.translationMatrix(x, y, z)
  return l.Composite
}