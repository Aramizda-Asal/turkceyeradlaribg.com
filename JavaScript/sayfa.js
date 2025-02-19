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
    let konum_kimliği = button.getAttribute('konum-kimliği');

    kullanıcı_kimliği = encodeURIComponent(kullanıcı_kimliği);
    konum_kimliği = encodeURIComponent(konum_kimliği);
    
    let url = `http://localhost:5130/Favori/FavoriEkle/${kullanıcı_kimliği}/${konum_kimliği}`;   

    let yanıt = await fetch(url, {method: 'POST'});

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
    let konum_kimliği = button.getAttribute('konum-kimliği');

    kullanıcı_kimliği = encodeURIComponent(kullanıcı_kimliği);
    konum_kimliği = encodeURIComponent(konum_kimliği);

    let url = `http://localhost:5130/Favori/FavorilerdenCikar/${kullanıcı_kimliği}/${konum_kimliği}`;
    let yanıt = await fetch(url, {method: 'DELETE'});

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

function NoktaDuzenleSayfası()
{
    document.getElementById("nokta-penceresi").style.display = "none";
    document.getElementById("noktayı-duzenle-penceresi").style.display = "block";
}

function NoktaSayfası()
{
    document.getElementById("nokta-penceresi").style.display = "block";
    document.getElementById("noktayı-duzenle-penceresi").style.display = "none";
}