const getPerspectiveMatrix = (r, l, t, b, n, f) => {
    return [
        (2 * n) / (r - l), 
        0, 
        0,
        0,

        0, 
        (2 * n) / (t - b), 
        0,
        0,
        
        (r + l) / (r - l), 
        (t + b) / (t - b),
        -(f + n) / (f - n),
        -1,

        0, 
        0, 
        (-2 * n * f) / (f - n),
        0
    ]
}

export default getPerspectiveMatrix