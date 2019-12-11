function notificationTextToDOMAlert(text)
{
  var element = document.createElement("div")

  element.setAttribute("class","alert text-white shadow-lg bg-success alert-dismissible fade show")
  element.setAttribute("role","alert")

  eventElementText = document.createTextNode(text)

  element.appendChild(eventElementText)

  var div = document.createElement('div')
  div.innerHTML = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\" class=\"text-white\">&times;</span></button>".trim()

  element.appendChild(div.firstChild)

  return element
}

function notify(text)
{
  var div = document.getElementById("notificationDiv")
  var notif = notificationTextToDOMAlert(text)
  div.insertBefore(notif, div.firstChild)
  setTimeout(function() {
      $(notif).alert('close');
  }, 4000);
}
