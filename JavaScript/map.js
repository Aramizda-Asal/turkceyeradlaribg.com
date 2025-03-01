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
        click: async function()
        {
            NoktaÇekmecesiYarat(feature);
        }
    });

    layer.bindTooltip(feature.properties.Türkçe, {permanent: true, direction: "top", className: "nokta-label"}).openTooltip();
}

let SehirKatmani = L.layerGroup();
let KöyKatmani = L.layerGroup();
let KasabaKatmani = L.layerGroup();
let KöyKatmanları = [
    [L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup()],
    [L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup()],
    [L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup()],
    [L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup()],
    [L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup()],
    [L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup()],
    [L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup()],
    [L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup(), L.layerGroup()]
];
let BulgaristanNokta;
//Noktaları oluşturan ve haritaya ekleyen fonksiyon.
NoktalarıBaşlat()

//Burası ters çalışıyor nedenini anlamadım anlamamaya devam ediyorum kolay gelsin.
map.on (
    {
        zoomend: function () 
        {
            if (map.getZoom() <= 10) 
            {
                if(!map.hasLayer(SehirKatmani))
                {
                    map.addLayer(SehirKatmani);
                }

                map.removeLayer(KasabaKatmani);
                map.removeLayer(KöyKatmanları[0][0]);
                map.removeLayer(KöyKatmanları[0][1]);
                map.removeLayer(KöyKatmanları[1][0]);
                map.removeLayer(KöyKatmanları[1][1]);
            
            } 
            else
            {
                map.removeLayer(SehirKatmani);

                if(!map.hasLayer(KasabaKatmani))
                {
                    map.addLayer(KasabaKatmani);
                }

                if(!map.hasLayer(KöyKatmanları[0][0]))
                {
                    map.addLayer(KöyKatmanları[0][0])
                }
                if(!map.hasLayer(KöyKatmanları[0][1]))
                {
                    map.addLayer(KöyKatmanları[0][1])
                }
                if(!map.hasLayer(KöyKatmanları[1][0]))
                {
                    map.addLayer(KöyKatmanları[1][0])
                }
                if(!map.hasLayer(KöyKatmanları[1][0]))
                {
                    map.addLayer(KöyKatmanları[0][1])
                }
  
            }
        },
        moveend: function ()
        {
            let sınırlar = map.getBounds();
            let batı = sınırlar._southWest.lng;
            let doğu = sınırlar._northEast.lng;
            let güney = sınırlar._southWest.lat;
            let kuzey = sınırlar._northEast.lat;
            console.log(`${batı}-${doğu}\t${güney}-${kuzey}`); 
        }
    }
);

function Ara()
{
    let YazılanŞey = document.getElementById("aramaÇubuğu").value
    YazılanŞey = YazılanŞey.toLowerCase();
    if(YazılanŞey.trim().length == 0)      // Alfanümerik olmayan bir tuşa basınca da tekrar kontrol gönderiyor.  //- ile boşluk karekteri aynı yapılmalı
    {
        AraÇekmecesiniKapat();
    }
    else
    {
        let İçerenler = [];
        let SecilenDil = document.getElementById("Arama-Çubuğu-Dil").value
        for(let i = 0; i<NoktalarJSON.features.length; i++)
        {  
            if(SecilenDil === "Bulgarca-Latin")
            {
                if(NoktalarJSON.features[i].properties.BulgarcaLatin.toLowerCase().includes(YazılanŞey))
                {
                    let noktaDict = new Object();
                    noktaDict["Kimlik"] = NoktalarJSON.features[i].properties.Kimlik
                    noktaDict["Ad"] = NoktalarJSON.features[i].properties.BulgarcaLatin
                    İçerenler.push(noktaDict);
                }
            }
            if(SecilenDil === "Bulgarca-Kiril")
            {
                if(NoktalarJSON.features[i].properties.BulgarcaKiril.toLowerCase().includes(YazılanŞey))
                {
                    let noktaDict = new Object();
                    noktaDict["Kimlik"] = NoktalarJSON.features[i].properties.Kimlik
                    noktaDict["Ad"] = NoktalarJSON.features[i].properties.BulgarcaKiril
                    İçerenler.push(noktaDict);
                }
            }
            if(SecilenDil === "Türkçe")
            {
                if(NoktalarJSON.features[i].properties.Türkçe.toLowerCase().includes(YazılanŞey))
                {
                    let noktaDict = new Object();
                    noktaDict["Kimlik"] = NoktalarJSON.features[i].properties.Kimlik
                    noktaDict["Ad"] = NoktalarJSON.features[i].properties.Türkçe
                    İçerenler.push(noktaDict);
                }
            }
            if(SecilenDil === "Osmanlıca")
            {
                if(NoktalarJSON.features[i].properties.Osmanlıca.toLowerCase().includes(YazılanŞey))
                {
                    let noktaDict = new Object();
                    noktaDict["Kimlik"] = NoktalarJSON.features[i].properties.Kimlik
                    noktaDict["Ad"] = NoktalarJSON.features[i].properties.Osmanlıca
                    İçerenler.push(noktaDict);
                }
            }
        }

        let ilkİçerenler = [];
        let sonİçerenler = [];
        let Ortaİçerenler = [];
        for(let i = 0; i<İçerenler.length; i++)
        {
            if(İçerenler[i].Ad.substring(0, YazılanŞey.length).toLowerCase() == YazılanŞey)
            {
                ilkİçerenler.push(İçerenler[i]);
            }
            else if(İçerenler[i].Ad.substring(YazılanŞey.length, İçerenler[i].length-YazılanŞey.length).includes(YazılanŞey))
            {
                Ortaİçerenler.push(İçerenler[i]);
            }
            else
            {
                sonİçerenler.push(İçerenler[i]);
            }
        }

        AraÇekmecesiniAç(ilkİçerenler,Ortaİçerenler,sonİçerenler);//Ara çekmecesini açar.
    }
}

function NoktayıGetir(Nokta_Kimliği)
{
    let result = NoktalarJSON.features.filter(feature => feature.properties.Kimlik === Nokta_Kimliği)
    return result;
}

//Tıklanan noktanın penceresi açılacak
function NoktayaGit(Nokta_Kimliği)
{
    let nokta = NoktayıGetir(Nokta_Kimliği)[0];
    let zoom
    if(nokta.properties.BolgeTuru === "İl")
    {
        zoom = 8
    }
    else
    {
        zoom = 12
    }
    map.setView([nokta.geometry.coordinates[1],nokta.geometry.coordinates[0]],zoom);
    
    KullanıcıÇekmecesiniKapat();
    NoktaÇekmecesiYarat(nokta);
}

//Tıklanan noktanın penceresi açılmaz, noktanın konumuna gider.
function NoktayaGit_KÇKapatma(Nokta_Kimliği)
{
    let nokta = NoktayıGetir(Nokta_Kimliği)[0];
    let zoom;
    if(nokta.properties.BolgeTuru === "İl")
    {
        zoom = 8;
    }
    else
    {
        zoom = 12;
    }
    map.setView([nokta.geometry.coordinates[1],nokta.geometry.coordinates[0]],zoom);
}