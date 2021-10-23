import Vector from './Vector.mjs'

export default class ArrayVector extends Vector {
    /**
     *
     * @param {Array} input
     * @param {number} [size] - Default is 0
     * @returns {ArrayVector|Vector}
     */
    create(input, size = 0) {
        if (size === 0) {
            return this.set(input)
        }
        const output = []
        for (let i = 0; i < input.length; i += size) {
            const arr = []
            for (let a = i; a < (i + size); a++) {
              if (input[a] === undefined) {
                const vector = size === 0 ? 0 : new Vector().create(size)
                arr.push(vector)
              } else {
                arr.push(input[a])
              }
            }
            output.push(new Vector().set(arr))
        }

        this.set(output)
        return this
    }

  /**
   *
   * @returns {number}
   */
  get width() {
    return this.hasOwnProperty(0) ? this[0].length : 0
  }

  /**
   *
   * @returns {number}
   */
  get deep() {
    return this.hasOwnProperty(0) && this[0].hasOwnProperty(0) ? this[0][0].length : 0
  }
}
