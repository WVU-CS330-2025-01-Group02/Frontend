//JS Code to create a map with Leaflet

document.addEventListener("DOMContentLoaded", () => {

    // Create the bounds of the map    
    const usBounds = [
      [24.396308, -124.848974],  
      [49.384358,  -66.885444],  
    ];
  
    
    // Create the Leaflet map object
    const map = L.map("map", {
      maxBounds: usBounds,
      maxBoundsViscosity: 0.8,
      minZoom: 3,
      worldCopyJump: false,
    });
  
    
    // The URL of the tile server
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,                         
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);                         
  
    
    map.fitBounds(usBounds);
  
    
    // Create a variable to hold the current marker
    let currentMarker = null;        

  // Create a click event handler for the map
    map.on("click", (e) => {               
      
  
      // If there’s already a pin, remove it so only one shows at a time
      if (currentMarker) map.removeLayer(currentMarker);
  
      // Create a new draggable marker at the clicked coordinates
      currentMarker = L.marker(e.latlng, { draggable: true })
        .addTo(map)                       
        .bindPopup(                        
          `Lat: ${e.latlng.lat.toFixed(5)}<br>Lng: ${e.latlng.lng.toFixed(5)}`
        )
        .openPopup();                      
    });
  });
  