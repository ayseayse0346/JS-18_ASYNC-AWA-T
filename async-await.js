//*=================================================
//*               ASYNC-AWAIT
//*=================================================
//? Async-Await ECMAScript 2017 ile Javascript diline eklenmistir.
//? Aslinda Promise yapisinin syntax olarak basitlestirilmis halidir.
//? Bu baglamda sentetik seker benzetmesi yapilabilir.

//* Bir fonskiyonu asenkron hale getirmek icin fonksiyon keyword'nun onune
//* async keyword'u eklenir.

//* Bir async fonksiyon icerisinde await keyword'u ile yapilan istegin cevabinin
//* beklenmesi saglanir.

//* Aslinda dizilis olarak senkron mantiga benzeyen kod yazarak Asenkron
//* kod yazmayi mumkun kilar.

//* Await, promise-temelli herhangi bir fonksiyonun onune getirilerek getirildigi
//* satirdaki kodun durdurulmasini saglar.
//* Yapilan istek yerine getirilip sonuc degerlerinin dondurulmesi ile kodun calismasi devam eder.

const getNews = async () => {
    //?   https://newsapi.org/v2/top-headlines?country=tr&apiKey=1a1a999e0d7240a6bd2dead87bcca78e&category=technology
  
    const BASE_URL = `https://newsapi.org/v2/`  
    const API_KEY = `372ddf93d20a4a63808595de6cb703ed`  //yukardaki urlyi parçalayarak değişkenlere atadık.
    const queryString = `top-headlines?country=us&category=technology` 
    const URL = `${BASE_URL}${queryString}&apiKey=${API_KEY}`// uzun url bu adresi fetchj içine yazmak yerine url yi bu değişkene atadık
  //sabit değişmeyecek olanları büyük harfle değişken olarak verdik.
    try {  //3. hata için bu yapıyı kullandık try catch yapısı
      const res = await fetch(URL)  //1.istek atıtık.yukarıda değişkene atadığımız urlyi artık istek atabiliriz.
  
      //? Error handing
      if (!res.ok) { //hatayı bu şekilde fırlatmalıyız.. throw new eror ile
        throw new Error(`${res.status}`)
      }
      const data = await res.json()  //2. ham veriden kurtulmnak için jasonlaştırdık.artıkn elimöizde işlemeye hazır bir veri var.
      dipslayNews(data.articles)  //hatayı ekrana bastırmak i.in displayNews diye fonksiyona datanın içimnmdeki articllerı ver dedik.veriyi burda fonksiyona pas geçtik. sonuçta bir veri gönderdiysek o veriyi de burda yakalamamız gerek. 
    } catch (error) {
      const newsArticle = document.getElementById("news")
      newsArticle.innerHTML = `
          <img src="./img/404.png" alt="" />
      `
    }
  }
  
  const dipslayNews = (news) => {
    const newsArticle = document.getElementById("news") //1.html de kart yapsıı oluşturduk. 
    const defaultImage = "./img/404.png"
//   ! {urlToImage,url,content,title } bu şekilde havada destructuring yaparız. sürekli item yazmak yerine
    news.forEach(({ urlToImage, url, content, title }) => {  //2. 20 tane itemi foreach ile döndük 2.inner html ile artık newsarticla ekliyoruz.birinci kart ikinci kart şeklinde divlerle ekleyebiliriz. consolda bunlara baktık mesela resim yerine koyymamız gereken urltoımg kısmıydı onu dolar süslü ile yaptık content içerik mesala onun içinde contetnt kısmını dolar süslü ile yazdık.
        //const {urlToImage,url,content,title } =item destructuring yaptık .bunun yerine havada destructuring yaptık.
      newsArticle.innerHTML += `
          <div class="card col-sm-6 col-md-4 col-lg-3"> 
              <img src="${
                urlToImage || defaultImage // short sirquit(kısaca resim yoksa atadığımız resimi koy-->default img a resim atadık. )
              }" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${content || "No Content"}</p>
                  <a href="${url}" target="_blank" class="btn btn-primary">Detail</a>
              </div>
          </div>
      `
    })
  }
  
  getNews()



//   ****************NOT*****************//
//   fetch ve axios, web tarayıcıları ve Node.js ortamında HTTP istekleri yapmak için kullanılan iki popüler JavaScript kütüphanesidir. Her ikisi de benzer işlevselliğe sahip olsa da, bazı farklılıklar bulunmaktadır:
// API Tasarımı: fetch, tarayıcıların yerleşik bir API'sidir ve standart JavaScript fetch fonksiyonu ile kullanılabilir. Diğer yandan, axios, bir üçüncü taraf kütüphanedir ve daha zengin bir API sağlar.
// Promise Desteği: fetch, Promise tabanlı bir API'ye sahiptir. Ancak, bazı durumlarda isteği işlemek için ek Promise zincirleri gerekebilir. axios, Promise tabanlı bir API sunar ve genellikle daha kolay kullanılır.
// Tarayıcı Desteği: fetch, modern tarayıcılarda desteklenirken, eski tarayıcılarda tam olarak desteklenmeyebilir. axios, XMLHttpRequest (XHR) kullanarak çalışır ve eski tarayıcılar dahil geniş bir tarayıcı desteği sunar.
// HTTP İşlemleri: fetch, varsayılan olarak JSON formatında veri gönderir ve alır, ancak axios daha esnek bir yapıya sahiptir ve çeşitli formatlarda (örneğin JSON, form verileri, URL kodlaması vb.) HTTP isteklerini kolayca yapabilir.
// Hata Yönetimi: fetch, ağ hatası veya HTTP hatalarını otomatik olarak yakalamaz, bu nedenle ek hata işleme kodu gerekebilir. axios, HTTP hatalarını otomatik olarak işler ve daha iyi hata yönetimi sağlar.
// İnterseptörler (Interceptor) ve İnterseptör Zinciri: axios, istekler ve yanıtlar üzerinde işlem yapmak için interseptörler sağlar. Bu, istekleri ve yanıtları değiştirmek, başlıkları eklemek veya kaldırmak gibi işlemleri kolaylaştırır. fetchte bu özellik bulunmamaktadır.
// Genel olarak, fetch tarayıcıların sağladığı bir standartken, axios daha geniş bir işlevsellik sunar ve özellikle daha eski tarayıcılarla çalışırken ve gelişmiş hata yönetimi ve interseptörler gibi özellikler gerektiğinde tercih edilebilir.