onload = function() {
  var homeUrl = "https://beta-rock.newspring.cc/attendedcheckin";
  var currentUrl = "";
  var webview = document.querySelector("webview");
  var indicator = document.querySelector("#url-indicator");
  var versionIndicator = document.querySelector("#version-indicator");
  var batteryLevel = document.querySelector("#battery-status");
  var chargeStatus = document.querySelector("#charge-status");

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

  navigator.getBattery().then(function(battery) {
    // Update Battery Info on Initial Load
    updateChargeInfo();
    updateLevelInfo();

    // Event Listeners for Charge & Level Changes
    battery.addEventListener('chargingchange', function(){
      updateChargeInfo();
      updateLevelInfo(); // Remove This
    });

    battery.addEventListener('levelchange', function(){
      updateLevelInfo();
    });

    // Update Battery Charge Status
    function updateChargeInfo(){
      if (battery.charging) {
        chargeStatus.classList.add('fa');
        chargeStatus.classList.add('fa-bolt');
      } else {
        chargeStatus.classList.remove('fa');
        chargeStatus.classList.remove('fa-bolt');
      }
    }

    // Update Battery Level
    function updateLevelInfo(){
      batteryLevel.classList.remove('fa-battery-0','fa-battery-1','fa-battery-2','fa-battery-3');

      if (battery.level < .20) {
        batteryLevel.classList.add('fa-battery-0');
      } else if (battery.level >= .20 && battery.level < .40) {
        batteryLevel.classList.add('fa-battery-1');
      } else if (battery.level >= .40 && battery.level < .60) {
        batteryLevel.classList.add('fa-battery-2');
      } else if (battery.level >= .60 && battery.level < .80) {
        batteryLevel.classList.add('fa-battery-3');
      } else if (battery.level >= .80) {
        batteryLevel.classList.add('fa-battery-4');
      }
    };

  });
};