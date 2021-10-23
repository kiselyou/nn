import Network from './Network.mjs'
// https://www.youtube.com/watch?v=HA-F6cZPvrg&t=476s
const nn = new Network({ countOfInputNeurons: 4, countOfHiddenNeurons: 4, countOfOutputNeurons: 2 })
// nn.predict([1, 1, 0])

// 1. Водка
// 2. Дождь
// 3. Друг
// 4. Салют

// Условия идти на вечеринку
// 1. Если будет салют и не будет дождя
// 2. Если будет друг даже если будет дождь
// Иначе сижу дома

// for (let i = 0; i < 10000; i++) {
//     nn.train([0, 0, 0, 0], [0, 1], 0.1)
//     nn.train([1, 0, 0, 0], [0, 1], 0.1)
//     nn.train([1, 1, 0, 0], [0, 1], 0.1)
//     nn.train([1, 1, 0, 1], [0, 1], 0.1)
//
//
//     nn.train([1, 0, 1, 0], [1, 0], 0.1)
//     nn.train([1, 1, 1, 0], [1, 0], 0.1)
//     nn.train([1, 0, 0, 1], [1, 0], 0.1)
//     // nn.train([0, 0, 1, 0], [1, 0], 0.1)
// }

const predict = nn.predict([0, 0, 1, 0])
console.log(predict)
console.log(predict[0] > 0.5 ? 'Да иду на вечиринку' : 'Нет, не иду на вечеринку')
