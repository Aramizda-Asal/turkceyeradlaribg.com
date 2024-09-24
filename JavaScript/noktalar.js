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
    constructor(Bulgarca_Latin, Bulgarca_Kiril, Türkçe, Osmanlıca, enlem, boylam)
    {
        this.type = "Feature";
        this.properties = {};
        this.properties["BulgarcaLatin"] = Bulgarca_Latin;
        this.properties["BulgarcaKiril"] = Bulgarca_Kiril;
        this.properties["Türkçe"] = Türkçe;
        this.properties["Osmanlıca"] = Osmanlıca;
        this.geometry = {};
        this.geometry["type"] = "Point";
        this.geometry["coordinates"] = [boylam, enlem];
    }
}

var noktalarJSON =
{
    "type": "FeatureCollection",
    "features": []
};

async function NoktalarıBaşlat()
{
    //let geçicinoktalar = await ŞehirNoktalarınıÇek(); //veri tabanından çekilen noktalar diziye atanıyor
    let noktalar = [];
    noktalar.push(new Feature("Pazardzhik", "Пазарджик", "Pazarcık", "PazarcıkO", 42.192271, 24.334235));
    noktalar.push(new Feature("Plovdiv", "Пловдив", "Filibe", "FilibeO", 42.13585393690252, 24.74551641878407));
    noktalar.push(new Feature("Blagoevgrad", "Благоевград", "Blagoevgrad", "BlagoevgradO", 41.75027778,23.25027778));
    noktalar.push(new Feature("Burgas", "Бургас", "Burgas", "BurgasO", 42.50027778, 27.25027778));
    noktalar.push(new Feature("Dobrich", "Добрич", "Dobrich", "DobrichO",43.58361111, 27.8061111));
    noktalar.push(new Feature("Gabrovo", "Габрово", "Gabrovo", "GabrovoO", 42.91694444, 25.25027778))
    noktalarJSON.features = noktalar;
}


//Veri tabanından noktaları çekme fonksiyonu.
async function ŞehirNoktalarınıÇek()
{
    let url = "http://localhost:5130/Harita/NoktaAl/Şehir";
    
    let response =  await fetch(url, {method:"GET"});

    let responsejs = await response.json();

    return responsejs;
}