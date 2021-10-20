
export default class Vector extends Array {

    /**
     *
     * @param {number[]} input
     * @returns {Vector|number[]}
     */
    set(input) {
        this.reset()
        for (let i = 0; i < input.length; i++) {
            this.push(input[i])
        }
        return this
    }

    /**
     *
     * @param {number} length
     * @param {Vector|number[]|number} [value]
     * @returns {Vector}
     */
    create(length, value = 0) {
        this.reset()
        const input = Array.from({ length }).map(() => value)
        for (let i = 0; i < input.length; i++) {
            this[i] = input[i]
        }
        return this
    }

    /**
     *
     * @returns {Vector}
     */
    reset() {
        this.splice(0, this.length)
        return this
    }

    /**
     *
     * @param {Vector|number[]} a
     * @param {Vector|number[]} b
     * @returns {Vector}
     */
    multiplyVectors(a, b) {
        for (let i = 0; i < a.length; i++) {
            this[i] = a[i] * b[i]
        }
        return this
    }

    /**
     *
     * @param {Vector|number[]} v
     * @returns {Vector}
     */
    multiply(v) {
        for (let i = 0; i < v.length; i++) {
            this[i] = (this[i] || 0) * v[i]
        }
        return this
    }

    /**
     *
     * @param {Vector[]} inputs
     * @returns {Vector}
     */
    addVectors(inputs) {
        for (let i = 0; i < inputs.length; i++) {
            this.addVector(inputs[i])
        }
        return this
    }

    /**
     *
     * @param {Vector|number[]} v
     * @returns {Vector}
     */
    addVector(v) {
        for (let i = 0; i < v.length; i++) {
            this[i] = (this[i] || 0) + v[i]
        }
        return this
    }

    /**
     *
     * @param {number} index
     * @returns {number|?}
     */
    value(index) {
        return this[index] || null
    }
}