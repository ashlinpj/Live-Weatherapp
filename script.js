import CONFIG from "./configapi.js";
let place_name = "";

/*-----------API Keys------------ */
                      
const apiKey = CONFIG.API_KEY;

const apiKey_Ip =CONFIG.apiKey_Ip;

/*-------------------------------- */

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const button = document.querySelector(".search .search-btn");
const inputField = document.querySelector(".search .input");
const weather_icon = document.querySelector(".weather .weather-icon");
button.addEventListener("click", function () {
  place_name = inputField.value;
  checkWeather();
});

async function checkWeather() {
  const response = await fetch(apiUrl + place_name + `&appid=${apiKey}`);
  let data = await response.json();
  console.log(data);
  weather_icon.src = `images/${data.weather[0].main}.png`;
  document.querySelector(".city").innerText = data.name;
  document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = data.wind.speed + " km/h";
}

/*----------------Get City name from IP address------------------------*/  
async function getIpInfo() {
  const apiUrl_Ip = `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey_Ip}`;

  try {
    const response = await fetch(apiUrl_Ip);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.city.name; // Return the city name
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}
/*------------------------------------------------------------------- */

async function initialize() {
  place_name = await getIpInfo();
  if (place_name) {
    await checkWeather();
  }
}
initialize();
