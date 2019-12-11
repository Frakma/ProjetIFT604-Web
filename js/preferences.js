var artistes = []

function artistetoDOMElement(artiste)
{
  var element = document.createElement("li")

  element.setAttribute("class","list-group-item d-flex justify-content-between align-items-center")

  // récupérer le nom de l'artiste
  var elementText = document.createTextNode(artiste["name"])

  element.appendChild(elementText)

  var span = document.createElement("span")

  var check = document.createElement("input")
  check.setAttribute("type","checkbox")

  // checker si preférences ou pas
  if (artiste["isChoosen"] == true)
    check.checked = true
  else
    check.checked = false

  span.appendChild(check)
  element.appendChild(span)

  return element
}

function updateListArtistes()
{
  var listeGroupElement = $("#listeArtistesPreferences")
  listeGroupElement.empty()

  for(var i=0; i<artistes.length; i++)
  {
    listeGroupElement[0].appendChild(artistetoDOMElement(artistes[i]))
  }
}

function openPreferences()
{
  updateListArtistes()
  $("#modalPreferences").modal('toggle')
}

function savePreferences()
{
  //TODO faire une requête

  // si la requête est okay
  var listeElement = $("#listeArtistesPreferences")
  for(var i=0; i<artistes.length; i++)
  {
    if (listeElement.children()[i].children[0].children[0].checked == true)
      artistes[i]["isChoosen"] = true
    else
      artistes[i]["isChoosen"] = false
  }

  $("#modalPreferences").modal('toggle')
  alert("Préférences sauvegardées")
}
