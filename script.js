mapboxgl.accessToken =
  "pk.eyJ1Ijoibmlra29vODMiLCJhIjoiY2xqc2R2MWFqMGUxbDNjbXU2dWVhODA4ZCJ9.misyfA3GPBcXcqxYxMRNdA";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  console.log(position);
  setUpMap([position.coords.longitude, position.coords.latitude]);
}
function errorLocation() {
  setUpMap([5.93, 43.12]);
}
function setUpMap(center) {
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/satellite-streets-v12",
    center: center,
    zoom: 13,
  });
  console.log(map);

  const layerList = document.getElementById("menu");
  const inputs = layerList.getElementsByTagName("input");

  for (const input of inputs) {
    input.onclick = (layer) => {
      const layerId = layer.target.id;
      map.setStyle("mapbox://styles/mapbox/" + layerId);
    };
  }

  // map.addControl(
  //   new MapboxDirections({
  //     accessToken: mapboxgl.accessToken,
  //   }),
  //   "top-left"
  // );

  map.addControl(new mapboxgl.NavigationControl());
  // Add the control to the map.
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    }),
    "top-left"
  );

  map.on("load", () => {
    map.addSource("pollution", {
      type: "geojson",
      data: "./alrt3j_sudpaca.json",
    });
    // add heatmap layer here
    // add circle layer here
  });
  console.log(map.source);
}
