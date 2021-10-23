import fs from 'fs'
import cv from 'canvas'
import { randomInt } from './lib/int.mjs'

const symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const dirRenderer = 'tmp/nn/image-renderer'

if (!fs.existsSync(dirRenderer)) {
    fs.mkdirSync(dirRenderer)
}

const width = 64
const height = 64
const canvas = cv.createCanvas(width, height)
const ctx = canvas.getContext('2d')

for (let i = 0; i < symbols.length; i++) {
    ctx.clearRect(0, 0, width, height)
    ctx.font = '60px Comic Sans MS'
    ctx.fillStyle = '#FFF000'
    ctx.textAlign = 'center'
    const symbol = String(symbols[i])
    ctx.fillText(symbol, width / 2 - 5, (height / 2) + 15)
    fs.writeFileSync(`${dirRenderer}/${symbol}-train.jpeg`, canvas.toBuffer('image/jpeg', { quality: .5 }))
}

for (let i = 0; i < symbols.length; i++) {
  ctx.clearRect(0, 0, width, height)
  ctx.font = '60px Comic Sans MS'
  ctx.fillStyle = '#FFF000'
  ctx.textAlign = 'center'
  const symbol = String(symbols[i])
  ctx.fillText(symbol, width / 2 - randomInt(-5, 35), (height / 2) + randomInt(-5, 35))
  fs.writeFileSync(`${dirRenderer}/${symbol}-test.jpeg`, canvas.toBuffer('image/jpeg', { quality: .5 }))
}

