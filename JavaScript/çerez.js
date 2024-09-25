function ÇerezOluştur(oturumkimlik, kullanıcıkimlik, sontarih)
{
    let expires = "expires="+ sontarih.toUTCString();
    document.cookie = "OturumKimlik=" + oturumkimlik + ";" + expires + ";path=/";
    document.cookie = "KullanıcıKimlik=" + kullanıcıkimlik + ";" + expires + ";path=/";
    console.log(document.cookie);
}