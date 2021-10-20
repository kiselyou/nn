import chai from 'chai'
import MatrixPadding from './MatrixPadding.mjs'

describe('MatrixPadding', function() {
    it('Should create MatrixPadding border top: 1, right: 1, bottom: 1, left: 1, value: 0', () => {
        const input = [
            10, 20, 30,  40, 20, 30,
            50, 20, 60,  89, 67, 67,
            12, 22, 32,  12, 21, 31,
        ];

        const v = new MatrixPadding().create(input, { width: 2, deep: 3, top: 1, right: 1, bottom: 1, left: 1 })
        chai.expect(v).to.be.deep.equal([
            [[0,   0,  0], [0,   0,  0], [ 0,  0,  0], [0,   0,  0]],
            [[0,   0,  0], [10, 20, 30], [40, 20, 30], [0,   0,  0]],
            [[0,   0,  0], [50, 20, 60], [89, 67, 67], [0,   0,  0]],
            [[0,   0,  0], [12, 22, 32], [12, 21, 31], [0,   0,  0]],
            [[0,   0,  0], [0,   0,  0], [ 0,  0,  0], [0,   0,  0]],
        ])
    })

    it('Should create MatrixPadding border top: 2, right: 2, bottom: 1, left: 1, value: 0', () => {
        const input = [
            10, 20, 30,  40, 20, 30,
            50, 20, 60,  89, 67, 67,
            12, 22, 32,  12, 21, 31,
        ];

        const v = new MatrixPadding().create(input, { width: 2, deep: 3, top: 2, right: 2, bottom: 1, left: 1 })
        chai.expect(v).to.be.deep.equal([
            [[0,   0,  0], [0,   0,  0], [ 0,  0,  0], [0,   0,  0], [0,   0,  0]],
            [[0,   0,  0], [0,   0,  0], [ 0,  0,  0], [0,   0,  0], [0,   0,  0]],
            [[0,   0,  0], [10, 20, 30], [40, 20, 30], [0,   0,  0], [0,   0,  0]],
            [[0,   0,  0], [50, 20, 60], [89, 67, 67], [0,   0,  0], [0,   0,  0]],
            [[0,   0,  0], [12, 22, 32], [12, 21, 31], [0,   0,  0], [0,   0,  0]],
            [[0,   0,  0], [0,   0,  0], [ 0,  0,  0], [0,   0,  0], [0,   0,  0]],
        ])
    })

    it('Should create MatrixPadding border top: 0, right: 0, bottom: 2, left: 2, value 1', () => {
        const input = [
            10, 20, 30,  40, 20, 30,
            50, 20, 60,  89, 67, 67,
            12, 22, 32,  12, 21, 31,
        ];

        const v = new MatrixPadding().create(input, { width: 2, deep: 3, top: 0, right: 0, bottom: 2, left: 2, value: 1 })
        chai.expect(v).to.be.deep.equal([
            [[1,   1,  1], [1,   1,  1], [10, 20, 30], [40, 20, 30]],
            [[1,   1,  1], [1,   1,  1], [50, 20, 60], [89, 67, 67]],
            [[1,   1,  1], [1,   1,  1], [12, 22, 32], [12, 21, 31]],
            [[1,   1,  1], [1,   1,  1], [1,   1,  1], [1,   1,  1]],
            [[1,   1,  1], [1,   1,  1], [1,   1,  1], [1,   1,  1]],
        ])
    })
})