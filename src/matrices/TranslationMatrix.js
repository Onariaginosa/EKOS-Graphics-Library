const getTranslationMatrix = (x, y, z) => {
    return [
        1,
        0,
        0,
        0,

        0,
        1,
        0,
        0,

        0,
        0,
        1,
        0,

        x,
        y,
        z,
        1
    ]
}

export default getTranslationMatrix 