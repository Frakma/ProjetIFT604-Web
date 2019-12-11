var artistes = []

function artistetoDOMElement(artiste)
{
  var element = document.createElement("li")

  element.setAttribute("class","list-group-item d-flex justify-content-between align-items-center")

  // récupérer le nom de l'artiste
  var elementText = document.createTextNode("Artiste")

  element.appendChild(elementText)

  var span = document.createElement("span")

  var check = document.createElement("input")
  check.setAttribute("type","checkbox")

  // checker si preférences ou pas
  check.checked = true

  span.appendChild(check)
  element.appendChild(span)

  return element
}

function updateListArtistes(liste)
{
  var listeGroupElement = $("#listeArtistesPreferences")

  listeGroupElement.empty()

  for(var i=0; i<20; i++)
  {
    listeGroupElement[0].appendChild(artistetoDOMElement(null))
  }
}

function savePreferences()
{
  //TODO faire une requête
  setTimeout(function()
  {
    alert("Préférences sauvegardées")
    $("#modalPreferences").modal('toggle')
  }
  ,2000);
}
