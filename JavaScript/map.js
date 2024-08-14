var map = L.map('map', { zoomControl: false}).setView([42.2000008,24.3330002], 13);
var zoom_controls = new L.Control.Zoom({ position: 'bottomright' });
zoom_controls.addTo(map);

function markerClick(e)
{
    NoktaÇekmecesi()
}

function onEachFeature(feature, layer) {
    //bind click
    layer.on({
        click: markerClick
    });
}

var BulgaristanŞehirNoktaGeo = 
{
  "type": "FeatureCollection",
  "features":
  [
    {
      "type": "Feature",
      "properties": 
      {
        "label": "Pazarcık"
      },
      "geometry": 
      {
        "type": "Point",
        "coordinates": [24.334235,42.192271]
      }
    },

    {
        "type": "Feature",
        "properties": 
        {
          "label": "Filibe"
        },
        "geometry": 
        {
          "type": "Point",
          "coordinates": [24.74551641878407,42.13585393690252]
        }
      }
  ]
};

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var BulgaristanŞehirNokta = L.geoJSON(BulgaristanŞehirNoktaGeo, {onEachFeature: onEachFeature})
BulgaristanŞehirNokta.bindTooltip("Pazarcık",{permanent: true, direction: "top", className: "nokta-label"}).openTooltip();
BulgaristanŞehirNokta.addTo(map)


