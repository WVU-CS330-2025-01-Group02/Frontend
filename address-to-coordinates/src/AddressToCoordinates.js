import React from "react";

const AddressToCoordinates = ({ address, setCoordinates }) => { 
    const apiKey = "8ef9024cc83f4b8c8dfafc430277447f";
    
    // Save to backend
  const saveCoordinatesToDB = async (address, latitude, longitude) => {
    try {
      const response = await fetch("http://localhost:3001/api/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1, // or null if not using users
          address,
          latitude,
          longitude,
        }),
      });

      const data = await response.json();
      console.log("✅ Saved to backend:", data);
    } catch (error) {
      console.error("Failed to save coordinates:", error);
    }
  };

    //Fetch coordinates from Geoapify API
    const fetchCoordinates = async () => { 
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

        const requestOptions = { 
            method: "GET",
        };

        try { 
            const response = await fetch(url, requestOptions); 
            const data = await response.json(); 
        
            if (data.features.length > 0) {
                const { lat, lon } = data.features[0].properties;
                setCoordinates({ lat, lon });

                // Send coordinates to backend
                console.log("Sending to backend:", address, lat, lon);
                saveCoordinatesToDB(address, lat, lon);
            } else {
                setCoordinates(null);
                alert("Address not found");
            }
        }
        catch (error) { 
            console.error("Error", error);
        }
    };

    return (
        <div>
        
        <button className="search-button" onClick={fetchCoordinates}>Search</button>
        </div>
    );
};

export default AddressToCoordinates;