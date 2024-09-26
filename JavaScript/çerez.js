function ÇerezOluştur(ad, değer, son_tarih)
{
    let expires = "expires=" + son_tarih.toUTCString() + "; ";
    document.cookie = ad + "=" + değer + "; " + expires + "path=/; SameSite=Strict;";
    console.log(document.cookie);
}