const options = {
    // Required: API key
    key: 'Ij2CVHcL4d5ByrXOrtQg71Abhm2gFLGO', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 63.45,
    lon: 17.52,
    zoom: 5,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const { map } = windyAPI;
    // .map is instance of Leaflet map

    L.popup()
        .setLatLng([63.45, 17.52])
        .setContent('Hello World')
        .openOn(map);
});
