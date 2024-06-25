const data = require('./SQLPad Query Results 2024-05-16.json')

const len = data.length
console.log([...new Set(data.map(item => item.position_id))].length)