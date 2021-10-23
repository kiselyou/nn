import ArrayVector from './ArrayVector.mjs'
import Vector from './Vector.mjs'
import objectPath from 'object-path'

export default class MatrixConvolution extends ArrayVector {
    /**
     *
     * @param {Array|Matrix} input
     * @param {Object|{ filter: Array, stepY: (number|?), stepX: (number|?) }} options
     * @returns {MatrixConvolution|Vector[]}
     */
    create(input, options = { filter: undefined, stepY: 1, stepX: 1 }) {
        const filter = objectPath.get(options, ['filter'])
        if (!Array.isArray(filter) || filter.length === 0) {
            throw new Error("Incorrect parameter 'options.filter'.")
        }

        let tmp = []
        const res = []
        const filterY = filter.length - 1
        const filterX = filter[0].length - 1
        const stepY = objectPath.get(options, ['stepY']) || 1
        const stepX = objectPath.get(options, ['stepX']) || 1

        let y = 0 // строка
        let x = 0 // колонка
        let isRowProcess = true
        while (isRowProcess) {
            // Если фильтр вышел за рамки матрицы по вертикали
            if (input[y + filterY] === undefined) {
                break
            }

            // Если фильтр вышел за рамки матрицы по горизонтали
            if (input[y + filterY][x + filterX] === undefined) {
                // Переход на новую строку с шагом.
                y += stepY
                // Переставить курсор в начало.
                x = 0

                res.push(new Vector().set(tmp))
                tmp = []
            }

            // Если фильтр вышел за рамки матрицы по вертикали
            if (input[y + filterY] === undefined) {
                break
            }

            const score = []
            for (let yy = 0; yy < filter.length; yy++) {
                for (let xx = 0; xx < filter[yy].length; xx++) {
                    const vector = input[y + yy][x + xx]
                    const filterVector = filter[yy][xx]
                    score.push(new Vector().multiplyVectors(vector, filterVector))
                }
            }

            tmp.push(new Vector().addVectors(score))

            // Переставить курсор с шагом.
            x += stepX
        }

        this.set(res)
        return this
    }
}
