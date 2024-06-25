var xlsx2json = require('xlsx2json');
xlsx2json('data.xlsx').then(jsonArray => {
  let total = 0
  const data = jsonArray[0]
  const result = {}
  data.forEach((element, index) => {
    const { A: id, E: cost } = element
    if (id[0] !== '[' || id[1] === ']') return
    const linkId = JSON.parse(id)[0][0]
    console.log(linkId, cost)
    if (!result[linkId]) {
      result[linkId] = 0
    }
    result[linkId] += Number(cost)
  });

  Object.entries(result).forEach(([key, value]) => {
    result[key] = ((value / 4293622539.08) * 100).toFixed(2) + '%'
  })

  console.log(result)
});