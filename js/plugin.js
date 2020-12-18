
// All the Plugin information here is provided by Wind.com/dooc/ // 


	// Windy API modules are imported via '@windy/nameOfModule'
	import map from '@windy/map'
	import interpolator from '@windy/interpolator'
	import _ from '@windy/utils'
	import store from '@windy/store'
	import bcast from '@windy/broadcast'
    import picker from '@windy/picker'
    import $ from '@windy/$'

    let strt=document.createElement("div");
        strt.innerHTML="Place picker,  then click here or hit space to collect <br>wind/temp/humidity at different levels.";
        strt.id="start-button";
        strt.addEventListener("click",startReading);
    $('#bottom').appendChild(strt);

    let ols=["wind","temp","rh","dewpoint"];
    picker.on("pickerOpened",e=>{pickerpos={lat:e.lat,lon:e.lon}; });
    picker.on("pickerMoved", e=>{pickerpos={lat:e.lat,lon:e.lon}; });

    let lvls=store.get("availLevels");
    let wData= ols.map(e=>{return{"ol":e,"lvls":lvls.map(e2=>{return{"lvl":e2,"val":""}})   }});
    let l=0,o=0;
    let lvlCur, olCur;
    let lvlBaseline, olBaseline;
    let listen=false;
    let pickerpos;

    bcast.on("redrawFinished",params=>{
        lvlCur=params.level;
        olCur=params.overlay;
        if (listen)readValues();
    });

    let di=L.divIcon({
        html:`<div   style="position:absolute; border-left:1px solid black; top:-220px;height:220px;">
            <div id="wxdata" class="wxd" ></div>
            <div id="wxdata-lvl" class="wxd" style="left:-35px; width:33px; padding-left:2px;">
                <div style="text-decoration:underline; font-size:10px;">Levels</div>
                ${lvls.join("<br>")}
            </div>
            <div style="position:absolute; left:-4px; top:216px; background-color:white; width:8px; height:8px; border-radius:4px;"></div>
            </div>`
        ,iconAnchor:[0,0]
    });
    let marker=L.marker([0,0],{icon:di});

    function startReading(){
        if (pickerpos && map.getBounds().contains([pickerpos.lat,pickerpos.lon])){
            lvlBaseline=lvlCur=store.get("level");  olBaseline=olCur=store.get("overlay");
            l=0;o=0;
            listen=true;
            readValues();
            bcast.fire('rqstClose','picker');
            marker.setLatLng(pickerpos);
            if(!map.hasLayer(marker))marker.addTo(map);
            $("#wxdata").innerHTML="";
        }
    }

    document.onkeypress=k=>{if(k.code=="Space")startReading()}

    function readValues(){
        if (ols[o]==olCur){
                if (lvls[l]==lvlCur){
                    let oo=o; let ll=l;
                    interpolator(ip=>{
                        wData[oo].lvls[ll].val=ip(pickerpos);

                            ////fill marker
                            if (!ll){
                                wData[oo].div= document.createElement("div");
                                wData[oo].div.style.display="inline-block";
                                wData[oo].div.style.verticalAlign="top";
                                wData[oo].div.style.padding="0px 2px";
                                wData[oo].div.innerHTML=`<span style="text-decoration:underline;font-size:10px;">${wData[oo].ol=="dewpoint"?"dew P":wData[oo].ol}</span><br>`;
                                $("#wxdata").appendChild(wData[oo].div);
                            }
                            let s="";
                            switch (wData[oo].ol){
                                case "wind":
                                    let w=_.wind2obj(wData[oo].lvls[ll].val);
                                    s=w.wind.toFixed(1)+"m/s "+w.dir+"&#176;";
                                break;
                                case "temp": case "dewpoint":
                                    s=(wData[oo].lvls[ll].val[0]-273.15).toFixed(1);
                                break;
                                case "rh":
                                    s=(wData[oo].lvls[ll].val[0]).toFixed(1);
                                break;
                            }
                            wData[oo].div.innerHTML+=s+"<br>";
                            ////
                    });

                    l++; if (l>=lvls.length){l=0;o++};
                    if (o<ols.length)setTimeout(readValues,50);
                    else {
                        listen=false;
                        store.set("level",lvlBaseline);
                        store.set("overlay",olBaseline);
                        console.log("WEATHER DATA:",wData);
                    }
                } else store.set("level",lvls[l]);
        } else store.set("overlay",ols[o]);
    }


