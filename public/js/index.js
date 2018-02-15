'use strict';

// funcion que obtiene el clima :

function getWeather(data) {
  var route = data.daily.data[0];
  // utilizando la data
  var icon = route.icon;
  var template = '<img src="../../assets/images/' + icon + '.png" alt="" class="img-size">';
  var summary = '"' + route.summary + '"';
  var speedWind = route.windSpeed + ' m/s';
  var humidity = route.humidity * 100 + ' %';
  var uvIndex = route.uvIndex;
  var maxTemp = ((route.apparentTemperatureMax - 32) / 1.8).toFixed(0) + '°';
  var pressure = route.pressure + ' Pa';
  // llamando los elementos del dom y agregando los valores de la data:
  $('.max-temp-js').text(maxTemp);
  $('.summary-js').text(summary);
  $('.speed-wind-js').text(speedWind);
  $('.humidity-js').text(humidity);
  $('.uv-index-js').text(uvIndex);
  $('.pressure-js').text(pressure);
  $('.container-image-js').append(template);
};

// Obtener ubicación actual de usuario

function initMap() {
  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(functionSuccess, functionError);
    };
  };

  document.getElementById('btn').addEventListener('click', search);

  var myLatit = void 0,
    myLongit = void 0;
  var functionSuccess = function functionSuccess(position) {
    myLatit = position.coords.latitude;
    myLongit = position.coords.longitude;

    localStorage.setItem('Latitud', myLatit);
    localStorage.setItem('Longitud', myLongit);

    window.location.href = 'views/daily/index.html';
  };

  var functionError = function functionError(error) {
    alert('Tenemos un problema con encontrar tu ubicación');
  };
};

$(document).ready(function() {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var apiLinkDS = 'https://api.darksky.net/forecast/bcfb332dbff54b0b470a2c8cbad6e360/' + localStorage.getItem('Latitud') + ',' + localStorage.getItem('Longitud') + '?lang=es';
  $.ajax({
    url: proxy + apiLinkDS,
    success: getWeather
  });
});