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

function Göster_KayıtOl()
{
    document.getElementById("giriş-yap").style.display = "none";
    document.getElementById("kayıt-ol").style.display = "block";
}

function Göster_GirişYap()
{
    document.getElementById("kayıt-ol").style.display = "none";
    document.getElementById("giriş-yap").style.display = "block";
}

function AyarlaraGit()
{
    document.getElementById("kullanıcı-çekmece-ayarlar").style.display = "block"
    document.getElementById("kullanıcı-çekmece-profil").style.display = "none"
}

function AyarlaraGit()
{
    document.getElementById("kullanıcı-çekmece-ayarlar").style.display = "block"
    document.getElementById("kullanıcı-çekmece-profil").style.display = "none"
}

function AraÇekmecesiniAç(ilkİçerenler, Ortaİçerenler, sonİçerenler)
{   
    document.getElementById("ara-çekmece").style.display = "block";

    let aramaSonucuVar = false;
    if(ilkİçerenler.length > 0)
    {
        for(let i = 0; i < ilkİçerenler.length; i++)
        {
            document.getElementById("ara-çekmece").innerHTML = "<div class=\"ara-çekmece-satır\">"+ ilkİçerenler[i] +"</div>";
        }
        aramaSonucuVar = true;
    }
    else
    {
        document.getElementById("ara-çekmece").innerHTML = "";
    }
    if(Ortaİçerenler.length > 0)
    {
        for(let i = 0; i < Ortaİçerenler.length; i++)
        {
            document.getElementById("ara-çekmece").innerHTML += "<div class=\"ara-çekmece-satır\">"+ Ortaİçerenler[i] +"</div>";
        }
        aramaSonucuVar = true;
    }
    else if(ilkİçerenler.length <= 0 && Ortaİçerenler.length <= 0)
    {
        document.getElementById("ara-çekmece").innerHTML = "";
    }
    if(sonİçerenler.length > 0)
    {
        for(let i = 0; i < sonİçerenler.length; i++)
        {
            document.getElementById("ara-çekmece").innerHTML += "<div class=\"ara-çekmece-satır\">"+ sonİçerenler[i] +"</div>";
        }
        aramaSonucuVar = true;
    }
    if(!aramaSonucuVar)
    {
        document.getElementById("ara-çekmece").innerHTML = "<div class=\"ara-çekmece-satır\">"+ "Yok" +"</div>";
    }
}

function AraÇekmecesiniKapat()
{
    document.getElementById("ara-çekmece").style.display = "none";
}