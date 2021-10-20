import Vector from './Vector.mjs'
import chai from 'chai'

describe('Vector', function() {
    it('Should create Vector', () => {
        const v = new Vector().set([1, 2, 3])
        chai.expect(v).to.be.deep.equal([1, 2, 3])
        chai.expect(v.length).to.be.equal(3)
        chai.expect(v.value(0)).to.be.equal(1)
        chai.expect(v.value(1)).to.be.equal(2)
        chai.expect(v.value(2)).to.be.equal(3)
    })

    it('Should addVector', () => {
        const v = new Vector().set([1, 2, 3])

        v.addVector([1, 1, 1])
        chai.expect(v).to.be.deep.equal([2, 3, 4])

        v.addVector([2, 2, 5])
        chai.expect(v).to.be.deep.equal([4, 5, 9])
    })

    it('Should addVectors', () => {
        const v = new Vector().addVectors([[1, 2, 3], [1, 1, 1], [2, 2, 5]])
        chai.expect(v).to.be.deep.equal([4, 5, 9])
    })

    it('Should multiplyVectors', () => {
        const v = new Vector().multiplyVectors([1, 2, 3], [1, 2, 3])
        chai.expect(v).to.be.deep.equal([1, 4, 9])
    })

    it('Should multiply', () => {
        const v = new Vector().set([1, 2, 3]).multiply([1, 2, 3])
        chai.expect(v).to.be.deep.equal([1, 4, 9])
    })
})