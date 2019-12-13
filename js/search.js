var ids = 0

function eventJSONToDOMElement(event)
{
  var name = event["name"]
  var start = event["start_time"]
  var end = event["end_time"]
  var description = event["description"]

  var idElement = "event"+ ids++

  var div = document.createElement("div")
  var listeGroupItemElement = document.createElement("a")
  listeGroupItemElement.setAttribute("class","list-group-item list-group-item-action")
  listeGroupItemElement.setAttribute("data-toggle","collapse")
  listeGroupItemElement.setAttribute("data-target","#"+idElement)

  var text = document.createTextNode(name)

  listeGroupItemElement.appendChild(text)

  var divInfos = document.createElement("div")
  divInfos.setAttribute("class","collapse")
  divInfos.setAttribute("id",idElement)

  var divPadding = document.createElement("div")
  divPadding.setAttribute("class","p-3")

  divInfos.appendChild(divPadding)

  var datesElement = document.createElement("h5")
  datesElement.appendChild(document.createTextNode(start+" - "+end))

  var descriptionElement = document.createElement("p")
  descriptionElement.appendChild(document.createTextNode(description))
  descriptionElement.setAttribute("class","m-0")

  divPadding.appendChild(datesElement)
  divPadding.appendChild(descriptionElement)

  div.appendChild(listeGroupItemElement)
  div.appendChild(divInfos)

  return div
}

function updateListEvents(liste)
{
  // update la liste
  var listeGroupElement = $("#eventListGroup")
  listeGroupElement.empty()

  for(var i=0; i<liste.length; i++)
  {
    listeGroupElement[0].appendChild(eventJSONToDOMElement(liste[i]))
  }
}

function makeSearch()
{
    var searchButton = $("#searchButton")

    searchButton.prop("disabled", true);
    searchButton[0].setAttribute("class", "progress-bar-striped progress-bar-animated btn btn-primary btn-block");
    searchButton.text("Recherche en cours ..")

    var dateDebutInput = $("#dateDebutInput")[0].value
    var dateFinInput = $("#dateFinInput")[0].value

    var dateDebutText
    var dateFinText
    var dateD
    var dateF

    if (dateDebutInput != "")
      dateD = new Date(dateDebutInput)
    else
      dateD = new Date()

    if (dateFinInput != "")
      dateF = new Date(dateFinInput)
    else
      dateF = new Date()

    dateDebutText = dateD.getFullYear()+ ("0"+ (dateD.getUTCMonth()+1)).slice(-2) +  ("0"+ (dateD.getUTCDate())).slice(-2) + "00"
    dateFinText = dateF.getFullYear()+ ("0"+ (dateF.getUTCMonth()+1)).slice(-2) +  ("0"+ (dateF.getUTCDate())).slice(-2) + "00"

    var lat = map.getCenter().lat()
    var zoom = map.getZoom()
    metersPerPx = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom)

    var searchParams = {
      center: map.getCenter().lat()+","+map.getCenter().lng(),
      date:dateDebutText+"-"+dateFinText,
      distance:metersPerPx*$("#div-map")[0].clientWidth

    }

    sw.done.then(_ => {
      sw.send({action: msg.EVENTS, opt: 'all', optData:searchParams}).then(list => {
          json = JSON.parse(list)
          console.log(json)
      });
    }).catch(e => {
        console.error("service worker failed. :"+e);
    });

    // requête -> centre latitude,longitude
    //            distance int
    //            date YYYYMMDD00-YYYYMMDD00
    //            keywords fjkofez,fezjiofezj,fezfezjio,fzejkz
    // à enlever, juste pour simuler le chargement
    setTimeout(function()
    {
      searchButton.prop("disabled", false);
      searchButton[0].setAttribute("class", "btn btn-primary btn-block");
      searchButton.text("Rechercher")

      var liste = JSON.parse("[{\"name\": \"Festival en tarbarnak\",\"description\": \"Des trucs de malades++\",\"start_time\": \"debut\",\"end_time\": \"fin\",\"place_latitude\": \"45.384021\",\"place_longitude\": \"-71.9238079\"},{\"name\": \"Festival en criss\",\"description\": \"Des trucs de malades++\",\"start_time\": \"debut\",\"end_time\": \"fin\",\"place_latitude\": \"45.365496\",\"place_longitude\": \"-71.850052\"},{\"name\": \"Festival en ostie\",\"description\": \"Des trucs de malades++\",\"start_time\": \"debut\",\"end_time\": \"fin\",\"place_latitude\": \"45.515000\",\"place_longitude\": \"-71.816500\"}]")

      updateListEvents(liste)
      updateMarkerEvents(liste)

      alert("Recherche réussie")
    }
    ,1000);
}
