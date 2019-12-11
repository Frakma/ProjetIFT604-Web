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
  divInfos.setAttribute("class","collapse p-3")
  divInfos.setAttribute("id",idElement)

  var datesElement = document.createElement("h5")
  datesElement.appendChild(document.createTextNode(start+" - "+end))

  var descriptionElement = document.createElement("p")
  descriptionElement.appendChild(document.createTextNode(description))
  descriptionElement.setAttribute("class","m-0")

  divInfos.appendChild(datesElement)
  divInfos.appendChild(descriptionElement)

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

    // à enlever, juste pour simuler le chargement
    setTimeout(function()
    {
      searchButton.prop("disabled", false);
      searchButton[0].setAttribute("class", "btn btn-primary btn-block");
      searchButton.text("Rechercher")

      var liste = JSON.parse("[{\"name\": \"Festival en tarbarnak\",\"description\": \"Des trucs de malades++\",\"start_time\": \"debut\",\"end_time\": \"fin\",\"place_latitude\": \"45.2584187\",\"place_longitude\": \"-71.8791103\"},{\"name\": \"Festival en tarbarnak\",\"description\": \"Des trucs de malades++\",\"start_time\": \"debut\",\"end_time\": \"fin\",\"place_latitude\": \"45.4584187\",\"place_longitude\": \"-71.8691103\"},{\"name\": \"Festival en tarbarnak\",\"description\": \"Des trucs de malades++\",\"start_time\": \"debut\",\"end_time\": \"fin\",\"place_latitude\": \"45.3584187\",\"place_longitude\": \"-71.8891103\"}]")

      updateListEvents(liste)
      updateMarkerEvents(liste)

      alert("Recherche réussie")
    }
    ,1000);
}
