'use strict';

// funcion que obtiene el clima :
var daysWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
function getWeather(data) {
  var route = data.currently;
  // utilizando la data
  var icon = route.icon;
  var template = '<img src="../../assets/images/' + icon + '.png" alt="" class="img-size">';
  var summary = '"' + route.summary + '"';
  var speedWind = route.windSpeed + ' m/s';
  var humidity = route.humidity * 100 + ' %';
  var uvIndex = route.uvIndex;
  var maxTemp = ((route.temperature - 32) / 1.8).toFixed(0) + '°';
  var pressure = route.pressure + ' Pa';
  // llamando los elementos del dom y agregando los valores de la data:
  $('.max-temp-js').text(maxTemp);
  $('.summary-js').text(summary);
  $('.speed-wind-js').text(speedWind);
  $('.humidity-js').text(humidity);
  $('.uv-index-js').text(uvIndex);
  $('.pressure-js').text(pressure);
  $('.container-image-js').append(template);
  // para el clima semanal:


  $('.week-js').on('click', function () {
    var imageDaily = $('.image-daily-js');
    var icon2 = data.daily.icon;
    console.log(icon2);
    var template = '<img src="../../assets/images/' + icon2 + '.png" alt="" class="img-size">';
    imageDaily.append(template);
    var array = data.daily.data.slice(0, 7);
    console.log();
    array.forEach(function (element, index) {
      var container = $('.container-days-js');
      var template = '<p class="text-white text-center d-flex justify-content-between"> <strong> <img src="../../assets/images/' + element.icon + '.png" alt="" class="icon-size"> ' + daysWeek[index] + '</strong>  <strong> ' + ((element.apparentTemperatureMin - 32) / 1.8).toFixed(0) + '\xB0 - ' + ((element.apparentTemperatureMax - 32) / 1.8).toFixed(0) + '\xB0</strong></p>';
      container.append(template);
    });
  });
};
// redireccionando vista :
$('.redirection-js').on('click', function () {
  window.location.href = '../weekly/index.html';
});

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

$(document).ready(function () {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var apiLinkDS = 'https://api.darksky.net/forecast/bcfb332dbff54b0b470a2c8cbad6e360/' + localStorage.getItem('Latitud') + ',' + localStorage.getItem('Longitud') + '?lang=es';
  $.ajax({
    url: proxy + apiLinkDS,
    success: getWeather
  });
});