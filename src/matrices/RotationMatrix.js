/**
 * Based on the original glRotate reference:
 *     https://www.khronos.org/registry/OpenGL-Refpages/es1.1/xhtml/glRotate.xml
 * Also taken from Dondi's implementation 
 */

const getRotationMatrix = (angle, x, y, z) => {
  // In production code, this function should be associated
  // with a matrix object with associated functions.
  const axisLength = Math.sqrt(x * x + y * y + z * z)
  const s = Math.sin((angle * Math.PI) / 180.0)
  const c = Math.cos((angle * Math.PI) / 180.0)
  const oneMinusC = 1.0 - c

  // Normalize the axis vector of rotation.
  x /= axisLength
  y /= axisLength
  z /= axisLength

  // Now we can calculate the other terms.
  // "2" for "squared."
  const x2 = x * x
  const y2 = y * y
  const z2 = z * z
  const xy = x * y
  const yz = y * z
  const xz = x * z
  const xs = x * s
  const ys = y * s
  const zs = z * s

  // return [
  //   x2 * oneMinusC + c,
  //   xy * oneMinusC - zs,
  //   xz * oneMinusC + ys,
  //   0.0,

  //   xy * oneMinusC + zs,
  //   y2 * oneMinusC + c,
  //   yz * oneMinusC - xs,
  //   0.0,

  //   xz * oneMinusC - ys,
  //   yz * oneMinusC + xs,
  //   z2 * oneMinusC + c,
  //   0.0,

  //   0.0,
  //   0.0,
  //   0.0,
  //   1.0
  // ]

  // GL expects its matrices in column major order.
  return [
    x2 * oneMinusC + c,
    xy * oneMinusC + zs,
    xz * oneMinusC - ys,
    0.0,

    xy * oneMinusC - zs,
    y2 * oneMinusC + c,
    yz * oneMinusC + xs,
    0.0,

    xz * oneMinusC + ys,
    yz * oneMinusC - xs,
    z2 * oneMinusC + c,
    0.0,

    0.0,
    0.0,
    0.0,
    1.0
  ]
}

export default getRotationMatrix
