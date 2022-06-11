function enterDate(event) {
  let now = new Date();
  let currentTime = document.querySelector("#current-time");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}
enterDate();

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  let city = document.querySelector("#enterCity");
  city.innerHTML = `${cityInput.value}`;
  retrievePosition(cityInput.value);
}
let form = document.querySelector("#city-enter");
form.addEventListener("submit", enterCity);

function fToC(cTemp) {
  return Math.round((cTemp * 9) / 5 + 32);
}
function cToF(fTemp) {
  return Math.round(((fTemp - 32) * 5) / 9);
}

function tempCelc(event) {
  event.preventDefault();
  temp = document.querySelector("#temperature").innerHTML;
  let currentCelc = fToC(temp);
  temperature.innerHTML = currentCelc;
}
let followlink = document.querySelector("#celcium-link");
followlink.addEventListener("click", tempCelc);

function tempFahr(event) {
  event.preventDefault();
  tempF = document.querySelector("#temperature").innerHTML;
  let currentFahr = cToF(tempF);
  temperature.innerHTML = currentFahr;
}
let followFahr = document.querySelector("#fahr-link");
followFahr.addEventListener("click", tempFahr);

function showWeather(response) {
  let temperature = document.querySelector("#temperature");
  let temperatureCurr = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#picture").innerHTML =
    response.data.weather[0].main;
  temperature.innerHTML = `${temperatureCurr}`;
  let cityN = document.querySelector("#enterCity");
  cityN.innerHTML = `${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "bab9bfb55a175358d00cbd1bf54c2461";
  // let lat = position.coords.latitude;
  //let lon = position.coords.longitude;
  let cityInput = document.querySelector("#city-search");

  let units = "metric";
  //let cityName = document.querySelector("#city-search");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${position}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function retrievePositionCurr(position) {
  let apiKey = "bab9bfb55a175358d00cbd1bf54c2461";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePositionCurr);
}

let button = document.querySelector("#place");
button.addEventListener("click", getCurrentPosition);

