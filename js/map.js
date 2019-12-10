var map;
var markers_events = Array();

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
  console.log(position)
  map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
}

function updateMarkerEvents(liste)
{
  clearMapMarkers()

  for (var i=0;i<10;i++)
  {
    addMarker(null)
  }
}

function addMarker(event)
{
  var myLatLng = map.getCenter()

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });

  markers_events.push(marker)
}

function clearMapMarkers()
{
  for (var i=0;i<markers_events.length;i++)
  {
    markers_events[i].setMap(null)
  }
  markers_events = Array();
}
