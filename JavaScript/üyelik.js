function Kaydol()
{
    let KullanıcıAdı = document.getElementById("kullanıcıadı-kayıt").value
    let E_Posta = document.getElementById("eposta-kayıt").value
    let Parola1 = document.getElementById("parola-kayıt").value
    let Parola2 = document.getElementById("parola-kayıt-tekrar").value
    if(Parola1 === Parola2)
    {
        let url = "http://localhost:5130/Kullanıcı/KullanıcıEkle/" + KullanıcıAdı + "/" + E_Posta + "/" + Parola1
        fetch(url, {method: 'POST'})
            .then(response =>{
                if(response.status === 201)
                {
                    alert("Kayit Olundu")
                }
                else
                {
                    alert("Kayit Olunamadı")
                }
            })
    }
    else
    {
        alert("Kayit Olunamadı")
    }
}

async function GirişYap()
{
    let kullanıcıAdı = encodeURIComponent(document.getElementById("kullanıcıadı-giriş").value);
    let parola = encodeURIComponent(document.getElementById("parola-giriş").value);

    let url = `http://localhost:5130/Oturum/GirişYap/${kullanıcıAdı}/${parola}`;
    let yanıt = await fetch(url, {method: 'GET'});

    if (yanıt.status === 200)
    {
        let yanıt_json = await yanıt.json();
        let oturum = JSON.parse(yanıt_json);
        let çerez_sonu = new Date(oturum.Bitiş);
        ÇerezOluştur("KULLANICI", oturum.Kullanıcı.Kimlik, çerez_sonu);
        ÇerezOluştur("OTURUM", oturum.Kimlik, çerez_sonu);
        şimdi_kullanan = oturum.Kullanıcı;
    }
    else
    {
        alert("Giriş Reddedildi.");
    }

    document.getElementById("kullanıcıadı-giriş").value = "";
    document.getElementById("parola-giriş").value = "";

    ArayüzüKişiselleştir();
}
async function ÇıkışYap()
{
    if (şimdi_kullanan !== null)
    {
        let kullanıcı_kimliği = encodeURIComponent(ÇerezDeğeri("KULLANICI"));
        let oturum_kimliği = encodeURIComponent(ÇerezDeğeri("OTURUM"));

        let url = `http://localhost:5130/Oturum/OturumKapat/${oturum_kimliği}/${kullanıcı_kimliği}`;
        let yanıt = await fetch(url, {method: 'POST'});
        if (yanıt.status === 200)
        {
            ÇerezSil("KULLANICI");
            ÇerezSil("OTURUM");
            şimdi_kullanan = null;
            ArayüzüKişiselleştir();
        }
    }
}

async function OturumAçık()
{
    let kullanıcı_kimliği = encodeURIComponent(ÇerezDeğeri("KULLANICI"));
    let oturum_kimliği = encodeURIComponent(ÇerezDeğeri("OTURUM"));

    let url = `http://localhost:5130/Oturum/OturumAçık/${oturum_kimliği}/${kullanıcı_kimliği}`;
    let response = await fetch(url, {method: 'GET'});
    if (response.status === 200)
    {
        let jresponse = await response.json();
        şimdi_kullanan = JSON.parse(jresponse);
        return true;
    }
    else
    {
        şimdi_kullanan = null;
        return false;
    }
}

/**
 * Parola değiştirme sayfasındaki form doldurulduktan sonra değişim isteği gönderir.
 * 
 * @returns Parola başarıyla değişirse true, değişmezse false.
 */
async function ParolaDeğiştir()
{
    if (şimdi_kullanan === null)
    {
        Açılış();
        return false;
    }

    let mevcut_parola = document.getElementById("ParolaDeğiştir-MevcutParola");
    let yeni_parola = document.getElementById("ParolaDeğiştir-YeniParola");
    let yeni_parola_tekrar = document.getElementById("ParolaDeğiştir-YeniParolaTekrar");

    if (mevcut_parola.value.length > 0 &&
        yeni_parola.value.length > 0 &&
        yeni_parola_tekrar.value.length > 0)
    {
        if (yeni_parola.value === yeni_parola_tekrar.value)
        {
            let kullanıcı_kimliği = encodeURIComponent(şimdi_kullanan.Kimlik);
            let giden_mevcut = encodeURIComponent(mevcut_parola.value);
            let giden_yeni = encodeURIComponent(yeni_parola.value);

            let url = `${adres}Kullanıcı/ParolaDeğiştir/${kullanıcı_kimliği}/${giden_mevcut}/${giden_yeni}/`;
            let yanıt = await fetch(url, {method: "PATCH"});

            if (yanıt.status == 200)
            {
                alert("Parolanız başarıyla yenilendi.");
                KÇAnaSayfa();
            }
            else
            {
                alert("Parolanız yenilenemedi.");
            }

            mevcut_parola.value = "";
            yeni_parola.value = "";
            yeni_parola_tekrar.value = "";
            return yanıt.status == 200;
        }
        else
        {
            alert("Girdiğiniz yeni parolalar aynı değil.");
            yeni_parola.value = "";
            yeni_parola_tekrar.value = "";
            return false;
        }
    }
    else
    {
        alert("Parolanızı değiştirebilmek için tüm kutuları doldurmalısınız.");
        return false;
    }
}

async function KullanıcıAdıDeğiştir()
{
    if (şimdi_kullanan === null)
    {
        Açılış();
        return false;
    }

    let parola = document.getElementById("KullanıcıAdıDeğiştir-Parola");
    let yeni_ad = document.getElementById("KullanıcıAdıDeğiştir-Yenisi");

    if (parola.value.length > 0 &&
        yeni_ad.value.length > 0)
    {
        let kullanıcı_kimliği = encodeURIComponent(şimdi_kullanan.Kimlik);
        let giden_parola = encodeURIComponent(parola.value);
        let giden_yeni = encodeURIComponent(yeni_ad.value);

        let url = `${adres}Kullanıcı/KullanıcıAdıDeğiştir/${kullanıcı_kimliği}/` +
                  `${giden_parola}/${giden_yeni}/`;
        console.log(url);
        let yanıt = await fetch(url, {method: "PATCH"});

        if (yanıt.status == 200)
        {
            alert("Kullanıcı adınız başarıyla yenilendi.");
            Açılış();
        }
        else
        {
            alert("Kullanıcı adınız yenilenemedi.");
        }

        parola.value = "";
        yeni_ad.value = "";
        return yanıt.status == 200;
    }
    else
    {
        alert("Kullanıcı adınızı değiştirebilmek için tüm kutuları doldurmalısınız.");
        return false;
    }
}