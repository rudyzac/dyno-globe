const earthGeoJson = fetch('./custom.geo.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));