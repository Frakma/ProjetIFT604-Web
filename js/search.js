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
