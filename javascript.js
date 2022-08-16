const inputCity = document.querySelector("#inputCity")
const cityButton = document.querySelector(".cityButton")
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const moths = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
const apiURL = "https://api.openweathermap.org/data/2.5/weather?"

cityButton.addEventListener("click", () => {
    removeDisplay(".cityInfo");
    removeDisplay(".overallWeather");
    removeDisplay(".temperatureInfo");
    removeDisplay(".otherInfo");
    
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
      );
    const apiCity = inputCity.value;
    const apiKey = "8d1eb409ef57e4fe5939de84f94bcd77";
    const apiCall = `${apiURL}q=${apiCity}&appid=${apiKey}`;
    displayFetch(apiCall).then(res => {
        const localData = getLocalData(secondsToHours(res.timezone))
        console.log(res)
        addElement("div", "city", res.name, ".cityInfo" );
        addElement("div", "country", regionNames.of(res.sys.country), ".cityInfo" );
        addElement("div", "date", localData, ".cityInfo" );
        addElement("div", "fa-solid", "", ".overallWeather").addSecondClass("fa-sun")
        addElement("div", "weather", res.weather[0].description, ".overallWeather")
        addElement("div", "temperature", `Temperature ${KelvinToCelsius(res.main.temp)}°C`, ".temperatureInfo" );
        addElement("div", "feel", `Feels like ${KelvinToCelsius(res.main.feels_like)}°C`, ".temperatureInfo")
        addElement("div", "humidity", `Humidity (%) ${res.main.humidity}%`, ".otherInfo")
        addElement("div", "windiness", `Wind (m/s) ${res.wind.speed}%`, ".otherInfo")
        addElement("div", "cloudiness", `Clouds (%) ${res.clouds.all}%`, ".otherInfo")

    })
    inputCity.value =""
})



function removeDisplay(parent) {
    const element = document.querySelector(parent)
    while( element.hasChildNodes() ){
        element.removeChild(element.lastChild);
    }
}

function getLocalData(time) {
    const today = new Date();
    let hours = today.getUTCHours() + time;
    hours = hours < 10 ? "0" + hours : hours
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes
    const weekday = today.getDay();
    const date = today.getDate()
    const month = today.getMonth();
    const year = today.getFullYear();
    const localData = `${hours}:${minutes} - ${weekdays[weekday]}, ${date} ${moths[month]} ${year}`
    return localData
}


function secondsToHours (Timezone) {
    let hour = Timezone / 3600
    return hour
}

let TimeZoneDifference = secondsToHours(7200)
console.log(TimeZoneDifference)

function addElement(elementType, elementClass, elementText, elementParent) {
    const el = document.createElement(elementType)
    el.classList.add(elementClass)
    el.innerHTML = elementText
    const parent = document.querySelector(elementParent)
    parent.append(el)
    return {
        addSecondClass(secondClass) {
            el.classList.add(secondClass)
        }
    }
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



