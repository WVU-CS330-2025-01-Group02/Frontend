const selectElement = document.getElementById("attribute");
const resultsDiv = document.getElementById("results");

const overall = [1, 2, 3, 4, 5]; // will be replaced with API call
const walkability = [6, 54, 3, 21, 7];
const temps = [8, 9, 90, 78, 56];
const precipitation = [43, 12, 0, 98, 67];

function updateResults(selectedValue) {
    let sortedArray = [];

    if (selectedValue == "overall") {
        sortedArray = overall.sort((a, b) => b - a);
    } else if (selectedValue == "walkable") {
        sortedArray = walkability.sort((a, b) => b - a);
    } else if (selectedValue == "warmest") {
        sortedArray = temps.sort((a, b) => b - a);
    } else if (selectedValue == "coldest") {
        sortedArray = temps.sort((a, b) => a - b);
    } else if (selectedValue == "rainiest") {
        sortedArray = precipitation.sort((a, b) => b - a);
    }

    console.log(sortedArray);
    resultsDiv.innerHTML = `<p>Results:<br> ${sortedArray.join("<br>")}</p>`;
}

updateResults("overall");

selectElement.addEventListener("change", function() {
    updateResults(selectElement.value);

});