import ArrayVector from './ArrayVector.mjs'
import Vector from './Vector.mjs'
import objectPath from 'object-path'

export default class MatrixPooling extends ArrayVector {
  /**
   *
   * @returns {string}
   * @constructor
   */
  static get TYPE_MAX() {
    return 'max'
  }

  /**
   *
   * @returns {string}
   * @constructor
   */
  static get TYPE_AVG() {
    return 'avg'
  }

  /**
   *
   * @param {Array|Matrix} input
   * @param {Object|{ type: string, filterY: number, filterX: number, stepY: number, stepX: number }} options
   * @returns {MatrixConvolution|Vector[]}
   */
  create(input, options = { type: MatrixPooling.TYPE_MAX, filterY: 2, filterX: 2, stepY: 0, stepX: 0 }) {
    let tmp = []
    const res = []
    const filterY = objectPath.get(options, ['filterY'], 2)
    const filterX = objectPath.get(options, ['filterX'], 2)
    const stepY = filterY + (objectPath.get(options, ['stepY']) || 0)
    const stepX = filterX + (objectPath.get(options, ['stepX']) || 0)
    const type = objectPath.get(options, ['type'], MatrixPooling.TYPE_MAX)

    let y = 0 // строка
    let x = 0 // колонка
    let isRowProcess = true
    while (isRowProcess) {
      // Если фильтр вышел за рамки матрицы по вертикали
      if (input[y + (filterY - 1)] === undefined) {
        break
      }

      // Если фильтр вышел за рамки матрицы по горизонтали
      if (input[y + (filterY - 1)][x + (filterX - 1)] === undefined) {
        // Переход на новую строку с шагом.
        y += stepY
        // Перставить курсор в начало.
        x = 0

        res.push(new Vector().set(tmp))
        tmp = []
      }

      // Если фильтр вышел за рамки матрицы по вертикали
      if (input[y + (filterY - 1)] === undefined) {
        break
      }

      let initVector = new Vector()
      for (let yy = 0; yy < filterY; yy++) {
        for (let xx = 0; xx < filterX; xx++) {
          const vector = input[y + yy][x + xx]
          if (initVector.length === 0) {
            initVector.create(vector.length, 0)
          }

          switch (type) {
            case MatrixPooling.TYPE_MAX:
              initVector.maxVector(vector)
              break
            case MatrixPooling.TYPE_AVG:
              initVector.addVector(vector)
              break
          }
        }
      }
      switch (type) {
        case MatrixPooling.TYPE_AVG:
          initVector.divideScalar(filterY * filterX)
          break
      }
      tmp.push(initVector)

      // Переставить курсор с шагом.
      x += stepX
    }

    this.set(res)
    return this
  }
}
