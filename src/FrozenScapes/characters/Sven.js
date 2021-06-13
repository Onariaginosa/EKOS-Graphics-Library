import {
  Group,
  SphereShape,
  HexagonalPrismShape,
  CubeShape,
} from "../../FrozenStandardLibrary/FrozenStandardLibrary"

export default class ChimeySven {
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
    this.toAnimate = toAnimate(this.x, this.y, this.z)
    this.group.add(this.toAnimate)
    let body = makeBody(this.x, this.y, this.z)
    this.group.add(body)
  }

  animate = () => {
    this.toAnimate.rotationMatrix(-70, 0, 1, 1)
  }
}

const BLACK = { r: 0, g: 0, b: 0 }
const WHITE = { r: 1, g: 1, b: 1 }
const DARKBROWN = { r: 0.44, g: 0.35, b: 0.27 }
const SNOUTBROWN = { r: 0.42, g: 0.31, b: 0.38 }
const MAINBROWN = { r: 0.56, g: 0.53, b: 0.48 }
const CREME = { r: 0.79, g: 0.76, b: 0.64 }
const SILVER = { r: 0.45, g: 0.46, b: 0.48 }

const makeHead = (x, y, z) => {
  let g = new Group({})
  g.add(head(x, y, z))
  g.add(eyes(x - 0.2, y + 0.1, z + .34, 0.25, WHITE))
  g.add(eyes(x + 0.2, y + 0.1, z + .34, 0.25, WHITE))
  g.add(eyes(x - 0.2, y + 0.1, z + .43, 0.15, BLACK))
  g.add(eyes(x + 0.2, y + 0.1, z + .43, 0.15, BLACK))
  g.add(snout(x, y - 0.2, z + 0.3))
  g.add(eyes(x - 0.1, y - 0.1, z + 0.5, 0.06, BLACK))
  g.add(eyes(x + 0.1, y - 0.1, z + 0.5, 0.06, BLACK))
  antlerAdd(x, y, z, g)
  trianglesAdd(g, x, y, z)
  return g
}

const makeBody = (x, y, z) => {
  let g = new Group({})
  g.add(mainbody(x, y - 0.7, z - 0.2))
  g.add(leg(x - 0.2, y - 0.9, z + 0.2, false))
  g.add(leg(x + 0.2, y - 0.9, z + 0.2, false))
  g.add(leg(x - 0.35, y - 1, z - 0.3, -45, true))
  g.add(leg(x + 0.3, y - 1, z - 0.3, 45, true))
  return g
}

const toAnimate = (x, y, z) => {
  let g = new Group({})
  g.add(ears(x - 0.33, y + 0.25, z - 0.1))
  g.add(ears(x + 0.33, y + 0.25, z - 0.1))
  g.add(mouth(x, y - 0.3, z + .5))
  return g
}

const head = (x, y, z) => {
  const h = new SphereShape({ widthSegments: 10, heightSegments: 10, color: MAINBROWN })
  h.Composite.scaleMatrix(0.75, 0.75, 0.75)
  h.Composite.translationMatrix(x, y, z)
  return h.Composite
}

const eyes = (x, y, z, s, c) => {
  let e = new SphereShape({ widthSegments: 10, heightSegments: 10, color: c })
  e.Composite.scaleMatrix(s, s, s)
  e.Composite.translationMatrix(x, y, z)
  return e.Composite
}

const snout = (x, y, z) => {
  let s = new SphereShape({ widthSegments: 10, heightSegments: 10, color: SNOUTBROWN })
  s.Composite.scaleMatrix(0.4, 0.45, 0.5)
  s.Composite.translationMatrix(x, y, z)
  return s.Composite
}

const ears = (x, y, z) => {
  let e = new HexagonalPrismShape({ color: DARKBROWN })
  e.Composite.scaleMatrix(0.4, 0.4, 0.4)
  e.Composite.rotationMatrix(180, 1, 1, 0)
  e.Composite.translationMatrix(x, y, z)
  return e.Composite
}

const mouth = (x, y, z) => {
  let m = new CubeShape({ color: WHITE })
  m.Composite.scaleMatrix(0.26, 0.1, 0.1)
  m.Composite.translationMatrix(x, y, z)
  return m.Composite
}

const antler = (x, y, z, r) => {
  let a = new CubeShape({ color: CREME })
  a.Composite.scaleMatrix(0.1, 0.3, 0.1)
  a.Composite.rotationMatrix(r, 0, 1, 1)
  a.Composite.translationMatrix(x, y, z)
  return a.Composite
}

const antlerAdd = (x, y, z, g) => {
  let a_1 = antler(x + 0.15, y + 0.4, z, -45)
  g.add(a_1)
  let a_2 = antler(x + 0.3, y + 0.6, z, -90)
  g.add(a_2)
  let a_3 = antler(x + 0.1, y + 0.6, z, 60)
  g.add(a_3)
  let a_4 = antler(x + 0.5, y + 0.75, z, -90)
  g.add(a_4)
  let a_5 = antler(x + 0.3, y + 0.75, z, 60)
  g.add(a_5)
  let a_6 = antler(x + 0.7, y + 0.9, z, -90)
  g.add(a_6)
  let a_7 = antler(x + 0.5, y + 0.9, z, 60)
  g.add(a_7)
  let a_8 = antler(x + 0.85, y + 1.08, z, -45)
  g.add(a_8)
  let a_9 = antler(x + 0.9, y + 0.9, z, -270)
  g.add(a_9)
  let a_10 = antler(x - 0.15, y + 0.4, z, 45)
  g.add(a_10)
  let a_11 = antler(x - 0.3, y + 0.6, z, 90)
  g.add(a_11)
  let a_12 = antler(x - 0.1, y + 0.6, z, -60)
  g.add(a_12)
  let a_13 = antler(x - 0.5, y + 0.75, z, 90)
  g.add(a_13)
  let a_14 = antler(x - 0.3, y + 0.75, z, -60)
  g.add(a_14)
  let a_15 = antler(x - 0.7, y + 0.9, z, 90)
  g.add(a_15)
  let a_16 = antler(x - 0.5, y + 0.9, z, -60)
  g.add(a_16)
  let a_17 = antler(x - 0.85, y + 1.08, z, 45)
  g.add(a_17)
  let a_18 = antler(x - 0.9, y + 0.9, z, 270)
  g.add(a_18)
}

const mainbody = (x, y, z) => {
  let b = new SphereShape({ widthSegments: 10, heightSegments: 10, color: MAINBROWN })
  b.Composite.scaleMatrix(0.8, 1, 0.8)
  b.Composite.translationMatrix(x, y, z)
  return b.Composite
}

const leg = (x, y, z, a, back) => {
  let l;
  if (back) {
    l = new CubeShape({ color: DARKBROWN })
    l.Composite.scaleMatrix(0.2, 0.4, 0.2)
    l.Composite.rotationMatrix(a, 0, 1, 1)
  } else {
    l = new CubeShape({ color: DARKBROWN })
    l.Composite.scaleMatrix(0.2, 0.7, 0.2)
  }
  l.Composite.translationMatrix(x, y, z)
  return l.Composite
}

const makeChime = (x, y, z, r, c, horizontal) => {
  let h = new CubeShape({ color: c })
  h.Composite.scaleMatrix(0.05, 0.4, 0.05)
  if (horizontal) {
    h.Composite.rotationMatrix(r, 1, 1, 0)
  } else {
    h.Composite.rotationMatrix(r, 0, 1, 1)
  }
  h.Composite.translationMatrix(x, y, z)
  return h.Composite
}

const trianglesAdd = (g, x, y, z) => {
  let t_1 = makeChime(x + 0.7, y + 0.4, z, -45, SILVER, false)
  g.add(t_1)
  let t_2 = makeChime(x + 0.875, y + 0.4, z, 45, SILVER, false)
  g.add(t_2)
  let t_3 = makeChime(x + 0.77, y + 0.25, z, 180, SILVER, true)
  g.add(t_3)
  let string_1 = makeChime(x + 0.8, y + 0.7, z, 360, WHITE, false)
  g.add(string_1)
  let t_4 = makeChime(x - 0.7, y + 0.4, z, 45, SILVER, false)
  g.add(t_4)
  let t_5 = makeChime(x - 0.875, y + 0.4, z, -45, SILVER, false)
  g.add(t_5)
  let t_6 = makeChime(x - 0.77, y + 0.25, z, 180, SILVER, true)
  g.add(t_6)
  let string_2 = makeChime(x - 0.8, y + 0.7, z, 360, WHITE, false)
  g.add(string_2)
}