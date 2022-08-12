const earthGeoJson = fetch('http://localhost:3000/world-atlas.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));