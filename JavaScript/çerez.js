function ÇerezOluştur(ad, değer, son_tarih)
{
    let expires = "expires=" + son_tarih.toUTCString() + "; ";
    document.cookie = ad + "=" + değer + "; " + expires + "path=/; SameSite=Strict;";
}

function ÇerezSil(ad)
{
    if (typeof(ad) === "string")
    {
        let milat = new Date(0);
        document.cookie = `${ad}=; expires=${milat.toUTCString()}; path=/; SameSite=Strict;`;
    }
}

function ÇerezDeğeri(ad)
{
    if (typeof(ad) === "string")
    {
        let değer = document.cookie.split("; ").find(
            (row) => row.startsWith(`${ad}=`)
        )?.split("=")[1];
        if (typeof(değer) === "string")
        {
            return değer;
        }
        return "";
    }
    return "";
}