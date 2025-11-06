// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
// Copyright (C) 2025 Habil Tataroğulları, Güneş Balcı, Yusuf Kozan
function Kaydol()
{
    let KullanıcıAdı = document.getElementById("kullanıcıadı-kayıt").value
    let E_Posta = document.getElementById("eposta-kayıt").value
    let Parola1 = document.getElementById("parola-kayıt").value
    let Parola2 = document.getElementById("parola-kayıt-tekrar").value
    if(Parola1 === Parola2)
    {
        let url = `${adres}Kullanıcı/KullanıcıEkle/${KullanıcıAdı}/${E_Posta}/${Parola1}`;
        fetch(url, {method: 'POST'})
            .then(response =>{
                if(response.status === 201)
                {
                    alert("Başarıyla Kaydoldunuz.");
                    Göster_GirişYap();
                    KaydoluBosalt();
                }
                else
                {
                    alert("Kayıt Başarısız Oldu.");
                    KaydoluBosalt();
                }
            })
    }
    else
    {
        alert("Kayıt Başarısız Oldu.");
        KaydoluBosalt();
    }
}

function KaydoluBosalt()
{
    document.getElementById("kullanıcıadı-kayıt").value = "";
    document.getElementById("eposta-kayıt").value = "";
    document.getElementById("parola-kayıt").value = "";
    document.getElementById("parola-kayıt-tekrar").value = "";
}

async function GirişYap()
{
    let kullanıcıAdı = encodeURIComponent(document.getElementById("kullanıcıadı-giriş").value);
    let parola = encodeURIComponent(document.getElementById("parola-giriş").value);

    let url = `${adres}Oturum/GirişYap/${kullanıcıAdı}/${parola}/`;
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

    await ArayüzüKişiselleştir();
}
async function ÇıkışYap()
{
    if (şimdi_kullanan !== null)
    {
        let kullanıcı_kimliği = encodeURIComponent(encodeURIComponent(ÇerezDeğeri("KULLANICI")));
        let oturum_kimliği = encodeURIComponent(encodeURIComponent(ÇerezDeğeri("OTURUM")));

        let url = `${adres}Oturum/OturumKapat/${oturum_kimliği}/${kullanıcı_kimliği}`;
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
    let kullanıcı_kimliği = encodeURIComponent(encodeURIComponent(ÇerezDeğeri("KULLANICI")));
    let oturum_kimliği = encodeURIComponent(encodeURIComponent(ÇerezDeğeri("OTURUM")));

    let url = `${adres}Oturum/OturumAçık/${oturum_kimliği}/${kullanıcı_kimliği}`;
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
            let kullanıcı_kimliği = encodeURIComponent(encodeURIComponent(şimdi_kullanan.Kimlik));
            let giden_mevcut = encodeURIComponent(encodeURIComponent(mevcut_parola.value));
            let giden_yeni = encodeURIComponent(encodeURIComponent(yeni_parola.value));

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
        let kullanıcı_kimliği = encodeURIComponent(encodeURIComponent(şimdi_kullanan.Kimlik));
        let giden_parola = encodeURIComponent(encodeURIComponent(parola.value));
        let giden_yeni = encodeURIComponent(encodeURIComponent(yeni_ad.value));

        let url = `${adres}Kullanıcı/KullanıcıAdıDeğiştir/${kullanıcı_kimliği}/` +
                  `${giden_parola}/${giden_yeni}/`;
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

async function KÇ_KullanıcıAra(girdi, divID, inputID)
{
    let div = document.getElementById(divID);
    div.innerHTML = "";

    if(girdi != null && girdi != "")
    {
        div.style.display = "block";
        girdi = encodeURIComponent(girdi);

        let url = `${adres}Kullanıcı/KullanıcıAra/${girdi}`;
        let yanıt = await fetch(url, {method: 'GET'});
        if(yanıt.status == 200)
        {
            let yanıtJSON = await yanıt.json();
            let Kullanıcılar = JSON.parse(yanıtJSON);
            
            Kullanıcılar.forEach((kullanıcı) =>
            {
                let button = document.createElement('div');
                button.innerText = kullanıcı;
                button.className = "KullanıcıAraÇekmece-satır";
                button.onclick = function ()
                {
                    div.style.display = "none";
                    let kullanıcıInput = document.getElementById(inputID);
                    kullanıcıInput.value = kullanıcı;
                    switch(inputID)
                    {
                        case "RolAta-Kullanıcı":
                            KÇ_RolAta_RolleriGetir();
                            break;
                        case "RolAl-Kullanıcı":
                            KÇ_RolAL_RolleriGetir();
                        case "KullanıcıSil-Kullanıcı":
                            DüğmeleriEtkinleştir("KullanıcıSil_Düğme");
                    }
                };
                div.appendChild(button);
            }
            );
        }
        else if(yanıt.status == 204)
        {
            let button = document.createElement('div');
            button.innerText = "Kullanıcı yok.";
            button.className = "KullanıcıAraÇekmece-satır";
            div.appendChild(button);
        }
        else
        {
            alert("Beklenmeyen bir hatayla karşılaşıldı.");
            KullanıcıÇekmecesiniKapat();
        }
    }
    else
    {
        div.style.display = "none";
    }
    
}

/**
 * Rol atama yetkisi olan kullanıcının,
 * diğer kullanıcılara yeni rol atamasını sağlar.
 */
async function RolAta() 
{
    let rol = document.getElementById("RolAta-Rol").value;
    let RolAtanacak_Kullanıcı = document.getElementById("RolAta-Kullanıcı").value;
    RolAtanacak_Kullanıcı = encodeURIComponent(RolAtanacak_Kullanıcı);
    
    let url = "";

    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");

    switch(rol)
    {
        case "Nokta Ekleyici":
            url = `${adres}Roller/RolVer_NoktaEkleyici/${RolAtanacak_Kullanıcı}`;
            break;
        case "Nokta Düzenleyici":
            url = `${adres}Roller/RolVer_NoktaDüzenleyici/${RolAtanacak_Kullanıcı}`;
            break;
        case "Nokta Silici":
            url = `${adres}Roller/RolVer_NoktaSilici/${RolAtanacak_Kullanıcı}`;
            break;
        case "Rol Atayıcı/Alıcı":
            url = `${adres}Roller/RolVer_RolAtayıcıAlıcı/${RolAtanacak_Kullanıcı}`;
            break;
        case "Kullanıcı Silici":
            url = `${adres}Roller/RolVer_KullanıcıSilici/${RolAtanacak_Kullanıcı}`;
            break;
    }

    let yanıt = await fetch(url, {
        method: 'POST',
        headers: 
        {
            'KULLANICI': kullanıcı_kimliği,
            'OTURUM': oturum_kimliği
        }
    });

    if(yanıt.status == 201)
    {
        alert("Kullanıcıya rol başarıyla atandı.");
    }
    else
    {
        alert("Beklenmeyen bir hatayla karşılaşıldı.");
        KullanıcıÇekmecesiniKapat();
    }
}

/**
 * Rol alma yetkisi olan kullanıcının,
 * diğer kullanıcıların rollerini iptal etmesini sağlar.
 */
async function RolAl() 
{
    let rol = document.getElementById("RolAl-Rol").value;
    let RolüAlınacak_Kullanıcı = document.getElementById("RolAl-Kullanıcı").value;
    RolüAlınacak_Kullanıcı = encodeURIComponent(RolüAlınacak_Kullanıcı);
    
    let url = "";

    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");

    switch(rol)
    {
        case "Nokta Ekleyici":
            url = `${adres}Roller/RolAl_NoktaEkleyici/${RolüAlınacak_Kullanıcı}`;
            break;
        case "Nokta Düzenleyici":
            url = `${adres}Roller/RolAL_NoktaDüzenleyici/${RolüAlınacak_Kullanıcı}`;
            break;
        case "Nokta Silici":
            url = `${adres}Roller/RolAl_NoktaSilici/${RolüAlınacak_Kullanıcı}`;
            break;
        case "Rol Atayıcı/Alıcı":
            url = `${adres}Roller/RolAl_RolAtayıcıAlıcı/${RolüAlınacak_Kullanıcı}`;
            break;
        case "Kullanıcı Silici":
            url = `${adres}Roller/RolAl_KullanıcıSilici/${RolüAlınacak_Kullanıcı}`;
            break;
    }

    let yanıt = await fetch(url, {
        method: 'DELETE',
        headers: 
        {
            'KULLANICI': kullanıcı_kimliği,
            'OTURUM': oturum_kimliği
        }
    });

    if(yanıt.status == 200)
    {
        alert("Kullanıcıdan rol başarıyla alındı.");
    }
    else
    {
        alert("Beklenmeyen bir hatayla karşılaşıldı.");
        KullanıcıÇekmecesiniKapat();
    }
}

async function KÇKullanıcıSil()
{
    let silinecek_kullanıcı = document.getElementById("KullanıcıSil-Kullanıcı").value;
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");
    let url = `${adres}Kullanıcı/KullanıcıSil`;
    let yanıt = await fetch(url, 
        {
            method: 'DELETE',
            headers: 
            {
                'KULLANICI': kullanıcı_kimliği,
                'OTURUM': oturum_kimliği,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(silinecek_kullanıcı)
        })

    if(yanıt.status === 200)
    {
        alert("Seçilen Kullanıcı Başarıyla Silindi.");
    }
    else
    {
        alert("Seçilen Kullanıcı Silinemedi.");
    }
}
// @license-end