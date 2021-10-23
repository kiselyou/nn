import fs from 'fs'
import cv from 'canvas'
import Matrix from './entity/Matrix.mjs'
import MatrixPadding from './entity/MatrixPadding.mjs'
import MatrixPooling from './entity/MatrixPooling.mjs'
import MatrixConvolution from './entity/MatrixConvolution.mjs'
import Network from './Network.mjs'
import { normalize } from './lib/int.mjs'

// https://habr.com/ru/post/454986/

const dirRenderer = 'tmp/nn/image-renderer'

const deep = 4
const width = 64
const height = 64
const canvas = cv.createCanvas(width, height)
const ctx = canvas.getContext('2d')

const render = async () => {

  const imageData0 = await getImageDataFromSrc(`${dirRenderer}/0-train.jpeg`)
  const imageData1 = await getImageDataFromSrc(`${dirRenderer}/1-train.jpeg`)
  const imageData2 = await getImageDataFromSrc(`${dirRenderer}/2-train.jpeg`)
  const imageData3 = await getImageDataFromSrc(`${dirRenderer}/3-train.jpeg`)
  const imageData4 = await getImageDataFromSrc(`${dirRenderer}/4-train.jpeg`)
  const imageData5 = await getImageDataFromSrc(`${dirRenderer}/5-train.jpeg`)
  const imageData6 = await getImageDataFromSrc(`${dirRenderer}/6-train.jpeg`)
  const imageData7 = await getImageDataFromSrc(`${dirRenderer}/7-train.jpeg`)
  const imageData8 = await getImageDataFromSrc(`${dirRenderer}/8-train.jpeg`)
  const imageData9 = await getImageDataFromSrc(`${dirRenderer}/9-train.jpeg`)

  const imageDataTest0 = await getImageDataFromSrc(`${dirRenderer}/0-test.jpeg`)
  const imageDataTest1 = await getImageDataFromSrc(`${dirRenderer}/1-test.jpeg`)
  const imageDataTest2 = await getImageDataFromSrc(`${dirRenderer}/2-test.jpeg`)
  const imageDataTest3 = await getImageDataFromSrc(`${dirRenderer}/3-test.jpeg`)
  const imageDataTest4 = await getImageDataFromSrc(`${dirRenderer}/4-test.jpeg`)
  const imageDataTest5 = await getImageDataFromSrc(`${dirRenderer}/5-test.jpeg`)
  const imageDataTest6 = await getImageDataFromSrc(`${dirRenderer}/6-test.jpeg`)
  const imageDataTest7 = await getImageDataFromSrc(`${dirRenderer}/7-test.jpeg`)
  const imageDataTest8 = await getImageDataFromSrc(`${dirRenderer}/8-test.jpeg`)
  const imageDataTest9 = await getImageDataFromSrc(`${dirRenderer}/9-test.jpeg`)

  // return preset(imageData0)

  // console.log(grayAvg)
  // console.log(matrixPooling.length, matrixPooling[0].length)

  // const neurons = matrixConvolution.flat(2)

  const grayAvg0 = preset(imageData0)
  const nn = new Network({ countOfInputNeurons: grayAvg0.length, countOfHiddenNeurons: grayAvg0.length, countOfOutputNeurons: 10 })

  const grayAvg1 = preset(imageData1)
  const grayAvg2 = preset(imageData2)
  const grayAvg3 = preset(imageData3)
  const grayAvg4 = preset(imageData4)
  const grayAvg5 = preset(imageData5)
  const grayAvg6 = preset(imageData6)
  const grayAvg7 = preset(imageData7)
  const grayAvg8 = preset(imageData8)
  const grayAvg9 = preset(imageData9)

  for (let i = 0; i < 5; i++) {
    console.log(i)
    const learningRate = 0.2
                     // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    nn.train(grayAvg0, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], learningRate)
    nn.train(grayAvg1, [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], learningRate)
    nn.train(grayAvg2, [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], learningRate)
    nn.train(grayAvg3, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], learningRate)
    nn.train(grayAvg4, [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], learningRate)
    nn.train(grayAvg5, [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], learningRate)
    nn.train(grayAvg6, [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], learningRate)
    nn.train(grayAvg7, [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], learningRate)
    nn.train(grayAvg8, [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], learningRate)
    nn.train(grayAvg9, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], learningRate)
  }

  console.log('0', nn.predict(grayAvg0))
  console.log('1', nn.predict(grayAvg1))
  console.log('2', nn.predict(grayAvg2))
  console.log('3', nn.predict(grayAvg3))
  console.log('4', nn.predict(grayAvg4))
  console.log('5', nn.predict(grayAvg5))
  console.log('6', nn.predict(grayAvg6))
  console.log('7', nn.predict(grayAvg7))
  console.log('8', nn.predict(grayAvg8))
  console.log('9', nn.predict(grayAvg9))

  const grayAvgTest0 = preset(imageDataTest0)
  console.log('test-0', nn.predict(grayAvgTest0))

  const grayAvgTest1 = preset(imageDataTest1)
  console.log('test-1', nn.predict(grayAvgTest1))

  const grayAvgTest2 = preset(imageDataTest2)
  console.log('test-2', nn.predict(grayAvgTest2))

  const grayAvgTest3 = preset(imageDataTest3)
  console.log('test-3', nn.predict(grayAvgTest3))

  const grayAvgTest4 = preset(imageDataTest4)
  console.log('test-4', nn.predict(grayAvgTest4))

  const grayAvgTest5 = preset(imageDataTest5)
  console.log('test-5', nn.predict(grayAvgTest5))

  const grayAvgTest6 = preset(imageDataTest6)
  console.log('test-6', nn.predict(grayAvgTest6))

  const grayAvgTest7 = preset(imageDataTest7)
  console.log('test-7', nn.predict(grayAvgTest7))

  const grayAvgTest8 = preset(imageDataTest8)
  console.log('test-8', nn.predict(grayAvgTest8))

  const grayAvgTest9 = preset(imageDataTest9)
  console.log('test-9', nn.predict(grayAvgTest9))

    // console.log(imageData.data.length / 4)
    // const grayImageData = Filter2D.grayscale(imageData.data, 4, [0, 1, 2])
    // // const normImageData = Filter2D.normalize(grayImageData, 4, [0, 1, 2])
    // // const arr = toFlatVector(normImageData, 4, [0])
    //
    // const arr = toFlatVector(grayImageData, 4, [0])
    //
    // // console.log(Filter2D.alignment(arr, 200, 1, 4))
    //
    // const s = Filter2D.alignment(arr, 200)
    // const prepared = Filter2D.convolution(s, keras, 202)
    //
    // console.log(s.length, prepared.length)
    // const data = new Uint8ClampedArray(200 * 200 * 4)
    // let i = 0
    // for (let a = 0; a < prepared.length; a++) {
    //     data[i] = prepared[a]
    //     data[i + 1] = prepared[a]
    //     data[i + 2] = prepared[a]
    //     data[i + 3] = 255
    //     i += 4
    // }

// console.log(data.length)
//     ctx.clearRect(0, 0, width, height)
//     ctx.putImageData(cv.createImageData(data, width), width, height)
//     //
//     fs.writeFileSync(`${dirFilter}/1.json`, JSON.stringify(prepared))
//     fs.writeFileSync(`${dirFilter}/1.jpeg`, canvas.toBuffer('image/jpeg', { quality: 1 }))
//
//     for (let i = 0; i < symbols.length; i++) {
//
//     }
}

render().catch(console.log)

function preset(imageData) {

  const matrix = new Matrix().create(Array.from(imageData.data), { width, deep })

  const matrixPadding = new MatrixPadding().create(matrix, {
    top: 1, right: 1, bottom: 1, left: 1
  })

  const filter = [
    [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]],
    [[-1, -1, -1, -1], [ 8,  8,  8,  8], [-1, -1, -1, -1]],
    [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]],
  ]

  const matrixConvolution = new MatrixConvolution().create(matrixPadding, { filter })

  const matrixPooling = new MatrixPooling().create(matrixConvolution, {
    type: MatrixPooling.TYPE_MAX, filterY: 2, filterX: 2
  })

  const matrixPadding2 = new MatrixPadding().create(matrixPooling, {
    top: 1, right: 1, bottom: 1, left: 1
  })

  const matrixConvolution2 = new MatrixConvolution().create(matrixPadding2, { filter })
  const matrixPooling2 = new MatrixPooling().create(matrixConvolution2, {
    type: MatrixPooling.TYPE_MAX, filterY: 2, filterX: 2
  })

  const matrixPadding3 = new MatrixPadding().create(matrixPooling2, {
    top: 1, right: 1, bottom: 1, left: 1
  })

  const matrixConvolution3 = new MatrixConvolution().create(matrixPadding3, { filter })
  const matrixPooling3 = new MatrixPooling().create(matrixConvolution3, {
    type: MatrixPooling.TYPE_MAX, filterY: 2, filterX: 2
  })

  return matrixPooling3.flat().map((v) => {
    let s = 0
    for (let i of v) {
      s += i
    }
    return s / v.length//normalize(s / v.length, 0, 500)
  })
}


function getImageDataFromSrc(src) {
    return new Promise((resolve, reject) => {
        const img = new cv.Image()
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            resolve(ctx.getImageData(0, 0, width, height))
        }
        img.onerror = reject
        img.src = src
    })
}
