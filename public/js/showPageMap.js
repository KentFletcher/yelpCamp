mapboxgl.accessToken = mapToken;//this is in a script in /campgrounds/show.ejs, that pulls the token from .env file
const map = new mapboxgl.Map({
  container: 'map', // container ID from /campgrounds/show.ejs
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  // center: campground.geometry.coordinates,  [lng, lat]//from the way it was demonstrated, but had some issues on the ejs side of things, also do not need entire object
  center: [long, lat], // starting position [lng, lat]// starting position
  zoom: 10 // starting zoom
});

const marker = new mapboxgl.Marker({
  color: "red",
  draggable: true
})
  // .setLngLat(campground.geometry.coordinates)//from the way it was demonstrated, but had some issues on the ejs side of things, also do not need entire object
  .setLngLat([long, lat])
  .addTo(map);