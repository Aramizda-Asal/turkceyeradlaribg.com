let kullanıcı_çekmecesi_açık = false;

function KullanıcıÇekmecesi()
{
    if(kullanıcı_çekmecesi_açık) // kapat
    {
        KullanıcıÇekmecesiniKapat();
    }
    else // aç
    {
        KullanıcıÇekmecesiniAç();
    }
}
function KullanıcıÇekmecesiniAç()
{
    if (şimdi_kullanan !== null)
    {
        KÇAnaSayfa();
    }

    let çekmece = document.getElementById("kullanıcı-çekmecesi");
    if (visualViewport.height > visualViewport.width)
    {
        çekmece.style.transform = "translate(-100vw,0)";
    }
    else
    {
        çekmece.style.transform = "translate(-25vw,0)";
    }
    
    document.getElementById("kapatıcı").style.display = "block";
    kullanıcı_çekmecesi_açık = true;
}
function KullanıcıÇekmecesiniKapat()
{
    document.getElementById("kullanıcı-çekmecesi").style.transform = "none";
    document.getElementById("kapatıcı").style.display = "none";
    kullanıcı_çekmecesi_açık = false;
}

let nokta_çekmecesi_açık = false;

function NoktaÇekmecesi()
{
    if(nokta_çekmecesi_açık) // kapat
    {
        NoktaÇekmecesiniKapat();
    }
    else // aç
    {
        NoktaÇekmecesiniAç();
    }
}
function NoktaÇekmecesiniAç()
{
    let çekmece = document.getElementById("nokta-çekmecesi");
    if (visualViewport.height > visualViewport.width)
    {
        çekmece.style.transform = "translate(+100vw,0)";
    }
    else
    {
        çekmece.style.transform = "translate(+25vw,0)";
    }
    
    document.getElementById("kapatıcı").style.display = "block";
    nokta_çekmecesi_açık = true;
}
function NoktaÇekmecesiniKapat()
{
    document.getElementById("nokta-çekmecesi").style.transform = "none";
    document.getElementById("kapatıcı").style.display = "none";
    nokta_çekmecesi_açık = false;
    NoktaSayfası();
}

function FavoriButonuDoldur()
{
    let buton = document.getElementById("favori-butonu");
    let spanElement = buton.querySelector('#favori-yazisi');
    let spanStar = document.getElementById("favori-resmi");

    spanElement.textContent = "Favorilerden Çıkar";
    spanStar.innerHTML = "&#x2605;";
    spanStar.style.color = "hsl(43, 98%, 63%)"; 
    buton.setAttribute('onclick', 'FavorilerdenCikar(this)');
}

function FavoriButonuBosalt()
{
    let buton = document.getElementById("favori-butonu");
    let spanElement = buton.querySelector('#favori-yazisi');
    let spanStar = document.getElementById("favori-resmi");

    spanElement.textContent = "Favorilere Ekle";
    spanStar.innerHTML = "&#x2606;";
    spanStar.style.color = "hsl(43, 98%, 63%)"; 
    buton.setAttribute('onclick', 'FavorilereEkle(this)');
}

async function FavorilereEkle(button)
{
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");
    let konum_kimliği = button.getAttribute('konum-kimliği');

    let url = `http://localhost:5130/Favori/FavoriEkle`;   

    let yanıt = await fetch(url, 
        {
            method: 'POST',
            headers: 
            {
                'KULLANICI': kullanıcı_kimliği,
                'OTURUM': oturum_kimliği,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(konum_kimliği)
        }); 
    if (yanıt.status === 201)
    {
        alert("Eklendi")
        FavoriButonuDoldur();
    }
    else
    {
        alert("Eklenemedi");
    }
}

async function FavorilerdenCikar(button)
{
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");
    let konum_kimliği = button.getAttribute('konum-kimliği');

    let url = `http://localhost:5130/Favori/FavorilerdenCikar`;
    let yanıt = await fetch(url, 
        {
            method: 'DELETE',
            headers: 
            {
                'KULLANICI': kullanıcı_kimliği,
                'OTURUM': oturum_kimliği,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(konum_kimliği)
        }); 

    if (yanıt.status === 201)
    {
        alert("Cikarildi")
        FavoriButonuBosalt();
    }
    else
    {
        alert("Cikarilamadi");
    }
}

let KaydolBölümüAçık= false;
function Göster_KayıtOl()
{
    KaydolBölümüAçık = true;
    document.getElementById("kullanıcı-çekmecesi-başlık").innerHTML = "Kaydol";
    document.getElementById("giriş-yap").style.display = "none";
    document.getElementById("kayıt-ol").style.display = "block";
}
function Göster_GirişYap()
{
    KaydolBölümüAçık = false;
    document.getElementById("kullanıcı-çekmecesi-başlık").innerHTML = "Giriş Yap";
    document.getElementById("kayıt-ol").style.display = "none";
    document.getElementById("giriş-yap").style.display = "block";
}

/**
 * Kullanıcı çekmecesinin kişisel sayfalarının tümünü gizler.
 */
function KişiselÇekmeceSayfalarınıKapat()
{
    let sayfalar = document.getElementsByClassName("kişisel-çekmece-sayfası");
    if (sayfalar.length >= 1)
    {
        for (let i = 0; i < sayfalar.length; i++)
        {
            sayfalar[i].style.display = "none";
        }
    }
}
/**
 * Kişisel kullanıcı çekmecesinin görünümünü ana sayfa yapar.
 */
function KÇAnaSayfa()
{
    KişiselÇekmeceSayfalarınıKapat();
    let ana_sayfa = document.getElementById("kişisel-çekmece-ana");
    if (ana_sayfa !== null)
    {
        ana_sayfa.style.display = "block";
    }
}
/**
 * Kişisel kullanıcı çekmecesinin görünümünü ayarlar sayfası yapar.
 */
function KÇAyarlarSayfası()
{
    KişiselÇekmeceSayfalarınıKapat();
    let ayarlar_sayfası = document.getElementById("kişisel-çekmece-ayarlar");
    if (ayarlar_sayfası !== null)
    {
        ayarlar_sayfası.style.display = "block";
    }
}
/**
 * Kişisel kullanıcı çekmecesinin görünümünü parola değiştirme sayfası yapar.
 */
function KÇParolaDeğiştirSayfası()
{
    KişiselÇekmeceSayfalarınıKapat();
    let ParolaDeğiştir_sayfası = document.getElementById("kişisel-çekmece-ParolaDeğiştir");
    if (ParolaDeğiştir_sayfası !== null)
    {
        ParolaDeğiştir_sayfası.style.display = "block";
    }
}
/**
 * Kişisel kullanıcı çekmecesinin görünümünü kullanıcı adı değiştirme sayfası yapar.
 */
function KÇKullanıcıAdıDeğiştirSayfası()
{
    KişiselÇekmeceSayfalarınıKapat();
    let KullanıcıAdıDeğiştir_sayfası = document.getElementById("kişisel-çekmece-KullanıcıAdıDeğiştir");
    if (KullanıcıAdıDeğiştir_sayfası !== null)
    {
        KullanıcıAdıDeğiştir_sayfası.style.display = "block";
    }
}
/**
 * Kişisel kullanıcı çekmecesinin görünümünü nokta ekleme sayfası yapar.
 */
function KÇNoktaEkleSayfası()
{
    KişiselÇekmeceSayfalarınıKapat();
    let NoktaEkle_sayfası = document.getElementById("kişisel-çekmece-NoktaEkle");
    if (NoktaEkle_sayfası !== null)
    {
        NoktaEkle_sayfası.style.display = "block";
    }
}

async function KÇ_NoktaEkle_BölgeTürleriniGetir() 
{
    let BölgeTürüDropList = document.getElementById("NoktaEkle-BölgeTürü");
    BölgeTürüDropList.innerHTML = "";

    let url = `http://localhost:5130/Harita/GeçerliNoktaTürleri`;
    let yanıt = await fetch(url, {method: 'GET'});

    if(yanıt.status == 200)
    {
        let yanıtJSON = await yanıt.json();
        let Türler = JSON.parse(yanıtJSON);
       
        Türler.forEach((tür) =>
        {
            let option = document.createElement('option');
            option.value = tür;
            option.text = tür;
            BölgeTürüDropList.appendChild(option);
        }
        );
    }
    else
    {
        alert("Beklenmeyen bir hatayla karşılaşıldı.");
        KullanıcıÇekmecesiniKapat();
    }
}

async function KÇ_NoktaEkle_ÜstBölgeleriGetir() 
{
    let ÜstBölgeDropList = document.getElementById("NoktaEkle-ÜstBölge");
    ÜstBölgeDropList.innerHTML = "";

    let BölgeTürü = document.getElementById("NoktaEkle-BölgeTürü").value;
    BölgeTürü = encodeURIComponent(BölgeTürü);

    let url = `http://localhost:5130/Harita/ÜsteGelebilecekNoktalar/${BölgeTürü}/`;
    let yanıt = await fetch(url, {method: 'GET'});

    if(yanıt.status == 200)
    {
        let yanıtJSON = await yanıt.json();
        let Noktalar = JSON.parse(yanıtJSON);
        
        Noktalar.forEach((nokta) =>
        {
            let option = document.createElement('option');
            option.value = nokta.kimlik;
            option.text = nokta.Türkçe + " (" + nokta.Bulgarca_Kiril + ")";
            ÜstBölgeDropList.appendChild(option);
        }
        );
        let option = document.createElement('option');
        option.value = "yok";
        option.text = "Üst bölgesi yok.";
        ÜstBölgeDropList.appendChild(option);
    }
    else if(yanıt.status == 204)
    {
        let option = document.createElement('option');
        option.value = "yok";
        option.text = "Üst bölgesi yok.";
        ÜstBölgeDropList.appendChild(option);
    }
    else
    {
        alert("Beklenmeyen bir hatayla karşılaşıldı.");
        KullanıcıÇekmecesiniKapat();
    }
}

function KÇ_NoktaEkle_GirdileriBoşalt()
{
    let noktaGirdileri = document.getElementsByClassName("NoktaEkle-Girdiler");
    for(nokta of noktaGirdileri)
    {
        nokta.value = "";
    }
}

async function KÇ_KullanıcıAra(girdi, divID, inputID)
{
    let div = document.getElementById(divID);
    div.innerHTML = "";
    div.style.display = "block";

    girdi = encodeURIComponent(girdi);

    let url = `http://localhost:5130/Kullanıcı/KullanıcıAra/${girdi}`;
    let yanıt = await fetch(url, {method: 'GET'});
    console.log("fonksiyon");
    if(yanıt.status == 200)
    {
        console.log("200");
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
                }
            };
            div.appendChild(button);
        }
        );
    }
    else if(yanıt.status == 204)
    {
        console.log("204");
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

/**
 * Kişisel kullanıcı çekmecesinin görünümünü rol atama sayfası yapar.
 */
function KÇRolAtaSayfası()
{
    KişiselÇekmeceSayfalarınıKapat();
    let RolAta_sayfası = document.getElementById("kişisel-çekmece-RolAta");
    if (RolAta_sayfası !== null)
    {
        RolAta_sayfası.style.display = "block";
    }
}

async function KÇ_RolAta_RolleriGetir()
{
    let kullanıcı = document.getElementById("RolAta-Kullanıcı").value;
    kullanıcı = encodeURIComponent(kullanıcı);

    let RollerDropList = document.getElementById("RolAta-Rol");
    RollerDropList.innerHTML = "";

    let url = `http://localhost:5130/Roller/KullanıcınınRolleriDeğil`;
    let yanıt = await fetch(url, {
        method: 'GET',
        headers: 
        {
            'KULLANICI': kullanıcı,
        }
    });

    if(yanıt.status == 200)
    {
        let yanıtJSON = await yanıt.json();
        let Roller = JSON.parse(yanıtJSON);
        
        Roller.forEach((rol) =>
        {
            let option = document.createElement('option');
            option.value = rol;
            option.text = rol;
            RollerDropList.appendChild(option);
        }
        );
    }
    else if(yanıt.status == 204)
    {
        let option = document.createElement('option');
        option.value = "yok";
        option.text = "Atanabilecek rol yok.";
        RollerDropList.appendChild(option);
    }
    else
    {
        alert("Beklenmeyen bir hatayla karşılaşıldı.");
        KullanıcıÇekmecesiniKapat();
    }
}

async function KÇ_RolAta() 
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
            url = `http://localhost:5130/Roller/RolVer_NoktaEkleyici/${RolAtanacak_Kullanıcı}`;
            break;
        case "Nokta Düzenleyici":
            url = `http://localhost:5130/Roller/RolVer_NoktaDüzenleyici/${RolAtanacak_Kullanıcı}`;
            break;
        case "Nokta Silici":
            url = `http://localhost:5130/Roller/RolVer_NoktaSilici/${RolAtanacak_Kullanıcı}`;
            break;
        case "Rol Atayıcı/Alıcı":
            url = `http://localhost:5130/Roller/RolVer_RolAtayıcıAlıcı/${RolAtanacak_Kullanıcı}`;
            break;
        case "Kullanıcı Silici":
            url = `http://localhost:5130/Roller/RolVer_KullanıcıSilici/${RolAtanacak_Kullanıcı}`;
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
 * Kişisel kullanıcı çekmecesinin görünümünü rol alma sayfası yapar.
 */
function KÇRolAlSayfası()
{
    KişiselÇekmeceSayfalarınıKapat();
    let RolAl_sayfası = document.getElementById("kişisel-çekmece-RolAl");
    if (RolAl_sayfası !== null)
    {
        RolAl_sayfası.style.display = "block";
    }
}

async function KÇ_RolAL_RolleriGetir()
{
    let kullanıcı = document.getElementById("RolAl-Kullanıcı").value;
    kullanıcı = encodeURIComponent(kullanıcı);

    let RollerDropList = document.getElementById("RolAl-Rol");
    RollerDropList.innerHTML = "";

    let url = `http://localhost:5130/Roller/KullanıcınınRolleri`;
    let yanıt = await fetch(url, {
        method: 'GET',
        headers: 
        {
            'KULLANICI': kullanıcı,
        }
    });

    if(yanıt.status == 200)
    {
        let yanıtJSON = await yanıt.json();
        let Roller = JSON.parse(yanıtJSON);
        
        Roller.forEach((rol) =>
        {
            let option = document.createElement('option');
            option.value = rol;
            option.text = rol;
            RollerDropList.appendChild(option);
        }
        );
    }
    else if(yanıt.status == 204)
    {
        let option = document.createElement('option');
        option.value = "yok";
        option.text = "Rolü yok.";
        RollerDropList.appendChild(option);
    }
    else
    {
        alert("Beklenmeyen bir hatayla karşılaşıldı.");
        KullanıcıÇekmecesiniKapat();
    }
}

async function KÇ_RolAl() 
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
            url = `http://localhost:5130/Roller/RolAl_NoktaEkleyici/${RolüAlınacak_Kullanıcı}`;
            break;
        case "Nokta Düzenleyici":
            url = `http://localhost:5130/Roller/RolAL_NoktaDüzenleyici/${RolüAlınacak_Kullanıcı}`;
            break;
        case "Nokta Silici":
            url = `http://localhost:5130/Roller/RolAl_NoktaSilici/${RolüAlınacak_Kullanıcı}`;
            break;
        case "Rol Atayıcı/Alıcı":
            url = `http://localhost:5130/Roller/RolAl_RolAtayıcıAlıcı/${RolüAlınacak_Kullanıcı}`;
            break;
        case "Kullanıcı Silici":
            url = `http://localhost:5130/Roller/RolAl_KullanıcıSilici/${RolüAlınacak_Kullanıcı}`;
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

function AraÇekmecesiniAç(ilkİçerenler, Ortaİçerenler, sonİçerenler)
{   
    let araÇekmece = document.getElementById("ara-çekmece");//Div'lerin div'i. (Ana-div)
    araÇekmece.style.display = "block";

    let aramaSonucuVar = false; 

    document.getElementById("ara-çekmece").innerHTML = "";//Her arama başında çekmeceyi boşaltır.

    if(ilkİçerenler.length > 0) //Dizilerin boş olup olmadığına bakar.
    {
        ilkİçerenler.forEach((ilkİçeren) =>
        {
            let button = document.createElement('div');
            button.className = "ara-çekmece-satır";
            button.innerText = ilkİçeren.Ad;
            button.onclick = function ()
            {
                NoktayaGit(ilkİçeren.Kimlik);
            };
            araÇekmece.appendChild(button);
        });

        aramaSonucuVar = true;
    }
    if(Ortaİçerenler.length > 0)
    {
        Ortaİçerenler.forEach((Ortaİçeren) =>
        {
            let button = document.createElement('div');
            button.className = "ara-çekmece-satır";
            button.innerText = Ortaİçeren.Ad;
            button.onclick = function ()
            {
                NoktayaGit(Ortaİçeren.Kimlik);
            };
            araÇekmece.appendChild(button);
        });

        aramaSonucuVar = true;
    }
    if(sonİçerenler.length > 0)
    {
        sonİçerenler.forEach((sonİçeren) =>
        {
            let button = document.createElement('div');
            button.className = "ara-çekmece-satır";
            button.innerText = sonİçeren.Ad;
            button.onclick = function ()
            {
                NoktayaGit(sonİçeren.Kimlik);
            };
            araÇekmece.appendChild(button);
        });

        aramaSonucuVar = true;
    }
    if(!aramaSonucuVar) //Arama sonucu yoksa sonuç olmadığını belirtir. 
    {
        document.getElementById("ara-çekmece").innerHTML = "<div class=\"ara-çekmece-satır\">"+ "Yok" +"</div>";
    }
}

function AraÇekmecesiniKapat()
{
    document.getElementById("ara-çekmece").style.display = "none";
}

/**
 * Kişisel kullanıcı çekmecesinin görünümünü favoriler sayfası yapar.
 */
function KÇFavorilerSayfası()
{
    KişiselÇekmeceSayfalarınıKapat();
    let ayarlar_sayfası = document.getElementById("kişisel-çekmece-Favoriler");
    if (ayarlar_sayfası !== null)
    {
        ayarlar_sayfası.style.display = "block";
        KÇFavorilerSayfasınıDoldur();
    }
}

async function KÇFavorilerSayfasınıDoldur()
{
    let favori = document.getElementById("Favori-Bölge-Butonlar");
    favori.innerHTML = "";

    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");
    let url = `http://localhost:5130/Favori/FavorileriGöster`;
    let yanıt = await fetch(url, 
        {
            method: 'GET',
            headers: 
            {
                'KULLANICI': kullanıcı_kimliği,
                'OTURUM': oturum_kimliği
            }
        });

    if(yanıt.status == 200)
    {
        let div = document.getElementById('Favori-Bölge-Butonlar');
        let secilenDil = document.getElementById('Favoriler-Dil').value;
        let yanıt_json = await yanıt.json();
        let noktalar = JSON.parse(yanıt_json);

        noktalar.forEach((favori) => 
        {
            let result = NoktayıGetir(favori);
            let button = document.createElement('button');
            button.className = "D1-sarımsı butonlar-profil";
            if(secilenDil === "Bulgarca-Latin")
            {
                button.innerText = result[0].properties.BulgarcaLatin;
            }
            else if(secilenDil === "Bulgarca-Kiril")
            {
                button.innerText = result[0].properties.BulgarcaKiril;
            }
            else if(secilenDil === "Türkçe")
            {
                button.innerText = result[0].properties.Türkçe;
            }
            else if(secilenDil === "Osmanlıca")
            {
                button.innerText = result[0].properties.Osmanlıca;
            }
            button.onclick = function () 
            {
                NoktayaGit(favori);
            };
            div.appendChild(button);
        });
    }
    else
    {
        alert("yok");
    }
    
}

function KÇKullanıcıSilSayfası()
{
    KişiselÇekmeceSayfalarınıKapat();
    let ayarlar_sayfası = document.getElementById("kişisel-çekmece-KullanıcıSil");
    if (ayarlar_sayfası !== null)
    {
        ayarlar_sayfası.style.display = "block";
    }
}

async function KÇKullanıcıSil()
{
    let silinecek_kullanıcı = document.getElementById("KullanıcıSil-Kullanıcı").value;
    console.log(silinecek_kullanıcı);
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");
    let url = `http://localhost:5130/Kullanıcı/KullanıcıSil`;
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
        alert("sildim");
    }
    else
    {
        alert("silemedim");
    }
}

function NoktaDuzenleSayfası(button)
{
    let nokta = NoktayıGetir(button.getAttribute("konum-kimliği"))[0]
    document.getElementById("NoktaDuzenle-EnlemDerece").value = nokta.geometry.coordinates[1];
    document.getElementById("NoktaDuzenle-BoylamDerece").value = nokta.geometry.coordinates[0];
    document.getElementById("NoktaDuzenle-BulgarcaLatinİsim").value = nokta.properties.BulgarcaLatin;
    document.getElementById("NoktaDuzenle-BulgarcaKirilİsim").value = nokta.properties.BulgarcaKiril;
    document.getElementById("NoktaDuzenle-Türkçeİsim").value = nokta.properties.Türkçe;
    document.getElementById("NoktaDuzenle-Osmanlıcaİsim").value = nokta.properties.Osmanlıca;
    document.getElementById("nokta-penceresi").style.display = "none";
    document.getElementById("noktayı-duzenle-penceresi").style.display = "block";
}

function NoktaSayfası()
{
    document.getElementById("nokta-penceresi").style.display = "block";
    document.getElementById("noktayı-duzenle-penceresi").style.display = "none";
}

async function DegisiklikleriKaydet(button)
{
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");

    let nokta = NoktayıGetir(button.getAttribute("konum-kimliği"))[0]
    let Degisti = false;
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
    }
    if(nokta.properties.Osmanlıca != document.getElementById("NoktaDuzenle-Osmanlıcaİsim").value)
    {
        nokta.properties.Osmanlıca = document.getElementById("NoktaDuzenle-Osmanlıcaİsim").value;
        Degisti = true;
    }

    if(Degisti)
    {
        let geri_nokta = NoktaOlusturucuGeoJSON(nokta);
        let url = `http://localhost:5130/Harita/NoktaGüncelle`;  
        
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
            alert("Degisti")
            NoktayaGit(geri_nokta.kimlik);
        }
        else
        {
            alert("Degismedi");
        }
    }

}