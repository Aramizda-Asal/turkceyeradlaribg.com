class Nokta
{
    constructor(Bulgarca_Latin, Bulgarca_Kiril, Türkçe, Osmanlıca, enlem, boylam)
    {
        this.Bulgarca_Latin = Bulgarca_Latin;
        this.Bulgarca_Kiril = Bulgarca_Kiril;
        this.Türkçe = Türkçe;
        this.Osmanlıca = Osmanlıca;
        this.enlem = enlem;
        this.boylam = boylam;
    }
}

class Feature
{
    constructor(Bulgarca_Latin, Bulgarca_Kiril, Türkçe, Osmanlıca, enlem, boylam, kimlik)
    {
        this.type = "Feature";
        this.properties = {};
        this.properties["BulgarcaLatin"] = Bulgarca_Latin;
        this.properties["BulgarcaKiril"] = Bulgarca_Kiril;
        this.properties["Türkçe"] = Türkçe;
        this.properties["Osmanlıca"] = Osmanlıca;
        this.properties["Kimlik"] = kimlik;
        this.geometry = {};
        this.geometry["type"] = "Point";
        this.geometry["coordinates"] = [boylam, enlem];
    }
}

var ŞehirnoktalarJSON =
{
    "type": "FeatureCollection",
    "features": []
};

var KöynoktalarJSON =
{
    "type": "FeatureCollection",
    "features": []
};

var KasabanoktalarJSON =
{
    "type": "FeatureCollection",
    "features": []
};

let Şehirnoktalar = [];
let Köynoktalar = [];
let Kasabanoktalar = [];

async function NoktalarıBaşlat()
{
    await ŞehirNoktalarınıÇek();
    await KöyNoktalarınıÇek();
    await KasabaNoktalarınıÇek();

    /*
    Şehirnoktalar.push(new Feature("Pazardzhik", "Пазарджик", "Pazarcık", "PazarcıkO", 42.192271, 24.334235));
    Şehirnoktalar.push(new Feature("Plovdiv", "Пловдив", "Filibe", "FilibeO", 42.13585393690252, 24.74551641878407));
    Şehirnoktalar.push(new Feature("Blagoevgrad", "Благоевград", "Blagoevgrad", "BlagoevgradO", 41.75027778,23.25027778));
    Şehirnoktalar.push(new Feature("Burgas", "Бургас", "Burgas", "BurgasO", 42.50027778, 27.25027778));
    Şehirnoktalar.push(new Feature("Dobrich", "Добрич", "Dobrich", "DobrichO",43.58361111, 27.8061111));
    Şehirnoktalar.push(new Feature("Gabrovo", "Габрово", "Gabrovo", "GabrovoO", 42.91694444, 25.25027778))
    */

    ŞehirnoktalarJSON.features = Şehirnoktalar;
    KöynoktalarJSON.features = Köynoktalar;
    KasabanoktalarJSON.features = Kasabanoktalar;

    BulgaristanŞehirNokta = L.geoJSON(ŞehirnoktalarJSON, {onEachFeature: MarkerClickFeature});
    BulgaristanKöyNokta = L.geoJSON(KöynoktalarJSON, {onEachFeature: MarkerClickFeature});
    BulgaristanKasabaNokta = L.geoJSON(KasabanoktalarJSON, {onEachFeature: MarkerClickFeature});

    BulgaristanŞehirNokta.addTo(map);
    //BulgaristanKöyNokta.addTo(map);
    //BulgaristanKasabaNokta.addTo(map);
}


//Veri tabanından noktaları çekme fonksiyonu.
async function ŞehirNoktalarınıÇek()
{
    let url = "http://localhost:5130/Harita/NoktaAl/Şehir";
    
    let response =  await fetch(url, {method:"GET"});

    let responsejs = await response.json();

    for(let i = 0; i<responsejs.length; i++)
    {
        let enlem = parseFloat(responsejs[i][0]);
        let boylam = parseFloat(responsejs[i][1]);
        Şehirnoktalar.push(new Feature(responsejs[i][2], responsejs[i][3], responsejs[i][4], responsejs[i][5], enlem, boylam, responsejs[i][8]));
    }
}

async function KöyNoktalarınıÇek()
{
    let url = "http://localhost:5130/Harita/NoktaAl/Köy";
    
    let response =  await fetch(url, {method:"GET"});

    let responsejs = await response.json();

    for(let i = 0; i<responsejs.length; i++)
    {
        let enlem = parseFloat(responsejs[i][0]);
        let boylam = parseFloat(responsejs[i][1]);
        Köynoktalar.push(new Feature(responsejs[i][2], responsejs[i][3], responsejs[i][4], responsejs[i][5], enlem, boylam, responsejs[i][8]));
    }
}

async function KasabaNoktalarınıÇek()
{
    let url = "http://localhost:5130/Harita/NoktaAl/Kasaba";
    
    let response =  await fetch(url, {method:"GET"});

    let responsejs = await response.json();

    for(let i = 0; i<responsejs.length; i++)
    {
        let enlem = parseFloat(responsejs[i][0]);
        let boylam = parseFloat(responsejs[i][1]);
        Kasabanoktalar.push(new Feature(responsejs[i][2], responsejs[i][3], responsejs[i][4], responsejs[i][5], enlem, boylam, responsejs[i][8]));
    }
}