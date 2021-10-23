import chai from 'chai'
import Matrix from './Matrix.mjs'

describe('Matrix', function() {
    it('Should create Matrix width: 2, deep: 0', () => {
        const input = [
            10, 20,
            30, 40,
            20, 30,
            50, 20,
            60, 89,
            67, 67,
            12, 22,
            32, 12,
            21, 31,
        ];

        const v = new Matrix().create(input, { width: 2, deep: 0 })
        chai.expect(v).to.be.deep.equal([
            [10, 20],
            [30, 40],
            [20, 30],
            [50, 20],
            [60, 89],
            [67, 67],
            [12, 22],
            [32, 12],
            [21, 31]
        ])

        chai.expect(v.length).to.be.equal(9)
        chai.expect(v.value(0)).to.be.deep.equal([10, 20])
        chai.expect(v.value(1)).to.be.deep.equal([30, 40])
        chai.expect(v.value(7)).to.be.deep.equal([32, 12])
        chai.expect(v.value(8)).to.be.deep.equal([21, 31])
    })

    it('Should create Matrix width: 2, deep: 1', () => {
        const input = [
            10, 20, 30,  40, 20, 30,
            50, 20, 60,  89, 67, 67,
            12, 22, 32,  12, 21, 31,
        ];

        const v = new Matrix().create(input, { width: 2, deep: 1 })

        chai.expect(v).to.be.deep.equal([
            [[10], [20]],
            [[30], [40]],
            [[20], [30]],
            [[50], [20]],
            [[60], [89]],
            [[67], [67]],
            [[12], [22]],
            [[32], [12]],
            [[21], [31]]
        ])
        chai.expect(v.length).to.be.equal(9)
        chai.expect(v.value(0)).to.be.deep.equal([[10], [20]])
        chai.expect(v.value(1)).to.be.deep.equal([[30], [40]])
        chai.expect(v.value(7)).to.be.deep.equal([[32], [12]])
        chai.expect(v.value(8)).to.be.deep.equal([[21], [31]])
    })

    it('Should create Matrix width: 2, deep: 2', () => {
        const input = [
            10, 20, 30,  40, 20, 30,
            50, 20, 60,  89, 67, 67,
            12, 22, 32,  12, 21, 31,
        ];

        const v = new Matrix().create(input, { width: 2, deep: 2 })

        chai.expect(v).to.be.deep.equal([
            [[10, 20], [30, 40]],
            [[20, 30], [50, 20]],
            [[60, 89], [67, 67]],
            [[12, 22], [32, 12]],
            [[21, 31], [ 0,  0]]
        ])
        chai.expect(v.length).to.be.equal(5)
        chai.expect(v.value(0)).to.be.deep.equal([[10, 20], [30, 40]])
        chai.expect(v.value(1)).to.be.deep.equal([[20, 30], [50, 20]])
        chai.expect(v.value(4)).to.be.deep.equal([[21, 31], [ 0,  0]])
    })

    it('Should create Matrix width: 2, deep: 3', () => {
        const input = [
            10, 20, 30,  40, 20, 30,
            50, 20, 60,  89, 67, 67,
            12, 22, 32,  12, 21, 31,
        ];

        const v = new Matrix().create(input, { width: 2, deep: 3 })

        chai.expect(v).to.be.deep.equal([
            [[10, 20, 30], [40, 20, 30]],
            [[50, 20, 60], [89, 67, 67]],
            [[12, 22, 32], [12, 21, 31]]
        ])
        chai.expect(v.length).to.be.equal(3)
        chai.expect(v.value(0)).to.be.deep.equal([[10, 20, 30], [40, 20, 30]])
        chai.expect(v.value(1)).to.be.deep.equal([[50, 20, 60], [89, 67, 67]])
        chai.expect(v.value(2)).to.be.deep.equal([[12, 22, 32], [12, 21, 31]])
    })
})
