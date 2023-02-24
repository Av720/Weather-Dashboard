var searchBtnEl = document.querySelector("#searchBtn");
var clearBtnEl = document.querySelector("#clear-button");
var cityInfoEl = document.querySelector("#city-info");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var uvIndexEl = document.querySelector("#uv-index");
var apiKey = "2efa42872fdfe44cc2d10f0d272593c5";
var currentDisplay = document.querySelector(".current-display");
var currentHeaderEl = document.querySelector("#current-header");
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumEl = document.querySelector("#current-humidity");
var historyList = document.querySelector(".search-history-list");

function getCurrentWeather(searchInput) {
  var today = dayjs().format("MM/DD/YYYY");
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

      currentHeaderEl.textContent = data.name + " " + today;
      currentTempEl.textContent = "Temp: " + data.main.temp + "°F";
      currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";
      currentHumEl.textContent = "Humidity: " + data.main.humidity + "%";

      getFutureWeather(data);
      addButton(data);
    });

  function getFutureWeather(data) {
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var requestFutureUrl =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey +
      "&units=imperial";
    fetch(requestFutureUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      
        // for(var i = 0; i < 5; i ++){
        // var date = new Date(data.list[((i+1)*8)].dt_txt);
        // var dayOne = dayjs(data.list[0].dt_txt).format("ddd, MMM D");
        // var temp = $(".first-temperature").text("Temp: " + data.list[i].main.temp + " F");
        // $(".first-date").html("<h6>" + dayOne + "</h6>");
        // $(".first-icon").html("<img src='https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        // $(".first-wind").text("Wind: " + data.list[i].wind.speed + "MPH")
        // $(".first-humidity").text("Humidity: " + data.list[i].main.humidity + "%");
        // }
      });
    }

  
    function addButton(data) {
    var buttonEl = document.createElement("button");
    buttonEl.textContent = data.name;


    historyList.appendChild(buttonEl);
  }
}
searchBtnEl.addEventListener("click", function() {
  var storedCity = document.querySelector("#search-id");
  localStorage.getItem(storedCity, getCurrentWeather());
});
