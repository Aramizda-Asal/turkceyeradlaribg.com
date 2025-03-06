class Nokta
{
    constructor(Bulgarca_Latin, Bulgarca_Kiril, Türkçe, Osmanlıca,
                enlem, boylam, bölge_türü, üst_bölge, kimlik)
    {
        this.Bulgarca_Latin = Bulgarca_Latin;
        this.Bulgarca_Kiril = Bulgarca_Kiril;
        this.Türkçe = Türkçe;
        this.Osmanlıca = Osmanlıca;
        this.enlem = enlem;
        this.boylam = boylam;
        this.bölge_türü = bölge_türü;
        this.üst_bölge = üst_bölge;
        this.kimlik = kimlik;
    }
}

function NoktaOluşturucuFeature(geoJSONNokta)
{
    let nokta = new Nokta(geoJSONNokta.properties.BulgarcaLatin, geoJSONNokta.properties.BulgarcaKiril, geoJSONNokta.properties.Türkçe, 
                            geoJSONNokta.properties.Osmanlıca, geoJSONNokta.geometry.coordinates[1], geoJSONNokta.geometry.coordinates[0], 
                            geoJSONNokta.properties.BolgeTuru, geoJSONNokta.properties.UstBolge, geoJSONNokta.properties.Kimlik)
    
    return nokta;
}

class Feature
{
    constructor(Bulgarca_Latin, Bulgarca_Kiril, Türkçe, Osmanlıca, enlem, boylam, bolge_turu, ust_bolge, kimlik)
    {
        this.type = "Feature";
        this.properties = {};
        this.properties["BulgarcaLatin"] = Bulgarca_Latin;
        this.properties["BulgarcaKiril"] = Bulgarca_Kiril;
        this.properties["Türkçe"] = Türkçe;
        this.properties["Osmanlıca"] = Osmanlıca;
        this.properties["BolgeTuru"] = bolge_turu;
        this.properties["UstBolge"] = ust_bolge;
        this.properties["Kimlik"] = kimlik;
        this.geometry = {};
        this.geometry["type"] = "Point";
        this.geometry["coordinates"] = [boylam, enlem];
    }
}

function FeatureOluşturucuNokta(nokta)
{
    return new Feature(nokta.Bulgarca_Latin, nokta.Bulgarca_Kiril, nokta.Türkçe,
        nokta.Osmanlıca, nokta.enlem, nokta.boylam, nokta.bölge_türü, nokta.üst_bölge, nokta.kimlik);
}

var NoktalarJSON = 
{
    "type": "FeatureCollection",
    "features": []
}

let Noktalar = [];

async function NoktalarıBaşlat()
{
    await NoktalarıÇek()
    NoktalarJSON.features = Noktalar;
    BulgaristanNokta = L.geoJSON(NoktalarJSON, 
    {
        onEachFeature: (feature, layer) =>
        { 
            MarkerClickFeature(feature, layer);
    
            if (feature.properties.BolgeTuru === "İl") 
            {
                SehirKatmani.addLayer(layer);
            }
            else if (feature.properties.BolgeTuru === "Köy") 
            {
                KöyKatmani.addLayer(layer);
                let konumlar = KöyNoktaKaresiBul_Feature(feature);
                KöyKatmanları[konumlar[0]][konumlar[1]].addLayer(layer);
            }
            else if (feature.properties.BolgeTuru === "Kasaba") 
            {
                KasabaKatmani.addLayer(layer);
            }
        }
    });

    map.addLayer(SehirKatmani)

}

const kuzey_uç = 44.22;
const güney_uç = 41.22;
const satır_niceliği = 16;
const dikey_aralık = (kuzey_uç - güney_uç) / satır_niceliği;

const batı_uç = 22.3;
const doğu_uç = 28.7;
const sütun_niceliği = 24;
const yatay_aralık = (doğu_uç - batı_uç) / sütun_niceliği;


function KöyNoktaKaresiBul_Feature(feature)
{
    let enlem = feature.geometry.coordinates[1];
    let boylam = feature.geometry.coordinates[0];

    return KöyNoktaKaresiBul(enlem, boylam);
}

function KöyNoktaKaresiBul(enlem, boylam)
{
    let kareler = [satır_niceliği, sütun_niceliği]; // dikey, yatay

    for (let satır = 0; satır < satır_niceliği; satır++)
    {
        if (kuzey_uç - dikey_aralık * satır >= enlem)
        {
            if (kuzey_uç - dikey_aralık * (satır + 1) < enlem)
            {
                kareler[0] = satır;
                break;
            }
        }
    }
    for (let sütun = 0; sütun < sütun_niceliği; sütun++)
    {
        if (batı_uç + yatay_aralık * sütun <= boylam)
        {
            if (batı_uç + yatay_aralık * (sütun + 1) > boylam)
            {
                kareler[1] = sütun;
                break;
            }
        }
    }
    return kareler;
}

async function NoktalarıÇek()
{
    let url = `${adres}Harita/NoktaAl`;
    
    let response =  await fetch(url, {method:"GET"});

    let responsejs = await response.json();

    for(let i = 0; i<responsejs.length; i++)
    {
        let enlem = parseFloat(responsejs[i][0]);
        let boylam = parseFloat(responsejs[i][1]);
        Noktalar.push(new Feature(responsejs[i][2], responsejs[i][3], responsejs[i][4], responsejs[i][5], enlem, boylam, responsejs[i][6], responsejs[i][7], responsejs[i][8]));
    }
}

async function NoktaÇekmecesiYarat(feature)
{
    let enlem;
    let boylam;
    if(feature.geometry.coordinates[1] instanceof Float32Array)
    {
        enlem = feature.geometry.coordinates[1].toFixed(6);
    }
    else
    {
        enlem = feature.geometry.coordinates[1]
    }
    if(feature.geometry.coordinates[0] instanceof Float32Array)
    {
        boylam = feature.geometry.coordinates[0].toFixed(6);
    }
    else
    {
        boylam = feature.geometry.coordinates[0]
    }

    NoktaÇekmecesi();
    document.getElementById("nokta-büyükBaşlık").innerHTML = feature.properties.BulgarcaLatin;
    document.getElementById("nokta-altBaşlık").innerHTML = feature.properties.BulgarcaKiril;
    document.getElementById("nokta-dillerTR").innerHTML ="Türkçe: " + feature.properties.Türkçe;
    document.getElementById("nokta-dillerOS").innerHTML ="Osmanlıca: " + feature.properties.Osmanlıca;

    document.getElementById("nokta-koordinat").innerHTML = enlem + ", " + boylam;
    let favori_butonu = document.getElementById("favori-butonu");
    if (favori_butonu !== null)
        favori_butonu.setAttribute("konum-kimliği", feature.properties.Kimlik);
    let nokta_silme_butonu = document.getElementById("nokta-silme-butonu");
    if (nokta_silme_butonu !== null)
        nokta_silme_butonu.setAttribute("konum-kimliği", feature.properties.Kimlik);
    let nokta_düzenle_butonu = document.getElementById("nokta-duzenle-butonu")
    if (nokta_düzenle_butonu !== null)
        nokta_düzenle_butonu.setAttribute("konum-kimliği", feature.properties.Kimlik);
    let nokta_kaydet_butonu = document.getElementById("nokta-kaydet-butonu");
    if (nokta_kaydet_butonu !== null)
        nokta_kaydet_butonu.setAttribute("konum-kimliği", feature.properties.Kimlik);

    let url = `${adres}Favori/SatirVarMi`;   
    let yanıt = await fetch(url, 
        {
            method: 'POST',
            headers: 
            {
                'KULLANICI': ÇerezDeğeri("KULLANICI"),
                'OTURUM': ÇerezDeğeri("OTURUM"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feature.properties.Kimlik)
        }); 
    if (yanıt.status === 200)
    {
        FavoriButonuDoldur()
    }
    else if(yanıt.status === 404)
    {
        FavoriButonuBosalt()
    }

    document.getElementById("nokta-link").href = "https://www.google.com/maps/@" + enlem + 
                                                    "," + boylam + ",13z?entry=ttu";
}

function NoktaAra()
{
    let YazılanŞey = document.getElementById("aramaÇubuğu").value
    YazılanŞey = YazılanŞey.toLowerCase();
    if(YazılanŞey.trim().length == 0)      
    // Alfanümerik olmayan bir tuşa basınca da tekrar kontrol gönderiyor.
    //- ile boşluk karekteri aynı yapılmalı
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

async function NoktaSil(button)
{
    let url = `${adres}Harita/NoktaSil`;
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");  
    let nokta_kimliği = button.getAttribute('konum-kimliği'); 
    let yanıt = await fetch(url, 
        {
            method: 'DELETE',
            headers: 
            {
                'KULLANICI': kullanıcı_kimliği,
                'OTURUM': oturum_kimliği,
                'NOKTA': nokta_kimliği
            }
        }); 
    if(yanıt.status === 200)
    {
        alert("Nokta Silindi");
        window.location.reload();
    }
    else
    {
        alert("Nokta Silinemedi");
    }
}

async function NoktaEkle() 
{
    let url = `${adres}Harita/NoktaEkle`;
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");  

    let noktaGirdileri = document.getElementsByClassName("NoktaEkle-Girdiler");
    let nokta = new Nokta(noktaGirdileri[2].value,noktaGirdileri[3].value,noktaGirdileri[4].value,
        noktaGirdileri[5].value,noktaGirdileri[0].value,noktaGirdileri[1].value,noktaGirdileri[6].value,
        noktaGirdileri[7].value,null);

    let yanıt = await fetch(url, 
        {
            method: 'PUT',
            headers: 
            {
                'KULLANICI': kullanıcı_kimliği,
                'OTURUM': oturum_kimliği,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nokta)
        }); 
    if(yanıt.status === 200)
    {
        KÇ_NoktaEkle_GirdileriBoşalt();
        TooltipEkle(nokta);
        alert("Nokta Eklendi.")
    }
    else
    {
        alert("Nokta Eklenemedi.");
    }
}

/**
 * Nokta düzenleyicide yapılan işlemi kaydeder.
 * 
 * @param {HTMLElement} button  Nokta düzenlemesini kaydetme düğmesi
 */
async function DegisiklikleriKaydet(button)
{
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");

    let nokta = NoktayıGetir(button.getAttribute("konum-kimliği"))[0]
    let Degisti = false;
    let türkçeİsimDeğişti = false;
    if(nokta.geometry.coordinates[1] != document.getElementById("NoktaDuzenle-EnlemDerece").value)
    {
        nokta.geometry.coordinates[1] = document.getElementById("NoktaDuzenle-EnlemDerece").value;
        Degisti = true;
    }
    if(nokta.geometry.coordinates[0] != document.getElementById("NoktaDuzenle-BoylamDerece").value)
    {
        nokta.geometry.coordinates[0] = document.getElementById("NoktaDuzenle-BoylamDerece").value;
        Degisti = true;
    }
    if(nokta.properties.BulgarcaLatin != document.getElementById("NoktaDuzenle-BulgarcaLatinİsim").value)
    {
        nokta.properties.BulgarcaLatin = document.getElementById("NoktaDuzenle-BulgarcaLatinİsim").value;
        Degisti = true;
    }
    if(nokta.properties.BulgarcaKiril != document.getElementById("NoktaDuzenle-BulgarcaKirilİsim").value)
    {
        nokta.properties.BulgarcaKiril = document.getElementById("NoktaDuzenle-BulgarcaKirilİsim").value;
        Degisti = true;
    }
    if(nokta.properties.Türkçe != document.getElementById("NoktaDuzenle-Türkçeİsim").value)
    {
        nokta.properties.Türkçe = document.getElementById("NoktaDuzenle-Türkçeİsim").value;
        Degisti = true;
        türkçeİsimDeğişti = true;
    }
    if(nokta.properties.Osmanlıca != document.getElementById("NoktaDuzenle-Osmanlıcaİsim").value)
    {
        nokta.properties.Osmanlıca = document.getElementById("NoktaDuzenle-Osmanlıcaİsim").value;
        Degisti = true;
    }
    if(nokta.properties.BolgeTuru != document.getElementById("NoktaDuzenle-BölgeTürü").value)
    {
        nokta.properties.BolgeTuru = document.getElementById("NoktaDuzenle-BölgeTürü").value;
        Degisti = true;
    }
    if(nokta.properties.UstBolge != document.getElementById("NoktaDuzenle-ÜstBölge").value)
    {
        nokta.properties.UstBolge = document.getElementById("NoktaDuzenle-ÜstBölge").value;
        Degisti = true;
    }
    

    if(Degisti)
    {
        let geri_nokta = NoktaOluşturucuFeature(nokta);
        let url = `${adres}Harita/NoktaGüncelle`;  
        
        let yanıt = await fetch(url, 
            {
                method: 'PUT',
                headers: 
                {
                    'KULLANICI': kullanıcı_kimliği,
                    'OTURUM': oturum_kimliği,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(geri_nokta)
            }); 
        if (yanıt.status === 200)
        {
            currentTooltip.remove();
            let noktaTürü = NoktaOluşturucuFeature(nokta);
            TooltipEkle(noktaTürü);
            alert("Degisti")
            NoktayaGit(geri_nokta.kimlik);
        }
        else
        {
            alert("Degismedi");
        }
    }

}

function TooltipEkle(nokta)
{
    let feature = FeatureOluşturucuNokta(nokta);
    console.log(feature);
    let newMarker = L.marker([nokta.enlem, nokta.boylam]).bindTooltip(nokta.Türkçe, {permanent: true, direction: "top", className: "nokta-label"});
    newMarker.on
    ({
        click: function()
        {
            NoktaÇekmecesiYarat(feature);
        }
    })

    NoktalarJSON.features.push(feature);

    if (nokta.bölge_türü === "İl") 
    {
        SehirKatmani.addLayer(newMarker);
    }
    else if (nokta.bölge_türü === "Köy") 
    {
        KöyKatmani.addLayer(newMarker);
        let konumlar = KöyNoktaKaresiBul(nokta.enlem, nokta.boylam);
        KöyKatmanları[konumlar[0]][konumlar[1]].addLayer(newMarker);
    }
    else if (nokta.bölge_türü === "Kasaba") 
    {
        KasabaKatmani.addLayer(newMarker);
    }
}