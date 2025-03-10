import React from "react";
import './SearchBar.css';

const AddressToCoordinates = ({ address, setCoordinates }) => { 
    const apiKey = "8ef9024cc83f4b8c8dfafc430277447f";

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
        <button className="search-button" onClick={fetchCoordinates}>Search</button>
    );
};

export default AddressToCoordinates;