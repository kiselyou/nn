import ArrayVector from './ArrayVector.mjs'
import objectPath from 'object-path'

export default class Matrix extends ArrayVector {
    /**
     * width size of matrix - Required
     * deep size of vector - Optional
     *
     * @param {Array} input
     * @param {Object|{ width: number, deep: number }} options
     * @returns {Matrix}
     */
    create(input, options = { width: undefined, deep: undefined }) {
        const width = objectPath.get(options, ['width'])
        if (!width) {
            throw new Error("Incorrect parameter 'options.width'.")
        }
        const deep = objectPath.get(options, ['deep'], null) || 0
        const arrayVector = new ArrayVector().create(input, deep)
        super.create(arrayVector, width)
        return this
    }
}