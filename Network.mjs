import { randomFloat } from './lib/int.mjs'
import { createArray } from './lib/arr.mjs'

export default class Network {
    constructor() {
        /**
         * - 0 input
         *          - 0 hidden
         * - 0 input              - 0 output
         *          - 0 hidden
         * - 0 input
         * @type {{countOfHiddenNeurons: number, countOfInputNeurons: number, countOfOutputNeurons: number}}
         */
        this.settings = {
            // 1. кол-во входных нейронов
            countOfInputNeurons: 3,
            // 2. кол-во скрытых нейронов
            countOfHiddenNeurons: 2,
            // 2. кол-во нейронов на выхлде
            countOfOutputNeurons: 1
        }

        /**
         * Веса первого слоя:
         *      [[.79, .44, .43, .49], [.85, .43, .29, .40], [.22, .63, .49, .46]]
         *          4 входных нерона
         *          3 скрытых нейронв
         *      [[.79, .44, .43, .49], [.85, .43, .29, .40]]
         *          4 входных нерона
         *          2 скрытых нейронв
         *      [[.79, .44, .43], [.85, .43, .29]]
         *          3 входных нерона
         *          2 скрытых нейронв
         *
         *
         * Example:
         *
         * @type {number[][]}
         */
        this.weightsInput = [[.79, .44, .43, .49], [.85, .43, .29, .40], [.22, .63, .49, .46]]//this.randomInputWeights(0, 1)

        /**
         * Веса скрытого слоя:
         *      [[.5, .52, .48], [.45, .62, .38]]
         *          3 скрытых нейрона
         *          2 выходных нейрон
         *      [[.5, .52, .48]]
         *          3 скрытых нейрона
         *          1 выходных нейрон
         *      [[.5, .52]]
         *          2 скрытых нейрона
         *          1 выходных нейрон
         *
         * @type {number[][]}
         */
        this.weightsHidden = [[.5, .52, .48]]//this.randomHiddenWeights(0, 1)
    }

    /**
     *
     * @param {number[]} inputs
     */
    predict(inputs) {
        // inputs           [1, 1, 0],
        // weightsInput     [[.79, .44, .43], [.85, .43, .29]]
        // input1           [1.23, 1.28]
        const input1 = Network.dot(inputs, this.weightsInput)
        // input1 [1.23, 1.28]
        // output1 [.77, .78]
        const output1 = Network.sigmoidMap(input1)
        console.log('input', input1, output1) //+

        // inputs:          [.77, .78]
        // weightsHidden:   [[.5, .52]]
        // output:          [.79]
        const input2 = Network.dot(output1, this.weightsHidden)
        // input2 [.79]
        // output2 [.69]
        const output2 = Network.sigmoidMap(input2)
        console.log('hidden', input2, output2) //+
        return output2
    }

    /**
     *
     * @param {number[]} inputs
     * @param {number[]} expectedPredict
     * @param {number} [learningRate]
     */
    train(inputs, expectedPredict, learningRate = 0.1) {
        // кол-во элементов inputs такое же как и кол-во this.weightsInput
        const input1 = Network.dot(inputs, this.weightsInput)
        const output1 = Network.sigmoidMap(input1)
        // console.log(input1) //+
        // console.log(output1) //+

        // кол-во элементов output1 больше чем this.weightsHidden либо ровно
        const input2 = Network.dot(output1, this.weightsHidden)
        const output2 = Network.sigmoidMap(input2)
        // console.log(input2) //+
        // console.log(output2) //+

        // error = actual - expected
        // error = 0.69 - 0 = 0.69
        const errors2 = Network.subArray(output2, expectedPredict)
        // console.log(errors2)
        const gradient2 =  Array.from(output2).map((v) => (v * (1 - v)))
        // console.log(gradient2)
        const weightsDelta2 = Array.from(errors2).map((v, i) => v * gradient2[i])
        // console.log(output1, weightsDelta2)

        for (let i = 0; i < weightsDelta2.length; i++) {
            this.weightsHidden[i] = this.weightsHidden[i].map((v, index) => {
                return v - output1[index] * learningRate * weightsDelta2[i]
            })
        }
        // console.log(this.weightsHidden) // +

        // console.log(weightsDelta2, this.weightsHidden)
        // weightsDelta2 = [ 0.14765457193684958 ], [[.5, .52]]
        const errors1 = Network.multiplyOne(weightsDelta2, this.weightsHidden)
        // console.log(errors1) //+


        const gradient1 = Array.from(output1).map((v) => (v * (1 - v)))
        // console.log(gradient1) //+

        const weightsDelta1 = Network.multiplyMany(gradient1, errors1)
        // const weightsDelta1 = Network.multiplyMany([0.17502339, 0.17022212], [[0.07214022, 0.07507449]])
        // const weightsDelta1 = Array.from(errors1).map((v, i) => v * gradient1[i])
        // console.log(weightsDelta1)

        for (let i = 0; i < this.weightsInput.length; i++) {
            // console.log(i)
            for (let a = 0; a < this.weightsInput[i].length; a++) {
                this.weightsInput[i][a] = this.weightsInput[i][a] - inputs[a] * learningRate * weightsDelta1[0][i]
            }
        }
        // for (let i = 0; i < weightsDelta1.length; i++) {
        //     this.weightsInput[i] = this.weightsInput[i].map((v, index) => {
        //         return v - inputs[index] * learningRate * weightsDelta1[i]
        //     })
        // }
        // console.log(this.weightsInput)

        // for (let i = 0; i < weightsDelta1.length; i++) {
        //     this.weightsInput[i] = this.weightsInput[i].map((v) => {
        //         return v - output1[i] * learningRate * weightsDelta2[i]
        //     })
        // }

        // console.log(weightsDelta1, this.weightsInput)
    }

    static sigmoidMap(inputs) {
        return inputs.map((v) => Network.sigmoid(v))
    }

    /**
     *
     * @param {number[]} inputs
     * @param {number[]} expected
     * @returns {number[]}
     */
    static subArray(inputs, expected) {
        return Array.from(inputs).map((value, index) => {
            return value - expected[index]
        })
    }

    /**
     * Example 1:
     *      inputs:  [1, 1, 0]
     *      weights: [[0.79, 0.44, 0.43], [0.85, 0.43, 0.29]]
     *      outputs: [1.23, 1.28] where [1 * 0.79 + 1 * 0.44 + 0 * 0.43, 1 * 0.85 + 1 * 0.43 + 0 * 0.29]
     * Example 2:
     *      inputs:  [0.77, 0.78]
     *      weights: [[0.5, 0.52]]
     *      outputs: [0.79] where [0.77 * 0.5 + 0.78 * 0.52]
     *
     * @param {number[]} inputs
     * @param {number[][]} weights
     * @returns {number[]}
     */
    static dot(inputs, weights) {
        let res = []
        for (let weight of weights) {
            let value = 0
            for (let i = 0; i < inputs.length; i++) {
                value += inputs[i] * weight[i]
            }
            res.push(value)
        }
        return res
    }

    /**
     * inputs: [ 0.14, 0.3 ]
     * weights: [[0.5, 0.52], [0.78, 0.64]]
     * outputs: [[0.14 * 0.5, 0.14 * 0.52], [0.3 * 0.78, 0.3 * 0.64]]
     *
     * @param inputs
     * @param weights
     * @returns {*[]}
     */
    static multiplyOne(inputs, weights) {
        const res = []
        for (let i = 0; i < weights.length; i++) {
            let arr = []
            for (let w of weights[i]) {
                arr.push(w * inputs[i])
            }
            res.push(arr)
        }
        return res
    }

    /**
     * inputs: [0.2, 0.3]
     * weights: [[0.4, 0.5], [0.7, 0.8]]
     * outputs: [[0.2 * 0.4, 0.3 * 0.5], [0.2 * 0.7, 0.3 * 0.8]]
     *
     * @param inputs
     * @param weights
     * @returns {*[]}
     */
    static multiplyMany(inputs, weights) {
        const res = []
        for (let i = 0; i < weights.length; i++) {
            let arr = Array.from(weights[i]).map((w, index) => {
                return w * inputs[index]
            })
            res.push(arr)
        }
        return res
    }

    // /**
    //  * Example 1:
    //  *      inputs: [6, 9]
    //  *      weights: [[4, 2], [7, 3]]
    //  *      output: [(6 * 4 + 6 * 2), (9 * 7 + 9 * 3)]
    //  *
    //  * @param {number[]} inputs
    //  * @param {number[][]} weights
    //  * @returns {*[]}
    //  */
    // static dot2(inputs, weights) {
    //     let res = []
    //     for (let i = 0; i < weights.length; i++) {
    //         let value = []
    //         for (let w of weights[i]) {
    //             value += inputs[i] * w
    //         }
    //         res.push(value)
    //     }
    //     // for (let weight of weights) {
    //     //     for (let v of weight) {
    //     //         let value = 0
    //     //         for (let i = 0; i < inputs.length; i++) {
    //     //             value += inputs[i] * v
    //     //         }
    //     //         res.push(value)
    //     //     }
    //     // }
    //     return res
    // }

    static sigmoid(v) {
        return 1 / (1 + Math.exp(-v))
    }

    /**
     *
     * @param {number} min
     * @param {number} max
     * @returns {number[][]}
     */
    randomInputWeights(min, max) {
        return createArray(this.settings.countOfHiddenNeurons, () => {
            return createArray(this.settings.countOfInputNeurons, () => randomFloat(min, max))
        })
    }

    /**
     *
     * @param {number} min
     * @param {number} max
     * @returns {number[][]}
     */
    randomHiddenWeights(min, max) {
        return createArray(this.settings.countOfOutputNeurons, () => {
            return createArray(this.settings.countOfHiddenNeurons, () => randomFloat(min, max))
        })
    }
}