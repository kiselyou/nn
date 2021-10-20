import ArrayVector from './ArrayVector.mjs'
import chai from 'chai'

describe('ArrayVector', function() {
    it('Should create ArrayVector 4', () => {
        const v = new ArrayVector().create([100, 20, 30, 255, 122, 25, 10, 255], 4)
        chai.expect(v).to.be.deep.equal([[100, 20, 30, 255], [122, 25, 10, 255]])
        chai.expect(v.length).to.be.equal(2)
        chai.expect(v.value(0)).to.be.deep.equal([100, 20, 30, 255])
        chai.expect(v.value(1)).to.be.deep.equal([122, 25, 10, 255])
    })

    it('Should create ArrayVector 1', () => {
        const input = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
        ];
        const arrayVector = new ArrayVector().create(input, 1)
        chai.expect(arrayVector).to.be.deep.equal([[1], [1], [1], [1], [1], [1], [1], [1], [1]])
        chai.expect(arrayVector.length).to.be.equal(9)
    })

    it('Should create ArrayVector 0', () => {
        const input = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
        ];
        const arrayVector = new ArrayVector().create(input, 0)
        chai.expect(arrayVector).to.be.deep.equal(input)
        chai.expect(arrayVector.length).to.be.equal(9)
    })
})