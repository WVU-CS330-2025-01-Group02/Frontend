import React, { useState } from "react";
import './SearchBar.css';

const AddressToCoordinates = () => { 
    const [address, setAddress] = useState(""); // Stores user input 
    const [coordinates, setCoordinates] = useState(null); // Stores coordinates
    const API_KEY = process.env.REACT_APP_API_KEY;

    const fetchCoordinates = async () => { 
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`;

        const requestOptions = { 
            method: "GET",
        };

        try { 
            const response = await fetch(url, requestOptions); 
            const data = await response.json(); 
        
            if (data.features.length > 0) {
                const { lat, lon } = data.features[0].properties;

                

                setCoordinates({ lat, lon });
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
        <div className="search-container">
        <h1>Weather We Go</h1>
        <input
            type="search"
            className="searchBox"
            id="searchInput"
            placeholder="Enter a valid address:"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
        />
        <button className="search-button" onClick={fetchCoordinates}>Search</button>
        <div className="select-dates">
            <p><strong>Select Dates:</strong></p>
            <input type="date" className="datePick" id="dateInput" />
            <p>-</p>
            <input type="date" className="datePick" id="dateInput" />
        </div>
        {coordinates && (
            <p id="coordinates-display">
                <strong>Latitude:</strong> {coordinates.lat}, <strong>Longitude:</strong> {coordinates.lon}
            </p>
        )}
    </div>
    );
};

export default AddressToCoordinates;