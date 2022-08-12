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
  })
