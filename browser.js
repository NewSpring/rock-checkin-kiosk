var homeUrl = "https://checkin.newspring.cc/";

onload = function() {
  var webview = document.querySelector("webview");
  webview.src = homeUrl;

  document.querySelector("#home").onclick = function() {
    webview.src = homeUrl;
  };

  document.querySelector("#reload").onclick = function() {
    webview.reload();
  };

  document.querySelector("#url-indicator").innerHTML = homeUrl;
};
