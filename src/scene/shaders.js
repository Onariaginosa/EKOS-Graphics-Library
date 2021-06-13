// Slightly-leveled-up GLSL shaders.

const VERTEX_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

attribute vec3 vertexPosition;

// Note this new additional output.
attribute vec3 vertexColor;
varying vec4 finalVertexColor;

uniform mat4 projectionMatrix;
uniform mat4 objectMatrix;
uniform mat4 cameraMatrix;
attribute vec3 lightPosition;
attribute vec3 normals;

void main(void) {
  vec3 lightVector = normalize(lightPosition - vertexPosition);
  vec3 transformedNormal = normalize(((objectMatrix * vec4(normals, 1.0)).xyz));
  float contribution = max(dot(lightVector, transformedNormal), 0.0);

  gl_Position =  projectionMatrix * cameraMatrix * objectMatrix * vec4(vertexPosition, 1.0);
  finalVertexColor = vec4( contribution * vertexColor, 1.0);
}
`

const FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

varying vec4 finalVertexColor;

void main(void) {
  // We vary the color based on the fragment's z coordinate,
  // which, at this point, ranges from 0 (near) to 1 (far).
  // Note the ".rgb" subselector.
  gl_FragColor = finalVertexColor;
}
`

export { VERTEX_SHADER, FRAGMENT_SHADER }