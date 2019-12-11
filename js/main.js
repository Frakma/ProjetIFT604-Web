var sw;
const menu = {
    HOME: "home"
};

/**
 * Appelée lors du chargement de la page principale.
 * Lance la procédure d'initialisation du service worker.
 */
function init() {
  initMap()

  window.alert = function(message, fallback)
  {
    notify(message)
  }

  artistes = JSON.parse("[{\"name\": \"Paramore\",\"isChoosen\": true},{\"name\": \"Green Day\",\"isChoosen\": true},{\"name\": \"Maroon 5\",\"isChoosen\": false},{\"name\": \"Paramore\",\"isChoosen\": true},{\"name\": \"Paramore\",\"isChoosen\": true},{\"name\": \"Billy Talent\",\"isChoosen\": true},{\"name\": \"Paramore\",\"isChoosen\": true},{\"name\": \"Paramore\",\"isChoosen\": true}]")

  alert("Interface initialisée")
}

function loadMenuItem(menu_item){
    return new Promise((resolve, reject) => {
        switch (menu_item) {
            case menu.HOME: resolve(location.reload(false)); break;
            default: reject(false);
        }
    });

}

/*
used to get an array of GET parameters
same as $_GET in PHP
 */
function getParam() {
    let searchParams = new URLSearchParams(new URL(window.location.href).hash.substr(1));
    let params = [];
    for (let [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}

/*
this function will remove all GET parameters (or "#")
 */
function clearURL() {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
}

function getLocation() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(updateLocationText);
  }
}

function updateLocationText(position)
{
  $.get("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+position.coords.latitude+"&lon="+position.coords.longitude, function(data)
  {
    var text = data.address.road+", "+data.address.county+", "+data.address.state+", "+data.address.country
    $("#locationText").text(text)
  });

}
