var searchIdEl = document.querySelector("#search-id");
var searchBtnEl = document.querySelector("#searchBtn");
var clearBtnEl = document.querySelector("#clear-button");
var cityInfoEl = document.querySelector("#city-info");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var uvIndexEl = document.querySelector("#uv-index");
var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?";

function searchApi(searchIdEl) {
  if (!searchIdEl) {
    return;
  }
  var cityLatEl = $(this).attr("searchIdEl").q.lat;
  var cityLonEl = $(this).attr("searchIdEl").q.lon;
  var apiKey = "2efa42872fdfe44cc2d10f0d272593c5";

  requestUrl =
    requestUrl + cityLatEl + "=" + cityLonEl + "=" + "&appid=" + apiKey;
}
