var lyr_aglomerado = L.geoJson.ajax("data/GAU2_2cvalid.geojson");

var aglomerados = $.ajax({
  url: "data/GAU2_2cvalid.geojson",
  dataType: "json",
  async: false, //si le pongo true entonces el código de abajo sólo se puede ejecutar cuando haya quedado done... pero así hago a la variable nombres_aglomerados accesible
  success: console.log("Se cargó el archivo de los aglomerados"),
  error: function (xhr) {
    alert(xhr.statusText);
  },
});

// $.when(aglomerados).done(function () {
const set_nombres_aglomerados = new Set();
aglomerados.responseJSON.features.forEach((item) => {
  set_nombres_aglomerados.add(item.properties.nombre_aglomerado);
});
let nombres_aglomerados = Array.from(set_nombres_aglomerados).sort();

// });

var bounds_aglomerados = {};
// hago un loop para llenar el dict con pares de key (nombre_aglomerados) y value igual a null
for (var i = 0; i < nombres_aglomerados.length; i++) {
  bounds_aglomerados[nombres_aglomerados[i]] = null;
}
