const fs = require('fs')

const latlong = [];
const cityStrings = [];
fs.readFile('./app/static/data/cities.json', (error, data) => {
  const d = JSON.parse(data)
  d.forEach((city) => {
    latlong.push(+city.latitude)
    latlong.push(+city.longitude)
    cityStrings.push(city.name + ', ' + city.country_name)
  })
  fs.writeFile('./app/static/data/latlong.json', JSON.stringify(latlong), () => {
    console.log('done');
  })
  fs.writeFile('./app/static/data/citystrings.json', JSON.stringify(cityStrings), () => {
    console.log('done');
  })
})