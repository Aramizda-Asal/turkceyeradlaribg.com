function KayitOl()
{
    let KullanıcıAdı = document.getElementById("kullanıcıadı-kayıt").value
    let E_Posta = document.getElementById("eposta-kayıt").value
    let Parola1 = document.getElementById("parola-kayıt").value
    let Parola2 = document.getElementById("parola-kayıt-tekrar").value
    if(Parola1 === Parola2)
    {
        let url = "http://localhost:5130/Kullanıcı/KullanıcıEkle?Kullanıcı_Adı=" + KullanıcıAdı + "&E_Posta=" + E_Posta + "&Parola=" + Parola1
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
        .then(response => response.text())
        .then((response) => {
            console.log(response)
            if(response == "")
            {
                alert("Reddedildi")
            }
        })
}