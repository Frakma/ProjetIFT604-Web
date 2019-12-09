// Cookies.set('testCookie', 'true', { expires: 7 });

function SetCookie (name, value) {
  var argv = SetCookie.arguments;
  var argc = SetCookie.arguments.length;
  var expires = (argc > 2) ? argv[2] : null;
  var path = (argc > 3) ? argv[3] : null;
  var domain = (argc > 4) ? argv[4] : null;
  var secure = (argc > 5) ? argv[5] : false;
  document.cookie = name + "=" + escape(value) +
    ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
    ((path == null) ? "" : ("; path=" + path)) +
    ((domain == null) ? "" : ("; domain=" + domain)) +
    ((secure == true) ? "; secure" : "");
    console.log("expires: " + expires + " path: " + path + " domain: " + domain + " secure: " + secure);
}

function getCookieVal(offset) {
  var endStr = document.cookie.indexOf (";", offset);
  if (endStr == -1) endStr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endStr));
}

function GetCookie (name) {
  var arg = name + "=";
  var argLength = arg.length;
  var cookieLength = document.cookie.length;
  var i = 0;
  while (i < cookieLength) {
    var j = i + argLength;
    if (document.cookie.substring(i, j) == arg) {
      return getCookieVal(j);
    }
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) {
      break;
    }
  }
  return null;
}
