onload = function() {
  var homeUrl = "https://beta-rock.newspring.cc/attendedcheckin";
  var currentUrl = "";
  var webview = document.querySelector("webview");
  var indicator = document.querySelector("#url-indicator");
  var versionIndicator = document.querySelector("#version-indicator");

  document.querySelector("#home").onclick = function() {
    webview.stop();
    webview.clearData( { since: 0 }, {
      appcache: true,
      cache: true,
      cookies: true,
      fileSystems: true,
      indexedDB: true,
      localStorage: true,
      webSQL: true
    }, function () {
      webview.className += " loading"
      webview.src = homeUrl;
    } );
  };

  document.querySelector("#reload").onclick = function() {
    webview.stop();
    webview.clearData( { since: 0 }, {
      appcache: false,
      cache: true,
      cookies: false,
      fileSystems: false,
      indexedDB: false,
      localStorage: false,
      webSQL: false
    }, function () {
      webview.className += " loading"
      webview.reload();
    } );
  };

  var updateClock = function ()
  {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();

      var ampm = h >= 12 ? "pm" : "am";
      h = h % 12;
      h = h > 0 ? h : 12;

      if (m < 10)
      {
          m = "0" + m;
      }

      document.getElementById("clock").innerHTML = h + ":" + m + " " + ampm;
      setTimeout(updateClock, 1000);
  };

  webview.addEventListener("loadstart", function (e) {
    if(e.isTopLevel) {
      currentUrl = e.url;
      indicator.innerHTML = "Loading " + currentUrl;
    }
  });

  webview.addEventListener("loadstop", function (e) {
    indicator.innerHTML = currentUrl;
    webview.className = webview.className.replace("loading", "");
  });

  webview.src = homeUrl;
  versionIndicator.innerHTML = "v" + chrome.runtime.getManifest().version;
  updateClock();
};
