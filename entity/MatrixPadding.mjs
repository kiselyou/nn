import ArrayVector from './ArrayVector.mjs'
import objectPath from 'object-path'
import Vector from './Vector.mjs'

export default class MatrixPadding extends ArrayVector {
    /**
     * @param {Matrix} matrix
     * @param {Object|{ top: 1, right: 1, bottom: 1, left: 1, value: 0 }} options
     * @returns {MatrixPadding|Vector[]}
     */
    create(matrix, options = { top: 1, right: 1, bottom: 1, left: 1, value: 0 }) {
        const width = matrix.width
        let value = objectPath.get(options, ['value'], 0)
        value = new Vector().create(matrix.deep, value)

        const top = objectPath.get(options, ['top'], null) || 0
        const left = objectPath.get(options, ['left'], null) || 0
        const right = objectPath.get(options, ['right'], null) || 0
        const bottom = objectPath.get(options, ['bottom'], null) || 0

        const result = []
        const  length = width + left + right
        // top border
        for (let i = 0; i < top; i++) {
            result.push(new Vector().create(length, value))
        }

        for (let i = 0; i < matrix.length; i++) {
            let row = []
            row = row.concat(new Vector().create(left, value))  // left border
            row = row.concat(matrix[i])                         // body
            row = row.concat(new Vector().create(right, value)) // right border
            result.push(row)
        }

        // bottom border
        for (let i = 0; i < bottom; i++) {
            result.push(new Vector().create(length, value))
        }

        this.set(result)
        return this
    }
}
