import Vector from './Vector.mjs'

export default class ArrayVector extends Vector {
    /**
     *
     * @param {Array} input
     * @param {number} [size] - Default is 0
     * @returns {ArrayVector}
     */
    create(input, size = 0) {
        if (size === 0) {
            return this.set(input)
        }
        const output = []
        for (let i = 0; i < input.length; i += size) {
            const arr = []
            for (let a = i; a < (i + size); a++) {
                const vector = input[a] || (size === 0 ? 0 : new Vector().create(size))
                arr.push(vector)
            }
            output.push(new Vector().set(arr))
        }

        this.set(output)
        return this
    }
}