import CONFIG from "./configapi.js";
let place_name = "";
const apiKey = CONFIG.API_KEY;
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
