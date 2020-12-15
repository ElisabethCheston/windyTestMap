const options = {
    // Required: API key
    key: 'Ij2CVHcL4d5ByrXOrtQg71Abhm2gFLGO',

// Put additional console output
    verbose: true,
    // Optional: Initial state of the map
    lat: 63.45,
    lon: 17.52,
    zoom: 5,

};

windyInit(options, windyAPI => {
    const { picker, utils, broadcast } = windyAPI;

    picker.on('pickerOpened', latLon => {
        // picker has been opened at latLon coords
        console.log(latLon);

        const { lat, lon, values, overlay } = picker.getParams();
        // -> 48.4, 14.3, [ U,V, ], 'wind'
        console.log(lat, lon, values, overlay);

        const windObject = utils.wind2obj(values);
        console.log(windObject);
    });

    picker.on('pickerMoved', latLon => {
        // picker was dragged by user to latLon coords
        console.log(latLon);
    });

    picker.on('pickerClosed', () => {
        // picker was closed
    });

    // Wait since wather is rendered
    broadcast.once('redrawFinished', () => {
        picker.open({ lat: 62.45, lon: 17.52 });
        // Opening of a picker (async)
    });
});



var map = L.map('map').setView([62.45, 17.53], 5);

//  Array of markers //
    var markers = [
        //Kalix//
            ["spot", 65.8108770,23.6116663, "id1", "name", "BREVIKEN","windDirection","S/SW"],
            ["spot", 65.8130515,23.4892165, "id2", "name", "BODÖN","windDirection","N/NW"],
        //Luleå//
            ["spot", 65.6230793,22.0222872, "id3", "name", "STORSAND","windDirection","S/SW"],
            ["spot", 65.5456349,22.1564902, "id4", "name", "LULVIKSBADET","windDirection","NW"],
            ["spot", 65.5189811,22.1522248, "id5", "name", "LULHÄLLAN","windDirection","S/SW"],
            ["spot", 65.4982979,22.3689945, "id6", "name", "KLUBBVIKEN","windDirection","S"],
        //Skellefteå//
            ["spot", 64.7742422,21.1834173, "id7", "name", "STORSNÄCK","windDirection","N/NW"],
            ["spot", 64.7408877,21.2183383, "id8", "name", "SILLSKATAN","windDirection","S/SW"],
            ["spot", 64.5184790,21.5452258, "id9", "name", "VÅNÖREN","windDirection","S/SW"],
            ["spot", 64.4348443,21.6102720, "id10", "name", "BJURÖKLUBB EAST","windDirection","SE"],
            ["spot", 64.4362105,21.5805984, "id11", "name", "BJURÖKLUBB WEST","windDirection","SW"],
        //Umeå//
            ["spot", 63.6678316,20.0246587, "id12", "name", "LILLIS","windDirection"," S/SE"],
            ["spot", 63.6504034,19.9964010, "id13", "name", "LÄNKEBO","windDirection"," NE/E"],
            ["spot", 63.4897141,19.4738929, "id14", "name", "STORÄNGET","windDirection"," N/NE"],
            ["spot", 63.4573565,19.2647473, "id15", "name", "SALUSAND","windDirection"," SW"],
        //Örnsköldsvik//
            ["spot", 62.9903104,18.5276622, "id16", "name", "STORSANDEN","windDirection","N/NE/NW"],
            ["spot", 63.2505607,18.6855082, "id17", "name", "NYÄNGET","windDirection","S/SE"],
            ["spot", 63.2150045,18.8268965, "id18", "name", "GULLVIK","windDirection","S"],
            ["spot", 63.2067795,18.8098370, "id19", "name", "VANNVIKEN","windDirection","S/SE"],
            ["spot", 63.2206414,18.9595582, "id20", "name", "STUBBSAND","windDirection","S/SW"],
        //Härnösand//
            ["spot", 62.5759766,17.9129405, "id21", "name", "SMITINGE","windDirection","S/SE"],
            ["spot", 62.5990367,18.0325180, "id22", "name", "SVARTVIK","windDirection","S/SE"],
            ["spot", 62.5847226,17.9239516, "id23", "name", "YTTREFÄLLE","windDirection","S/SE"],
            ["spot", 62.6448072,17.9683284, "id24", "name", "SÄLSTEN","windDirection","NE/NW"],
        //Sundsvall/
            ["spot", 62.4511973,17.5340607, "id25", "name", "MYCKELÄNG","windDirection","NV"],
            ["spot", 62.4490114,17.5004908, "id26", "name", "STORNÄSET","windDirection","S"],
            ["spot", 62.5095594,17.4745280, "id27", "name", "SMACKEN","windDirection","S/SW"],
            ["spot", 62.5102920,17.4833562, "id28", "name", "GULLFIBER","windDirection","S/SW"],
            ["spot", 62.0768640,17.4581468, "id29", "name", "DYRÅSAND","windDirection","E"],
            ["spot", 62.0268011,17.4232861, "id30", "name", "SÖRFJÄRDEN","windDirection","S/SE"],
            ["spot", 62.0181316,17.4144492, "id31", "name", "VARPSAND","windDirection","NE"],
            ["spot", 61.9938701,17.3965579, "id32", "name", "HÅRTE","windDirection","S/SE"],
            ["spot", 61.9201011,16.7183359, "id33", "name", "FÖNEBO","windDirection","S/SE"],
            ["spot", 61.8149679,16.8746091, "id34", "name", "HALLSBO","windDirection","NE"],
        //Hudiksvall//
            ["spot", 61.7184406,17.1726866, "id35", "name", "MALNBADET","windDirection","S/SW"],
            ["spot", 61.7011666,17.5090105, "id36", "name", "SÖRSUNDET","windDirection","N/NE"],
            ["spot", 61.6215421,17.4670460, "id37", "name", "TÅNGVIK","windDirection","S/SE"],
            ["spot", 61.6224418,17.4454898, "id38", "name", "HÖLICK SOUTH","windDirection","S/SE"],
            ["spot", 61.6297878,17.4326722, "id39", "name", "HÖLICK WEST","windDirection","S/SW"],
        //Söderhamn//
            ["spot", 61.4187314,17.1798377, "id40", "name", "SNÄCKEN","windDirection","S/SE"],
            ["spot", 61.4169583,17.1525610, "id41", "name", "KRÅKNÄS","windDirection","S/SW"],
            ["spot", 61.2468373,17.1947394, "id42", "name", "STENÖ HAVSBAD","windDirection","S/SE"],
            ["spot", 61.2406976,17.2613011, "id43", "name", "ORSUNDET","windDirection","S/SW"],
            ["spot", 61.2352256,17.2766953, "id44", "name", "ENSKÄR","windDirection","S/SE"],
        //Gävle//
            ["spot", 60.7524944,17.3534575, "id45", "name", "UTVALNÄS UDDE","windDirection","E/SE"],
            ["spot", 60.7319714,17.3182666, "id46", "name", "HOLMUDDEN","windDirection","E"],
            ["spot", 60.7154601,17.2624873, "id47", "name", "BRÄDVIKEN","windDirection","S/SE"],
            ["spot", 60.6463792,17.4264364, "id48", "name", "KLÄCKEN","windDirection","N"],
            ["spot", 60.6414841,17.4734790, "id49", "name", "RULLSAND","windDirection","N/NE"],
        //Åland//
            ["spot", 60.2174413,19.5438690, "id50", "name", "SANDMO","windDirection","W/SW"],
            ["spot", 60.1539131,19.5973999, "id51", "name", "HOLMUDDEN","windDirection","E"],
            ["spot", 60.1105197,19.9479629, "id52", "name", "SKJULET","windDirection","S/SE"],
            ["spot", 60.0894388,20.1402891, "id53", "name", "LUMPARN","windDirection","N/NW/NE"],
            ["spot", 60.2073874,20.2499844, "id54", "name", "PRÄSTÖ","windDirection","S/SW"],
        //Stockholm North//
            ["spot", 59.9054138,18.9926251, "id55", "name", "SALNÖ","windDirection","N/NE"],
            ["spot", 59.7171248,19.0650978, "id56", "name", "KAPELLSKÄR","windDirection","S/SE"],
            ["spot", 59.6283077,18.9845648, "id57", "name", "BROMSKÄR","windDirection","E/NE"],
            ["spot", 59.3769370,18.2315604, "id58", "name", "FÅGELÖUDDEN","windDirection","N/NW"],
            ["spot", 59.4258797,18.1050031, "id59", "name", "NÄSÄNG S","windDirection","S/SE"],
            ["spot", 59.4421925,18.1312813, "id60", "name", "HÄGERNÄSBADET","windDirection","S/SE"],
            ["spot", 59.3897778,18.1116807, "id61", "name", "STICKLINGE","windDirection","N/NE"],
        // Stockholm South//
            ["spot", 59.2871791,17.8915723, "id62", "name", "SÄTRASTRAND","windDirection","W"],
            ["spot", 59.2204036,18.5375894, "id63", "name", "BJÖRKVIK","windDirection","S/SE"],
            ["spot", 59.2175396,18.5288400, "id64", "name", "LILLA SAND","windDirection","S/SE'"],
            ["spot", 59.2212215,18.5501964, "id65", "name", "TORPESAND","windDirection","S/SEW"],
            ["spot", 59.2224023,18.4801033, "id66", "name", "GRÖNSKAN","windDirection","S/SE"],
            ["spot", 59.2283717,18.3567438, "id67", "name", "TRINNTORP","windDirection","N/NE"],
            ["spot", 59.1964566,18.4173426, "id68", "name", "SANDHOLMEN","windDirection","S/SE"],
            ["spot", 59.2690874,18.2649998, "id69", "name", "ERSTAVIK","windDirection","SE"],
            ["spot", 59.3145342,18.3051525, "id70", "name", "MJÖLKUDDEN","windDirection","SE"],
            ["spot", 59.1373975,18.3978376, "id71", "name", "DALARÖ","windDirection","S/SW"],
            ["spot", 59.0972660,18.3228420, "id72", "name", "GÅLÖ","windDirection","SE"],
            ["spot", 58.8043955,17.7977476, "id73", "name", "ÖRUDDEN N","windDirection","W/NW"],
            ["spot", 58.7966607,17.7912915, "id74", "name", "ÖRUDDEN V","windDirection","S/SW"],
            ["spot", 58.7988784,17.8109458, "id75", "name", "ÖRUDDEN S","windDirection","S/S"]
    ];

// Map from https://cloud.maptiler.com/maps/hybrid/ //
L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Eq1wRludzR4Xg059gxvk', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

     // Add Markers to map in Leaflet//
   
    for (var i = 0; i < markers.length; i++) {
        spots = new L.marker([markers[i][1],markers[i][2]])
            .bindPopup(markers[i][5])
            .addTo(map);
    }
    /*
      L.popup()
        .setLatLng([50.4, 14.3])
        .setContent('Hello World')
        .openOn(map);
        */