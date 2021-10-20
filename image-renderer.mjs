import fs from 'fs'
import cv from 'canvas'

const symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const dirRenderer = 'tmp/nn/image-renderer'

if (!fs.existsSync(dirRenderer)) {
    fs.mkdirSync(dirRenderer)
}

const width = 200
const height = 200
const canvas = cv.createCanvas(width, height)
const ctx = canvas.getContext('2d')

for (let i = 0; i < symbols.length; i++) {
    ctx.clearRect(0, 0, width, height)
    ctx.font = '60px Comic Sans MS'
    ctx.fillStyle = '#FFF000'
    ctx.textAlign = 'center'
    const symbol = String(symbols[i])
    ctx.fillText(symbol, width / 2, (height / 2) + 15)
    fs.writeFileSync(`${dirRenderer}/${symbol}.jpeg`, canvas.toBuffer('image/jpeg', { quality: 1 }))
}

