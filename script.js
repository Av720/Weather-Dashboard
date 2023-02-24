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
var currentIconEl = document.querySelector("#current-icon");
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

      var iconCode = data.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
      currentHeaderEl.textContent = data.name + " " + today;
      currentIconEl.setAttribute("src", iconUrl);
      // var iconDisplay = document.createElement("img");
      // iconDisplay.textContent =
      // currentHeaderEl.appendChild(iconDisplay);
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

        for (i = 0; i < 5; i++) {
          var date = new Date(
            data.list[(i + 1) * 8 - 1].dt * 1000
          ).toLocaleDateString();
          var iconCode = data.list[(i + 1) * 8 - 1].weather[0].icon;
          var iconUrl =
            "https://openweathermap.org/img/wn/" + iconCode + ".png";
          var temp = data.list[(i + 1) * 8 - 1].main.temp;
          var wind = data.list[(i + 1) * 8 - 1].wind.speed;
          var humidity = data.list[(i + 1) * 8 - 1].main.humidity;
          // console.log(date);
          // console.log(wind);
          // console.log(humidity);
          $(".date" + i).html(date);
          $(".icon" + i).html("<img src=" + iconUrl + ">");
          $(".temperature" + i).html("Temp: " + temp + "&#8457");
          $(".wind" + i).html("Wind: " + wind + " MPH");
          $(".humidity" + i).html("Humidity: " + humidity + "%");
        }
      });
  }

  function addButton(data) {
    var buttonEl = document.createElement("button");
    buttonEl.textContent = data.name;

    historyList.appendChild(buttonEl);
  }
}
searchBtnEl.addEventListener("click", getCurrentWeather);

//searchBtnEl.addEventListener("click", function() {
//  var storedCity = document.querySelector("#search-id");
//  localStorage.getItem(storedCity, getCurrentWeather());
//});
