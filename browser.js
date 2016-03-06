onload = function() {
  var homeUrl = "https://checkin.newspring.cc/";
  var currentUrl = "";
  var webview = document.querySelector("webview");
  var indicator = document.querySelector("#url-indicator");

  document.querySelector("#home").onclick = function() {
    webview.src = homeUrl;
  };

  document.querySelector("#reload").onclick = function() {
    webview.reload();
  };

  webview.addEventListener("loadstart", function (e) {
    if(e.isTopLevel) {
      currentUrl = e.url;
      indicator.innerHTML = "Loading " + currentUrl;
    }
  });

  webview.addEventListener("loadstop", function (e) {
    indicator.innerHTML = currentUrl;
  });

  webview.src = homeUrl;
};
