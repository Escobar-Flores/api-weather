
// funcion que obtiene el clima :
const daysWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
function getWeather(data) {
  let route = data.currently;
  // utilizando la data
  let icon = route.icon;
  let template = `<img src="../../assets/images/${icon}.png" alt="" class="img-size">`; 
  let summary = '"' + route.summary + '"';
  let speedWind = route.windSpeed + ' m/s';
  let humidity = (route.humidity * 100) + ' %';
  let uvIndex = route.uvIndex;
  let maxTemp = ((route.temperature - 32) / 1.8).toFixed(0) + '°';
  let pressure = route.pressure + ' Pa';
  // llamando los elementos del dom y agregando los valores de la data:
  $('.max-temp-js').text(maxTemp);
  $('.summary-js').text(summary);
  $('.speed-wind-js').text(speedWind);
  $('.humidity-js').text(humidity);
  $('.uv-index-js').text(uvIndex);
  $('.pressure-js').text(pressure);
  $('.container-image-js').append(template);
  // para el clima semanal:
  let imageDaily = $('.image-daily-js');
  let icon2 = data.daily.icon;
  console.log(icon2);
  let template2 = `<img src="../../assets/images/${icon2}.png" alt="" class="img-size">`;
  imageDaily.append(template2);
  let array = data.daily.data.slice(0, 7);
  console.log();
  array.forEach((element, index)=>{
    let container = $('.container-days-js');
    let template3 = `<p class="text-white text-center d-flex justify-content-between"> <strong> <img src="../../assets/images/${element.icon}.png" alt="" class="icon-size"> ${daysWeek[index]}</strong>  <strong> ${((element.apparentTemperatureMin - 32) / 1.8).toFixed(0)}° - ${((element.apparentTemperatureMax - 32) / 1.8).toFixed(0)}°</strong></p>`;
    container.append(template3);
  });
};
// redireccionando vistas :
$('.redirection-js').on('click', () => {
  window.location.href = '../weekly/index.html';
  weekly(data);
});

$('.back-js').on('click', () => {
  window.location.href = '../daily/index.html';
});


// Obtener ubicación actual de usuario

function initMap() {
  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(functionSuccess, functionError);
    };
  };

  
  document.getElementById('btn').addEventListener('click', search);
  
  let myLatit, myLongit;
  let functionSuccess = (position) => {
    myLatit = position.coords.latitude;
    myLongit = position.coords.longitude;

    localStorage.setItem('Latitud', myLatit);
    localStorage.setItem('Longitud', myLongit);

    window.location.href = 'views/daily/index.html';
  };
  
  let functionError = (error) => {
    alert('Tenemos un problema con encontrar tu ubicación');
  };
};

$(document).ready(function() {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var apiLinkDS = `https://api.darksky.net/forecast/bcfb332dbff54b0b470a2c8cbad6e360/${localStorage.getItem('Latitud')},${localStorage.getItem('Longitud')}?lang=es`;
  $.ajax({
    url: proxy + apiLinkDS,
    success: getWeather
  });
});