function eventJSONToDOMElement(event)
{
    var listeGroupItemElement = document.createElement("a")
    listeGroupItemElement.setAttribute("class","list-group-item list-group-item-action")

    var text = document.createTextNode("Salut")

    listeGroupItemElement.appendChild(text)

    return listeGroupItemElement
}

function updateListEvents(liste)
{
  // update la map

  // update la liste

  var listeGroupElement = $("#eventListGroup")

  listeGroupElement.empty()

  for(var i=0; i<10; i++)
  {
    listeGroupElement[0].appendChild(eventJSONToDOMElement(null))
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

      updateListEvents(null)
      updateMarkerEvents(null)
    }
    ,3000);
}
