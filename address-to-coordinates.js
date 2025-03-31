const apiKey = "8ef9024cc83f4b8c8dfafc430277447f";

document.getElementById("searchButton").addEventListener("click", async () => {
  const address = document.getElementById("searchInput").value;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.features.length > 0) {
      const { lat, lon } = data.features[0].properties;

      // Display on page
      const resultDiv = document.getElementById("results");
      resultDiv.innerHTML = `
        <p><strong>Latitude:</strong> ${lat} N, <strong>Longitude:</strong> ${lon} W</p>
      `;

      // Save to backend
      const saveResponse = await fetch("http://localhost:3001/api/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,
          address,
          latitude: lat,
          longitude: lon,
        }),
      });

      const saveResult = await saveResponse.json();
      console.log("Saved to backend:", saveResult);
    } else {
      alert("Address not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
