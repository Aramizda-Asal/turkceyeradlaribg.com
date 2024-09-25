function KayitOl()
{
    let KullanıcıAdı = document.getElementById("kullanıcıadı-kayıt").value
    let E_Posta = document.getElementById("eposta-kayıt").value
    let Parola1 = document.getElementById("parola-kayıt").value
    let Parola2 = document.getElementById("parola-kayıt-tekrar").value
    if(Parola1 === Parola2)
    {
        let url = "http://localhost:5130/Kullanıcı/KullanıcıEkle/" + KullanıcıAdı + "/" + E_Posta + "/" + Parola1
        fetch(url, {method: 'POST'})
            .then(response =>{
                if(response.status === 201)
                {
                    alert("Kayit Olundu")
                }
                else
                {
                    alert("Kayit Olunamadı")
                }
            })
    }
    else
    {
        alert("Kayit Olunamadı")
    }
}

function GirişYap()
{
    let kullanıcıAdı = document.getElementById("kullanıcıadı-giriş").value
    let parola = document.getElementById("parola-giriş").value

    let url = "http://localhost:5130/Oturum/GirişYap/" + kullanıcıAdı + "/" + parola;
    alert(url)
    fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            let gelen = JSON.parse(response);
            console.log(gelen.Kullanıcı);
            ÇerezOluştur(gelen.Kimlik, gelen.Kullanıcı, new Date(gelen.Bitiş));
            if(response == "")
            {
                alert("Reddedildi")
            }
        })
}