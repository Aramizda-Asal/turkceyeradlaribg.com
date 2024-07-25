let kullanıcı_çekmecesi_açık = false;

function KullanıcıÇekmecesi()
{
    if(kullanıcı_çekmecesi_açık === true)
    {
        document.getElementById("kullanıcı-çekmecesi").style.width = "0";
        kullanıcı_çekmecesi_açık = false;
    }
    else
    {
        document.getElementById("kullanıcı-çekmecesi").style.width = "25vw";
        kullanıcı_çekmecesi_açık = true;
    }
}

function AyarlaraGit()
{
    document.getElementById("kullanıcı-çekmece-ayarlar").style.display = "block"
    document.getElementById("kullanıcı-çekmece-profil").style.display = "none"
}