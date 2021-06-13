const getOrthographicMatrix = (l, r, t, b, n, f) => {
    return [
        (2 / (r - l)),
        0,
        0,
        0,

        0,
        (2 / ((b - t))),
        0,
        0,

        0,
        0,
        -2 / (f - n),
        0,

        -((r + l) / (r - l)),
        -((t + b) / (t - b)),
        -((f + n) / (f - n)),
        1
    ]
}

export default getOrthographicMatrix