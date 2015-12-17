var homeUrl = "https://beta-rock.newspring.cc/attendedcheckin";

onload = function() {
  var webview = document.querySelector("webview");
  webview.src = homeUrl;

  document.querySelector("#home").onclick = function() {
    webview.src = homeUrl;
  };

  document.querySelector("#reload").onclick = function() {
    webview.reload();
  };
};
