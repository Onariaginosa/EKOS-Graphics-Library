import Vector from "./Vector"

const getCameraMatrix = (x, y, z, ...other) => {
  let p = new Vector(x, y, z)
  let q, u
  if (other.length === 6) {
    q = new Vector(other[0], other[1], other[2])
    u = new Vector(other[3], other[4], other[5])
  } else {
    q = new Vector(0, y, -1)
    u = new Vector(0, 1, 0)
  }

  let ze = p.subtract(q).unit
  let ye = u.subtract(u.projection(ze)).unit
  let xe = ye.cross(ze)
  
  return [
    xe.x, ye.x, ze.x, 0,
    xe.y, ye.y, ze.y, 0,
    xe.z, ye.z, ze.z, 0,
    -p.dot(xe), -p.dot(ye), -p.dot(ze), 1
  ]
}

export default getCameraMatrix