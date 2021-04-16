mapboxgl.accessToken = mapToken;//this is in a script in /campgrounds/show.ejs, that pulls the token from .env file
const map = new mapboxgl.Map({
  container: 'map', // container ID from /campgrounds/show.ejs
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: campground.geometry.coordinates,
  zoom: 10 // starting zoom
});

const marker = new mapboxgl.Marker({
  color: "red",
  draggable: true
})
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(
        `<h3>${campground.title}</h3><h6>${campground.location}</p>`
      )
  )
  .addTo(map);