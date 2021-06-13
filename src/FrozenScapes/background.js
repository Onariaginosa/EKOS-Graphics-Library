import {
  Group,
  CubeShape,
  DiamondShape
} from "../FrozenStandardLibrary/FrozenStandardLibrary"
import { Snowgie } from "./characters/Characters"

export default class Background {
  constructor() {
    this.group = new Group({})
    this.snowflakes = null
    this.addAll()
    this.jumpCurrent = 0
    this.jumpDirection = 1
    this.jumpMax = 0.1
  }

  addAll = () => {
    this.snowflakes = makeAllSnowflakes(-1, -2, -1.2)
    this.snowflakes.wireframe()
    this.group.add(this.snowflakes)
    this.audience = addAudience(0, -4, -2)
    this.group.add(this.audience)
    this.group.add(makeStage(-4, -2, -7))
  }

  animate = () => {
    this.jumpCurrent = this.jumpCurrent + 0.1 * this.jumpDirection
    this.audience.movePosition(0, this.jumpCurrent, 0)
    if (this.jumpCurrent >= this.jumpMax || this.jumpCurrent <= -this.jumpMax) {
      this.jumpDirection *= -1
    }
    this.snowflakes.rotationMatrix(0.5, 0, 0, 1)
  }
}

const BLACK = { r: 0, g: 0, b: 0 }
const LIGHTBLUE = { r: 173 / 255, g: 218 / 255, b: 247 / 255 }

const makeStage = (x, y, z) => {
  let s = new CubeShape({ color: BLACK })
  s.Composite.scaleMatrix(8, 2, 8)
  s.Composite.rotationMatrix(20, 1, 1, 0)
  s.Composite.translationMatrix(x, y, z)
  return s.Composite
}

const makeSnowflakePart = (x, y, z, a) => {
  let s = new DiamondShape({ color: LIGHTBLUE })
  s.Composite.rotationMatrix(a, 0, 1, 1)
  s.Composite.scaleMatrix(0.2, 0.2, 0.2)
  s.Composite.translationMatrix(x, y, z)
  return s.Composite
}

const makeSnowflake = (x, y, z) => {
  let g = new Group({})
  g.add(makeSnowflakePart(x, y + 0.05, z, 180))
  g.add(makeSnowflakePart(x - 0.05, y, z, 120))
  g.add(makeSnowflakePart(x + 0.05, y, z, -120))
  g.add(makeSnowflakePart(x - 0.05, y + 0.05, z, 240))
  g.add(makeSnowflakePart(x + 0.05, y + 0.05, z, -240))
  g.add(makeSnowflakePart(x - 0.08, y, z, 0))
  g.add(makeSnowflakePart(x + 0.08, y, z, 0))
  return g
}

const makeAllSnowflakes = (x, y, z) => {
  const g = new Group({})
  g.add(makeSnowflake(x + 0.5, y + 6.5, z))
  g.add(makeSnowflake(x + 0.75, y + 9.5, z))
  g.add(makeSnowflake(x + 3, y + 7, z))
  g.add(makeSnowflake(x + 2.5, y + 5, z))
  g.add(makeSnowflake(x + 1, y + 4, z))
  g.add(makeSnowflake(x + 1.5, y + 6.5, z))
  g.add(makeSnowflake(x + 2.5, y + 6, z))
  g.add(makeSnowflake(x + 3.5, y + 5, z))
  g.add(makeSnowflake(x + 1.5, y + 8.5, z))
  g.add(makeSnowflake(x + 2.5, y + 9.5, z))
  g.add(makeSnowflake(x + 3.5, y + 6.5, z))
  g.add(makeSnowflake(x - 9, y + 4, z))
  g.add(makeSnowflake(x - 1, y + 3, z))
  g.add(makeSnowflake(x - 2, y + 4.5, z))
  g.add(makeSnowflake(x - 3, y + 6, z))
  g.add(makeSnowflake(x - 4, y + 5, z))
  g.add(makeSnowflake(x - 1.5, y + 8.5, z))
  g.add(makeSnowflake(x - 2.5, y + 9.5, z))
  g.add(makeSnowflake(x - 1.5, y + 5, z))
  g.add(makeSnowflake(x - 2.5, y + 8, z))
  g.add(makeSnowflake(x - 3.5, y + 7, z))
  g.add(makeSnowflake(x - 4.5, y + 8.5, z))
  g.add(makeSnowflake(x - 5.5, y + 9.5, z))
  g.add(makeSnowflake(x - 6, y + 6.5, z))
  g.add(makeSnowflake(x - 5.5, y + 4.5, z))
  g.add(makeSnowflake(x - 7, y + 6.5, z))
  g.add(makeSnowflake(x - 8, y + 7, z))
  g.add(makeSnowflake(x - 7.5, y + 6, z))
  g.add(makeSnowflake(x - 6.5, y + 9, z))
  g.add(makeSnowflake(x - 8, y + 7, z))
  g.add(makeSnowflake(x - 9, y + 8.5, z))
  g.add(makeSnowflake(x - 8.5, y + 9, z))
  return g
}

const addAudience = (x, y, z) => {
  const g = new Group({})
  let s_1 = new Snowgie(x - 9, y, z)
  g.add(s_1.group)
  let s_3 = new Snowgie(x - 7, y, z)
  g.add(s_3.group)
  let s_4 = new Snowgie(x - 6.4, y, z)
  g.add(s_4.group)
  let s_9 = new Snowgie(x - 1, y, z)
  g.add(s_9.group)
  let s_10 = new Snowgie(x + 0.4, y, z)
  g.add(s_10.group)
  let s_13 = new Snowgie(x - 7.7, y - 0.5, z)
  g.add(s_13.group)
  let s_14 = new Snowgie(x - 5.8, y - 0.5, z)
  g.add(s_14.group)
  let s_16 = new Snowgie(x - 1.8, y - 0.5, z)
  g.add(s_16.group)
  let s_17 = new Snowgie(x - 0.4, y - 0.5, z)
  g.add(s_17.group)
  return g
}