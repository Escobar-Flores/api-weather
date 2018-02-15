'use strict';

// Obtener ubicación actual de usuario

function initMap() {
  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(functionSuccess, functionError);
    }
  };

  document.getElementById('btn').addEventListener('click', search);

  var myLatit = void 0,
      myLongit = void 0;
  var functionSuccess = function functionSuccess(position) {
    myLatit = position.coords.latitude;
    myLongit = position.coords.longitude;

    console.log(myLatit);
    console.log(myLongit);

    localStorage.setItem('Latitud', myLatit);
    localStorage.setItem('Longitud', myLongit);

    window.location.href = 'views/daily/index.html';
  };

  var functionError = function functionError(error) {
    alert('Tenemos un problema con encontrar tu ubicación');
  };
};