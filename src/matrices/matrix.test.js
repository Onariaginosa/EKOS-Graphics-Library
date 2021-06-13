import { Matrix } from "../FrozenStandardLibrary/FrozenStandardLibrary"

const identity_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]

describe('Matrix initialization', () => {
  it('Matrix initializes to Identity Matrix', () => {
    const m = new Matrix({})

    expect(m.matrix).toEqual(identity_matrix)
  })
  it('Gets expected identity matrix, test 1', () => {
    const a = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]

    const m = new Matrix({ matrix: a })

    m.multiplyByIdentityMatrix()
      
    expect(m.matrix).toEqual(a)
  })
})

describe('Matrix multiplication', () => {
  it('Multiply, test 1', () => {
    const a = [1, 4, 3, 2, 7, 3, 2, 5, 5, 7, 3, 5, 3, 7, 4, 9]
    const b = [2, 5, 8, 4, 2, 3, 7, 6, 9, 6, 9, 9, 8, 2, 4, 5]
    const result = [53, 39, 71, 65, 78, 66, 115, 89, 91, 74, 136, 114, 128, 78, 145, 135]

    const m = new Matrix({ matrix: a })
    const other = new Matrix({ matrix: b })

    expect(m.multiply(other.matrix)).toEqual(result)
  })
  it('Multiply, test 2', () => {
    const a = [5, 2, 6, 1, 0, 6, 2, 0, 3, 8, 1, 4, 1, 8, 5, 6]
    const b = [7, 5, 8, 0, 1, 8, 2, 6, 9, 4, 3, 8, 5, 3, 7, 9]
    const result = [96, 68, 69, 69, 24, 56, 18, 52, 58, 95, 71, 92, 90, 107, 81, 142]

    const m = new Matrix({ matrix: a })
    const other = new Matrix({ matrix: b })

    expect(m.multiply(other.matrix)).toEqual(result)
  })
})


describe('Translation Matrix', () => {
  it('Gets expected translation matrix, test 1', () => {
    const result = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, -2, 8, 1]
  
    const m = new Matrix({})
      
    m.multiplyByTranslationMatrix(5, -2, 8)

    expect(m.matrix).toEqual(result)
  })
  it('Gets expected translation matrix, test 2', () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const result = [-39, 98, -57, 4, -75, 198, -113, 8, -111, 298, -169, 12, -147, 398, -225, 16]
          
    const m = new Matrix({ matrix: a })

    m.multiplyByTranslationMatrix(-10, 24, -15)

    expect(m.matrix).toEqual(result)
  })
})

describe('Scale Matrix', () => {
  it('Gets expected scale matrix, test 1', () => {
    const result = [2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1]

    const m = new Matrix({})

    m.multiplyByScaleMatrix(2, 2, 2)

    expect(m.matrix).toEqual(result)
  })
  it('Gets expected scale matrix, test 2', () => {
    const a = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    const result = [80, 75, 14, 13, 60, 55, 10, 9, 40, 35, 6, 5, 20, 15, 2, 1]

    const m = new Matrix({ matrix: a })
      
    m.multiplyByScaleMatrix(5, 5, 1)

    expect(m.matrix).toEqual(result)
  })
})

describe('Rotation Matrix', () => {
  it('Gets expected rotation matrix, test 1', () => {
    const result = [0.3333333333333334, 0.9106836025229592, -0.24401693585629247, 0,
          -0.24401693585629247, 0.3333333333333334, 0.9106836025229592, 0,
          0.9106836025229592, -0.24401693585629247, 0.3333333333333334, 0,
          0,0,0,1]

    const m = new Matrix({}) 

    m.multiplyByRotationMatrix(90, 1, 1, 1)

    expect(m.matrix).toEqual(result)
  })
  it('Gets expected rotation matrix, test 2', () => {
    const result = [0.989871835341472, -0.09519173979102621, 0.10531990444955419, 0, 
          0.10531990444955419,0.989871835341472,-0.09519173979102621,0,
         -0.09519173979102621,0.10531990444955419,0.989871835341472,0,
          0,0,0,1]

    const m = new Matrix({}) 

    m.multiplyByRotationMatrix(-10, 0.5, 0.5, 0.5)
      
    expect(m.matrix).toEqual(result)
  })
})

describe('Perspective Matrix', () => {
  it('Gets expected perspective matrix, test 1', () => {
    const result = [20, 0, 0, 0, 0, 20, 0, 0, 0, 0, -3, -1, 0, 0, -40, 0] 

    const m = new Matrix({}) 

    m.multiplyByPerspectiveMatrix(0.5, -0.5, 0.5, -0.5, 10, 20)

    expect(m.matrix).toEqual(result)
  })
  it('Gets expected perspective matrix, test 2', () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const result = [11, 13, -25, -3, 31, 33, -53, -7, 51, 53, -81, -11, 71, 73, -109, -15] 
    const m = new Matrix({ matrix: a }) 

    m.multiplyByPerspectiveMatrix(2, 1, 2, 1, 1, 2)

    expect(m.matrix).toEqual(result)
  })
})


describe('Orthographic Matrix', () => {
  it('Gets expected orthographic matrix, test 1', () => {
    const result = [-2, 0, 0, 0, 0, -2, 0, 0, 0, 0, -2, 0, 3, -3, -3, 1]  

    const m = new Matrix({}) 

    m.multiplyByOrthographicMatrix(2, 1, 2, 1, 1, 2)
      
    expect(m.matrix).toEqual(result)
  })
  it('Gets expected orthographic matrix, test 2', () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    const result = [10, -16, -18, 4, 14, -36, -38, 8, 18, -56, -58, 12, 22, -76, -78, 16] 
    const m = new Matrix({ matrix: a }) 

    m.multiplyByOrthographicMatrix(2, 1, 2, 1, 1, 2)
      
    expect(m.matrix).toEqual(result)
  })
})