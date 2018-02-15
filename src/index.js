// Obtener ubicación actual de usuario

function initMap() {
  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(functionSuccess, functionError);
    }
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