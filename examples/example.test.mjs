import chai from 'chai'
import Matrix from './../entity/Matrix.mjs'
import MatrixPadding from './../entity/MatrixPadding.mjs'
import MatrixPooling from './../entity/MatrixPooling.mjs'
import MatrixConvolution from './../entity/MatrixConvolution.mjs'

describe('Image Convolution', function() {
  it('Image Convolution', () => {
    const input = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];

    const matrix = new Matrix().create(input, { width: 5, deep: 2 })

    const expectMatrix = [
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
      [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
    ]

    chai.expect(expectMatrix).to.be.deep.equal(matrix)

    const matrixPadding = new MatrixPadding().create(matrix, {
      width: 5, deep: 2, top: 1, right: 2, bottom: 1, left: 1
    })

    const expectMatrixPadding = [
      [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [0, 0], [0, 0]],
      [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    ]

    chai.expect(expectMatrixPadding).to.be.deep.equal(matrixPadding)

    const filter = [
      [[-1, -1], [-1, -1], [-1, -1]],
      [[-1, -1], [ 8,  8], [-1, -1]],
      [[-1, -1], [-1, -1], [-1, -1]],
    ]

    const matrixConvolution = new MatrixConvolution().create(matrixPadding, { filter })
    // (-1 * 0 +-1 * 0 + -1 * 0) + (-1 * 0 + 8 * 1 + -1 * 1) + (-1 * 0 + -1 * 1 + -1 * 1) = 5 === matrixConvolution[0][0][0]
    // (-1 * 0 +-1 * 0 + -1 * 0) + (-1 * 0 + 8 * 1 + -1 * 1) + (-1 * 0 + -1 * 1 + -1 * 1) = 5 === matrixConvolution[0][0][1]

    const expectMatrixConvolution = [
      [[5,  5],[3,  3],[3,  3],[3,  3],[5,  5],[-2,-2]],
      [[3,  3],[0,  0],[0,  0],[0,  0],[3,  3],[-3,-3]],
      [[3,  3],[0,  0],[0,  0],[0,  0],[3,  3],[-3,-3]],
      [[3,  3],[0,  0],[0,  0],[0,  0],[3,  3],[-3,-3]],
      [[3,  3],[0,  0],[0,  0],[0,  0],[3,  3],[-3,-3]],
      [[3,  3],[0,  0],[0,  0],[0,  0],[3,  3],[-3,-3]],
      [[3,  3],[0,  0],[0,  0],[0,  0],[3,  3],[-3,-3]],
      [[3,  3],[0,  0],[0,  0],[0,  0],[3,  3],[-3,-3]],
      [[3,  3],[0,  0],[0,  0],[0,  0],[3,  3],[-3,-3]],
      [[5,  5],[3,  3],[3,  3],[3,  3],[5,  5],[-2,-2]],
    ]

    chai.expect(expectMatrixConvolution).to.be.deep.equal(matrixConvolution)

    const matrixPooling = new MatrixPooling().create(matrixConvolution, { type: MatrixPooling.TYPE_MAX, filterX: 2, filterY: 2 })

    const expectMatrixPooling = [
      [[5,5],[3,3],[5,5]],
      [[3,3],[0,0],[3,3]],
      [[3,3],[0,0],[3,3]],
      [[3,3],[0,0],[3,3]],
      [[5,5],[3,3],[5,5]]
    ]

    chai.expect(expectMatrixPooling).to.be.deep.equal(matrixPooling)
  })
})
