var map = L.map('map', { zoomControl: false}).setView([42.2000008,24.3330002], 13);
var zoom_controls = new L.Control.Zoom({ position: 'bottomright' });
zoom_controls.addTo(map);

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
                "BulgarcaLatin": "Pazardzhik",
                "BulgarcaKiril": "Пазарджик",
                "Türkçe": "Pazarcık",
                "Osmanlıca": "Pazarcık"
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
                "BulgarcaLatin": "Plovdiv",
                "BulgarcaKiril": "Пловдив",
                "Türkçe": "Filibe",
                "Osmanlıca": "Filibe"
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
                "BulgarcaLatin": "Blagoevgrad",
                "BulgarcaKiril": "Благоевград",
                "Türkçe": "Blagoevgrad",
                "Osmanlıca": "Blagoevgrad"
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
                "BulgarcaLatin": "Burgas",
                "BulgarcaKiril": "Бургас",
                "Türkçe": "Burgas",
                "Osmanlıca": "Burgas"
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
                "BulgarcaLatin": "Dobrich",
                "BulgarcaKiril": "Добрич",
                "Türkçe": "Dobrich",
                "Osmanlıca": "Dobrich"
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
                "BulgarcaLatin": "Gabrovo",
                "BulgarcaKiril": "Габрово",
                "Türkçe": "Gabrovo",
                "Osmanlıca": "Gabrovo"
            },
            "geometry": 
            {
                "type": "Point",
                "coordinates": [25.25027778,42.91694444]
            }
        }
    ]
};

function MarkerClickFeature(feature, layer) 
{
    layer.on
    ({
        click: function()
        {
            NoktaÇekmecesi();
            document.getElementById("nokta-büyükBaşlık").innerHTML = feature.properties.BulgarcaLatin;
            document.getElementById("nokta-altBaşlık").innerHTML = feature.properties.BulgarcaKiril;
            document.getElementById("nokta-dillerTR").innerHTML ="Türkçe: " + feature.properties.Türkçe;
            document.getElementById("nokta-dillerOS").innerHTML ="Osmanlıca: " + feature.properties.Osmanlıca;
            document.getElementById("nokta-koordinat").innerHTML = feature.geometry.coordinates;
            document.getElementById("nokta-link").href = "https://www.google.com/maps/@" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + ",13z?entry=ttu";
        }
    });

    layer.bindTooltip(feature.properties.Türkçe, {permanent: true, direction: "top", className: "nokta-label"}).openTooltip();
}

NoktalarıBaşlat()
var BulgaristanŞehirNokta = L.geoJSON(noktalarJSON, {onEachFeature: MarkerClickFeature})
BulgaristanŞehirNokta.addTo(map)
