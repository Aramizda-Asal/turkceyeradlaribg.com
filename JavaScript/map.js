var map = L.map('map').setView([42.2000008,24.3330002], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
    },

    {
      "type": "Feature",
      "properties": 
      {
        "label": "Blagoevgrad"
      },
      "geometry": 
      {
        "type": "Point",
        "coordinates": [23.25027778,41.75027778]
      }
    },

    {
      "type": "Feature",
      "properties": 
      {
        "label": "Burgas"
      },
      "geometry": 
      {
        "type": "Point",
        "coordinates": [27.25027778,42.50027778]
      }
    },

    {
      "type": "Feature",
      "properties": 
      {
        "label": "Dobrich"
      },
      "geometry": 
      {
        "type": "Point",
        "coordinates": [27.8061111,43.58361111] 
      }
    },

    {
      "type": "Feature",
      "properties": 
      {
        "label": "Gabrovo"
      },
      "geometry": 
      {
        "type": "Point",
        "coordinates": [25.25027778,42.91694444]
      }
    }
  ]
}

function MarkerClickFeature(feature, layer) 
{
  layer.on
  ({
      click: function()
      {
        NoktaÇekmecesi();
        console.log(feature.properties.label)
      }
  });

  layer.bindTooltip(feature.properties.label, {permanent: true, direction: "top", className: "nokta-label"}).openTooltip();
}

var BulgaristanŞehirNokta = L.geoJSON(BulgaristanŞehirNoktaGeo, {onEachFeature: MarkerClickFeature})
BulgaristanŞehirNokta.addTo(map)
