

// import leaflet from leaflet

// Calling the Windy map with lat/lng start view. Setting the map in a 24hour format. //

const options = {
    // Required: API key
    key: 'Ij2CVHcL4d5ByrXOrtQg71Abhm2gFLGO',

    // Put additional console output
    verbose: true,
    // Optional: Initial state of the map
    lat: 62.45,
    lon: 17.52,
    zoom: 6
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map


         var kitespots = [
        //Kalix//
            ["SpotLevel", 65.8108770, 23.6116663, "id1", "BREVIKEN",", Wind Direction ","S/SW"],
            ["SpotLevel", 65.8130515, 23.4892165, "id2", "BODÖN",", Wind Direction ","N/NW"],
        //Luleå//
            ["SpotLevel", 65.6230793, 22.0222872, "id3", "STORSAND",", Wind Direction ","S/SW"],
            ["SpotLevel", 65.5456349, 22.1564902, "id4", "LULVIKSBADET",", Wind Direction ","NW"],
            ["SpotLevel", 65.5189811, 22.1522248, "id5", "LULHÄLLAN",", Wind Direction ","S/SW"],
            ["SpotLevel", 65.4982979, 22.3689945, "id6", "KLUBBVIKEN",", Wind Direction ","S"],
        //Skellefteå//
            ["SpotLevel", 64.7742422, 21.1834173, "id7", "STORSNÄCK",", Wind Direction ","N/NW"],
            ["SpotLevel", 64.7408877, 21.2183383, "id8", "SILLSKATAN",", Wind Direction ","S/SW"],
            ["SpotLevel", 64.5184790, 21.5452258, "id9", "VÅNÖREN",", Wind Direction ","S/SW"],
            ["SpotLevel", 64.4348443, 21.6102720, "id10", "BJURÖKLUBB EAST",", Wind Direction ","SE"],
            ["SpotLevel", 64.4362105, 21.5805984, "id11", "BJURÖKLUBB WEST",", Wind Direction ","SW"],
        //Umeå//
            ["SpotLevel", 63.6678316, 20.0246587, "id12", "LILLIS",", Wind Direction "," S/SE"],
            ["SpotLevel", 63.6504034, 19.9964010, "id13", "LÄNKEBO",", Wind Direction "," NE/E"],
            ["SpotLevel", 63.4897141, 19.4738929, "id14", "STORÄNGET",", Wind Direction "," N/NE"],
            ["SpotLevel", 63.4573565, 19.2647473, "id15", "SALUSAND",", Wind Direction "," SW"],
        //Örnsköldsvik//
            ["SpotLevel", 62.9903104, 18.5276622, "id16", "STORSANDEN",", Wind Direction ","N/NE/NW"],
            ["SpotLevel", 63.2505607, 18.6855082, "id17", "NYÄNGET",", Wind Direction ","S/SE"],
            ["SpotLevel", 63.2150045, 18.8268965, "id18", "GULLVIK",", Wind Direction ","S"],
            ["SpotLevel", 63.2067795, 18.8098370, "id19", "VANNVIKEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 63.2206414, 18.9595582, "id20", "STUBBSAND",", Wind Direction ","S/SW"],
        //Härnösand//
            ["SpotLevel", 62.5759766, 17.9129405, "id21", "SMITINGE",", Wind Direction ","S/SE"],
            ["SpotLevel", 62.5990367, 18.0325180, "id22", "SVARTVIK",", Wind Direction ","S/SE"],
            ["SpotLevel", 62.5847226, 17.9239516, "id23", "YTTREFÄLLE",", Wind Direction ","S/SE"],
            ["SpotLevel", 62.6448072, 17.9683284, "id24", "SÄLSTEN",", Wind Direction ","NE/NW"],
        //Sundsvall/
            ["SpotLevel", 62.4511973, 17.5340607, "id25", "MYCKELÄNG",", Wind Direction ","NV"],
            ["SpotLevel", 62.4490114, 17.5004908, "id26", "STORNÄSET",", Wind Direction ","S"],
            ["SpotLevel", 62.5095594, 17.4745280, "id27", "SMACKEN",", Wind Direction ","S/SW"],
            ["SpotLevel", 62.5102920, 17.4833562, "id28", "GULLFIBER",", Wind Direction ","S/SW"],
            ["SpotLevel", 62.0768640, 17.4581468, "id29", "DYRÅSAND",", Wind Direction ","E"],
            ["SpotLevel", 62.0268011, 17.4232861, "id30", "SÖRFJÄRDEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 62.0181316, 17.4144492, "id31", "VARPSAND",", Wind Direction ","NE"],
            ["SpotLevel", 61.9938701, 17.3965579, "id32", "HÅRTE",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.9201011, 16.7183359, "id33", "FÖNEBO",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.8149679, 16.8746091, "id34", "HALLSBO",", Wind Direction ","NE"],
        //Hudiksvall//
            ["SpotLevel", 61.7184406, 17.1726866, "id35", "MALNBADET",", Wind Direction ","S/SW"],
            ["SpotLevel", 61.7011666, 17.5090105, "id36", "SÖRSUNDET",", Wind Direction ","N/NE"],
            ["SpotLevel", 61.6215421, 17.4670460, "id37", "TÅNGVIK",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.6224418, 17.4454898, "id38", "HÖLICK SOUTH",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.6297878, 17.4326722, "id39", "HÖLICK WEST",", Wind Direction ","S/SW"],
        //Söderhamn//
            ["SpotLevel", 61.4187314, 17.1798377, "id40", "SNÄCKEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.4169583, 17.1525610, "id41", "KRÅKNÄS",", Wind Direction ","S/SW"],
            ["SpotLevel", 61.2468373, 17.1947394, "id42", "STENÖ HAVSBAD",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.2406976, 17.2613011, "id43", "ORSUNDET",", Wind Direction ","S/SW"],
            ["SpotLevel", 61.2352256, 17.2766953, "id44", "ENSKÄR",", Wind Direction ","S/SE"],
        //Gävle//
            ["SpotLevel", 60.7524944, 17.3534575, "id45", "UTVALNÄS UDDE",", Wind Direction ","E/SE"],
            ["SpotLevel", 60.7319714, 17.3182666, "id46", "HOLMUDDEN",", Wind Direction ","E"],
            ["SpotLevel", 60.7154601, 17.2624873, "id47", "BRÄDVIKEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 60.6463792, 17.4264364, "id48", "KLÄCKEN",", Wind Direction ","N"],
            ["SpotLevel", 60.6414841, 17.4734790, "id49", "RULLSAND",", Wind Direction ","N/NE"],
        //Åland//
            ["SpotLevel", 60.2174413, 19.5438690, "id50", "SANDMO",", Wind Direction ","W/SW"],
            ["SpotLevel", 60.1539131, 19.5973999, "id51", "HOLMUDDEN",", Wind Direction ","E"],
            ["SpotLevel", 60.1105197, 19.9479629, "id52", "SKJULET",", Wind Direction ","S/SE"],
            ["SpotLevel", 60.0894388, 20.1402891, "id53", "LUMPARN",", Wind Direction ","N/NW/NE"],
            ["SpotLevel", 60.2073874, 20.2499844, "id54", "PRÄSTÖ",", Wind Direction ","S/SW"],
        //Stockholm North//
            ["SpotLevel", 59.9054138, 18.9926251, "id55", "SALNÖ",", Wind Direction ","N/NE"],
            ["SpotLevel", 59.7171248, 19.0650978, "id56", "KAPELLSKÄR",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.6283077, 18.9845648, "id57", "BROMSKÄR",", Wind Direction ","E/NE"],
            ["SpotLevel", 59.3769370, 18.2315604, "id58", "FÅGELÖUDDEN",", Wind Direction ","N/NW"],
            ["SpotLevel", 59.4258797, 18.1050031, "id59", "NÄSÄNG S",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.4421925, 18.1312813, "id60", "HÄGERNÄSBADET",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.3897778, 18.1116807, "id61", "STICKLINGE",", Wind Direction ","N/NE"],
        // Stockholm South//
            ["SpotLevel", 59.2871791, 17.8915723, "id62", "SÄTRASTRAND",", Wind Direction ","W"],
            ["SpotLevel", 59.2204036, 18.5375894, "id63", "BJÖRKVIK",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.2175396, 18.5288400, "id64", "LILLA SAND",", Wind Direction ","S/SE'"],
            ["SpotLevel", 59.2212215, 18.5501964, "id65", "TORPESAND",", Wind Direction ","S/SEW"],
            ["SpotLevel", 59.2224023, 18.4801033, "id66", "GRÖNSKAN",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.2283717, 18.3567438, "id67", "TRINNTORP",", Wind Direction ","N/NE"],
            ["SpotLevel", 59.1964566, 18.4173426, "id68", "SANDHOLMEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.2690874, 18.2649998, "id69", "ERSTAVIK",", Wind Direction ","SE"],
            ["SpotLevel", 59.3145342, 18.3051525, "id70", "MJÖLKUDDEN",", Wind Direction ","SE"],
            ["SpotLevel", 59.1373975, 18.3978376, "id71", "DALARÖ",", Wind Direction ","S/SW"],
            ["SpotLevel", 59.0972660, 18.3228420, "id72", "GÅLÖ",", Wind Direction ","SE"],
            ["SpotLevel", 58.8043955, 17.7977476, "id73", "ÖRUDDEN N",", Wind Direction ","W/NW"],
            ["SpotLevel", 58.7966607, 17.7912915, "id74", "ÖRUDDEN V",", Wind Direction ","S/SW"],
            ["SpotLevel", 58.7988784, 17.8109458, "id75", "ÖRUDDEN S",", Wind Direction ","S/S"],
            ["SpotLevel", 58.7226834, 17.1059486, "id76", "VACCUM",", Wind Direction ","S/SW"],
        // Gotland EASTCOST //
            ["SpotLevel", 57.6731890, 18.3313751, "id77", "SNÄCK",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.6537283, 18.3039127, "id78", "NORDERSTRAND",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.6000832, 18.2128064, "id79", "FRIDHEM",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.5010071, 18.1130306, "id80", "GNISVÄRD",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.4912072, 18.1260356, "id81", "TOFTA",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.4836655, 18.1258006, "id82", "TOFTA S",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.4366947, 18.1419227, "id83", "VÄSTERGARN N",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.8043955, 18.7977476, "id84", "VÄSTERGARN S",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.4056765, 18.1546933, "id85", "KOVIK",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.3967423, 18.1640881, "id86", "TJURUDDEN",", Wind Direction ","S/W"],
        // Gotland SOUTH //
            ["SpotLevel", 57.1316122, 18.2168770, "id87", "NISSEVIKEN",", Wind Direction ","S/SW"],
            ["SpotLevel", 56.9286604, 18.2373114, "id88", "VALAR",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.7988784, 18.2784944, "id89", "HOLMHÄLLAR",", Wind Direction ","S/SW"],
            ["SpotLevel", 56.0151331, 18.3442752, "id90", "FALUDDEN S",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.7988784, 18.8109458, "id91", "FALUDDEN N",", Wind Direction ","E/NE"],
            ["SpotLevel", 57.1241931, 18.43118507, "id92", "GANSVIK",", Wind Direction ","E/NE"],
        // Gotland WESTCOST //
            ["SpotLevel", 57.2839580, 18.6672809, "id93", "LAUSVIKEN",", Wind Direction ","N/NE"],
            ["SpotLevel", 57.3331318, 18.7144050, "id94", "LJUGARN",", Wind Direction ","E"],
            ["SpotLevel", 57.3712321, 18.7797047, "id95", "ARDREVIKEN",", Wind Direction ","E/SE"],
            ["SpotLevel", 57.3740297, 18.7966770, "id96", "SJAUSTRU",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.3964000, 18.8540002, "id97", "JRP",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.3988506, 18.8673187, "id98", "VÄSTVIKEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.3956900, 18.8796854, "id99", "SANDVIKEN",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.4030865, 18.9181516, "id100", "NATVIKSUDDEN",", Wind Direction ","E/NE/SE"],
            ["SpotLevel", 57.4379699, 18.8993677, "id101", "GROGARN",", Wind Direction ","N/NE"],
            ["SpotLevel", 57.4349801, 18.8549507, "id102", "KATTVIK",", Wind Direction ","N/NW/NE"],
            ["SpotLevel", 57.6143897, 18.7676287, "id103", "ÅMINNE",", Wind Direction ","N/NE"],
            // Gotland NORTH //
            ["SpotLevel", 57.7177726, 18.8093575, "id104", "SLITE",", Wind Direction ","E/SE/NE"],
            ["SpotLevel", 57.7344558, 18.8781290, "id105", "HIDEVIKEB",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.7204868, 18.9115332, "id106", "ST OLOFHOLM",", Wind Direction ","E/SE/NE"],
            ["SpotLevel", 57.7886030, 18.9515102, "id107", "SJÖKROGEN",", Wind Direction ","SE"],
            ["SpotLevel", 57.7542217, 18.0093393, "id108", "FURILLEN",", Wind Direction ","W/SW"],
            ["SpotLevel", 57.9295233, 18.8955352, "id109", "SAXRIV",", Wind Direction ","W/NW"],
            ["SpotLevel", 57.8437760, 18.7848341, "id110", "BRÄGÅRN",", Wind Direction ","NW"],
            ["SpotLevel", 57.8455552, 18.6083233, "id111", "IREVIKEN",", Wind Direction ","W/NW"],
            // FÅRÖ //
            ["SpotLevel", 57.9735893, 19.2501460, "id108", "EKEVIKEN",", Wind Direction ","N/NW"],
            ["SpotLevel", 57.9868174, 19.2241011, "id109", "VARPET",", Wind Direction ","N/NE"],
            ["SpotLevel", 57.9561473, 19.3311783, "id110", "SKALASAND",", Wind Direction ","E/SE"],
            ["SpotLevel", 57.9513802, 19.2555524, "id111", "SUDERSAND",", Wind Direction ","E/SE"],
            ["SpotLevel", 57.9868616, 19.3039213, "id111", "SKÄR",", Wind Direction ","N/NE/NW"]
    ];
       // Loop for the kitespots. //
        for (var i = 0; i < kitespots.length; i++) {
            spots = new L.marker([kitespots[i][1],kitespots[i][2]])
                .bindPopup(kitespots[i][0],kitespots[i][4],kitespots[i][5],kitespots[i][6])
                .addTo(map);
        }
    });
  

/*
// Loop for the kitespots. //
        for (var i = 0; i < kitespots.length; i++) {
            spots = new L.marker([kitespots[i][1],kitespots[i][2]])
                .bindPopup(kitespots[i][0],kitespots[i][4],kitespots[i][5],kitespots[i][6])
                .addTo(map);
        }

 var kitespots = [
        //Kalix//
            ["SpotLevel", 65.8108770, 23.6116663, "id1", "BREVIKEN",", Wind Direction ","S/SW"],
            ["SpotLevel", 65.8130515, 23.4892165, "id2", "BODÖN",", Wind Direction ","N/NW"],
        //Luleå//
            ["SpotLevel", 65.6230793, 22.0222872, "id3", "STORSAND",", Wind Direction ","S/SW"],
            ["SpotLevel", 65.5456349, 22.1564902, "id4", "LULVIKSBADET",", Wind Direction ","NW"],
            ["SpotLevel", 65.5189811, 22.1522248, "id5", "LULHÄLLAN",", Wind Direction ","S/SW"],
            ["SpotLevel", 65.4982979, 22.3689945, "id6", "KLUBBVIKEN",", Wind Direction ","S"],
        //Skellefteå//
            ["SpotLevel", 64.7742422, 21.1834173, "id7", "STORSNÄCK",", Wind Direction ","N/NW"],
            ["SpotLevel", 64.7408877, 21.2183383, "id8", "SILLSKATAN",", Wind Direction ","S/SW"],
            ["SpotLevel", 64.5184790, 21.5452258, "id9", "VÅNÖREN",", Wind Direction ","S/SW"],
            ["SpotLevel", 64.4348443, 21.6102720, "id10", "BJURÖKLUBB EAST",", Wind Direction ","SE"],
            ["SpotLevel", 64.4362105, 21.5805984, "id11", "BJURÖKLUBB WEST",", Wind Direction ","SW"],
        //Umeå//
            ["SpotLevel", 63.6678316, 20.0246587, "id12", "LILLIS",", Wind Direction "," S/SE"],
            ["SpotLevel", 63.6504034, 19.9964010, "id13", "LÄNKEBO",", Wind Direction "," NE/E"],
            ["SpotLevel", 63.4897141, 19.4738929, "id14", "STORÄNGET",", Wind Direction "," N/NE"],
            ["SpotLevel", 63.4573565, 19.2647473, "id15", "SALUSAND",", Wind Direction "," SW"],
        //Örnsköldsvik//
            ["SpotLevel", 62.9903104, 18.5276622, "id16", "STORSANDEN",", Wind Direction ","N/NE/NW"],
            ["SpotLevel", 63.2505607, 18.6855082, "id17", "NYÄNGET",", Wind Direction ","S/SE"],
            ["SpotLevel", 63.2150045, 18.8268965, "id18", "GULLVIK",", Wind Direction ","S"],
            ["SpotLevel", 63.2067795, 18.8098370, "id19", "VANNVIKEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 63.2206414, 18.9595582, "id20", "STUBBSAND",", Wind Direction ","S/SW"],
        //Härnösand//
            ["SpotLevel", 62.5759766, 17.9129405, "id21", "SMITINGE",", Wind Direction ","S/SE"],
            ["SpotLevel", 62.5990367, 18.0325180, "id22", "SVARTVIK",", Wind Direction ","S/SE"],
            ["SpotLevel", 62.5847226, 17.9239516, "id23", "YTTREFÄLLE",", Wind Direction ","S/SE"],
            ["SpotLevel", 62.6448072, 17.9683284, "id24", "SÄLSTEN",", Wind Direction ","NE/NW"],
        //Sundsvall/
            ["SpotLevel", 62.4511973, 17.5340607, "id25", "MYCKELÄNG",", Wind Direction ","NV"],
            ["SpotLevel", 62.4490114, 17.5004908, "id26", "STORNÄSET",", Wind Direction ","S"],
            ["SpotLevel", 62.5095594, 17.4745280, "id27", "SMACKEN",", Wind Direction ","S/SW"],
            ["SpotLevel", 62.5102920, 17.4833562, "id28", "GULLFIBER",", Wind Direction ","S/SW"],
            ["SpotLevel", 62.0768640, 17.4581468, "id29", "DYRÅSAND",", Wind Direction ","E"],
            ["SpotLevel", 62.0268011, 17.4232861, "id30", "SÖRFJÄRDEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 62.0181316, 17.4144492, "id31", "VARPSAND",", Wind Direction ","NE"],
            ["SpotLevel", 61.9938701, 17.3965579, "id32", "HÅRTE",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.9201011, 16.7183359, "id33", "FÖNEBO",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.8149679, 16.8746091, "id34", "HALLSBO",", Wind Direction ","NE"],
        //Hudiksvall//
            ["SpotLevel", 61.7184406, 17.1726866, "id35", "MALNBADET",", Wind Direction ","S/SW"],
            ["SpotLevel", 61.7011666, 17.5090105, "id36", "SÖRSUNDET",", Wind Direction ","N/NE"],
            ["SpotLevel", 61.6215421, 17.4670460, "id37", "TÅNGVIK",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.6224418, 17.4454898, "id38", "HÖLICK SOUTH",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.6297878, 17.4326722, "id39", "HÖLICK WEST",", Wind Direction ","S/SW"],
        //Söderhamn//
            ["SpotLevel", 61.4187314, 17.1798377, "id40", "SNÄCKEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.4169583, 17.1525610, "id41", "KRÅKNÄS",", Wind Direction ","S/SW"],
            ["SpotLevel", 61.2468373, 17.1947394, "id42", "STENÖ HAVSBAD",", Wind Direction ","S/SE"],
            ["SpotLevel", 61.2406976, 17.2613011, "id43", "ORSUNDET",", Wind Direction ","S/SW"],
            ["SpotLevel", 61.2352256, 17.2766953, "id44", "ENSKÄR",", Wind Direction ","S/SE"],
        //Gävle//
            ["SpotLevel", 60.7524944, 17.3534575, "id45", "UTVALNÄS UDDE",", Wind Direction ","E/SE"],
            ["SpotLevel", 60.7319714, 17.3182666, "id46", "HOLMUDDEN",", Wind Direction ","E"],
            ["SpotLevel", 60.7154601, 17.2624873, "id47", "BRÄDVIKEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 60.6463792, 17.4264364, "id48", "KLÄCKEN",", Wind Direction ","N"],
            ["SpotLevel", 60.6414841, 17.4734790, "id49", "RULLSAND",", Wind Direction ","N/NE"],
        //Åland//
            ["SpotLevel", 60.2174413, 19.5438690, "id50", "SANDMO",", Wind Direction ","W/SW"],
            ["SpotLevel", 60.1539131, 19.5973999, "id51", "HOLMUDDEN",", Wind Direction ","E"],
            ["SpotLevel", 60.1105197, 19.9479629, "id52", "SKJULET",", Wind Direction ","S/SE"],
            ["SpotLevel", 60.0894388, 20.1402891, "id53", "LUMPARN",", Wind Direction ","N/NW/NE"],
            ["SpotLevel", 60.2073874, 20.2499844, "id54", "PRÄSTÖ",", Wind Direction ","S/SW"],
        //Stockholm North//
            ["SpotLevel", 59.9054138, 18.9926251, "id55", "SALNÖ",", Wind Direction ","N/NE"],
            ["SpotLevel", 59.7171248, 19.0650978, "id56", "KAPELLSKÄR",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.6283077, 18.9845648, "id57", "BROMSKÄR",", Wind Direction ","E/NE"],
            ["SpotLevel", 59.3769370, 18.2315604, "id58", "FÅGELÖUDDEN",", Wind Direction ","N/NW"],
            ["SpotLevel", 59.4258797, 18.1050031, "id59", "NÄSÄNG S",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.4421925, 18.1312813, "id60", "HÄGERNÄSBADET",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.3897778, 18.1116807, "id61", "STICKLINGE",", Wind Direction ","N/NE"],
        // Stockholm South//
            ["SpotLevel", 59.2871791, 17.8915723, "id62", "SÄTRASTRAND",", Wind Direction ","W"],
            ["SpotLevel", 59.2204036, 18.5375894, "id63", "BJÖRKVIK",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.2175396, 18.5288400, "id64", "LILLA SAND",", Wind Direction ","S/SE'"],
            ["SpotLevel", 59.2212215, 18.5501964, "id65", "TORPESAND",", Wind Direction ","S/SEW"],
            ["SpotLevel", 59.2224023, 18.4801033, "id66", "GRÖNSKAN",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.2283717, 18.3567438, "id67", "TRINNTORP",", Wind Direction ","N/NE"],
            ["SpotLevel", 59.1964566, 18.4173426, "id68", "SANDHOLMEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 59.2690874, 18.2649998, "id69", "ERSTAVIK",", Wind Direction ","SE"],
            ["SpotLevel", 59.3145342, 18.3051525, "id70", "MJÖLKUDDEN",", Wind Direction ","SE"],
            ["SpotLevel", 59.1373975, 18.3978376, "id71", "DALARÖ",", Wind Direction ","S/SW"],
            ["SpotLevel", 59.0972660, 18.3228420, "id72", "GÅLÖ",", Wind Direction ","SE"],
            ["SpotLevel", 58.8043955, 17.7977476, "id73", "ÖRUDDEN N",", Wind Direction ","W/NW"],
            ["SpotLevel", 58.7966607, 17.7912915, "id74", "ÖRUDDEN V",", Wind Direction ","S/SW"],
            ["SpotLevel", 58.7988784, 17.8109458, "id75", "ÖRUDDEN S",", Wind Direction ","S/S"],
            ["SpotLevel", 58.7226834, 17.1059486, "id76", "VACCUM",", Wind Direction ","S/SW"],
        // Gotland EASTCOST //
            ["SpotLevel", 57.6731890, 18.3313751, "id77", "SNÄCK",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.6537283, 18.3039127, "id78", "NORDERSTRAND",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.6000832, 18.2128064, "id79", "FRIDHEM",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.5010071, 18.1130306, "id80", "GNISVÄRD",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.4912072, 18.1260356, "id81", "TOFTA",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.4836655, 18.1258006, "id82", "TOFTA S",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.4366947, 18.1419227, "id83", "VÄSTERGARN N",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.8043955, 18.7977476, "id84", "VÄSTERGARN S",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.4056765, 18.1546933, "id85", "KOVIK",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.3967423, 18.1640881, "id86", "TJURUDDEN",", Wind Direction ","S/W"],
        // Gotland SOUTH //
            ["SpotLevel", 57.1316122, 18.2168770, "id87", "NISSEVIKEN",", Wind Direction ","S/SW"],
            ["SpotLevel", 56.9286604, 18.2373114, "id88", "VALAR",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.7988784, 18.2784944, "id89", "HOLMHÄLLAR",", Wind Direction ","S/SW"],
            ["SpotLevel", 56.0151331, 18.3442752, "id90", "FALUDDEN S",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.7988784, 18.8109458, "id91", "FALUDDEN N",", Wind Direction ","E/NE"],
            ["SpotLevel", 57.1241931, 18.43118507, "id92", "GANSVIK",", Wind Direction ","E/NE"],
        // Gotland WESTCOST //
            ["SpotLevel", 57.2839580, 18.6672809, "id93", "LAUSVIKEN",", Wind Direction ","N/NE"],
            ["SpotLevel", 57.3331318, 18.7144050, "id94", "LJUGARN",", Wind Direction ","E"],
            ["SpotLevel", 57.3712321, 18.7797047, "id95", "ARDREVIKEN",", Wind Direction ","E/SE"],
            ["SpotLevel", 57.3740297, 18.7966770, "id96", "SJAUSTRU",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.3964000, 18.8540002, "id97", "JRP",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.3988506, 18.8673187, "id98", "VÄSTVIKEN",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.3956900, 18.8796854, "id99", "SANDVIKEN",", Wind Direction ","S/SW"],
            ["SpotLevel", 57.4030865, 18.9181516, "id100", "NATVIKSUDDEN",", Wind Direction ","E/NE/SE"],
            ["SpotLevel", 57.4379699, 18.8993677, "id101", "GROGARN",", Wind Direction ","N/NE"],
            ["SpotLevel", 57.4349801, 18.8549507, "id102", "KATTVIK",", Wind Direction ","N/NW/NE"],
            ["SpotLevel", 57.6143897, 18.7676287, "id103", "ÅMINNE",", Wind Direction ","N/NE"],
            // Gotland NORTH //
            ["SpotLevel", 57.7177726, 18.8093575, "id104", "SLITE",", Wind Direction ","E/SE/NE"],
            ["SpotLevel", 57.7344558, 18.8781290, "id105", "HIDEVIKEB",", Wind Direction ","S/SE"],
            ["SpotLevel", 57.7204868, 18.9115332, "id106", "ST OLOFHOLM",", Wind Direction ","E/SE/NE"],
            ["SpotLevel", 57.7886030, 18.9515102, "id107", "SJÖKROGEN",", Wind Direction ","SE"],
            ["SpotLevel", 57.7542217, 18.0093393, "id108", "FURILLEN",", Wind Direction ","W/SW"],
            ["SpotLevel", 57.9295233, 18.8955352, "id109", "SAXRIV",", Wind Direction ","W/NW"],
            ["SpotLevel", 57.8437760, 18.7848341, "id110", "BRÄGÅRN",", Wind Direction ","NW"],
            ["SpotLevel", 57.8455552, 18.6083233, "id111", "IREVIKEN",", Wind Direction ","W/NW"],
            // FÅRÖ //
            ["SpotLevel", 57.9735893, 19.2501460, "id108", "EKEVIKEN",", Wind Direction ","N/NW"],
            ["SpotLevel", 57.9868174, 19.2241011, "id109", "VARPET",", Wind Direction ","N/NE"],
            ["SpotLevel", 57.9561473, 19.3311783, "id110", "SKALASAND",", Wind Direction ","E/SE"],
            ["SpotLevel", 57.9513802, 19.2555524, "id111", "SUDERSAND",", Wind Direction ","E/SE"],
            ["SpotLevel", 57.9868616, 19.3039213, "id111", "SKÄR",", Wind Direction ","N/NE/NW"]
    ];

    custom_icon = L.icon({
        iconUrl: 'images/kitesurfing.png',
        iconSize: [20,20,],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20]
    });

    kitespots = L.marker(location.latLon, {icon: custom_icon}).addTo(map);
  
    
    // Loop for the kitespots. //
        for (var i = 0; i < kitespots.length; i++) {
            spots = new L.marker([kitespots[i][1],kitespots[i][2]])
                .bimarkers(kitespots[i][0],kitespots[i][4],kitespots[i][5],kitespots[i][6])
                .addTo(map);
        }
        
});
  



/*
// Creating the layer container //

 var baseLayers = {
    "Mapbox": mapbox,
    "OpenStreetMap": osm
 };
 
 var overlays = {
    "Marker": marker
 };
 
L.control.layers(baseLayers, overlays).addTo(map);



// Creating popup markers //

mapboxgl.accessToken = 'pk.eyJ1IjoibGlhaGNoZXN0b24iLCJhIjoiY2tpbG5seXE5MGxhYzJ6bXd4Y2xvN2xwMiJ9.efl4PsN0s5YHbu22oEqrlg';
var map = new mapboxgl.Map({
container: 'windy',
style: 'mapbox://styles/mapbox/streets-v11',
center: [63.550343, 17.665957],
zoom: 5
});
 
var marker = new mapboxgl.Marker()
.setLngLat([lat, lon])
.addTo(map);

var mymap = L.map('windy').setView([63.45, 17.52], 5);

L.tileLayer('https://api.mapbox.com/styles/v11/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 5,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGlhaGNoZXN0b24iLCJhIjoiY2tpbG5seXE5MGxhYzJ6bXd4Y2xvN2xwMiJ9.efl4PsN0s5YHbu22oEqrlg'
}).addTo(mymap);



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


//  Array of markers //
var coord = [
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

for (var i = 0; i < markers.length; i++) {
        spots = new L.marker([markers[i][1],markers[i][2]])
            .bindPopup(markers[i][5])
            .addTo(map);
    }

     // Add Markers to map in Leaflet//

        // Map from https://cloud.maptiler.com/maps/hybrid/ //
L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=Eq1wRludzR4Xg059gxvk', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

*/
    
 