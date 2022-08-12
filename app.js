const worldAtlas = fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(
    response => { console.log("Got world atlas from CDN"); return response }, 
    reason => {
      console.log(`Cannot get world atlas from CDN because of: ${reason}`)
      fetch('http://localhost:3000/world-atlas.json')
    })
  .then(data => data.json())
  .then(atlasData => console.log(atlasData))
  .catch(error => {
    console.log(error)
  })
