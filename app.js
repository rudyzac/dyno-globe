const countries = fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(
    response => { console.log("Got world atlas from CDN"); return response }, 
    reason => {
      console.log(`Cannot get world atlas from CDN because of: ${reason}`)
      fetch('/world-atlas.json')
    })
  .then(data => data.json())
  .then(worldAtlas => { console.log("Atlas data", worldAtlas); return worldAtlas }) // TODO: remove
  .then(worldAtlas => {
    const countries = topojson.feature(worldAtlas, worldAtlas.objects.countries);
    console.log("Countries", countries);  //TODO: remove
    return countries
  })
  .catch(error => {
    console.log(error)
  });

const width = 900;
const height = 600;
const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
const g = svg.append('g');

const projection = d3.geoMercator();
const path = d3.geoPath(projection);

g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path);