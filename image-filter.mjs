import fs from 'fs'
import cv from 'canvas'
import Filter2D from './helpers/Filter2D.mjs'
import { toFlatVector } from './lib/arr.mjs'
const symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// https://habr.com/ru/post/454986/

const dirRenderer = 'tmp/nn/image-renderer'
const dirFilter = 'tmp/nn/filter-renderer'

if (!fs.existsSync(dirFilter)) {
    fs.mkdirSync(dirFilter)
}

const width = 200
const height = 200
const canvas = cv.createCanvas(width, height)
const ctx = canvas.getContext('2d')

// const img = new cv.Image()
// img.onload = () => {
//     ctx.drawImage(img, 0, 0)
//
//     const imageData = ctx.getImageData(0, 0, width, height)
//
//     console.log(Filter2D.normalize(imageData))
// }
// img.onerror = err => {
//     throw err
// }
// img.src = `${dirRenderer}/0.jpeg`

const arr1 = [
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
    1, 1, 1, 1,
]

const arr2 = [
    0, 0, 0, 0, 0, 0,
    0, 4, 3, 1, 1, 0,
    0, 7, 5, 1, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0,
]

/*[
    0, 0, 0, | 0, 0, 0, | 0, 0, 0, | 0, 0, 0,
    0, 4, 3, | 4, 3, 1, | 3, 1, 1, | 1, 1, 0,
    0, 7, 5, | 7, 5, 1, | 5, 1, 1, | 1, 1, 0,

    0, 4, 3, | 4, 3, 1, | 3, 1, 1, | 1, 1, 0,
    0, 7, 5, | 7, 5, 1, | 5, 1, 1, | 1, 1, 0,
    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,

    0, 7, 5, | 7, 5, 1, | 5, 1, 1, | 1, 1, 0,
    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,
    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,

    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,
    0, 1, 1, | 1, 1, 1, | 1, 1, 1, | 1, 1, 0,
    0, 0, 0, | 0, 0, 0, | 0, 0, 0, | 0, 0, 0,
]*/

const keras = [
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1],
]

console.log(Filter2D.convolution(arr2, keras, 6))

const render = async () => {
    const imageData = await getImageDataFromSrc(`${dirRenderer}/0.jpeg`)
    const grayImageData = Filter2D.grayscale(imageData.data, 4, [0, 1, 2])
    // const normImageData = Filter2D.normalize(grayImageData, 4, [0, 1, 2])
    // const arr = toFlatVector(normImageData, 4, [0])

    const arr = toFlatVector(grayImageData, 4, [0])

    // console.log(Filter2D.alignment(arr, 200, 1, 4))

    const s = Filter2D.alignment(arr, 200)
    const prepared = Filter2D.convolution(s, keras, 202)

    console.log(s.length, prepared.length)
    const data = new Uint8ClampedArray(200 * 200 * 4)
    let i = 0
    for (let a = 0; a < prepared.length; a++) {
        data[i] = prepared[a]
        data[i + 1] = prepared[a]
        data[i + 2] = prepared[a]
        data[i + 3] = 255
        i += 4
    }

console.log(data.length)
    ctx.clearRect(0, 0, width, height)
    ctx.putImageData(cv.createImageData(data, width), width, height)
    //
    fs.writeFileSync(`${dirFilter}/1.json`, JSON.stringify(prepared))
    fs.writeFileSync(`${dirFilter}/1.jpeg`, canvas.toBuffer('image/jpeg', { quality: 1 }))

    for (let i = 0; i < symbols.length; i++) {

    }
}

render().catch(console.log)

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