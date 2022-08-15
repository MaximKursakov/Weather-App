const inputCity = document.querySelector("#inputCity")
const cityButton = document.querySelector(".cityButton")
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const moths = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
const apiURL = "https://api.openweathermap.org/data/2.5/weather?"

cityButton.addEventListener("click", () => {
    removeDisplay(".cityInfo");
    removeDisplay(".weatherInfo");
    let localData = getLocalData()
    console.log(localData)
    const apiCity = inputCity.value;
    const apiKey = "8d1eb409ef57e4fe5939de84f94bcd77";
    const apiCall = `${apiURL}q=${apiCity}&appid=${apiKey}`;
    displayFetch(apiCall).then(res => {
        console.log(res)
        addElement("div", "city", res.name, ".cityInfo" );
        addElement("div", "date", localData, ".cityInfo" );
        addElement("div", "cloudiness", res.weather[0].description, ".weatherInfo")
        addElement("div", "temperature", `${KelvinToCelsius(res.main.temp)}°C`, ".weatherInfo" );
        addElement("div", "feel", `Feels like ${KelvinToCelsius(res.main.feels_like)}`, ".weatherInfo")
        addElement("div", "humidity", `Humidity ${res.main.humidity}%`, ".weatherInfo")
    })
    inputCity.value =""
})



function removeDisplay(parent) {
    const element = document.querySelector(parent)
    while( element.hasChildNodes() ){
        element.removeChild(element.lastChild);
    }
}

//date and time only works for local pc
function getLocalData() {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const weekday = today.getDay();
    const date = today.getDate()
    const month = today.getMonth();
    const year = today.getFullYear();
    const localData = `${time} - ${weekdays[weekday]}, ${date} ${moths[month]} ${year}`
    return localData
    
}

function addElement(elementType, elementClass, elementText, elementParent) {
    const el = document.createElement(elementType)
    el.classList.add(elementClass)
    el.innerHTML = elementText
    const parent = document.querySelector(elementParent)
    parent.append(el)
}

function KelvinToCelsius (Kelvin) {
    const Temperature = Kelvin - 273.15
    return  Temperature.toFixed(0)
    
}

async function displayFetch(api) {
    let response = await fetch(api)
    let data = await response.json()
    return data
}



