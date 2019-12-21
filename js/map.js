var map;
var markers_events = Array();

function initMap() {
  map = new google.maps.Map(document.getElementById('div-map'), {
    center: {lat: 45.384021, lng: -71.923807},
    zoom: 10,
    controlSize: 24
  });

  getLocation()
}

function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(updateLocationMap);
  }
}

function updateLocationMap(position)
{
  map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  // alert("La carte est maintenant centrée sur votre position actuelle")
}

function updateMarkerEvents(liste)
{
  clearMapMarkers()

  for (var i=0;i<liste.length;i++)
  {
    addMarker(liste[i])
  }
}

function addMarker(evenement)
{
  var myLatLng = {lat: parseFloat(evenement["latitude"]), lng: parseFloat(evenement["longitude"])}

  var infowindow = new google.maps.InfoWindow({
    content: "<div><h4>"+evenement["title"]+"</h4><h6>"+evenement["startTime"]+"</h6><p>"+evenement["url"]+"</p></div>"
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: evenement["title"]
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
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
