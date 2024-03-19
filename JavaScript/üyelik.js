function KayitOl()
{
    let KullanıcıAdı = document.getElementById("kullanıcıb").value
    let E_Posta = document.getElementById("epostab").value
    let Parola1 = document.getElementById("parolab").value
    let Parola2 = document.getElementById("parolac").value
    if(Parola1 === Parola2)
    {
        let url = "http://localhost:5130/Kullanıcı/KullanıcıEkle?Kullanıcı_Adı=" + KullanıcıAdı + "&E_Posta=" + E_Posta + "&Parola=" + Parola1
        fetch(url, {method: 'POST'})
            .then(response =>{
                if(response.status === 201)
                {
                    alert("Kayit Olundu")
                }
                if(response.status === 422)
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