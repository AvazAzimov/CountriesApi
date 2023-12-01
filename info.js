const elBody = document.querySelector("body");
const elBtn =  document.querySelector(".info__btn--js");
const locationDate  = localStorage.getItem("token");
const elInfoBox =  document.querySelector(".info__wrapping");
const elTemplate = document.querySelector(".info__template").content
const localCope = localStorage.getItem("key")
const elDarkMoon = document.querySelector("darkmood");
const elDarkMoodBtn = document.querySelector(".nav__darkmood");
const ImgLogo = document.getElementById("logo");
const Imgdoork = document.getElementById("moon");
const Imglitek = document.getElementById("moon-icon");


elDarkMoodBtn.addEventListener("click", () => {
    elBody.classList.toggle("darkmood-theme");
    if (document.body.classList.contains("darkmood-theme")) {
        Imglitek.src = "/imges/sun.svg"
    }else {
        Imglitek.src = "/imges/moon.svg"
 
    }
})


function  renderInfo(arr) {
    const elFragments = document.createDocumentFragment()
    elInfoBox.innerHTML = ""
    arr.forEach(item => {
        const regFragment = elTemplate.cloneNode(true)
        regFragment.querySelector(".info__img--js").src = item.flags.png;
        regFragment.querySelector(".info__title--js").textContent = item.name.common;
        regFragment.querySelector(".info__name--js").textContent =`Native Name: ${item.name.common}`;
        regFragment.querySelector(".info__population--js").textContent = `Population: ${item.population}`;
        regFragment.querySelector(".info__region--js").textContent =`Region: ${item.region}` ;
        regFragment.querySelector(".info__subregion--js").textContent = `Sub Region: ${item.subregion}`;
        if (item.capital) {
            regFragment.querySelector(".info__capital--js").textContent =`Capital: ${item.capital}` ;      
        }
        regFragment.querySelector(".info__status--js").textContent =`Status: ${item.status}` ;
        regFragment.querySelector(".info__currencies--js").textContent =`Currencies: ${item.currencies.name}`;
        regFragment.querySelector(".info__languages--js").textContent =`Languages: ${item.languages[1]}`
        regFragment.querySelector(".info__timezones--js").textContent =`Timezones: ${item.timezones}`
        regFragment.querySelector(".info__fifa--js").textContent =`FIFA: ${item.fifa}`
        ;
        
        elFragments.append(regFragment)
    });
    elInfoBox.appendChild(elFragments)
} 

async function infoApi() {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${localCope}?fullText=true`)
        const data = await res.json()
        console.log(data);
        renderInfo(data) 
    }catch(error) {
        console.log(error);
    }
}

infoApi()
// const dark = localStorage.setItem(darkmood)
// console.log(dark);
// console.log(localCope);

console.log(elDarkMoon);
if (!locationDate) {
    window.location.replace("/index.html")
}
elBtn.addEventListener("click", ()=> {
    localStorage.removeItem("token")
    window.location.reload()
})
// function renderInfo(url,nodes) {

// }