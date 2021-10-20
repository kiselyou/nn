import ArrayVector from './ArrayVector.mjs'
import objectPath from 'object-path'
import Vector from './Vector.mjs'

export default class MatrixPadding extends ArrayVector {
    /**
     * width size of matrix - Required
     * deep size of vector - Optional
     *
     * @param {Array} input
     * @param {Object|{ width: number, deep: number, top: 1, right: 1, bottom: 1, left: 1 }} options
     * @returns {MatrixPadding|Vector[]}
     */
    create(input, options = { width: undefined, deep: undefined, top: 1, right: 1, bottom: 1, left: 1 }) {
        const width = objectPath.get(options, ['width'])
        if (!width) {
            throw new Error("Incorrect parameter 'options.width'.")
        }

        const deep = objectPath.get(options, ['deep'], null) || 0
        let value = objectPath.get(options, ['value'], null) || 0
        value = deep === 0 ? value : new Vector().create(deep, value)

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

        const arrayVector = new ArrayVector().create(input, deep)
        const rows = super.create(arrayVector, width)

        for (let i = 0; i < rows.length; i++) {
            let row = []
            row = row.concat(new Vector().create(left, value)) // left border
            row = row.concat(rows[i]) // body
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