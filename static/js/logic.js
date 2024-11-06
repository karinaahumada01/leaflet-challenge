// Load earthquake data from the USGS and pass it to createFeatures
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data => {
  createFeatures(data.features);
});

// Function to assign a color based on earthquake depth
function getColor(depth) {
  return depth > 90 ? '#ff5f65' :
         depth > 70 ? '#fca35d' :
         depth > 50 ? '#fdb72a' :
         depth > 30 ? '#f7db11' :
         depth > 10 ? '#dcf400' :
                      '#a3f600';
}

// Function to set marker size based on earthquake magnitude
function getRadius(magnitude) {
  return magnitude ? magnitude * 4 : 1;
}

// Process the earthquake data and create markers
function createFeatures(earthquakeData) {
  // For each earthquake, create a popup with details
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3>
                     <hr><p>Magnitude: ${feature.properties.mag}</p>
                     <p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
  }

  // Create circle markers for each earthquake
  let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
      radius: getRadius(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    }),
    onEachFeature: onEachFeature
  });

  createMap(earthquakes);
}

// Create the map with earthquake markers
function createMap(earthquakes) {
  // Set up the base map layer
  let streetmap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "Map data &copy; OpenStreetMap contributors"
  });

  // Create the map centered on the US, with both the base layer and earthquake layer
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Add layer control for toggling layers
  L.control.layers({ "Street Map": streetmap }, { "Earthquakes": earthquakes }, { collapsed: false }).addTo(myMap);

  createLegend(myMap); // Add the legend to the map
}

// Create a legend to explain the depth colors
function createLegend(map) {
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = () => {
    let div = L.DomUtil.create("div", "info legend");
    let depthLevels = [-10, 10, 30, 50, 70, 90];
    let colors = ["#a3f600", "#dcf400", "#f7db11", "#fdb72a", "#fca35d", "#ff5f65"];

    div.innerHTML = "<h4>Depth (km)</h4>";
    
    // Add a color box and depth label for each depth range
    depthLevels.forEach((depth, i) => {
      div.innerHTML += `<i style="background:${colors[i]}; width: 18px; height: 18px; display: inline-block; margin-right: 8px; vertical-align: middle;"></i>
                        ${depth}${depthLevels[i + 1] ? "&ndash;" + depthLevels[i + 1] : "+"}<br>`;
    });

    // Style the legend box
    div.style.padding = '10px';
    div.style.backgroundColor = 'white';
    div.style.borderRadius = '5px';
    div.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
    return div;
  };

  legend.addTo(map);
}
