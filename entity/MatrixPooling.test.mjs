import chai from 'chai'
import MatrixPooling from './MatrixPooling.mjs'

describe('MatrixPooling', function() {
  it('Max pooling', () => {
    const input = [
      [[10, 20], [40, 20], [40, 10], [50, 60], [10, 40], [90, 10]],
      [[10, 20], [40, 20], [10, 20], [40, 20], [10, 20], [40, 20]],
      [[70, 20], [40, 40], [10, 10], [40, 20], [10, 20], [10, 20]],
      [[10, 20], [20, 20], [10, 10], [30, 20], [10, 20], [20, 20]],
      [[10, 20], [40, 20], [50, 20], [40, 40], [20, 20], [40, 20]],
      [[80, 20], [40, 20], [60, 20], [40, 20], [10, 20], [10, 90]],
    ]

    const matrixPooling = new MatrixPooling().create(input, { filterX: 2, filterY: 2, type: MatrixPooling.TYPE_MAX })
    chai.expect(matrixPooling).to.be.deep.equal([
      [[40,20],[50,60],[90,40]],
      [[70,40],[40,20],[20,20]],
      [[80,20],[60,40],[40,90]],
    ])
  })

  it('Avg pooling', () => {
    const input = [
      [[10, 20], [40, 20], [40, 10], [50, 60], [10, 40], [90, 10]],
      [[10, 20], [40, 20], [10, 20], [40, 20], [10, 20], [40, 20]],
      [[70, 20], [40, 40], [10, 10], [40, 20], [10, 20], [10, 20]],
      [[10, 20], [20, 20], [10, 10], [30, 20], [10, 20], [20, 20]],
      [[10, 20], [40, 20], [50, 20], [40, 40], [20, 20], [40, 20]],
      [[80, 20], [40, 20], [60, 20], [40, 20], [10, 20], [10, 90]],
    ]

    const matrixPooling = new MatrixPooling().create(input, { filterX: 2, filterY: 2, type: MatrixPooling.TYPE_AVG })
    chai.expect(matrixPooling).to.be.deep.equal([
      [[25,    20],[35,  27.5],[37.5,22.5]],
      [[35,    25],[22.5,  15],[12.5,  20]],
      [[42.5,  20],[47.5,  25],[20,  37.5]]
    ])
  })
})
