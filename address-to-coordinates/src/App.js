import React, { useState } from 'react';
import AddressToCoordinates from './AddressToCoordinates';
import './App.css';

function App() {
  const [address, setAddress] = useState(""); // Stores user input 
  const [coordinates, setCoordinates] = useState(null); // Stores coordinates

  return (
    <div className="App">
      
      <h1>Weather We Go</h1>
      <p>Enter an address to get the coordinates:</p>
    
      <div className="search-container">
        <input
          type="search"
          className="searchBox"
          id="searchInput"
          placeholder="Enter a valid address:"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <AddressToCoordinates address={address} setCoordinates={setCoordinates} />
        <div className="select-dates">
          <p><strong>Select Dates:</strong></p>
          <input type="date" className="datePick" id="dateInput1" />
          <p>-</p>
          <input type="date" className="datePick" id="dateInput2" />
        </div>
      </div>
        {coordinates && (
          <div className="coordinates-display">
            <p>
              <strong>Latitude:</strong> {coordinates.lat} N, <strong>Longitude:</strong> {coordinates.lon} W
            </p>
          </div>
        )}
      
    </div>
  );
}

export default App;