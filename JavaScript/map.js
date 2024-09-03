var map = L.map('map', { zoomControl: false}).setView([42.2000008,24.3330002], 10);
var zoom_controls = new L.Control.Zoom({ position: 'bottomright' });
zoom_controls.addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
            document.getElementById("nokta-koordinat").innerHTML = feature.geometry.coordinates[1] + ", " + feature.geometry.coordinates[0];
            document.getElementById("nokta-link").href = "https://www.google.com/maps/@" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + ",13z?entry=ttu";
        }
    });

    layer.bindTooltip(feature.properties.Türkçe, {permanent: true, direction: "top", className: "nokta-label"}).openTooltip();
}

NoktalarıBaşlat()
var BulgaristanŞehirNokta = L.geoJSON(noktalarJSON, {onEachFeature: MarkerClickFeature})
BulgaristanŞehirNokta.addTo(map)


map.on
('zoomend', function()
        {
            var Currentzoom = map.getZoom();
            if(Currentzoom >= 14)
            {
                map.removeLayer(BulgaristanŞehirNokta);
            }
            else
            {
                if(!map.hasLayer(BulgaristanŞehirNokta))
                {
                    BulgaristanŞehirNokta.addTo(map)
                }
            }
        }
)
