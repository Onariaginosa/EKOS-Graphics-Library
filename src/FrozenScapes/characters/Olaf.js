import {
   Group,
   SphereShape,
   IcosahedronShape,
   CubeShape,
   DiamondShape,
   PentagonalPyramidShape,
   HexagonalPrismShape,
} from "../../FrozenStandardLibrary/FrozenStandardLibrary"

export default class Olaf {
   constructor(x, y, z) {
      this.group = new Group({})
      this.x = x
      this.y = y
      this.z = z
      this.animateMouth = null
      this.mouthMax = 1
      this.mouthSize = 0.9
      this.mouthSml = 0.9
      this.mouthBg = 1.05
      this.count = 4
      this.dir = -1
      this.addAll(this.x, this.y, this.z)
   }

   addAll = (x, y, z) => {
      let head = constructHead(x, y, z)
      let body = constructBody(x, y - 1, z)
      let feet = constructFeet(x, y - 2.5, z)
      let arms = constructArms(x, y, z)
      let microphone = constructMicrophone(x + .6, y - .2, z)
      this.animateMouth = animateMouth(x, y - .25, z + .25, this.mouthSize, this.mouthSize, this.mouthSize)
      this.group.add(head)
      this.group.add(this.animateMouth)
      this.group.add(body)
      this.group.add(feet)
      this.group.add(arms)
      this.group.add(microphone)
      this.group.smooth()
   }

   sing = () => {
      this.animateMouth.setScale(this.mouthSize, this.mouthSize, this.mouthSize)

      if (this.count === 5 || this.count === 0) {
         this.dir *= -1
         if (this.count === 5) {
            this.mouthSize = this.mouthSml
         } else {
            this.mouthSize = this.mouthBg
         }
      }
      this.count += this.dir
   }
}

const OFFWHITE = { r: 251 / 255, g: 247 / 255, b: 245 / 255 }
const COALGRAY = { r: 54 / 255, g: 69 / 255, b: 79 / 255 }
const LIGHTGRAY = { r: 128 / 255, g: 128 / 255, b: 128 / 255 }
const BROWN = { r: 101 / 255, g: 67 / 255, b: 33 / 255 }
const ORANGE = { r: 237 / 255, g: 145 / 255, b: 33 / 255 }
const WHITE = { r: 1, g: 1, b: 1 }

const constructHead = (x, y, z) => {
   let headGroup = new Group({})
   let eyeL = constructEye(x - .2, y + .4, z + .3)
   let eyeR = constructEye(x + .2, y + .4, z + .3)
   headGroup.add(snowBall(x, y + .4, z - .1, .85, .97, .9, OFFWHITE))
   headGroup.add(carrotNose(x, y + .15, z + .5, .25, .6, .3, ORANGE, 180))
   headGroup.add(neck(x, y - .2, z, 1.1, 1.1, 1.1, OFFWHITE, 180))
   headGroup.add(twig(x, y + 1, z, .04, .7, .04, BROWN, 0))
   headGroup.add(twig(x - .1, y + 1, z, .04, .5, .04, BROWN, 45))
   headGroup.add(twig(x + .1, y + 1, z, .04, .5, .04, BROWN, -45))
   headGroup.add(eyeL)
   headGroup.add(eyeR)
   return headGroup
}

const constructBody = (x, y, z) => {
   let bodyGroup = new Group({})
   bodyGroup.add(snowBall(x, y, z, .9, .75, 1, OFFWHITE))
   bodyGroup.add(snowBall(x, y - .8, z, 1.4, 1.4, 1.4, OFFWHITE))
   bodyGroup.add(coal(x, y + .08, z + .47, .16, .16, .16, COALGRAY))
   bodyGroup.add(coal(x - .05, y - .5, z + .7, .2, .2, .2, COALGRAY))
   bodyGroup.add(coal(x + .02, y - 1, z + .7, .18, .18, .18, COALGRAY))
   return bodyGroup
}

const constructFeet = (x, y, z) => {
   let feetGroup = new Group({})
   feetGroup.add(snowBall(x + .3, y, z, .6, .5, .6, OFFWHITE))
   feetGroup.add(snowBall(x - .3, y, z, .6, .5, .6, OFFWHITE))
   return feetGroup
}

const constructArms = (x, y, z) => {
   let armGroup = new Group({})
   armGroup.add(twig(x - .7, y - 1.3, z, 1.2, .1, .1, BROWN, 50))
   armGroup.add(twig(x + .5, y - .7, z, 1.2, .1, .1, BROWN, 50))
   return armGroup
}

const constructEye = (x, y, z) => {
   let eyeGroup = new Group({})
   eyeGroup.add(snowBall(x, y, z, .3, .4, .3, WHITE))
   eyeGroup.add(snowBall(x, y + .02, z + .1, .15, .19, .15, COALGRAY))
   return eyeGroup
}

const constructMicrophone = (x, y, z) => {
   let microphoneGroup = new Group({})
   microphoneGroup.add(snowBall(x, y, z + .1, .35, .35, .35, LIGHTGRAY))
   microphoneGroup.add(twig(x + .15, y - .3, z, .15, .6, .15, COALGRAY, 45))
   return microphoneGroup
}

const animateMouth = (x, y, z) => {
   let mouthGroup = new Group({})
   mouthGroup.add(mouth(x, y, z, .7, .3, .7, COALGRAY))
   mouthGroup.add(twig(x, y + .08, z + .08, .3, .15, .2, WHITE, 0))
   return mouthGroup
}

const snowBall = (x, y, z, sx, sy, sz, color) => {
   const ball = new SphereShape({ widthSegments: 10, heightSegments: 10, color: color })
   ball.Composite.scaleMatrix(sx, sy, sz)
   ball.Composite.translationMatrix(x, y, z)
   return ball.Composite
}

const neck = (x, y, z, sx, sy, sz, color, rotation) => {
   const halse = new DiamondShape({ color: color })
   halse.Composite.scaleMatrix(sx, sy, sz)
   halse.Composite.rotationMatrix(rotation, 0, 1, 1)
   halse.Composite.translationMatrix(x, y, z)
   return halse.Composite
}

const coal = (x, y, z, sx, sy, sz, color) => {
   const lump = new IcosahedronShape({ color: color })
   lump.Composite.scaleMatrix(sx, sy, sz)
   lump.Composite.translationMatrix(x, y, z)
   return lump.Composite
}

const twig = (x, y, z, sx, sy, sz, color, rotation) => {
   const splinter = new CubeShape({ color: color })
   splinter.Composite.scaleMatrix(sx, sy, sz)
   splinter.Composite.rotationMatrix(rotation, 0, 1, 1)
   splinter.Composite.translationMatrix(x, y, z)
   return splinter.Composite
}

const carrotNose = (x, y, z, sx, sy, sz, color, rotation) => {
   const nose = new PentagonalPyramidShape({ color: color })
   nose.Composite.scaleMatrix(sx, sy, sz)
   nose.Composite.rotationMatrix(rotation, 0, 1, 1)
   nose.Composite.translationMatrix(x, y, z)
   return nose.Composite
}

const mouth = (x, y, z, sx, sy, sz, color) => {
   const smile = new HexagonalPrismShape({ color: color })
   smile.Composite.scaleMatrix(sx, sy, sz)
   smile.Composite.translationMatrix(x, y, z)
   return smile.Composite
}