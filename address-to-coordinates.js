document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchInput");
    const button = document.getElementById("searchButton");
    const results = document.getElementById("results");
  
    const apiKey = "8ef9024cc83f4b8c8dfafc430277447f";
  
    async function fetchCoordinates() {
      const address = input.value.trim();
      if (!address) return;
  
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;
      const options = { method: "GET" };
  
      try {
        const response = await fetch(url, options);
        const data = await response.json();
  
        if (data.features.length > 0) {
          const { lat, lon } = data.features[0].properties;
          results.innerHTML = `
            <p><strong>${address}</strong><br />
            Latitude: ${lat}<br />
            Longitude: ${lon}</p>
          `;
        } else {
          results.innerHTML = "";
          alert("Address not found");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        results.innerHTML = "<p>Error fetching coordinates.</p>";
      }
    }
  
    button.addEventListener("click", fetchCoordinates);
  });