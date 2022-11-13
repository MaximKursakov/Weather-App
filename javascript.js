const inputCity = document.querySelector("#inputCity")
const cityButton = document.querySelector(".cityButton")
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const moths = ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
const apiURL = "https://api.openweathermap.org/data/2.5/weather?"
const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );
let humidityArray = []

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

getFetchData("https://api.openweathermap.org/data/2.5/weather?q=munich&appid=8d1eb409ef57e4fe5939de84f94bcd77").then(res => {
    displayFetchedData(res)
})

navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation, {
        enableHighAccuracy : true
    })

function successLocation(position) {
    console.log(position.coords.latitude)
    getFetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=8d1eb409ef57e4fe5939de84f94bcd77`).then(res => {
    displayFetchedData(res)
})
}

function errorLocation() {
    console.log("location fetching disabled")
}

inputCity.addEventListener("keypress", (e) =>{
    if (13 === e.keyCode) {
        const element1 = document.querySelector(".weather")
        //
        element1.classList.add("slide-up-old")
        setTimeout(() => {
            element1.classList.remove("slide-up-old")
        }, 300);
    
    const apiCity = inputCity.value;
    const apiKey = "8d1eb409ef57e4fe5939de84f94bcd77";
    const apiCall = `${apiURL}q=${apiCity}&appid=${apiKey}`;
    getFetchData(apiCall).then(res => {
        displayFetchedData(res)
    }
    )
    .catch(() => {
        console.log("Error: city not found")
    })
    setTimeout(() => {
        element1.classList.remove("slide-up-new")
    }, 300);
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

function displayFetchedData(res) {
    {
        removePastQuerry()
        const localTimeAndDate = getLocalData(secondsToHours(res.timezone))
        const generalWeather = res.weather[0].main
        if (generalWeather === "Clear") {
            replaceUnknownclass(".content", "content", "backgroundSunny")
            swapIcon("fa-sun")
        }
        else if (generalWeather === "Clouds") {
            replaceUnknownclass(".content", "content", "backgroundCloudy")
            swapIcon("fa-cloud")
        }
        else if (generalWeather === "Rain") {
            replaceUnknownclass(".content", "content", "backgroundRainy")
            swapIcon("fa-showers-heavy")

        }
        else if (generalWeather === "Snow") {
            replaceUnknownclass(".content", "content", "backgroundSnow")
            swapIcon("fa-snow")

        }
        else if (generalWeather === "Drizzle") {
            replaceUnknownclass(".content", "content", "backgroundDrizzle")
            swapIcon("fa-cloud-drizzle")

        }
        else if (generalWeather === "Thunderstorm") {
            replaceUnknownclass(".content", "content", "backgroundThunderstorm")
            swapIcon("fa-cloud-bolt")
        }
        addElement("div", "city", res.name, ".cityInfo" );
        addElement("div", "country", regionNames.of(res.sys.country), ".cityInfo" );
        addElement("div", "date", localTimeAndDate, ".localTime" );
        addElement("div", "weather", res.weather[0].description, ".overallWeather").addSecondClass("slide-up-new")
        addElement("div", "temperature", `${KelvinToCelsius(res.main.temp)}°`, ".temperatureInfo" );
        addElement("div", "feel", `${KelvinToCelsius(res.main.feels_like)}°`, ".temperatureInfo")
        addElement("div", "humidity", res.main.humidity, ".humidityInfo").animateNumbers(humidityArray)
        addElement("div", "windiness", res.wind.speed, ".windInfo")
        addElement("div", "cloudiness", res.clouds.all, ".cloudInfo")
    }
}

function removeDisplay(parent) {
    const element = document.querySelector(parent)
    while( element.hasChildNodes() ){
        element.removeChild(element.lastChild);
    }
}
function removePastQuerry() {
        removeDisplay(".cityInfo");
        removeDisplay(".localTime");
        removeDisplay(".overallWeather");
        removeDisplay(".temperatureInfo");
        removeDisplay(".humidityInfo");
        removeDisplay(".windInfo");
        removeDisplay(".cloudInfo");
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
    const el = document.querySelector(Element)
    el.removeAttribute("class")
    el.classList.add(defaultClass)
    el.classList.add(newClass)
}

function swapIcon(iconClass){addElement("i", "fa-solid", "", ".overallWeather").addSecondClass(iconClass)};

function addElement(elementType, elementClass, elementText, elementParent) {
    const el = document.createElement(elementType)
    el.classList.add(elementClass)
    el.innerHTML = elementText
    const parent = document.querySelector(elementParent)
    parent.append(el)
    return {
        addSecondClass(secondClass) {
            el.classList.add(secondClass)
        },
        animateNumbers(arrayName) {
            if (arrayName.length >= 2) {
            arrayName.splice(0, 1)
            }
            else {
            arrayName.push(elementText)
            }
            const StringToNumber = arrayName.map(str => {
            return Number(str);
            });
            if(StringToNumber[0] < StringToNumber[1]) {
            let myInterval = setInterval(() => {
            StringToNumber[0] += 1
            elementClass.innerHTML = StringToNumber[0]
            if(StringToNumber[0] === StringToNumber[1]) {
            clearInterval(myInterval)
            }
            }, 20);
            }else if (StringToNumber[0] > StringToNumber[1]){
            let myInterval = setInterval(() => {
            StringToNumber[0] -= 1
            elementClass.innerHTML = StringToNumber[0]
            if(StringToNumber[0] === StringToNumber[1]) {
            clearInterval(myInterval)
            }
            }, 20);
            }
            }
    }
}

function KelvinToCelsius (Kelvin) {
    const Temperature = Kelvin - 273.15
    return  Temperature.toFixed(0)
    
}

async function getFetchData(api) {
    let response = await fetch(api)
    if(!response.ok) {
        throw Error(response.statusText);
    }
    let data = await response.json()
    return data
}


