const inputCity = document.querySelector("#inputCity")
const cityButton = document.querySelector(".cityButton")

const apiURL = "https://api.openweathermap.org/data/2.5/weather?"

cityButton.addEventListener("click", () => {
    const apiCity = inputCity.value
    const apiKey = "8d1eb409ef57e4fe5939de84f94bcd77"
    const apiCall = `${apiURL}q=${apiCity}&appid=${apiKey}`
    displayFetch(apiCall).then(res => {
        console.log(res)
        addElement("div", ".temperature", `${KelvinToCelsius(res.main.temp)}°C`, ".weatherDisplay" );
        addElement("div", ".feel", `Feels like ${KelvinToCelsius(res.main.feels_like)}`, ".weatherDisplay")
        addElement("div", ".feel", `Humidity ${res.main.humidity}%`, ".weatherDisplay")
    })
})

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


function displayTemperature() {
    addElement("div", ".temperature")
}

