var map = L.map('map', { zoomControl: false});//.setView([42.2000008,24.3330002], 8);
map.fitBounds([
    [kuzey_uç, batı_uç],
    [güney_uç, doğu_uç]
]);
map.options.minZoom = 7;
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

    let tooltip = layer.bindTooltip(feature.properties.Türkçe, {permanent: true, direction: "top", className: "nokta-label"});
    tooltip.openTooltip();
}

let SehirKatmani = L.layerGroup();
let KöyKatmani = L.layerGroup();
let KasabaKatmani = L.layerGroup();
let KöyKatmanları = [];
for (let satır = 0; satır < satır_niceliği; satır++)
{
    KöyKatmanları[satır] = [];
    for (let sütun = 0; sütun < sütun_niceliği; sütun++)
    {
        KöyKatmanları[satır][sütun] = L.layerGroup();
    }
}
let BulgaristanNokta;
//Noktaları oluşturan ve haritaya ekleyen fonksiyon.
NoktalarıBaşlat()

//Burası ters çalışıyor nedenini anlamadım anlamamaya devam ediyorum kolay gelsin.
map.on (
    {
        moveend: function ()
        {
            let sınırlar = map.getBounds();
            let batı = sınırlar._southWest.lng;
            let doğu = sınırlar._northEast.lng;
            let güney = sınırlar._southWest.lat;
            let kuzey = sınırlar._northEast.lat;

            let batı_sıra = 0;
            let doğu_sıra = 0;
            let güney_sıra = 0;
            let kuzey_sıra = 0;

            let yatay_doğu_fark = doğu - batı_uç;
            if (yatay_doğu_fark > 0)
            {
                doğu_sıra = Math.floor(yatay_doğu_fark / yatay_aralık);
                if (yatay_doğu_fark % yatay_aralık > 0)
                    doğu_sıra ++;

                let yatay_batı_fark = batı - batı_uç;
                if (yatay_batı_fark > 0)
                {
                    batı_sıra = Math.floor(yatay_batı_fark / yatay_aralık);
                }
            }
            
            let dikey_güney_fark = kuzey_uç - güney;
            if (dikey_güney_fark > 0)
            {
                güney_sıra = Math.floor(dikey_güney_fark / dikey_aralık);
                if (dikey_güney_fark % dikey_aralık > 0)
                    güney_sıra ++;

                let dikey_kuzey_fark = kuzey_uç - kuzey;
                if (dikey_kuzey_fark > 0)
                {
                    kuzey_sıra = Math.floor(dikey_kuzey_fark / dikey_aralık);
                }
            }

            if (map.getZoom() <= 10)
            {
                // Bu yakınlaştırma düzeyinde köyler görüntülenmez.
                for (satır in KöyKatmanları)
                {
                    for (sütun in KöyKatmanları[satır])
                    {
                        if (map.hasLayer(KöyKatmanları[satır][sütun]))
                        {
                            map.removeLayer(KöyKatmanları[satır][sütun]);
                        }
                    }
                }

                if (map.hasLayer(KasabaKatmani))
                {
                    map.removeLayer(KasabaKatmani);
                }
                if(!map.hasLayer(SehirKatmani))
                {
                    map.addLayer(SehirKatmani);
                }
            }
            else
            {
                if (map.hasLayer(SehirKatmani))
                {
                    map.removeLayer(SehirKatmani);
                }
                if (!map.hasLayer(KasabaKatmani))
                {
                    map.addLayer(KasabaKatmani);
                }
                AralıktakiKöyKatmanlarınıAç(kuzey_sıra, güney_sıra, batı_sıra, doğu_sıra);
            }
            
        }
    }
);

function AralıktakiKöyKatmanlarınıAç(kuzey_sıra, güney_sıra, batı_sıra, doğu_sıra)
{
    // Bakılan bölgenin kuzeyindeki tüm köy katmanları kaldırılır.
    for (let satır = 0; satır < kuzey_sıra; satır++)
    {
        for (sütun in KöyKatmanları[satır])
        {
            if (map.hasLayer(KöyKatmanları[satır][sütun]))
            {
                map.removeLayer(KöyKatmanları[satır][sütun]);
            }
        }
    }

    // Bakılan bölgenin güneyindeki tüm köy katmanları kaldırılır.
    for (let satır = güney_sıra + 1; satır < KöyKatmanları.length; satır++)
    {
        for (sütun in KöyKatmanları[satır])
        {
            if (map.hasLayer(KöyKatmanları[satır][sütun]))
            {
                map.removeLayer(KöyKatmanları[satır][sütun]);
            }
        }
    }

    // Bakılan bölgedeki satırlarda temizlik yapılır.
    for (let satır = kuzey_sıra; satır <= güney_sıra && satır < KöyKatmanları.length; satır++)
    {
        // Bakılan bölgenin batısındaki tüm köy katmanları kaldırılır.
        for (let sütun = 0; sütun < batı_sıra; sütun++)
        {
            if (map.hasLayer(KöyKatmanları[satır][sütun]))
            {
                map.removeLayer(KöyKatmanları[satır][sütun]);
            }
        }

        // Bakılan bölgenin doğusundaki tüm köy katmanları kaldırılır.
        for (let sütun = doğu_sıra + 1; sütun < KöyKatmanları[satır].length; sütun++)
        {
            if (map.hasLayer(KöyKatmanları[satır][sütun]))
            {
                map.removeLayer(KöyKatmanları[satır][sütun]);
            }
        }
    }

    // Bakılan bölgedeki tüm köy katmanları eklenir.
    for (let satır = kuzey_sıra; satır <= güney_sıra && satır < KöyKatmanları.length; satır++)
    {
        for (let sütun = batı_sıra; sütun <= doğu_sıra && sütun < KöyKatmanları[satır].length; sütun++)
        {
            if (!map.hasLayer(KöyKatmanları[satır][sütun]))
            {
                map.addLayer(KöyKatmanları[satır][sütun]);
            }
        }
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
    AraÇekmecesiniKapat();
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