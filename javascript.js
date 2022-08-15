const inputCity = document.querySelector("#inputCity")
const cityButton = document.querySelector(".cityButton")

const apiURL = "https://api.openweathermap.org/data/2.5/weather?"

cityButton.addEventListener("click", () => {
    const apiCity = inputCity.value
    const apiKey = "8d1eb409ef57e4fe5939de84f94bcd77"
    const apiCall = `${apiURL}q=${apiCity}&appid=${apiKey}`
    displayFetch(apiCall)
})

function addElement(elementType, elementClass, elementText, elementParent) {
    const el = document.createElement(elementType)
    el.classList.add(elementClass)
    el.innerHTML = elementText
    elementParent.append(el)
}

function KelvinToCelsius (Kelvin) {
    const Temperature = Kelvin - 273.15
    return  Temperature
    
}

console.log(KelvinToCelsius(300))

function displayFetch(api) {
fetch(api)
    .then(res => {
        return res.json()})
        .then(data => {
            console.log(data)})
        }


