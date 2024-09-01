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

var noktalarJSON =
{
    "type": "FeatureCollection",
    "features": []
};

function NoktalarıBaşlat()
{
    let noktalar = [];
    noktalar.push(new Nokta("Pazardzhik", "Пазарджик", "Pazarcık", "PazarcıkO", 42.192271, 24.334235));
    noktalar.push(new Nokta("Plovdiv", "Пловдив", "Filibe", "FilibeO", 42.13585393690252, 24.74551641878407));

    for (i = 0; i < noktalar.length; i++)
    {
        let özellik = {};
        özellik["type"] = "Feature";
        özellik["properties"] = {};
        özellik.properties["BulgarcaLatin"] = noktalar[i].Bulgarca_Latin;
        özellik.properties["BulgarcaKiril"] = noktalar[i].Bulgarca_Kiril;
        özellik.properties["Türkçe"] = noktalar[i].Türkçe;
        özellik.properties["Osmanlıca"] = noktalar[i].Osmanlıca;
        özellik["geometry"] = {};
        özellik.geometry["type"] = "Point";
        özellik.geometry["coordinates"] = [noktalar[i].boylam, noktalar[i].enlem];
        noktalarJSON.features.push(özellik);
    }
}