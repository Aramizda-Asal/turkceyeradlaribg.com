/**
 * Şu an geçerli olan oturumun kullanıcı nesnesi.  
 * Oturum bilgilerini içermez.
 */
let şimdi_kullanan = null;

/**
 * Sayfa yüklenirken çalışır.
 */
async function Açılış()
{
    await OturumAçık();
    ArayüzüKişiselleştir();
}

/**
 * Oturum durumuna bağlı olarak kullanıcı arayüzünü düzenleyen
 * diğer fonksiyonları çağırır.
 */
function ArayüzüKişiselleştir()
{
    KullanıcıÇekmecesiniKişiselleştir();
}

/**
 * Oturum durumuna bağlı olarak kullanıcı çekmecesinin içeriğini düzenler.
 */
function KullanıcıÇekmecesiniKişiselleştir()
{
    if (şimdi_kullanan !== null)
    {
        AnonimdenKişisele();

        document.getElementById("kullanıcı-çekmecesi-başlık").innerText = şimdi_kullanan.Adı;

        document.getElementById("kişisel-çekmece-ana").style.display = "block";
    }
    else
    {
        KişiseldenAnonime();

        if (KaydolBölümüAçık)
        {
            document.getElementById("kullanıcı-çekmecesi-başlık").innerHTML = "Kaydol";
        }
        else
        {
            document.getElementById("kullanıcı-çekmecesi-başlık").innerHTML = "Giriş Yap";
        }
    }
}

/**
 * Anonim bölgeleri kapatır ve kişisel bölgeleri açar.  
 * Çoğu zaman, geçerli bir oturum başlarken kullanılmalıdır.
 */
function AnonimdenKişisele()
{
    let anonim_bölgeler = document.getElementsByClassName("anonim-bölge");
    let kişisel_bölgeler = document.getElementsByClassName("kişisel-bölge");

    if (anonim_bölgeler.length >= 1)
    {
        for (let i = 0; i < anonim_bölgeler.length; i++)
        {
            anonim_bölgeler[i].style.display = "none";
        }
    }

    if (kişisel_bölgeler.length >= 1)
    {
        for (let i = 0; i < kişisel_bölgeler.length; i++)
        {
            kişisel_bölgeler[i].style.display = "block";
        }
    }

    RoleGöreÖgeleriYarat();

    KÇAnaSayfa();
}

/**
 * Kişisel bölgeleri kapatır ve anonim bölgeleri açar.  
 * Çoğu zaman, oturum sonlanırken kullanılmalıdır.
 */
function KişiseldenAnonime()
{
    RoleGöreÖgeleriYokEt();

    let anonim_bölgeler = document.getElementsByClassName("anonim-bölge");
    let kişisel_bölgeler = document.getElementsByClassName("kişisel-bölge");
    
    if (kişisel_bölgeler.length >= 1)
    {
        for (let i = 0; i < kişisel_bölgeler.length; i++)
        {
            kişisel_bölgeler[i].style.display = "none";
        }
    }

    if (anonim_bölgeler.length >= 1)
    {
        for (let i = 0; i < anonim_bölgeler.length; i++)
        {
            anonim_bölgeler[i].style.display = "block";
        }
    }
}

/**
 * Yetki gerektiren sayfa ögelerini siler.
 */
async function RoleGöreÖgeleriYokEt()
{
    let role_göre = document.getElementsByClassName("role-bağlı");

    for (öge of role_göre)
    {
        öge.remove();
    }
}

/**
 * Yetki gerektiren sayfa ögelerini oluşturur.
 */
async function RoleGöreÖgeleriYarat()
{
    if (şimdi_kullanan === null)
    {
        return;
    }

    let ana_sayfa = document.getElementById("kişisel-çekmece-ana");
    if (ana_sayfa === null)
    {
        return;
    }

    let oturum_kimliği = ÇerezDeğeri("OTURUM");

    let yanıt = await fetch(
        `${adres}Roller/NoktaEkleyebilirim`,
        {
            method: "POST",
            headers: {
                KULLANICI: şimdi_kullanan.Kimlik,
                OTURUM: oturum_kimliği
            }
        }
    );
    // Nokta ekleme yetkisi varsa
    if (yanıt.status == 200)
    {
        let NoktaEkleDüğmesi = document.createElement("button");
        NoktaEkleDüğmesi.setAttribute("class", "D1-turkuaz butonlar-profil role-bağlı");
        NoktaEkleDüğmesi.setAttribute("onclick", "KÇNoktaEkleSayfası(); " +
            "KÇ_NoktaEkle_BölgeTürleriniGetir();");
        NoktaEkleDüğmesi.innerHTML = "Nokta Ekle";
        ana_sayfa.appendChild(NoktaEkleDüğmesi);
    }

    yanıt = await fetch(
        `${adres}Roller/RolAtayabilirimAlabilirim`,
        {
            method: "POST",
            headers: {
                KULLANICI: şimdi_kullanan.Kimlik,
                OTURUM: oturum_kimliği
            }
        }
    );
    // Rol atama ve alma yetkisi varsa
    if (yanıt.status == 200)
    {
        let RolAtaDüğmesi = document.createElement("button");
        RolAtaDüğmesi.setAttribute("class", "D1-turkuaz butonlar-profil role-bağlı");
        RolAtaDüğmesi.setAttribute("onclick", "KÇRolAtaSayfası(); " + "DüğmeleriEtkisizBırak('RolAta_Düğme')");
        RolAtaDüğmesi.innerHTML = "Rol Ata";
        ana_sayfa.appendChild(RolAtaDüğmesi);

        let RolAlDüğmesi = document.createElement("button");
        RolAlDüğmesi.setAttribute("class", "D1-turkuaz butonlar-profil role-bağlı");
        RolAlDüğmesi.setAttribute("onclick", "KÇRolAlSayfası(); " + "DüğmeleriEtkisizBırak('RolAl_Düğme')");
        RolAlDüğmesi.innerHTML = "Rol Al";
        ana_sayfa.appendChild(RolAlDüğmesi);
    }

    yanıt = await fetch(
        `${adres}Roller/KullanıcıSilebilirim`,
        {
            method: "POST",
            headers: {
                KULLANICI: şimdi_kullanan.Kimlik,
                OTURUM: oturum_kimliği
            }
        }
    );
    // Kullanıcı silme yetkisi varsa
    if (yanıt.status == 200)
    {
        let KullanıcıSilDüğmesi = document.createElement("button");
        KullanıcıSilDüğmesi.setAttribute("class", "D1-turkuaz butonlar-profil role-bağlı");
        KullanıcıSilDüğmesi.setAttribute("onclick", "KÇKullanıcıSilSayfası(); "+ "DüğmeleriEtkisizBırak('KullanıcıSil_Düğme')");
        KullanıcıSilDüğmesi.innerHTML = "Kullanıcı Sil";
        ana_sayfa.appendChild(KullanıcıSilDüğmesi);
    }

    let NoktaÇekmecesi = document.getElementById("nokta-çekmecesi");
    let NoktaPenceresiİçi = document.getElementById("nokta-penceresi-içorta");
    if (NoktaÇekmecesi === null || NoktaPenceresiİçi === null)
    {
        return;
    }

    yanıt = await fetch(
        `${adres}Roller/NoktaDüzenleyebilirim`,
        {
            method: "POST",
            headers: {
                KULLANICI: şimdi_kullanan.Kimlik,
                OTURUM: oturum_kimliği
            }
        }
    );
    // Nokta düzenleme yetkisi varsa
    if (yanıt.status == 200)
    {
        let NoktaDüzenleDüğmesi = document.createElement("button");
        NoktaDüzenleDüğmesi.setAttribute("class", "favori-butonu role-bağlı");
        NoktaDüzenleDüğmesi.setAttribute("onclick", "NoktaDuzenleSayfası(this)");
        NoktaDüzenleDüğmesi.setAttribute("id", "nokta-duzenle-butonu");
        NoktaDüzenleDüğmesi.setAttribute("konum-kimliği", "");
        NoktaDüzenleDüğmesi.innerHTML = "Noktayı Düzenle";
        NoktaPenceresiİçi.appendChild(NoktaDüzenleDüğmesi);

        let dış = document.createElement("div");
        dış.setAttribute("class", "çekmece-içi role-bağlı");
        dış.setAttribute("id", "noktayı-duzenle-penceresi");

        let iç = `<div class="çekmece-içorta duzenle">\n` +
            `<form id="Form-NoktaDuzenle" class="form-ortalı içi-bloklu">\n` +
            `<h2>Nokta Ekle</h2>\n` +
            `<label for="NoktaDuzenle-EnlemDerece" form="Form-NoktaDuzenle">Enlemi (Derece):</label>\n` +
            `<input type="number" id="NoktaDuzenle-EnlemDerece" value=""/>\n` +
            `<label for="NoktaDuzenle-BoylamDerece" form="Form-NoktaDuzenle">Boylamı (Derece):</label>\n` +
            `<input type="number" id="NoktaDuzenle-BoylamDerece" value=""/>\n` +
            `<label for="NoktaDuzenle-BulgarcaLatinİsim" form="Form-NoktaDuzenle">Bulgarca Latin İsmi:</label>\n` +
            `<input type="text" id="NoktaDuzenle-BulgarcaLatinİsim" value=""/>\n` +
            `<label for="NoktaDuzenle-BulgarcaKirilİsim" form="Form-NoktaDuzenle">Bulgarca Kiril İsmi:</label>\n` +
            `<input type="text" id="NoktaDuzenle-BulgarcaKirilİsim" value=""/>\n` +
            `<label for="NoktaDuzenle-Türkçeİsim" form="Form-NoktaDuzenle">Türkçe İsmi:</label>\n` +
            `<input type="text" id="NoktaDuzenle-Türkçeİsim" value=""/>\n` +
            `<label for="NoktaDuzenle-Osmanlıcaİsim" form="Form-NoktaDuzenle">Osmanlıca İsmi:</label>\n` +
            `<input type="text" id="NoktaDuzenle-Osmanlıcaİsim" value=""/>\n` +
            `</form>\n` +
            `</div>\n` +
            `\n` +
            `<div class="çekmece-içalt düzenle">\n` +
            `<button class="favori-butonu" id="nokta-kaydet-butonu" konum-kimliği="" onclick="DegisiklikleriKaydet(this)">Değişiklikleri Kaydet</button>\n` +
            `<button class="favori-butonu" onclick="NoktaSayfası()">Geri Dön</button>\n` +
            `<button class="favori-butonu" id="nokta-silme-butonu" konum-kimliği="" onclick="NoktaSil(this)">Noktayı Sil</button>\n` +
            `</div>\n`;
        dış.innerHTML = iç;

        NoktaÇekmecesi.appendChild(dış);
    }
}