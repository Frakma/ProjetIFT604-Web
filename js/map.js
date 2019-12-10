var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('div-map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 10,
    controlSize: 24
  });

  setLocation()
}

function setLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(updateLocationMap);
  }
}

function updateLocationMap(position)
{
  map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
}
