

const options = {
    // Required: API key
    key: 'Ij2CVHcL4d5ByrXOrtQg71Abhm2gFLGO',

    // Put additional console output
    verbose: true,
    // Optional: Initial state of the map
    lat: 63.45,
    lon: 17.52,
    zoom: 5,
    timestamp: Date.now() + 3 * 24 * 60 * 60 * 1000,
    hourFormat: '24',
};

windyInit(options, windyAPI => {
    const { store } = windyAPI;
    // All the params are stored in windyAPI.store

    const levels = store.getAllowed('availLevels');
    // levels = ['surface', '850h', ... ]
    // Getting all available values for given key

    let i = 0;
    setInterval(() => {
        i = i === levels.length - 1 ? 0 : i + 1;

        // Changing Windy params at runtime
        store.set('level', levels[i]);
    }, 500);

    // Observing change of .store value
    store.on('level', level => {
        console.log(`Level was changed: ${level}`);
    });
    
});




/*
// Example //
var littleton = L.marker([63.61, 17.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([63.74, 17.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([63.73, 17.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([63.77, 17.23]).bindPopup('This is Golden, CO.');

    var cities = L.layerGroup([littleton, denver, aurora, golden]);

    var satellit = L.tileLayer('https://api.maptiler.com/maps/hybrid/{5}/{63.45}/{17.52}.jpg?key=Eq1wRludzR4Xg059gxvk', {id: 'mapbox.satellite', tileSize: 512, zoomOffset: -1, attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}),
    streets   = L.tileLayer('https://api.maptiler.com/maps/streets/{5}/{63.45}/{17.52}.jpg?key=Eq1wRludzR4Xg059gxvk', {id: 'mapbox.street', tileSize: 512, zoomOffset: -1, attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'});

var map = L.map('map', {
    center: [63.45, 17.52],
    zoom: 5,
    layers: [satellit, streets]
});

var baseMaps = {
    "Satellit": satellit,
    "Streets": streets
};

var overlayMaps = {
    "Cities": cities
};
L.control.layers(baseMaps, overlayMaps).addTo(map);

var baseMaps = {
    "<span style='color: gray'>Grayscale</span>": grayscale,
    "Streets": streets
};

/*
L.marker([ 63.45, 17.52], {icon: map.marker.icon}).addTo(map).bindPopup("Hej");


//  Array of markers //
var spots = [
        //Kalix//
            {lat:65.8108770, lon:23.6116663}, // "id1", "name", "BREVIKEN","windDirection","S/SW"],
            {lat:65.8130515, lon:23.4892165}, // "id2", "name", "BODÖN","windDirection","N/NW"],
        //Luleå//
            {lat:65.6230793, lon:22.0222872}, // "id3", "name", "STORSAND","windDirection","S/SW"],
            {lat:65.5456349, lon:22.1564902}, // "id4", "name", "LULVIKSBADET","windDirection","NW"],
            {lat:65.5189811, lon:22.1522248}, // "id5", "name", "LULHÄLLAN","windDirection","S/SW"],
            {lat:65.4982979, lon:22.3689945}, // "id6", "name", "KLUBBVIKEN","windDirection","S"],
        //Skellefteå//
            {lat:64.7742422, lon:21.1834173}, // "id7", "name", "STORSNÄCK","windDirection","N/NW"],
            {lat:64.7408877, lon:21.2183383}, // "id8", "name", "SILLSKATAN","windDirection","S/SW"],
            {lat:64.5184790, lon:21.5452258}, // "id9", "name", "VÅNÖREN","windDirection","S/SW"],
            {lat:64.4348443, lon:21.6102720}, // "id10", "name", "BJURÖKLUBB EAST","windDirection","SE"],
            {lat:64.4362105, lon:21.5805984}, // "id11", "name", "BJURÖKLUBB WEST","windDirection","SW"],
        //Umeå//
            {lat:63.6678316, lon:20.0246587}, // "id12", "name", "LILLIS","windDirection"," S/SE"],
            {lat:63.6504034, lon:19.9964010}, // "id13", "name", "LÄNKEBO","windDirection"," NE/E"],
            {lat:63.4897141, lon:19.4738929}, // "id14", "name", "STORÄNGET","windDirection"," N/NE"],
            {lat:63.4573565, lon:19.2647473}, // "id15", "name", "SALUSAND","windDirection"," SW"],
        //Örnsköldsvik//
            {lat:62.9903104, lon:18.5276622}, // "id16", "name", "STORSANDEN","windDirection","N/NE/NW"],
            {lat:63.2505607, lon:18.6855082}, // "id17", "name", "NYÄNGET","windDirection","S/SE"],
            {lat:63.2150045, lon:18.8268965}, // "id18", "name", "GULLVIK","windDirection","S"],
            {lat:63.2067795, lon:18.8098370}, // "id19", "name", "VANNVIKEN","windDirection","S/SE"],
            {lat:63.2206414, lon:18.9595582}, // "id20", "name", "STUBBSAND","windDirection","S/SW"],
        //Härnösand//
            {lat:62.5759766, lon:17.9129405}, // "id21", "name", "SMITINGE","windDirection","S/SE"],
            {lat:62.5990367, lon:18.0325180}, // "id22", "name", "SVARTVIK","windDirection","S/SE"],
            {lat:62.5847226, lon:17.9239516}, // "id23", "name", "YTTREFÄLLE","windDirection","S/SE"],
            {lat:62.6448072, lon:17.9683284}, // "id24", "name", "SÄLSTEN","windDirection","NE/NW"],
        //Sundsvall/
            {lat:62.4511973, lon:17.5340607}, // "id25", "name", "MYCKELÄNG","windDirection","NV"],
            {lat:62.4490114, lon:17.5004908}, // "id26", "name", "STORNÄSET","windDirection","S"],
            {lat:62.5095594, lon:17.4745280}, // "id27", "name", "SMACKEN","windDirection","S/SW"],
            {lat:62.5102920, lon:17.4833562}, // "id28", "name", "GULLFIBER","windDirection","S/SW"],
            {lat:62.0768640, lon:17.4581468}, // "id29", "name", "DYRÅSAND","windDirection","E"],
            {lat:62.0268011, lon:17.4232861}, // "id30", "name", "SÖRFJÄRDEN","windDirection","S/SE"],
            {lat:62.0181316, lon:17.4144492}, // "id31", "name", "VARPSAND","windDirection","NE"],
            {lat:61.9938701, lon:17.3965579}, // "id32", "name", "HÅRTE","windDirection","S/SE"],
            {lat:61.9201011, lon:16.7183359}, // "id33", "name", "FÖNEBO","windDirection","S/SE"],
            {lat:61.8149679, lon:16.8746091}, // "id34", "name", "HALLSBO","windDirection","NE"],
        //Hudiksvall//
            {lat:61.7184406, lon:17.1726866}, // "id35", "name", "MALNBADET","windDirection","S/SW"],
            {lat:61.7011666, lon:17.5090105}, // "id36", "name", "SÖRSUNDET","windDirection","N/NE"],
            {lat:61.6215421, lon:17.4670460}, // "id37", "name", "TÅNGVIK","windDirection","S/SE"],
            {lat:61.6224418, lon:17.4454898}, // "id38", "name", "HÖLICK SOUTH","windDirection","S/SE"],
            {lat:61.6297878, lon:17.4326722}, // "id39", "name", "HÖLICK WEST","windDirection","S/SW"],
        //Söderhamn//
            {lat:61.4187314, lon:17.1798377}, // "id40", "name", "SNÄCKEN","windDirection","S/SE"],
            {lat:61.4169583, lon:17.1525610}, // "id41", "name", "KRÅKNÄS","windDirection","S/SW"],
            {lat:61.2468373, lon:17.1947394}, // "id42", "name", "STENÖ HAVSBAD","windDirection","S/SE"],
            {lat:61.2406976, lon:17.2613011}, // "id43", "name", "ORSUNDET","windDirection","S/SW"],
            {lat:61.2352256, lon:17.2766953}, // "id44", "name", "ENSKÄR","windDirection","S/SE"],
        //Gävle//
            {lat:60.7524944, lon:17.3534575}, // "id45", "name", "UTVALNÄS UDDE","windDirection","E/SE"],
            {lat:60.7319714, lon:17.3182666}, // "id46", "name", "HOLMUDDEN","windDirection","E"],
            {lat:60.7154601, lon:17.2624873}, // "id47", "name", "BRÄDVIKEN","windDirection","S/SE"],
            {lat:60.6463792, lon:17.4264364}, // "id48", "name", "KLÄCKEN","windDirection","N"],
            {lat:60.6414841, lon:17.4734790}, // "id49", "name", "RULLSAND","windDirection","N/NE"],
        //Åland//
            {lat:60.2174413, lon:19.5438690}, // "id50", "name", "SANDMO","windDirection","W/SW"],
            {lat:60.1539131, lon:19.5973999}, // "id51", "name", "HOLMUDDEN","windDirection","E"],
            {lat:60.1105197, lon:19.9479629}, // "id52", "name", "SKJULET","windDirection","S/SE"],
            {lat:60.0894388, lon:20.1402891}, // "id53", "name", "LUMPARN","windDirection","N/NW/NE"],
            {lat:60.2073874, lon:20.2499844}, // "id54", "name", "PRÄSTÖ","windDirection","S/SW"],
        //Stockholm North//
            {lat:59.9054138, lon:18.9926251}, // "id55", "name", "SALNÖ","windDirection","N/NE"],
            {lat:59.7171248, lon:19.0650978}, // "id56", "name", "KAPELLSKÄR","windDirection","S/SE"],
            {lat:59.6283077, lon:18.9845648}, // "id57", "name", "BROMSKÄR","windDirection","E/NE"],
            {lat:59.3769370, lon:18.2315604}, // "id58", "name", "FÅGELÖUDDEN","windDirection","N/NW"],
            {lat:59.4258797, lon:18.1050031}, // "id59", "name", "NÄSÄNG S","windDirection","S/SE"],
            {lat:59.4421925, lon:18.1312813}, // "id60", "name", "HÄGERNÄSBADET","windDirection","S/SE"],
            {lat:59.3897778, lon:18.1116807}, // "id61", "name", "STICKLINGE","windDirection","N/NE"],
        // Stockholm South//
            {lat:59.2871791, lon:17.8915723}, // "id62", "name", "SÄTRASTRAND","windDirection","W"],
            {lat:59.2204036, lon:18.5375894}, // "id63", "name", "BJÖRKVIK","windDirection","S/SE"],
            {lat:59.2175396, lon:18.5288400}, // "id64", "name", "LILLA SAND","windDirection","S/SE'"],
            {lat:59.2212215, lon:18.5501964}, // "id65", "name", "TORPESAND","windDirection","S/SEW"],
            {lat:59.2224023, lon:18.4801033}, // "id66", "name", "GRÖNSKAN","windDirection","S/SE"],
            {lat:59.2283717, lon:18.3567438}, // "id67", "name", "TRINNTORP","windDirection","N/NE"],
            {lat:59.1964566, lon:18.4173426}, // "id68", "name", "SANDHOLMEN","windDirection","S/SE"],
            {lat:59.2690874, lon:18.2649998}, // "id69", "name", "ERSTAVIK","windDirection","SE"],
            {lat:59.3145342, lon:18.3051525}, // "id70", "name", "MJÖLKUDDEN","windDirection","SE"],
            {lat:59.1373975, lon:18.3978376}, // "id71", "name", "DALARÖ","windDirection","S/SW"],
            {lat:59.0972660, lon:18.3228420}, // "id72", "name", "GÅLÖ","windDirection","SE"],
            {lat:58.8043955, lon:17.7977476}, // "id73", "name", "ÖRUDDEN N","windDirection","W/NW"],
            {lat:58.7966607, lon:17.7912915}, // "id74", "name", "ÖRUDDEN V","windDirection","S/SW"],
            {lat:58.7988784, lon:17.8109458}, // "id75", "name", "ÖRUDDEN S","windDirection","S/S"]
            {lat:58.7226834, lon:17.1059486}, // "id76", "name", "VACCUM","windDirection","S/SW"],
        // Gotland EASTCOST //
            {lat:57.6731890, lon:18.3313751}, // "id77", "name", "SNÄCK","windDirection","S/SW"],
            {lat:57.6537283, lon:18.3039127}, // "id78", "name", "NORDERSTRAND","windDirection","S/SW"],
            {lat:57.6000832, lon:18.2128064}, // "id79", "name", "FRIDHEM","windDirection","S/SW"],
            {lat:57.5010071, lon:18.1130306}, // "id80", "name", "GNISVÄRD","windDirection","S/SW"]
            {lat:57.4912072, lon:18.1260356}, // "id81", "name", "TOFTA","windDirection","S/SW"],
            {lat:57.4836655, lon:18.1258006}, // "id82", "name", "TOFTA S","windDirection","S/SW"],
            {lat:57.4366947, lon:18.1419227}, // "id83", "name", "VÄSTERGARN N","windDirection","S/SW"]
            {lat:57.8043955, lon:18.7977476}, // "id84", "name", "VÄSTERGARN S","windDirection","S/SE"],
            {lat:57.4056765, lon:18.1546933}, // "id85", "name", "KOVIK","windDirection","S/SW"],
            {lat:57.3967423, lon:18.1640881}, // "id86", "name", "TJURUDDEN","windDirection","S/W"]
        // Gotland SOUTH //
            {lat:57.1316122, lon:18.2168770}, // "id87", "name", "NISSEVIKEN","windDirection","S/SW"],
            {lat:56.9286604, lon:18.2373114}, // "id88", "name", "VALAR","windDirection","S/SW"],
            {lat:57.7988784, lon:18.2784944}, // "id89", "name", "HOLMHÄLLAR","windDirection","S/SW"]
            {lat:56.0151331, lon:18.3442752}, // "id90", "name", "FALUDDEN S","windDirection","S/SE"],
            {lat:57.7988784, lon:18.8109458}, // "id91", "name", "FALUDDEN N","windDirection","E/NE"]
            {lat:57.1241931, lon:18.4311850}, //, "id92", "name", "GANSVIK","windDirection","E/NE"],
        // Gotland WESTCOST //
            {lat:57.2839580, lon:18.6672809}, // "id93", "name", "LAUSVIKEN","windDirection","N/NE"],
            {lat:57.3331318, lon:18.7144050}, // "id94", "name", "LJUGARN","windDirection","E"]
            {lat:57.3712321, lon:18.7797047}, // "id95", "name", "ARDREVIKEN","windDirection","E/SE"],
            {lat:57.3740297, lon:18.7966770}, // "id96", "name", "SJAUSTRU","windDirection","S/SE"],
            {lat:57.3964000, lon:18.8540002}, // "id97", "name", "JRP","windDirection","S/SE"]
            {lat:57.3988506, lon:18.8673187}, // "id98", "name", "VÄSTVIKEN","windDirection","S/SE"],
            {lat:57.3956900, lon:18.8796854}, // "id99", "name", "SANDVIKEN","windDirection","S/SW"]
            {lat:57.4030865, lon:18.9181516}, // "id100", "name", "NATVIKSUDDEN","windDirection","E/NE/SE"],
            {lat:57.4379699, lon:18.8993677}, // "id101", "name", "GROGARN","windDirection","N/NE"],
            {lat:57.4349801, lon:18.8549507}, // "id102", "name", "KATTVIK","windDirection","N/NW/NE"]
            {lat:57.6143897, lon:18.7676287}, // "id103", "name", "ÅMINNE","windDirection","N/NE"],
            // Gotland NORTH //
            {lat:57.7177726, lon:18.8093575}, // "id104", "name", "SLITE","windDirection","E/SE/NE"],
            {lat:57.7344558, lon:18.8781290}, // "id105", "name", "HIDEVIKEB","windDirection","S/SE"],
            {lat:57.7204868, lon:18.9115332}, // "id106", "name", "ST OLOFHOLM","windDirection","E/SE/NE"],
            {lat:57.7988784, lon:18.8109458}, // "id107", "name", "ÖRUDDEN","windDirection","S/S"],
            {lat:57.7966607, lon:18.7912915}, // "id108", "name", "ÖRUDDEN","windDirection","S/SW"],
            {lat:57.7988784, lon:18.8109458}, // "id109", "name", "ÖRUDDEN","windDirection","S/S"],
            {lat:57.7966607, lon:18.7912915}, // "id110", "name", "ÖRUDDEN","windDirection","S/SW"],
            {lat:57.7988784, lon:18.8109458}, // "id111", "name", "ÖRUDDEN","windDirection","S/S"]
    ];

// var spots = {lat:62.2323453, lon: 17.2355623};
/*
for (var i = 0; i < markers.length; i++) {
        spots = new L.marker([markers[i][1],markers[i][2]])
            .bindPopup(markers[i][5])
            .addTo(map);
    }

var map =L.map('map').setView([62.45, 17.52], 5);
mapLink = '<a href="http://windy.com">WindyMap</a>';
     // Add Markers to map in Leaflet//

    (((((((((())))))))))
        // Map from https://cloud.maptiler.com/maps/hybrid/ //
L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Eq1wRludzR4Xg059gxvk', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);
    (((((((((()))))))))   

*/
    
    /*
      L.popup()
        .setLatLng([50.4, 14.3])
        .setContent('Hello World')
        .openOn(map);


function createCoordCode(spots) {
    let spots = [];
    for (let i = 98; i < 123; i++)spots.push(String.fromCharCode(i));
    for (let i = 65; i < 91; i++)spots.push(String.fromCharCode(i));
    for (let i = 0; i < 9; i++)spots.push(i);

    let lat = Math.round(100*(spots.lat+90));
    let lon = Math.round(100*(spots.lat+180));

    lt1 = Math.floor(lat/3600);
    lt2 = Math.floor((lat-lt1*3600)/60);
    lt3 = lat-lt1*3600-lt2*60;

    ln1 = Math.floor(lon/3600);
    ln2 = Math.floor((lon-ln1*3600)/60);
    ln3 = lon-ln1*3600-ln2*60;   
    return "m:" 
    + spots [lt1] 
    + spots [lt2] 
    + spots [lt3] + "a" 
    + spots [ln1] 
    + spots [ln2] 
    + spots [ln3];

}
        */