var sw;
const menu = {
    HOME: "home"
};

/**
 * Appelée lors du chargement de la page principale.
 * Lance la procédure d'initialisation du service worker.
 */
function init() {
  sw = new swh("sw.js")
  sw.done.then(_ => {
    initMap()

  }).catch(e => {
      console.error("service worker failed. :"+e);
  });

  artistes = JSON.parse("[{\"name\": \"Quelque chose\",\"isChoosen\": true},{\"name\": \"Autre chose\",\"isChoosen\": true},{\"name\": \"Encore autre chose\",\"isChoosen\": false}]")

  updateListEvents(null)
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
