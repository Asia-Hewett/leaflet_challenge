// This is where we're getting our data from
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectLink="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Create a function to generate the markers for earthquake magnitude

function markerSize(mag) {
  return mag * 30000;
}

function markerColor(mag) {
  if (mag <= 1) {
      return "#ADFF2F";
  } else if (mag <= 2) {
      return "#9ACD32";
  } else if (mag <= 3) {
      return "#FFFF00";
  } else if (mag <= 4) {
      return "#ffd700";
  } else if (mag <= 5) {
      return "#FFA500";
  } else {
      return "#FF0000";
  };
}

// Grab the geojson using d3

  d3.json(link,function(data){
    createFeatures(data.features);
  });

function createFeatures(earthquakeData) {

  var earthquakes=L.geoJson(earthquakeData, {
      pointToLayer: function(data, latlng) {
        return L.circleMarker(latlng, {
          radius: data.properties.mag,
          color: markerColor(data.properties.mag),
          opacity: 0.75,
          fillOpacity: 0.75,
          weight: 0
        }).bindPopup("<h3>" + data.properties.place +
        "</h3><hr><p>" + new Date(data.properties.time) + "</p>" + "<p>" +"Magnitude: "+data.properties.mag + "</p>");
      }
    });

    // Adding earthquakes layer to the createMap function
    createMap(earthquakes);
    
  }

  function createMap(earthquakes) {
  
    // Define streetmap and darkmap layers
    var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoibWV0YWxpY2FydXMiLCJhIjoiY2thN2V1bDBxMDJ5bTJ4bGo1a29temsxNCJ9.5DGFqjLK2yLYd9Uab-EyrQ");
  
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoibWV0YWxpY2FydXMiLCJhIjoiY2thN2V1bDBxMDJ5bTJ4bGo1a29temsxNCJ9.5DGFqjLK2yLYd9Uab-EyrQ");
  
    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoibWV0YWxpY2FydXMiLCJhIjoiY2thN2V1bDBxMDJ5bTJ4bGo1a29temsxNCJ9.5DGFqjLK2yLYd9Uab-EyrQ");
    
    var tectOutline=new L.LayerGroup();

    d3.json(tectLink,function(data){
        L.geoJson(data,{
                color:"orange",
                weight:2

        }).addTo(tectOutline);
        
    });

  // Add title layer

  let landing = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  let myMap = L.map("mapid", {
    center: [40, -94], 
    zoom: 4 
  })
  landing.addTo(myMap);
  }
