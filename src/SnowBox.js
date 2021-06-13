import { useState, useEffect, useRef } from "react"
import {
  Scene,
  Group,
  HexagonalPrismShape,
  DiamondShape,
  PentagonalPyramidShape,
  TrapezodialPrismShape,
  CubeShape,
  IcosahedronShape,
  SphereShape,
  Camera,
  DiffuseLight,
} from "./FrozenStandardLibrary/FrozenStandardLibrary"

const group = new Group({})
const camera = new Camera({ x: -2, y: 0, z: 0, right: -4, left: 4, top: -4, bottom: 4, near: -2, far: 4 })
const diffuse = new DiffuseLight({ positon: [-4, 2, 0] })

const hex = new HexagonalPrismShape({ color: { r: 1, g: 0.5, b: 0.8 } })
hex.Composite.scaleMatrix(1.5, 1.5, 1.5)
hex.Composite.translationMatrix(-2, -1, -2)
group.add(hex.Composite)

const dia = new DiamondShape({ color: { r: 0, g: 0.5, b: 0.3 } })
dia.Composite.translationMatrix(-2.5, -4.5, 1)
dia.Composite.rotationMatrix(180, 1, 1, 0)
group.add(dia.Composite)

const pyr = new PentagonalPyramidShape({ color: { r: 0.8, g: 1, b: 1 } })
pyr.Composite.translationMatrix(-0.5, -1, 0)
pyr.Composite.smooth()
group.add(pyr.Composite)

const zoi = new TrapezodialPrismShape({ color: { r: 0.4, g: 1, b: 1 } })
zoi.Composite.translationMatrix(0, -1, 1)
zoi.Composite.smooth()
group.add(zoi.Composite)

const cube = new CubeShape({})
cube.Composite.translationMatrix(-2, -3.5, 2)
group.add(cube.Composite)

const ico = new IcosahedronShape({})
ico.Composite.translationMatrix(-3.25, 2.5, 0)
ico.Composite.scaleMatrix(0.5, 0.5, 0.5)
group.add(ico.Composite)

const ere = new SphereShape({ widthSegments: 10, heightSegments: 10, color: { r: 1, g: 0.7, b: 0.2 } })
ere.Composite.translationMatrix(-2, -3, 0)
group.add(ere.Composite)

group.solid()
group.translationMatrix(0, 1, 0)
ere.Composite.wireframe()
cube.Composite.wireframe()

const SnowBox = props => {
  const [universe, setUniverse] = useState(null)
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const scene = new Scene(canvas, camera)
    // Build the objects to display.
    scene.add(group)
    scene.illuminate(diffuse)

    // Animates the scene.
    let animationActive = false
    let previousTimestamp = null

    const FRAMES_PER_SECOND = 60
    const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND

    const DEGREES_PER_MILLISECOND = 0.033
    const FULL_CIRCLE = 360.0

    let currentRotation = 0.0

    const advanceScene = timestamp => {
      // Check if the user has turned things off.
      if (!animationActive) {
        return
      }

      // Initialize the timestamp.
      if (!previousTimestamp) {
        previousTimestamp = timestamp
        window.requestAnimationFrame(advanceScene)
        return
      }

      // Check if it's time to advance.
      var progress = timestamp - previousTimestamp
      if (progress < MILLISECONDS_PER_FRAME) {
        // Do nothing if it's too soon.
        window.requestAnimationFrame(advanceScene)
        return
      }

      currentRotation += DEGREES_PER_MILLISECOND * progress
      scene.drawScene()
      if (currentRotation >= FULL_CIRCLE) {
        currentRotation -= FULL_CIRCLE
      }


      // Request the next frame.
      previousTimestamp = timestamp
      window.requestAnimationFrame(advanceScene)
    }

    // Draw the initial scene.
    scene.drawScene()

    setUniverse({
      toggleRotation: () => {
        // animationActive = false
        animationActive = !animationActive
        if (animationActive) {
          // commented out because she is very sus!
          window.requestAnimationFrame(advanceScene)
        }
      }
    })
  }, [canvasRef])

  // Set up the rotation toggle: clicking on the canvas does it.

  const handleCanvasClick = event => universe.toggleRotation()

  return (
    <article>
      {/* Yes, still square. */}
      <canvas width="512" height="512" ref={canvasRef} onClick={universe && handleCanvasClick} >
        Your favorite update-your-browser message here.
      </canvas>
    </article>
  )
}

export default SnowBox
