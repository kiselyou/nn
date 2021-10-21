import chai from 'chai'
import Matrix from './Matrix.mjs'
import MatrixPadding from './MatrixPadding.mjs'

describe('MatrixPadding', function() {
  it('Should create MatrixPadding border top: 1, right: 1, bottom: 1, left: 1, value: 0', () => {
    const input = [
      1, 1, 1,  1, 1, 1,
      1, 1, 1,  1, 1, 1,
      1, 1, 1,  1, 1, 1,
    ];

    const matrix = new Matrix().create(input, { width: 2, deep: 3 })
    const v = new MatrixPadding().create(matrix, { top: 1, right: 1, bottom: 1, left: 1 })
    chai.expect(v).to.be.deep.equal([
      [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]],
      [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]],
      [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
    ])
  })

  it('Should create MatrixPadding border top: 2, right: 2, bottom: 1, left: 1, value: 0', () => {
    const input = [
      1, 1, 1,  1, 1, 1,
      1, 1, 1,  1, 1, 1,
      1, 1, 1,  1, 1, 1,
    ];

    const matrix = new Matrix().create(input, { width: 2, deep: 3 })
    const v = new MatrixPadding().create(matrix, { top: 2, right: 2, bottom: 1, left: 1 })
    chai.expect(v).to.be.deep.equal([
      [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
    ])
  })

  it('Should create MatrixPadding border top: 0, right: 0, bottom: 2, left: 2, value 1', () => {
      const input = [
        9, 9, 9,  9, 9, 9,
        9, 9, 9,  9, 9, 9,
        9, 9, 9,  9, 9, 9,
      ];

      const matrix = new Matrix().create(input, { width: 2, deep: 3 })
      const v = new MatrixPadding().create(matrix, { top: 0, right: 0, bottom: 2, left: 2, value: 1 })
      chai.expect(v).to.be.deep.equal([
        [[1, 1, 1], [1, 1, 1], [9, 9, 9], [9, 9, 9]],
        [[1, 1, 1], [1, 1, 1], [9, 9, 9], [9, 9, 9]],
        [[1, 1, 1], [1, 1, 1], [9, 9, 9], [9, 9, 9]],
        [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
        [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
      ])
  })
})
