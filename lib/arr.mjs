
export const createArray = (length, callback) => {
    return Array.from({ length: length }, callback)
}

export const arrayChunks = (arr, size) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size))
    }
    return chunks
}

export const toVector = (arr, offset = 4, indexes = [0, 1, 2, 3]) => {
    const res = []
    for (let i = 0; i < arr.length; i += offset) {
        const vector = []
        for (let index of indexes) {
            vector.push(arr[i + index])
        }
        res.push(vector)
    }
    return res
}

export const toFlatVector = (arr, offset = 4, indexes = [0, 1, 2, 3]) => {
    return toVector(arr, offset, indexes).flat()
}