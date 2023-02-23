var searchBtnEl = document.querySelector("#searchBtn");
var clearBtnEl = document.querySelector("#clear-button");
var cityInfoEl = document.querySelector("#city-info");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var uvIndexEl = document.querySelector("#uv-index");
var apiKey = "2efa42872fdfe44cc2d10f0d272593c5";

function getCurrentWeather(searchInput) {
  var searchInput = document.querySelector("#search-id").value;
  var requestCurrentURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInput +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(requestCurrentURL)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

searchBtnEl.addEventListener("click", getCurrentWeather);
