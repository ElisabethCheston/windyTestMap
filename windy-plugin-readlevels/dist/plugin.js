"use strict";

/**
 * This is main plugin loading function
 * Feel free to write your own compiler
 */
W.loadPlugin(
/* Mounting options */
{
  "name": "windy-plugin-readlevels",
  "version": "0.1.5",
  "author": "rittels",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rittels/wndy"
  },
  "description": "read weather data from different levels at specific picker pos",
  "displayName": "readlevels",
  "hook": "contextmenu"
},
/* HTML */
'',
/* CSS */
'.wxd{position:absolute;font-size:9px;top:-5px;color:white;border-radius:4px;background-color:rgba(0,0,0,0.7);white-space:nowrap}#start-button{position:absolute;margin-left:4px;background-color:rgba(0,0,0,0.5);cursor:pointer;top:-50px;padding:=3px}',
/* Constructor */
function () {
  var $ = W.require('$');

  var picker = W.require('picker');

  var bcast = W.require('broadcast');

  var store = W.require('store');

  var _ = W.require('utils');

  var interpolator = W.require('interpolator');

  var map = W.require('map');

  var strt = document.createElement("div");
  strt.innerHTML = "Place picker,  then click here or hit space to collect <br>wind/temp/humidity at different levels.";
  strt.id = "start-button";
  strt.addEventListener("click", startReading);
  $('#bottom').appendChild(strt);
  var ols = ["wind", "temp", "rh", "dewpoint"];
  picker.on("pickerOpened", function (e) {
    pickerpos = {
      lat: e.lat,
      lon: e.lon
    };
  });
  picker.on("pickerMoved", function (e) {
    pickerpos = {
      lat: e.lat,
      lon: e.lon
    };
  });
  var lvls = store.get("availLevels");
  var wData = ols.map(function (e) {
    return {
      "ol": e,
      "lvls": lvls.map(function (e2) {
        return {
          "lvl": e2,
          "val": ""
        };
      })
    };
  });
  var l = 0,
      o = 0;
  var lvlCur, olCur;
  var lvlBaseline, olBaseline;
  var listen = false;
  var pickerpos;
  bcast.on("redrawFinished", function (params) {
    lvlCur = params.level;
    olCur = params.overlay;
    if (listen) readValues();
  });
  var di = L.divIcon({
    html: "<div   style=\"position:absolute; border-left:1px solid black; top:-220px;height:220px;\">\n            <div id=\"wxdata\" class=\"wxd\" ></div>\n            <div id=\"wxdata-lvl\" class=\"wxd\" style=\"left:-35px; width:33px; padding-left:2px;\">\n                <div style=\"text-decoration:underline; font-size:10px;\">Levels</div>\n                ".concat(lvls.join("<br>"), "\n            </div>\n            <div style=\"position:absolute; left:-4px; top:216px; background-color:white; width:8px; height:8px; border-radius:4px;\"></div>\n            </div>"),
    iconAnchor: [0, 0]
  });
  var marker = L.marker([0, 0], {
    icon: di
  });

  function startReading() {
    if (pickerpos && map.getBounds().contains([pickerpos.lat, pickerpos.lon])) {
      lvlBaseline = lvlCur = store.get("level");
      olBaseline = olCur = store.get("overlay");
      l = 0;
      o = 0;
      listen = true;
      readValues();
      bcast.fire('rqstClose', 'picker');
      marker.setLatLng(pickerpos);
      if (!map.hasLayer(marker)) marker.addTo(map);
      $("#wxdata").innerHTML = "";
    }
  }

  document.onkeypress = function (k) {
    if (k.code == "Space") startReading();
  };

  function readValues() {
    if (ols[o] == olCur) {
      if (lvls[l] == lvlCur) {
        var oo = o;
        var ll = l;
        interpolator(function (ip) {
          wData[oo].lvls[ll].val = ip(pickerpos);

          if (!ll) {
            wData[oo].div = document.createElement("div");
            wData[oo].div.style.display = "inline-block";
            wData[oo].div.style.verticalAlign = "top";
            wData[oo].div.style.padding = "0px 2px";
            wData[oo].div.innerHTML = "<span style=\"text-decoration:underline;font-size:10px;\">".concat(wData[oo].ol == "dewpoint" ? "dew P" : wData[oo].ol, "</span><br>");
            $("#wxdata").appendChild(wData[oo].div);
          }

          var s = "";

          switch (wData[oo].ol) {
            case "wind":
              var w = _.wind2obj(wData[oo].lvls[ll].val);

              s = w.wind.toFixed(1) + "m/s " + w.dir + "&#176;";
              break;

            case "temp":
            case "dewpoint":
              s = (wData[oo].lvls[ll].val[0] - 273.15).toFixed(1);
              break;

            case "rh":
              s = wData[oo].lvls[ll].val[0].toFixed(1);
              break;
          }

          wData[oo].div.innerHTML += s + "<br>";
        });
        l++;

        if (l >= lvls.length) {
          l = 0;
          o++;
        }

        ;
        if (o < ols.length) setTimeout(readValues, 50);else {
          listen = false;
          store.set("level", lvlBaseline);
          store.set("overlay", olBaseline);
          console.log("WEATHER DATA:", wData);
        }
      } else store.set("level", lvls[l]);
    } else store.set("overlay", ols[o]);
  }
});