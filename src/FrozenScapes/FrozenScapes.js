import { useState, useEffect, useRef } from "react"
import {
  Scene,
  Camera,
  DiffuseLight,
} from "../FrozenStandardLibrary/FrozenStandardLibrary"
import {
  Drums,
  EarthGiant,
  ChimeySven,
  Olaf,
} from "./characters/Characters"
import Background from "./background"
import LostInTheWoods from "../Audio/LostInTheWoods.mp3"

const camera1 = new Camera({ x: 0, y: 1.2, z: 0, right: -12, top: -10, })
const camera2 = new Camera({ x: 0, y: -1, z: 0, right: -12, top: -10 })
const camera3 = new Camera({ projection: 'Perspective', x: 2, y: 6, z: 3.5, left: -1, right: 1, top: 1, bottom: -1, near: 1, far: 1000 })
const camera4 = new Camera({ projection: 'Perspective', x: 2, y: 2, z: 5, left: -1, right: 1, top: 1, bottom: -1, near: 1, far: 1000 })

const diffuse = new DiffuseLight({ position: [-2, -0.5, -5] })

const background = new Background()
const sven = new ChimeySven(-1, -0.5, -4.5)
const olaf = new Olaf(-3.25, 1, -4)
const drumKit = new Drums(-6, -1, -4)
const earthGiantSpirit = new EarthGiant(-6, 1, -4)

const FrozenScapes = props => {
  const [universe, setUniverse] = useState(null)
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const scene = new Scene(canvas, camera1)
    scene.changeGlClearColor(0.86, 0.93, 1, 1)
    scene.illuminate(diffuse)
    scene.add(background.group)
    scene.add(sven.group)
    scene.add(olaf.group)
    scene.add(drumKit.group)
    scene.add(earthGiantSpirit.group)

    // Animates the scene.
    let animationActive = true
    let previousTimestamp = null

    let animationBand = false

    const FRAMES_PER_SECOND = 60
    const MILLISECONDS_PER_FRAME = 5000 / FRAMES_PER_SECOND

    const DEGREES_PER_MILLISECOND = 0.003
    const FULL_CIRCLE = 360.0

    let currentRotation = 0.0

    const advanceScene = timestamp => {

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

      // Check if the user has turned things off.
      background.animate()
      if (animationBand) {
        earthGiantSpirit.bounce()
        sven.animate()
        olaf.sing()
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

    previousTimestamp = null
    window.requestAnimationFrame(advanceScene)

    // Draw the initial scene.
    // scene.drawScene()

    setUniverse({
      toggleRotation: () => {
        animationBand = !animationBand
        if (animationActive) {
          previousTimestamp = null
          window.requestAnimationFrame(advanceScene)
        }
      },
      advanceTheScene: () => {
      },
      performers: [
        sven,
        olaf,
        earthGiantSpirit
      ],
      cast: [
        sven,
        olaf,
        earthGiantSpirit,
        background,
        drumKit
      ],
      scene: scene,
      cameras: [camera1, camera2, camera3, camera4],
    })
  }, [canvasRef])




  const audioEl = document.getElementsByClassName("audio-element")[0]
  let playing = false
  let visible = true
  let ortho = true
  let crowd = false

  // Set up the rotation toggle: clicking on the canvas does it.
  const handleCanvasClick = (event) => {
    if (visible) {
      universe.toggleRotation()
    }
    playAudio()
  }

  const playAudio = () => {
    if (visible) {
      if (!playing) {
        audioEl.play()
      } else {
        audioEl.pause()
      }
      playing = !playing
    }
  }

  const pauseAudio = () => {
    audioEl.currentTime = 0
    audioEl.pause()
  }

  const wireframe = () => {
    for (let c of universe.cast) {
      c.group.wireframe()
    }
    universe.scene.drawScene()
  }

  const solid = () => {
    for (let c of universe.cast) {
      c.group.solid()
    }
    universe.scene.drawScene()
  }

  const orthographic = () => {
    ortho = true
    if (crowd) {
      viewEntireShow()
    } else {
      viewPerformers()
    }
  }

  const perspective = () => {
    ortho = false
    if (crowd) {
      viewEntireShow()
    } else {
      viewPerformers()
    }
  }

  const viewPerformers = () => {
    crowd = false
    universe.scene.camera = ortho ? universe.cameras[0] : universe.cameras[2]
    universe.scene.drawScene()
  }

  const viewEntireShow = () => {
    crowd = true
    universe.scene.camera = ortho ? universe.cameras[1] : universe.cameras[3]
    universe.scene.drawScene()
  }

  const removeFromScene = () => {
    visible = false
    for (let cast of universe.performers) {
      universe.scene.remove(cast.group)
    }
    pauseAudio()
  }

  const removeAudienceFromBackground = () => {
    universe.cast[3].group.remove(universe.cast[3].audience)
  }

  const addAudienceToBackground = () => {
    universe.cast[3].group.add(universe.cast[3].audience)
  }

  const advanceTheScene = () => {
    handleCanvasClick()
    handleCanvasClick()
  }

  const addToScene = () => {
    visible = true
    for (let cast of universe.performers) {
      universe.scene.add(cast.group)
    }
    universe.scene.drawScene()
  }

  return (
    <article>
      <div>
        <canvas width="800" height="700" onLoad={universe && advanceTheScene} ref={canvasRef}>
          Your favorite update-your-browser message here.
        </canvas>
      </div>
      <div>
        <button onClick={universe && wireframe}>Wireframe View!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && solid}>Solid View!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && orthographic}>Orthographic Projection!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && perspective}>Perspective Projection!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && viewPerformers}>Cut out the Crowd!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && viewEntireShow}>Bring in the Crowd!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && removeAudienceFromBackground}>Melt the Crowd!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && addAudienceToBackground}>Regenerate the Crowd!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && removeFromScene}>Performers Go "Backstage"!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && addToScene}>Performers On Stage! </button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={universe && handleCanvasClick}>Make the Performers Jam Out! Or Freeze!</button>
        &nbsp;&nbsp;&nbsp;
        <audio className="audio-element">
          <source src={LostInTheWoods} ></source>
        </audio>
      </div>
    </article >
  )
}

export default FrozenScapes
