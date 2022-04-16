const container = document.querySelector(".container");
const miktar = document.getElementById("miktar");
const ucret = document.getElementById("ucret");
const select =document.querySelector(".movie");
const koltuklar =document.querySelectorAll(".koltuk:not(.reserved)")
const satinal = document.getElementById("satinal")

getFromLocal();

container.addEventListener("click",function(e){
    if(e.target.classList.contains("koltuk") && !e.target.classList.contains("reserved"))
    {
        
        e.target.classList.toggle("selected")

            tutarHesapla();
       
    }
       
    

})

// Film listesindeki film değiştikçe Fiyatın güncellenmesi için
select.addEventListener("change",function(e){
tutarHesapla();
})

//LocalStorage
//Bütün koltukları ve seçili olanlarla rezerve olanları ayrı ayrı listeye almamız
// gerekir.

function tutarHesapla(){
    var seciliKoltukSayisi = container.querySelectorAll(".koltuk.selected");
    var seciliKoltukDizisi=[];
    var koltukDizisi=[];
    

    seciliKoltukSayisi.forEach(function(koltuk){
        seciliKoltukDizisi.push(koltuk)
    })
     koltuklar.forEach(function(koltuk){
         koltukDizisi.push(koltuk)
     })

     let seciliKoltukIndexleri = seciliKoltukDizisi.map(function(koltuk){
         return koltukDizisi.indexOf(koltuk)
     })

     let seciliKoltukUzunluk = seciliKoltukSayisi.length;
     miktar.innerText=seciliKoltukUzunluk;
     ucret.innerText = seciliKoltukUzunluk * select.value;
    
     saveToLocalStorage(seciliKoltukIndexleri)
    
     
}

// LS a kaydetme
function saveToLocalStorage(index){
    localStorage.setItem("seciliKoltuklar",JSON.stringify(index))
    localStorage.setItem("seciliFilmIndexi",select.selectedIndex)
    
}

//LS dan Çekme 
function getFromLocal(){

    var seciliKoltuklar = JSON.parse(localStorage.getItem("seciliKoltuklar"))
    const seciliFilmler =localStorage.getItem("seciliFilmIndexi")
    

    if(seciliKoltuklar != null && seciliKoltuklar.length > 0){
        koltuklar.forEach(function(koltuk,index){
            if(seciliKoltuklar.indexOf(index) > -1 ) {
                koltuk.classList.add("selected");
            }
        })
    }


    if(seciliFilmler!=null){
        select.selectedIndex = seciliFilmler;
    }
    satinal.addEventListener("click",function(){
        let doluKoltuklar = seciliKoltuklar.slice();
        localStorage.setItem("doluKoltuklar",JSON.stringify(doluKoltuklar))
        localStorage.removeItem("seciliKoltuklar")
       
    })


    satinAlindi();
    
    
}

function satinAlindi()
{
    if(koltuklar.forEach(function(koltuk){
        if(koltuk.classList.contains("selected")){
            koltuk.classList.add("reserved") 
        }
    })){

    }
}

    // const seciliKoltuklar = JSON.parse(localStorage.getItem("seciliKoltuklar"))
    
    // // if(seciliKoltuklar != null && seciliKoltuklar.length > 0){
    // //     koltuklar.forEach(function(koltuk,index){
    // //         if(seciliKoltuklar.indexOf(index)>-1) {

    // //             koltuk.classList.add("reserved");

    // //            koltuk.classList.remove("selected");

    // // //}})}

