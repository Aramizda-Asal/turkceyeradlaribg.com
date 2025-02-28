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

function NoktaOlusturucuGeoJSON(geoJSONNokta)
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
            }
            else if (feature.properties.BolgeTuru === "Kasaba") 
            {
                KasabaKatmani.addLayer(layer);
            }
        }
    });

    map.addLayer(SehirKatmani)
    map.addLayer(KöyKatmani);
    map.addLayer(KasabaKatmani);
    map.removeLayer(KöyKatmani);
    map.removeLayer(KasabaKatmani);
}

async function NoktalarıÇek()
{
    let url = "http://localhost:5130/Harita/NoktaAl";
    
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
    NoktaÇekmecesi();
    document.getElementById("nokta-büyükBaşlık").innerHTML = feature.properties.BulgarcaLatin;
    document.getElementById("nokta-altBaşlık").innerHTML = feature.properties.BulgarcaKiril;
    document.getElementById("nokta-dillerTR").innerHTML ="Türkçe: " + feature.properties.Türkçe;
    document.getElementById("nokta-dillerOS").innerHTML ="Osmanlıca: " + feature.properties.Osmanlıca;
    document.getElementById("nokta-koordinat").innerHTML = feature.geometry.coordinates[1].toFixed(6) + ", " + feature.geometry.coordinates[0].toFixed(6);
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

    let url = `http://localhost:5130/Favori/SatirVarMi`;   
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
    else
    {
        FavoriButonuBosalt()
    }

    document.getElementById("nokta-link").href = "https://www.google.com/maps/@" + feature.geometry.coordinates[1].toFixed(6) + 
                                                    "," + feature.geometry.coordinates[0].toFixed(6) + ",13z?entry=ttu";
}

async function NoktaSil(button)
{
    let url = `http://localhost:5130/Harita/NoktaSil`;
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
    let url = `http://localhost:5130/Harita/NoktaEkle`;
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");  

    let noktaGirdileri = document.getElementsByClassName("NoktaEkle-Girdiler");
    let nokta = new Nokta(noktaGirdileri[2].value,noktaGirdileri[3].value,noktaGirdileri[4].value,
        noktaGirdileri[5].value,noktaGirdileri[0].value,noktaGirdileri[1].value,noktaGirdileri[6].value,
        noktaGirdileri[7].value,null);

    console.log(JSON.stringify(nokta));

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
        alert("Nokta Eklendi.")
    }
    else
    {
        alert("Nokta Eklenemedi.");
    }
}