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
            NoktaÇekmecesi();
            document.getElementById("nokta-büyükBaşlık").innerHTML = feature.properties.BulgarcaLatin;
            document.getElementById("nokta-altBaşlık").innerHTML = feature.properties.BulgarcaKiril;
            document.getElementById("nokta-dillerTR").innerHTML ="Türkçe: " + feature.properties.Türkçe;
            document.getElementById("nokta-dillerOS").innerHTML ="Osmanlıca: " + feature.properties.Osmanlıca;
            document.getElementById("nokta-koordinat").innerHTML = feature.geometry.coordinates[1].toFixed(6) + ", " + feature.geometry.coordinates[0].toFixed(6);
            document.getElementById("favori-butonu").setAttribute("konum-kimliği", feature.properties.Kimlik);

            let url = `http://localhost:5130/Favori/SatirVarMi/${encodeURIComponent(ÇerezDeğeri("KULLANICI"))}/${encodeURIComponent(feature.properties.Kimlik)}`;   
            let yanıt = await fetch(url, {method: 'POST'});
            if (yanıt.status === 200)
            {
                FavoriButonuDoldur()
            }
            else
            {
                FavoriButonuBosalt()
            }

            document.getElementById("nokta-link").href = "https://www.google.com/maps/@" + feature.geometry.coordinates[1].toFixed(6) + "," + feature.geometry.coordinates[0].toFixed(6) + ",13z?entry=ttu";
        }
    });

    layer.bindTooltip(feature.properties.Türkçe, {permanent: true, direction: "top", className: "nokta-label"}).openTooltip();
}

let SehirKatmani = L.layerGroup();
let KöyKatmani = L.layerGroup();
let KasabaKatmani = L.layerGroup();
let BulgaristanNokta;
//Noktaları oluşturan ve haritaya ekleyen fonksiyon.
NoktalarıBaşlat()

//Burası ters çalışıyor nedenini anlamadım anlamamaya devam ediyorum kolay gelsin.
map.on
('zoomend', function () 
    {
        if (map.getZoom() <= 10) 
        {
            if(!map.hasLayer(SehirKatmani))
            {
                map.addLayer(SehirKatmani);
            }

            map.removeLayer(KöyKatmani);

            map.removeLayer(KasabaKatmani);
        } 
        else
        {
            map.removeLayer(SehirKatmani);

            if(!map.hasLayer(KöyKatmani))
            {
                map.addLayer(KöyKatmani);
            }

            if(!map.hasLayer(KasabaKatmani))
            {
                map.addLayer(KasabaKatmani);
            }
            
        }
    });

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
                    İçerenler.push(NoktalarJSON.features[i].properties.BulgarcaLatin);
                }
            }
            if(SecilenDil === "Bulgarca-Kiril")
            {
                if(NoktalarJSON.features[i].properties.BulgarcaKiril.toLowerCase().includes(YazılanŞey))
                {
                    İçerenler.push(NoktalarJSON.features[i].properties.BulgarcaKiril);
                }
            }
            if(SecilenDil === "Türkçe")
            {
                if(NoktalarJSON.features[i].properties.Türkçe.toLowerCase().includes(YazılanŞey))
                {
                    İçerenler.push(NoktalarJSON.features[i].properties.Türkçe);
                }
            }
            if(SecilenDil === "Osmanlıca")
            {
                if(NoktalarJSON.features[i].properties.Osmanlıca.toLowerCase().includes(YazılanŞey))
                {
                    İçerenler.push(NoktalarJSON.features[i].properties.Osmanlıca);
                }
            }
        }

        let ilkİçerenler = [];
        let sonİçerenler = [];
        let Ortaİçerenler = [];
        for(let i = 0; i<İçerenler.length; i++)
        {
            if(İçerenler[i].substring(0, YazılanŞey.length).toLowerCase() == YazılanŞey)
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
        ilkİçerenler.sort();
        Ortaİçerenler.sort();
        sonİçerenler.sort();

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
    if(nokta.properties.BolgeTuru === "Şehir")
    {
        zoom = 8
    }
    else
    {
        zoom = 12
    }
    map.setView([nokta.geometry.coordinates[1],nokta.geometry.coordinates[0]],zoom);
    
}