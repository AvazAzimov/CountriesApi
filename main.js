const elBody = document.querySelector("body");
const elForm  = document.querySelector(".hero__form--js");
const elInput  = document.querySelector(".hero__input--js");
const elSelect  = document.querySelector(".hero__select--js");
const elOption  = document.querySelector(".hero__select--js");
const elDarkBox = document.querySelector(".dark__box");
const elDarkMoodBtn = document.querySelector(".nav__darkmood");
const elList  = document.querySelector(".countries__list--js");
const regTemplate = document.querySelector(".countries__template").content;
const Imgdoork = document.getElementById("moon");
const Imglitek = document.getElementById("moon-icon");

function renderCountres(arr,node) {
    node.innerHTML = ""
    const regFaragment = document.createDocumentFragment()
        arr.forEach((item) => {
            const elFeragment = regTemplate.cloneNode(true);
            elFeragment.querySelector(".countries__item").dataset.contentId = item.name.common;
            elFeragment.querySelector(".countries__img").src = item.flags.png;
            elFeragment.querySelector(".countries__title").textContent = item.name.common;
            elFeragment.querySelector(".countries__people").textContent =`Population: ${item.population}`;
            elFeragment.querySelector(".countries__region").textContent = `Region: ${item.region}`;
            elFeragment.querySelector(".countries__capital").textContent = `Capital: ${item.capital}`;
            regFaragment.append(elFeragment)
            // console.log(item.continents);
            // return item.name.common
        });
        node.appendChild(regFaragment)  
    }
  
  
async function renderApi(url) {
    try {
        const res = await fetch(url)
        const date = await res.json()
        renderCountres(date,elList) 
        console.log(date);
    }catch (error){
        console.log(error);
    }
}

elForm.addEventListener("keyup",evt => {
    evt.preventDefault()
    elList.innerHTML = ""
    const inputVal = elInput.value;
    const selectVal = elSelect.value;
    console.log(selectVal);
    if (selectVal) {
        renderApi(`https://restcountries.com/v3.1/region/${selectVal}`)
    }else if(inputVal) {
        renderApi(`https://restcountries.com/v3.1/name/${inputVal}`)
    }else {
        renderApi(COUNTRIES__API)
    }
})

elList.addEventListener("click" , ev => {
    if (ev.target.matches(".countries__item")) {
        const locationEvent = ev.target.dataset.contentId;
        console.log(locationEvent.common);
        localStorage.setItem("key",locationEvent)
        window.localStorage.setItem("token", ev);
        window.location = "info.html",
        getSelection(locationEvent)
    }
})

elDarkMoodBtn.addEventListener("click", (eve) => {
    eve.preventDefault()
    // localStorage.setItem("dork",darkMoon)
    // window.localStorage.setItem("token",eve)
    // getSelection(darkMoon)
    elBody.classList.toggle("darkmood-theme");
    if (document.body.classList.contains("darkmood-theme")) {
        Imglitek.src = "/imges/sun.svg"
    }else {
        Imglitek.src = "/imges/moon.svg" 
    }
})
const COUNTRIES__API = "https://restcountries.com/v3.1/all";
renderApi(COUNTRIES__API)
