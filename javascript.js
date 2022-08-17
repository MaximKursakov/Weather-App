const inputCity = document.querySelector("#inputCity")
const cityButton = document.querySelector(".cityButton")
const content = document.querySelector(".content")
const overallWeather = document.querySelector(".overallWeather i")
console.log(overallWeather)
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const moths = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
const apiURL = "https://api.openweathermap.org/data/2.5/weather?"

cityButton.addEventListener("click" , () => {
    cityButton.classList.add("slide-out")
    setTimeout(() => {
        cityButton.classList.replace("slide-out", "hide")
        inputCity.classList.replace("hide", "slide-in")
        setTimeout(() => {
            inputCity.classList.remove("slide-in")
            inputCity.focus()
        }, 300);
    }, 300);
})

inputCity.addEventListener("keypress", (e) =>{
    if (13 === e.keyCode) {
    (function resetData() {
        removeDisplay(".cityInfo");
        removeDisplay(".localTime");
        removeDisplay(".overallWeather");
        removeDisplay(".temperatureInfo");
        removeDisplay(".humidityInfo");
        removeDisplay(".windInfo");
        removeDisplay(".cloudInfo");
    })();
    const regionNames = new Intl.DisplayNames(
        ['en'], {type: 'region'}
      );
    const apiCity = inputCity.value;
    const apiKey = "8d1eb409ef57e4fe5939de84f94bcd77";
    const apiCall = `${apiURL}q=${apiCity}&appid=${apiKey}`;
    getFetchData(apiCall).then(res => {
        const localTimeAndDate = getLocalData(secondsToHours(res.timezone))
        console.log(res)
        const generalWeather = res.weather[0].main
        if (generalWeather === "Clear") {
            replaceUnknownclass(content, "content", "backgroundSunny")
            addElement("i", "fa-solid", "", ".overallWeather").addSecondClass("fa-sun")
        }
        else if (generalWeather === "Clouds") {
            replaceUnknownclass(content, "content", "backgroundCloudy")
            addElement("i", "fa-solid", "", ".overallWeather").addSecondClass("fa-cloud")
        }
        else if (generalWeather === "Rain") {
            replaceUnknownclass(content, "content", "backgroundRainy")
            addElement("i", "fa-solid", "", ".overallWeather").addSecondClass("fa-showers-heavy")

        }
        else if (generalWeather === "Snow") {
            replaceUnknownclass(content, "content", "backgroundSnow")
            addElement("i", "fa-solid", "", ".overallWeather").addSecondClass("fa-snow")

        }
        else if (generalWeather === "Drizzle") {
            replaceUnknownclass(content, "content", "backgroundDrizzle")
            addElement("i", "fa-solid", "", ".overallWeather").addSecondClass("fa-cloud-drizzle")

        }
        else if (generalWeather === "Thunderstorm") {
            replaceUnknownclass(content, "content", "backgroundThunderstorm")
            addElement("i", "fa-solid", "", ".overallWeather").addSecondClass("fa-cloud-bolt")

        }
        addElement("div", "city", res.name, ".cityInfo" );
        addElement("div", "country", regionNames.of(res.sys.country), ".cityInfo" );
        addElement("div", "date", localTimeAndDate, ".localTime" );
        addElement("div", "weather", res.weather[0].description, ".overallWeather")
        addElement("div", "temperature", `${KelvinToCelsius(res.main.temp)}°`, ".temperatureInfo" );
        addElement("div", "feel", `${KelvinToCelsius(res.main.feels_like)}°`, ".temperatureInfo")
        addElement("div", "humidity", res.main.humidity, ".humidityInfo")
        addElement("div", "windiness", res.wind.speed, ".windInfo")
        addElement("div", "cloudiness", res.clouds.all, ".cloudInfo")
    })
    inputCity.classList.add("slide-out")
        setTimeout(() => {
            inputCity.classList.replace("slide-out", "hide")
            cityButton.classList.replace("hide", "slide-in")
            setTimeout(() => {
                cityButton.classList.remove("slide-in")
            }, 300);
        }, 300);
    inputCity.value =""
    }
})

function removeDisplay(parent) {
    const element = document.querySelector(parent)
    while( element.hasChildNodes() ){
        element.removeChild(element.lastChild);
    }
}

function getLocalData(time) {
    const today = new Date();
    let weekday = today.getDay();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let hours = today.getUTCHours() + time;
    if (hours < 0) {
        hours = 24 + hours
        weekday -= 1;
        date -= 1;
    }
    else if (hours > 24) {
        let timeAfter24 = hours - 24;
        hours = 0 + timeAfter24;
        weekday += 1;
        date += 1;
    }
    if (hours < 10 && hours >= 0) {
        hours = "0" + hours 
    }
    const localData = `${hours}:${minutes} - ${weekdays[weekday]}, ${date} ${moths[month]} ${year}`
    return localData
}

function secondsToHours (Timezone) {
    let hour = Timezone / 3600
    return hour
}

function replaceUnknownclass(Element, defaultClass, newClass) {
    Element.removeAttribute("class")
    Element.classList.add(defaultClass)
    Element.classList.add(newClass)
}

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

async function getFetchData(api) {
    let response = await fetch(api)
    let data = await response.json()
    return data
}



// on enterclick:
    // animation on :overall weather + termperature + feels like + humidity + windiness + cloudiness + city, country + date
        //first animation (before fetch displayed): translate up / roll up -> than hide
        //second animation (after ftch displayed first done): translate  up fro/ roll up from hidden


        //morgen: animation in factory funciton setzten.