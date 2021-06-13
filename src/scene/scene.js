import { VERTEX_SHADER, FRAGMENT_SHADER } from "./shaders"
import { getGL, initVertexBuffer, initSimpleShaderProgram } from "../glsl-utilities"
import Camera from "../FrozenStandardLibrary/camera"

export default class Scene {
  constructor(canvas, camera = new Camera({})) {
    this.canvas = canvas
    this.objects = {
      Group: [],
      Composite: []
    }
    this.lights = {
      Diffuse: [],
      Ambient: []
    }
    this.camera = camera

    this.setupScene()
    this.initShaders()
  }

  setupScene() {
    // Grab the WebGL rendering context.
    this.gl = getGL(this.canvas)
    if (!this.gl) {
      alert('No WebGL context found...sorry.')

      // No WebGL, no use going on...
      return
    }
    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0)
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  changeGlEnable(x = "DEPTH_TEST") {
    this.gl.enable(this.gl.enable[x])
  }

  changeGlClearColor(r, g, b, a) {
    this.gl.clearColor(r, g, b, a)
  }

  changeGlViewport(x, y, width, height) {
    this.gl.viewport(x, y, width, height)
  }

  add(object) {
    if (!this.objects[object.getType()].includes(object)) {
      this.objects[object.getType()].push(object)
    }
  }

  illuminate(light) {
    if (!this.lights[light.getType()].includes(light)) {
      this.lights[light.getType()].push(light)
    }
  }

  remove(object) {
    for (let i = 0; i < this.objects[object.getType()].length; i++) {
      if (this.objects[object.getType()][i] === object) {
        this.objects[object.getType()].splice(i, 1)
      }
    }
  }

  getDiffuseLightPositionBuffer(length) {
    let light = []
    let beamPosition = this.lights.Diffuse.length > 0 ? this.lights.Diffuse[0].getLightSource() : [0, 0, 0]
    for (let i = 0, maxi = length / 3; i < maxi; i += 1) {
      light = light.concat(...beamPosition)
    }
    return initVertexBuffer(this.gl, light)
  }

  generateObjectsToDraw() {
    const objects = []
    for (let c of this.objects.Composite) {
      objects.push(c.generateObjectToDraw(this.gl))
    }
    for (let g of this.objects.Group) {
      objects.push(...g.generateObjectsToDraw(this.gl))
    }
    return objects
  }

  initShaders() {
    // Initialize the shaders.
    let abort = false
    const shaderProgram = initSimpleShaderProgram(
      this.gl,
      VERTEX_SHADER,
      FRAGMENT_SHADER,
      // Very cursory error-checking here...
      shader => {
        abort = true
        alert('Shader problem: ' + this.gl.getShaderInfoLog(shader))
      },
      // Another simplistic error check: we don't even access the faulty
      // shader program.
      shaderProgram => {
        abort = true
        alert('Could not link shaders...sorry.')
      }
    )
    // If the abort variable is true here, we can't continue.
    if (abort) {
      alert('Fatal errors encountered; we cannot continue.')
      return
    }
    // All done --- tell WebGL to use the shader program from now on.
    this.gl.useProgram(shaderProgram)
    // Hold on to the important variables within the shaders.
    this.vertexPosition = this.gl.getAttribLocation(shaderProgram, 'vertexPosition')
    this.gl.enableVertexAttribArray(this.vertexPosition)
    this.vertexColor = this.gl.getAttribLocation(shaderProgram, 'vertexColor')
    this.gl.enableVertexAttribArray(this.vertexColor)
    this.lightPosition = this.gl.getAttribLocation(shaderProgram, 'lightPosition')
    this.gl.enableVertexAttribArray(this.lightPosition)
    this.normals = this.gl.getAttribLocation(shaderProgram, 'normals')
    this.gl.enableVertexAttribArray(this.normals)
    this.projectionMatrix = this.gl.getUniformLocation(shaderProgram, 'projectionMatrix')
    this.objectMatrix = this.gl.getUniformLocation(shaderProgram, 'objectMatrix')
    this.cameraMatrix = this.gl.getUniformLocation(shaderProgram, 'cameraMatrix')
  }

  drawObjectsSetup() {
    this.objectsToDraw = this.generateObjectsToDraw()
    // Pass the vertices to WebGL.
    this.objectsToDraw.forEach(objectToDraw => {
      objectToDraw.verticesBuffer = initVertexBuffer(this.gl, objectToDraw.vertices)
      objectToDraw.lightPosition = this.getDiffuseLightPositionBuffer(objectToDraw.vertices.length)
      objectToDraw.normals = initVertexBuffer(this.gl, objectToDraw.normals)

      if (!objectToDraw.colors) {
        // If we have a single color, we expand that into an array
        // of the same color over and over.

        objectToDraw.colors = []
        for (let i = 0, maxi = objectToDraw.vertices.length / 3; i < maxi; i += 1) {
          objectToDraw.colors = objectToDraw.colors.concat(
            objectToDraw.color.r,
            objectToDraw.color.g,
            objectToDraw.color.b
          )
        }
      }
      objectToDraw.colorsBuffer = initVertexBuffer(this.gl, objectToDraw.colors)
    })
    
    this.gl.uniformMatrix4fv(this.projectionMatrix, this.gl.FALSE, this.camera.getProjectionMatrix())
    this.gl.uniformMatrix4fv(this.cameraMatrix, this.gl.FALSE, this.camera.getCameraMatrix())
  }

 /*
  * Displays an individual object.
  */
  drawObject(object) {
    this.gl.uniformMatrix4fv(this.objectMatrix, this.gl.FALSE, object.matrix)
    // Set the varying colors.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.colorsBuffer)
    this.gl.vertexAttribPointer(this.vertexColor, 3, this.gl.FLOAT, false, 0, 0)
    // Set the diffuse light
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.lightPosition)
    this.gl.vertexAttribPointer(this.lightPosition, 3, this.gl.FLOAT, false, 0, 0)
    // Set the normals
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.normals)
    this.gl.vertexAttribPointer(this.normals, 3, this.gl.FLOAT, false, 0, 0)
    // Set the varying vertex coordinates.
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.verticesBuffer)
    this.gl.vertexAttribPointer(this.vertexPosition, 3, this.gl.FLOAT, false, 0, 0)
    this.gl.drawArrays(object.mode, 0, object.vertices.length / 3)
  }

 /*
  * Displays the scene.
  */
  drawScene() {
    this.drawObjectsSetup()
    // Clear the display.
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    // Display the objects.
    this.objectsToDraw.forEach(object => this.drawObject(object))
    // All done.
    this.gl.flush()
  }
}