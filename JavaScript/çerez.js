// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
// Copyright (C) 2025 Habil Tataroğulları, Güneş Balcı, Yusuf Kozan

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
// @license-end