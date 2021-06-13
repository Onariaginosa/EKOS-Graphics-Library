import {
  Group,
  HexagonalPrismShape,
  CircleShape
} from "../../FrozenStandardLibrary/FrozenStandardLibrary"

export default class Drums {
  constructor(x, y, z) {
    this.group = new Group({})
    this.x = x
    this.y = y
    this.z = z
    this.addAll()
    this.animate = false;
  }

  addAll() {
    let bassDrum = makeBass(this.x, this.y, this.z)
    let highTom = makeHighTom(this.x - 0.25, this.y + 1, this.z)
    let midTom = makeMidTom(this.x - 1.5, this.y + 1, this.z)
    this.group.add(bassDrum)
    this.group.add(highTom)
    this.group.add(midTom)
  }
}

const CarribeanGreen = { r: 2 / 255, g: 195 / 255, b: 154 / 255 }
const CarribeanGreen2 = { r: 1 / 255, g: 180 / 255, b: 130 / 255 }
const White = { r: 1, g: 1, b: 1 }
const Black = { r: 0, g: 0, b: 0 }

const DrumShell = (x, y, z, sx, sy, sz, color) => {
  const s = new HexagonalPrismShape({ color, segments: 22 })
  s.Composite.scaleMatrix(sx, sy, sz)
  s.Composite.translationMatrix(x, y, z)
  return s.Composite
}

const DrumHead = (x, y, z, s, color) => {
  const h = new CircleShape({ color })
  h.Composite.scaleMatrix(s, s, s)
  h.Composite.translationMatrix(x, y, z)
  return h.Composite
}

const makeBass = (x, y, z) => {
  let group = new Group({})
  group.add(DrumShell(x, y, z, 2.1, 2, 2, CarribeanGreen))
  group.add(DrumHead(x, y, z - 0.52, 1.7, White))
  group.add(DrumHead(x, y, z + 0.51, 1.7, White))
  return group
}

const makeHighTom = (x, y, z) => {
  let group = new Group({})
  group.add(DrumShell(x + 1, y, z, 1.1, 1, 1, CarribeanGreen2))
  group.add(DrumHead(x + 1, y + .3, z + .11, 0.8, White))
  group.add(DrumHead(x + 1, y, z - .51, 0.8, Black))
  group.rotationMatrix(-155, 1, 1, 1)
  group.rotationMatrix(-155, 1, 1, 1)
  return group
}

const makeMidTom = (x, y, z) => {
  let group = new Group({})
  group.add(DrumShell(x + 1, y, z, 1.1, 1, 1, CarribeanGreen2))
  group.add(DrumHead(x + 1, y + .3, z - .11, 0.8, White))
  group.add(DrumHead(x + 1, y, z - .51, 0.8, Black))
  group.rotationMatrix(-150, 1, 1, 1)
  return group
}
