mapboxgl.accessToken = mapToken;//this is in a script in /campgrounds/show.ejs, that pulls the token from .env file
const map = new mapboxgl.Map({
  container: 'map', // container ID from /campgrounds/show.ejs
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
});