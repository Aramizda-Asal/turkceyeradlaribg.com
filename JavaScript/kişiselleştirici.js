let şimdi_kullanan = null;

async function Açılış()
{
    await OturumAçık();
    ArayüzüKişiselleştir();
    
}

function ArayüzüKişiselleştir()
{
    KullanıcıÇekmecesiniKişiselleştir();
}

function KullanıcıÇekmecesiniKişiselleştir()
{
    if (şimdi_kullanan !== null)
    {
        document.getElementById("kullanıcı-çekmecesi-anonim").style.display = "none";
        document.getElementById("kullanıcı-çekmecesi-kişisel").style.display = "block";

        document.getElementById("kullanıcı-çekmecesi-başlık").innerText = şimdi_kullanan.Adı;

        document.getElementById("kişisel-çekmece-ana").style.display = "block";
    }
    else
    {
        document.getElementById("kullanıcı-çekmecesi-kişisel").style.display = "none";
        document.getElementById("kullanıcı-çekmecesi-anonim").style.display = "block";

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