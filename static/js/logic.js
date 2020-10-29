// Testing
// console.log(API_KEY);

// This is where we're creating the map

// Add title layer

let variable = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

let myMap = L.map("mapid", {
  center: [40, -94], //not sure what it wants here
  zoom: 3
})
variable.addTo(myMap);

let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the geojson using d3

d3.json(link, function(data) {
  // Create a geojson layer with the retrieved data
  L.geoJson(data).addTo(myMap);
});

