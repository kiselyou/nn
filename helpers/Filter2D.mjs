import { normalize } from './../lib/int.mjs'
import objectPath from 'object-path'

export default class Filter2D {

    /**
     *
     * @param {ImageData} imgData
     * @returns {ImageData}
     */
    static inverse(imgData) {
        const pixels = imgData.data
        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = 255 - pixels[i]
            pixels[i + 1] = 255 - pixels[i + 1]
            pixels[i + 2] = 255 - pixels[i + 2]
        }
        return imgData
    }

    /**
     *
     * @param {Number[]|Float32Array} pixels
     * @param {Number} [offset]
     * @param {Number[]} [indexes]
     * @returns {Float32Array}
     */
    static grayscale(pixels, offset = 4, indexes = [0, 1, 2, 3]) {
        const result = new Float32Array(pixels.length)
        for (let i = 0; i < pixels.length; i += offset) {
            let sum = 0
            for (let index of indexes) {
                sum += pixels[i + index]
            }

            sum = sum / indexes.length

            for (let index = 0; index < offset; index++) {
                result[i + index] = indexes.includes(index) ? sum : pixels[i + index]
            }
        }
        return result
    }

    /**
     *
     * @param {Number[]|Float32Array} pixels
     * @param {Number} [offset]
     * @param {Number[]} [indexes]
     * @returns {Float32Array}
     */
    static normalize(pixels, offset = 4, indexes = [0, 1, 2, 3]) {
        const min = 0
        const max = 255
        const normal = new Float32Array(pixels.length)

        for (let i = 0; i < pixels.length; i += offset) {
            for (let index of indexes) {
                normal[i + index] = normalize(pixels[i + index], min, max)
            }
        }
        return normal
    }

    /**
     *  const pixels = [
     *      1, 1, 1, 1, 1, 1, 1,
     *      1, 1, 1, 1, 1, 1, 1,
     *      1, 1, 1, 1, 1, 1, 1,
     *      1, 1, 1, 1, 1, 1, 1,
     *      1, 1, 1, 1, 1, 1, 1,
     *      1, 1, 1, 1, 1, 1, 1,
     *  ]
     *
     *  7 pixels per row
     *  1 pixel border
     *  Example: Filter2D.alignment(pixels, 7)
     *
     *  const output = [
     *      0, 0, 0, 0, 0, 0, 0, 0, 0,
     *      0, 1, 1, 1, 1, 1, 1, 1, 0,
     *      0, 1, 1, 1, 1, 1, 1, 1, 0,
     *      0, 1, 1, 1, 1, 1, 1, 1, 0,
     *      0, 1, 1, 1, 1, 1, 1, 1, 0,
     *      0, 1, 1, 1, 1, 1, 1, 1, 0,
     *      0, 1, 1, 1, 1, 1, 1, 1, 0,
     *      0, 0, 0, 0, 0, 0, 0, 0, 0,
     *  ]
     *
     *  7 pixels per row
     *  2 pixels border
     *  Example: Filter2D.alignment(pixels, 7, 2)
     *
     *  const arr3 = [
     *      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     *      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     *      0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
     *      0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
     *      0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
     *      0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
     *      0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
     *      0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
     *      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     *      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     *  ]
     *
     * @param {Number[]|Float32Array} pixels
     * @param {number} size - count pixels per row
     * @param {number|Array} [borderSize]
     * @param value
     * @returns {number[]}
     */
    static alignment(pixels, size, borderSize = 1, value = 0) {
        let result = []

        for (let b = 0; b < borderSize; b++) {
            const row = Array.from({ length: size + (borderSize * 2) }).map(() => value)
            result = result.concat(row)
        }

        for (let i = 0; i < pixels.length; i += size) {
            for (let b = 0; b < borderSize; b++) {
                result.push(value)
            }
            for (let index = 0; index < size; index++) {
                result.push(pixels[i + index])
            }
            for (let b = 0; b < borderSize; b++) {
                result.push(value)
            }
        }

        for (let b = 0; b < borderSize; b++) {
            const row = Array.from({ length: size + (borderSize * 2) }).map(() => value)
            result = result.concat(row)
        }
        return result
    }

    /**
     * const pixels = [
     *    0, 0, 0, 0, 0, 0,
     *    0, 4, 3, 1, 1, 0,
     *    0, 7, 5, 1, 1, 0,
     *    0, 1, 1, 1, 1, 0,
     *    0, 1, 1, 1, 1, 0,
     *    0, 0, 0, 0, 0, 0,
     * ]
     *
     * const keras = [
     *    [1, 2, 1],
     *    [2, 4, 2],
     *    [1, 2, 1],
     * ]
     *
     * Hidden layer
     * [
     *    0, 0, 0, | 0, 0, 0, | 0, 0, 0, | 0, 0, 0,
     *    0, 4, 3, | 4, 3, 1, | 3, 1, 1, | 1, 1, 0,
     *    0, 7, 5, | 7, 5, 1, | 5, 1, 1, | 1, 1, 0,
     *
     *    0, 4, 3, | 4, 3, 1, | 3, 1, 1, | 1, 1, 0,
     *    0, 7, 5, | 7, 5, 1, | 5, 1, 1, | 1, 1, 0,
     *    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,
     *
     *    0, 7, 5, | 7, 5, 1, | 5, 1, 1, | 1, 1, 0,
     *    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,
     *    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,
     *
     *    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,
     *    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,
     *    0, 0, 0, | 0, 0, 0, | 0, 0, 0, | 0, 0, 0,
     * ]
     *
     * Calculation example:
     *  (1 * 0 + 2 * 0 + 1 * 0) + (2 * 0 + 4 * 4 + 2 * 3) + (1 * 0 + 2 * 7 + 1 * 5) = 41
     *  (1 * 0 + 2 * 0 + 1 * 0) + (2 * 4 + 4 * 3 + 2 * 1) + (1 * 7 + 2 * 5 + 1 * 1) = 40
     *  (1 * 0 + 2 * 0 + 1 * 0) + (2 * 3 + 4 * 1 + 2 * 1) + (1 * 5 + 2 * 1 + 1 * 1) = 20
     *  (1 * 0 + 2 * 0 + 1 * 0) + (2 * 1 + 4 * 1 + 2 * 0) + (1 * 1 + 2 * 1 + 1 * 0) = 9
     *
     *  (1 * 0 + 2 * 4 + 1 * 3) + (2 * 0 + 4 * 7 + 2 * 5) + (1 * 0 + 2 * 1 + 1 * 1) = 52
     *  (1 * 4 + 2 * 3 + 1 * 1) + (2 * 7 + 4 * 5 + 2 * 1) + (1 * 1 + 2 * 1 + 1 * 1) = 51
     *  (1 * 3 + 2 * 1 + 1 * 1) + (2 * 5 + 4 * 1 + 2 * 1) + (1 * 1 + 2 * 1 + 1 * 1) = 26
     *  (1 * 1 + 2 * 1 + 1 * 0) + (2 * 1 + 4 * 1 + 2 * 0) + (1 * 1 + 2 * 1 + 1 * 0) = 12
     *
     *  (1 * 0 + 2 * 7 + 1 * 5) + (2 * 0 + 4 * 1 + 2 * 1) + (1 * 0 + 2 * 1 + 1 * 1) = 28
     *  (1 * 7 + 2 * 5 + 1 * 1) + (2 * 1 + 4 * 1 + 2 * 1) + (1 * 1 + 2 * 1 + 1 * 1) = 30
     *  (1 * 5 + 2 * 1 + 1 * 1) + (2 * 1 + 4 * 1 + 2 * 1) + (1 * 1 + 2 * 1 + 1 * 1) = 20
     *  (1 * 1 + 2 * 1 + 1 * 0) + (2 * 1 + 4 * 1 + 2 * 0) + (1 * 1 + 2 * 1 + 1 * 0) = 12
     *
     *  (1 * 0 + 2 * 1 + 1 * 1) + (2 * 0 + 4 * 1 + 2 * 1) + (1 * 0 + 2 * 0 + 1 * 0) = 9
     *  (1 * 1 + 2 * 1 + 1 * 1) + (2 * 1 + 4 * 1 + 2 * 1) + (1 * 0 + 2 * 0 + 1 * 0) = 12
     *  (1 * 1 + 2 * 1 + 1 * 1) + (2 * 1 + 4 * 1 + 2 * 1) + (1 * 0 + 2 * 0 + 1 * 0) = 12
     *  (1 * 1 + 2 * 1 + 1 * 0) + (2 * 1 + 4 * 1 + 2 * 0) + (1 * 0 + 2 * 0 + 1 * 0) = 9
     *
     * const output = [
     *   41, 40, 20, 9,
     *   52, 51, 26, 12,
     *   28, 30, 20, 12,
     *   9, 12, 12, 9
     * ]
     *
     * @param {Number[]|Float32Array} pixels
     * @param {Number[][]} keras
     * @param {number} size - count pixels per row
     */
    static convolution(pixels, keras, size) {
        let row = 0
        let col = 0
        let step = (size - (keras[0].length - 1))
        let process = true
        let i = 1

        const map = []
        while (process) {
            let sum = 0
            for (let y = 0; y < keras.length; y++) {
                for (let x = 0; x < keras.length; x++) {
                    const index = (size * y + x) + row + col
                    sum += pixels[index] * keras[y][x]
                }
            }

            map.push(sum)

            if (i % step === 0) {
                row += size;
                col = 0
            } else {
                col++
            }
            i++
            if ((row + (keras.length - 1) * size) >= pixels.length) {
                process = false
            }
        }
        return map
    }
}