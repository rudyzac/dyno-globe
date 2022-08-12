const width = 900;
const height = 600;
const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);
const g = svg.append('g');

const projection = d3.geoMercator().scale(100).translate([width/2, height/2]);
const path = d3.geoPath(projection);

fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(
    response => { console.log("Got world atlas from CDN"); return response },
    reason => {
      console.log(`Cannot get world atlas from CDN because of: ${reason}`)
      fetch('/world-atlas.json')
    })
  .then(data => data.json())
  .then(worldAtlas => topojson.feature(worldAtlas, worldAtlas.objects.countries))
  .then(countries => {
    g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path);
  })
  .catch(error => {
    console.log(error)
  });
