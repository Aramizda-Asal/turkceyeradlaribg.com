// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
// Copyright (C) 2025 Habil Tataroğulları, Güneş Balcı, Yusuf Kozan
function KünyeyeGit()
{
    window.location.assign("künye.html");
}
function HaritayaGit()
{
    window.location.assign("bulgarita.html");
}

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
    KaydoluBosalt();
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

    let url = `${adres}Favori/FavoriEkle`;   

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
        alert("Nokta Favorilere Eklendi.");
        FavoriButonuDoldur();
    }
    else
    {
        alert("Nokta Favorilere Eklenemedi.");
    }
}

async function FavorilerdenCikar(button)
{
    let kullanıcı_kimliği = ÇerezDeğeri("KULLANICI");
    let oturum_kimliği = ÇerezDeğeri("OTURUM");
    let konum_kimliği = button.getAttribute('konum-kimliği');

    let url = `${adres}Favori/FavorilerdenCikar`;
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

    if (yanıt.status === 200)
    {
        alert("Nokta Favorilerden Çıkarıldı.");
        FavoriButonuBosalt();
    }
    else
    {
        alert("Nokta Favorilerden Çıkarılamadı.");
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
    KaydoluBosalt();
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
    KÇParolaDeğiştirGirdileriniBoşalt();
    KişiselÇekmeceSayfalarınıKapat();
    let ParolaDeğiştir_sayfası = document.getElementById("kişisel-çekmece-ParolaDeğiştir");
    if (ParolaDeğiştir_sayfası !== null)
    {
        ParolaDeğiştir_sayfası.style.display = "block";
    }
}

function KÇParolaDeğiştirGirdileriniBoşalt()
{
    document.getElementById("ParolaDeğiştir-MevcutParola").value = "";
    document.getElementById("ParolaDeğiştir-YeniParola").value = "";
    document.getElementById("ParolaDeğiştir-YeniParolaTekrar").value = "";
}
/**
 * Kişisel kullanıcı çekmecesinin görünümünü kullanıcı adı değiştirme sayfası yapar.
 */
function KÇKullanıcıAdıDeğiştirSayfası()
{
    KÇKullanıcıAdıDeğiştirGirdileriniBoşalt();
    KişiselÇekmeceSayfalarınıKapat();
    let KullanıcıAdıDeğiştir_sayfası = document.getElementById("kişisel-çekmece-KullanıcıAdıDeğiştir");
    if (KullanıcıAdıDeğiştir_sayfası !== null)
    {
        KullanıcıAdıDeğiştir_sayfası.style.display = "block";
    }
}

function KÇKullanıcıAdıDeğiştirGirdileriniBoşalt()
{
    document.getElementById("KullanıcıAdıDeğiştir-Parola").value = "";
    document.getElementById("KullanıcıAdıDeğiştir-Yenisi").value = "";
}

function DüğmeleriEtkisizBırak(düğmeID)
{
    document.getElementById(düğmeID).disabled = true;
}

function DüğmeleriEtkinleştir(düğmeID)
{
    document.getElementById(düğmeID).disabled = false;
}

/**
 * Kişisel kullanıcı çekmecesinin görünümünü nokta ekleme sayfası yapar.
 */
function KÇNoktaEkleSayfası()
{
    KÇ_NoktaEkle_GirdileriBoşalt();
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

    let url = `${adres}Harita/GeçerliNoktaTürleri`;
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

    let url = `${adres}Harita/ÜsteGelebilecekNoktalar/${BölgeTürü}/`;
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
        option.value = "";
        option.text = "Üst bölgesi yok.";
        ÜstBölgeDropList.appendChild(option);
    }
    else if(yanıt.status == 204)
    {
        let option = document.createElement('option');
        option.value = "";
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

    document.getElementById("RolAta-Kullanıcı").value = "";
    document.getElementById("RolAta-Rol").innerHTML = "";
}

async function KÇ_RolAta_RolleriGetir()
{
    let kullanıcı = document.getElementById("RolAta-Kullanıcı").value;
    kullanıcı = encodeURIComponent(kullanıcı);

    let RollerDropList = document.getElementById("RolAta-Rol");
    RollerDropList.innerHTML = "";

    let url = `${adres}Roller/KullanıcınınRolleriDeğil`;
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
            option.onselect = DüğmeleriEtkinleştir('RolAta_Düğme');
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

    document.getElementById("RolAl-Kullanıcı").value = "";
    document.getElementById("RolAl-Rol").innerHTML = "";
}

async function KÇ_RolAL_RolleriGetir()
{
    let kullanıcı = document.getElementById("RolAl-Kullanıcı").value;
    kullanıcı = encodeURIComponent(kullanıcı);

    let RollerDropList = document.getElementById("RolAl-Rol");
    RollerDropList.innerHTML = "";

    let url = `${adres}Roller/KullanıcınınRolleri`;
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
            option.onselect = DüğmeleriEtkinleştir('RolAl_Düğme');
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

function AraÇekmecesiniAç(ilkİçerenler, Ortaİçerenler, sonİçerenler)
{   
    let araÇekmece = document.getElementById("ara-çekmece");//Div'lerin div'i. (Ana-div)
    araÇekmece.style.display = "block";
    document.getElementById("başlıktaki-kapatıcı").style.display = "block";

    let aramaSonucuVar = false; 

    document.getElementById("ara-çekmece").innerHTML = "";//Her arama başında çekmeceyi boşaltır.

    if(ilkİçerenler.length > 0) //Dizilerin boş olup olmadığına bakar.
    {
        ilkİçerenler.forEach((ilkİçeren) =>
        {
            let button = document.createElement('div');
            button.className = "ara-çekmece-satır";
            button.innerHTML = `${ilkİçeren.Ad}<span style="color:red"> / ${ilkİçeren.Tür}</span>`;
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
            button.innerHTML = `${Ortaİçeren.Ad}<span style="color:red"> / ${Ortaİçeren.Tür}</span>`;
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
            button.innerHTML = `${sonİçeren.Ad}<span style="color:red"> / ${sonİçeren.Tür}</span>`;
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
    document.getElementById("başlıktaki-kapatıcı").style.display = "none";
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
    let url = `${adres}Favori/FavorileriGöster`;
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
        alert("Favori Nokta Bulunamadı.");
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

    document.getElementById("KullanıcıSil-Kullanıcı").value = "";
}

let Secili_Nokta_Kimlik;
async function NoktaDuzenleSayfası(button)
{
    let nokta = NoktayıGetir(button.getAttribute("konum-kimliği"))[0]
    document.getElementById("NoktaDuzenle-EnlemDerece").value = nokta.geometry.coordinates[1];
    document.getElementById("NoktaDuzenle-BoylamDerece").value = nokta.geometry.coordinates[0];
    document.getElementById("NoktaDuzenle-BulgarcaLatinİsim").value = nokta.properties.BulgarcaLatin;
    document.getElementById("NoktaDuzenle-BulgarcaKirilİsim").value = nokta.properties.BulgarcaKiril;
    document.getElementById("NoktaDuzenle-Türkçeİsim").value = nokta.properties.Türkçe;
    document.getElementById("NoktaDuzenle-Osmanlıcaİsim").value = nokta.properties.Osmanlıca;
    document.getElementById("NoktaDuzenle-Temel-Bilgiler").value = nokta.properties.Aciklama;
    document.getElementById("NoktaDuzenle-BölgeTürü").setAttribute("konum-kimliği", nokta.properties.UstBolge);
    document.getElementById("nokta-penceresi").style.display = "none";
    document.getElementById("noktayı-duzenle-penceresi").style.display = "block";
    Secili_Nokta_Kimlik = nokta.properties.Kimlik;
    await KÇ_NoktaDuzenle_BölgeTürleriniGetir(nokta.properties.BolgeTuru);
    KÇ_NoktaDuzenle_ÜstBölgeleriGetir(document.getElementById("NoktaDuzenle-BölgeTürü"));
}

function NoktaSayfası()
{
    document.getElementById("nokta-penceresi").style.display = "block";
    let noktaDüzenleyici = document.getElementById("noktayı-duzenle-penceresi");
    if(noktaDüzenleyici !== null)
    {
        noktaDüzenleyici.style.display = "none";
    }
    
}

async function KÇ_NoktaDuzenle_BölgeTürleriniGetir(bölge_türü) 
{
    let BölgeTürüDropList = document.getElementById("NoktaDuzenle-BölgeTürü");
    BölgeTürüDropList.innerHTML = "";

    let url = `${adres}Harita/GeçerliNoktaTürleri`;
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
        BölgeTürüDropList.value = bölge_türü;
    }
    else
    {
        alert("Beklenmeyen bir hatayla karşılaşıldı.");
        KullanıcıÇekmecesiniKapat();
    }
}

async function KÇ_NoktaDuzenle_ÜstBölgeleriGetir(button) 
{
    üst_bölge = button.getAttribute("konum-kimliği")
    let ÜstBölgeDropList = document.getElementById("NoktaDuzenle-ÜstBölge");
    ÜstBölgeDropList.innerHTML = "";

    let BölgeTürü = document.getElementById("NoktaDuzenle-BölgeTürü").value;
    BölgeTürü = encodeURIComponent(BölgeTürü);

    let url = `${adres}Harita/ÜsteGelebilecekNoktalar/${BölgeTürü}/`;
    let yanıt = await fetch(url, {method: 'GET'});

    if(yanıt.status == 200)
    {
        let yanıtJSON = await yanıt.json();
        let Noktalar = JSON.parse(yanıtJSON);
        
        Noktalar.forEach((nokta) =>
        {
            if(Secili_Nokta_Kimlik != nokta.kimlik)
            {
                let option = document.createElement('option');
                option.value = nokta.kimlik;
                option.text = nokta.Türkçe + " (" + nokta.Bulgarca_Kiril + ")";
                ÜstBölgeDropList.appendChild(option);
            }   
        }
        );
        let option = document.createElement('option');
        option.value = "";
        option.text = "Üst bölgesi yok.";
        ÜstBölgeDropList.appendChild(option);
        const options = document.querySelectorAll('#NoktaDuzenle-ÜstBölge option');
    
        for (let option of options) 
        {
          if (option.value === üst_bölge) 
          {
            ÜstBölgeDropList.value = üst_bölge
          }
        }
    }
    else if(yanıt.status == 204)
    {
        let option = document.createElement('option');
        option.value = "";
        option.text = "Üst bölgesi yok.";
        ÜstBölgeDropList.appendChild(option);
    }
    else
    {
        alert("Beklenmeyen bir hatayla karşılaşıldı.");
        NoktaÇekmecesiniKapat();
    }
}

function BizeUlasinAc(button)
{
    document.getElementById("popup-metin").value = "";
    document.getElementById("form-popup").style.display = "block";
    console.log(button.getAttribute("konum-kimliği"))
    document.getElementById("form-popup").setAttribute("konum-kimliği", button.getAttribute("konum-kimliği"));
}

function BizeUlasinKapa()
{
    document.getElementById("form-popup").style.display = "none";
    document.getElementById("form-popup").setAttribute("konum-kimliği", "");
}

async function BizeUlasinGonder()
{
    if (şimdi_kullanan == null)
    {
        return;
    }
    let oturum_kimliği = ÇerezDeğeri("OTURUM");

    let nokta = NoktayıGetir(document.getElementById("form-popup").getAttribute("konum-kimliği"))[0];
    let metin = document.getElementById("popup-metin").value;

    console.log(nokta);
    console.log(metin);
    console.log(şimdi_kullanan);

    let gönderi = {
        "Nokta": nokta.properties.Kimlik,
        "Yorum": metin
    };

    let url = `${adres}Harita/NoktaGeriBildirimi`;
    let yanıt = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                'KULLANICI': şimdi_kullanan.Kimlik,
                'OTURUM': oturum_kimliği,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gönderi)
        }
    );

    if (yanıt.status === 200)
    {
        alert("Geri bildirim başarıyla gönderildi.");
    }
    else
    {
        alert(`${yanıt.status} Geri bildirim başarısız oldu.`);
    }

    BizeUlasinKapa();
}
// @license-end