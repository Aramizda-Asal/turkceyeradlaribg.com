var map = L.map('map', { zoomControl: false}).setView([42.2000008,24.3330002], 8);
var zoom_controls = new L.Control.Zoom({ position: 'bottomright' });
zoom_controls.addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Haritadaki noktalara tıklandığında noktalar ile ilgili bilgileri gösteren çekmeceyi açan fonksiyon.
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
            document.getElementById("nokta-koordinat").innerHTML = feature.geometry.coordinates[1].toFixed(6) + ", " + feature.geometry.coordinates[0].toFixed(6);
            document.getElementById("nokta-link").href = "https://www.google.com/maps/@" + feature.geometry.coordinates[1].toFixed(6) + "," + feature.geometry.coordinates[0].toFixed(6) + ",13z?entry=ttu";
        }
    });

    layer.bindTooltip(feature.properties.Türkçe, {permanent: true, direction: "top", className: "nokta-label"}).openTooltip();
}

//Noktaları oluşturan ve haritaya ekleyen fonksiyon.
NoktalarıBaşlat()

var BulgaristanŞehirNokta;
var BulgaristanKöyNokta;
var BulgaristanKasabaNokta;

//!!Alttaki işlem noktalar.js'de şehir noktalarını başlat fonksiyonuna taşındı şimdilik burda da tutuluyor. 
//var BulgaristanŞehirNokta  = L.geoJSON(noktalarJSON, {onEachFeature: MarkerClickFeature})
//BulgaristanŞehirNokta.addTo(map)


//Haritadaki şehir, kasaba noktalarının zoomlara orantılı olarak gösterilip, gösterilmemesini ayarlayan fonksiyon.
map.on
('zoomend', function()
        {
            var Currentzoom = map.getZoom();
            if(Currentzoom >= 10)
            {
                map.removeLayer(BulgaristanŞehirNokta);
                BulgaristanKöyNokta.addTo(map);
                BulgaristanKasabaNokta.addTo(map);
            }
            else
            {
                if(!map.hasLayer(BulgaristanŞehirNokta))
                {
                    BulgaristanŞehirNokta.addTo(map)
                    map.removeLayer(BulgaristanKöyNokta);
                    map.removeLayer(BulgaristanKasabaNokta);
                }
            }
        }
)

function Ara() 
{
    let YazılanŞey = document.getElementById("aramaÇubuğu").value
    if(YazılanŞey.trim().length == 0)      // Alfanümerik olmayan bir tuşa basınca da tekrar kontrol gönderiyor.
    {
        console.log("Boş")
    }
    else
    {
        let İçerenler = [];
        //Şehir noktalarında var mı kontrolü.
        for(let i = 0; i<ŞehirnoktalarJSON.features.length; i++)
        {  
            if(ŞehirnoktalarJSON.features[i].properties.BulgarcaLatin.includes(YazılanŞey))
            {
                İçerenler.push(ŞehirnoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(ŞehirnoktalarJSON.features[i].properties.BulgarcaKiril.includes(YazılanŞey))
            {
                İçerenler.push(ŞehirnoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(ŞehirnoktalarJSON.features[i].properties.Türkçe.includes(YazılanŞey))
            {
                İçerenler.push(ŞehirnoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(ŞehirnoktalarJSON.features[i].properties.Osmanlıca.includes(YazılanŞey))
            {
                İçerenler.push(ŞehirnoktalarJSON.features[i].properties.BulgarcaLatin);
            }
        }

        
        //Köy noktalarında var mı kontrolü.
        for(let i = 0; i<KöynoktalarJSON.features.length; i++)
        {
            if(KöynoktalarJSON.features[i].properties.BulgarcaLatin.includes(YazılanŞey))
            {
                İçerenler.push(KöynoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(KöynoktalarJSON.features[i].properties.BulgarcaKiril.includes(YazılanŞey))
            {
                İçerenler.push(KöynoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(KöynoktalarJSON.features[i].properties.Türkçe.includes(YazılanŞey))
            {
                İçerenler.push(KöynoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(KöynoktalarJSON.features[i].properties.Osmanlıca.includes(YazılanŞey))
            {
                İçerenler.push(KöynoktalarJSON.features[i].properties.BulgarcaLatin);
            }
        }
        
        //Kasaba noktalarında var mı kontrolü.
        for(let i = 0; i<KasabanoktalarJSON.features.length; i++)
        {
            if(KasabanoktalarJSON.features[i].properties.BulgarcaLatin.includes(YazılanŞey))
            {
                İçerenler.push(KasabanoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(KasabanoktalarJSON.features[i].properties.BulgarcaKiril.includes(YazılanŞey))
            {
                İçerenler.push(KasabanoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(KasabanoktalarJSON.features[i].properties.Türkçe.includes(YazılanŞey))
            {
                İçerenler.push(KasabanoktalarJSON.features[i].properties.BulgarcaLatin);
            }
            else if(KasabanoktalarJSON.features[i].properties.Osmanlıca.includes(YazılanŞey))
            {
                İçerenler.push(KasabanoktalarJSON.features[i].properties.BulgarcaLatin);
            }
        }

        //Oluşturulan yeni dizice girilen yazının boyutu kadar ilk ve son karekterelere bakılarak bir düzen yapılacak !!!!Kendime Not!!!
        //Harflerin büyük küçüklüğü önem arz etmemeli. !!!Kendime Not!!!

        let ilkİçerenler = [];
        let sonİçerenler = [];
        let Ortaİçerenler = [];
        for(let i = 0; i<İçerenler.length; i++)
        {
            
            if(İçerenler[i].substring(0, YazılanŞey.length) == YazılanŞey)
            {
                ilkİçerenler.push(İçerenler[i]);
            }
            else if(İçerenler[i].substring(YazılanŞey.length, İçerenler[i].length-YazılanŞey.length).includes(YazılanŞey))
            {
                Ortaİçerenler.push(İçerenler[i]);
            }
            else
            {
                sonİçerenler.push(İçerenler[i]);
            }
            
            
        }
        console.log("İlk İçerenler " + ilkİçerenler);
        console.log("Orta İçerenler " + Ortaİçerenler);
        console.log("Son İçerenler " + sonİçerenler);
        
        AraÇekmecesiniAç(ilkİçerenler,Ortaİçerenler,sonİçerenler);//Ara çekmecesini açar.
    }
}

function İsimliNoktasınaGit(Bulgarca_Latin)//Ekranı, ismi verilen bölgeye götüren fonksiyon.
{
    let koordinat;
    for(let i = 0; i<ŞehirnoktalarJSON.features.length; i++)
    {  
        if(ŞehirnoktalarJSON.features[i].properties.BulgarcaLatin == Bulgarca_Latin)//Verilen isimle eşleşen noktayı sorgular. 
        {
            koordinat = ŞehirnoktalarJSON.features[i].geometry.coordinates;//Eşleşen noktanın koordinatını alır.
        }
    }

    let zoom = map.getZoom(); //Mevcut zoom'u alır. 
    map.setView([koordinat[1],koordinat[0]],zoom);
}